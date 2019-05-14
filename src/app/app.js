import Bills from 'src/bills/bills.js'

export default class App {
  constructor () {
    this.bills = new Bills()
  }

  run () {
    return this.bills.load().then(data => {
      return data
    })
  }
}

// create a singleton
export let app = new App()
