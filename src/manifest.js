
module.exports = {
  name: 'AttPay',
  version: '0.0.1',
  description: 'Helps split ATT Family Plan bills',
  author: 'Hao Zhang',
  manifest_version: 2,
  icons: {
    '16': 'assets/icons/icon-16.png',
    '19': 'assets/icons/icon-19.png',
    '38': 'assets/icons/icon-38.png',
    '48': 'assets/icons/icon-48.png',
    '128': 'assets/icons/icon-128.png'
  },
  permissions: [
    'https://*/*',
    'http://*/*',
    'webRequestBlocking',
    'webRequest',
    'storage',
    'history',
    'tabs'
  ],
  browser_action: {
    'default_icon': 'assets/icons/icon-19.png',
    'default_title': 'AT&T Pay',
    'default_popup': 'pages/popup.html'
  },
  background: {
    persistent: true,
    page: 'pages/background.html'
  },
  options_page: 'pages/options.html',
  content_security_policy: "script-src 'self' 'unsafe-eval' https://cdnjs.cloudflare.com; object-src 'self'",
  web_accessible_resources: [
    'js/*.js'
  ]
}
