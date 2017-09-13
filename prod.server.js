// 启动打包后(./dist)的项目

var express = require('express')
var config = require('./config/index')

var app = express()
var router = express.Router()
var port = process.env.PORT || config.build.port

router.get("/", function (req, res, next) {
  req.url = './index.html'
  next()
})

app.use(router)



// 接口请求 -> 商家模块 mock
let sellerData = require('./mock/seller.json')
let indexListData = require('./mock/index-list.json')
let restaurantList = require('./mock/restaurant-list.json')
let findList = require('./mock/find-list.json')

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
app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('> Listening at ' + port + '\n')
})
