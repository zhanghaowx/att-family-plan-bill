import Configuration from 'src/configuration/configuration.js'

export default class App {
  constructor () {
    this.configuration = new Configuration()
  }

  install () {
    this.configuration.install()
  }

  run () {
    return this.configuration.load().then(config => {
      return config
    })
  }
}

// create a singleton
export let app = new App()
