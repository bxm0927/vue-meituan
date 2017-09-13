require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

// 接口请求 -> 商家模块 mock
let sellerData = require('../mock/seller.json')
let indexListData = require('../mock/index-list.json')
let restaurantList = require('../mock/restaurant-list.json')
let findList = require('../mock/find-list.json')

let apiRouter = express.Router()

apiRouter.get("/seller", function (req, res) {
  res.json({
    // 0 -> 请求成功
    code: 0,
    data: sellerData.seller
  })
})

apiRouter.get("/goods", function (req, res) {
  res.json({
    // 0 -> 请求成功
    code: 0,
    data: sellerData.goods
  })
})

apiRouter.get("/ratings", function (req, res) {
  res.json({
    // 0 -> 请求成功
    code: 0,
    data: sellerData.ratings
  })
})

apiRouter.get("/indexList", function (req, res) {
  res.json({
    // 0 -> 请求成功
    code: 0,
    data: indexListData
  })
})

apiRouter.get("/restaurantList", function (req, res) {
  res.json({
    // 0 -> 请求成功
    code: 0,
    data: restaurantList
  })
})

apiRouter.get("/findList", function (req, res) {
  res.json({
    // 0 -> 请求成功
    code: 0,
    data: findList
  })
})

// http://localhost:8080/api/seller
app.use('/api', apiRouter)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
