const path = require('path')

module.exports = {
    configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'Structure Machine',
    themeColor: '#fa4818',
    msTileColor: '#1e1e1e',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  }
}
