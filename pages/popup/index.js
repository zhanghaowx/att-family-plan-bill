import Vue from 'vue'
import Components from './components/export'
import Index from './index.vue'

import './assets/css/custom.css'

import { app } from 'src/app/app.js'

// components
Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

// event hub
const eventHub = new Vue()
Vue.mixin({
  data: function () {
    return {
      eventHub: eventHub
    }
  }
})

function getConfig () {
  return app.run()
}

function getTabUrl () {
  return new Promise(resolve => {
    chrome.tabs.getSelected(null, function (tab) {
      resolve(tab.url)
    })
  })
}

Promise.all([getTabUrl(), getConfig()]).then(values => {
  /* eslint-disable no-new */
  new Vue({
    el: '#root',
    render: r => r(Index)
  })
  /* eslint-enable no-new */
})
