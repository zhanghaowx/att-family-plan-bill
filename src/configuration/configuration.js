import defaults from 'src/configuration/defaults.js'

export default class Configuration {
  /**
   * Creates a helper class to storage data into google chrome's storage
   * @param delay delay in milliseconds before saving
   */
  constructor (delay = 500) {
    this.delay = delay
    this.handler = null
    this.data = {}
  }

  /**
   * Save configurations with chrome's cloud storage
   * @returns {Promise<any>}
   */
  save () {
    // throttle multiple save request so that we won't breach the limits
    clearTimeout(this.handler)
    return new Promise(resolve => {
      this.handler = setTimeout(() => {
        chrome.storage.local.set(this.data, function () {
          resolve(this.data)
        })
      }, this.delay)
    })
  }

  /**
   * Read configurations with chrome's cloud storage
   * @returns {Promise<any>}
   */
  load () {
    return new Promise(resolve => {
      chrome.storage.local.get(null, result => {
        this.data = result
        resolve(result)
      })
    })
  }

  /**
   * Save default params during extension installation
   */
  install () {
    this.data = defaults
    return new Promise(resolve => {
      chrome.runtime.onInstalled.addListener(function () {
        chrome.storage.local.set(defaults)
        resolve()
      })
    })
  }
}
