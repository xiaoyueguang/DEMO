const express = require('express')
const fs = require('fs')
const app = express()

app.set('view engine', 'pug')
app.set('views', './views')
app.set('etag', false)

app.get('/', function (req, res) {
  res.render('index', {
  })
})

app.get('/axios', (req, res) => {
  res.send(fs.readFileSync('node_modules/axios/dist/axios.min.js'))
})

app.get('/status1', function (req, res) {
  res.setHeader('Cache-Control', 'no-store')
  return render(res, 'Cache-Control: no-store')
})

app.get('/status2', function (req, res) {
  res.setHeader('Cache-Control', 'no-cache')
  return render(res, 'Cache-Control: no-cache')
})
app.get('/status3', (req, res) => {
  res.setHeader('Cache-Control', 'private')
  return render(res, 'Cache-Control: private')
})
app.get('/status4', function (req, res) {
  res.setHeader('Cache-Control', 'max-age=10')
  return render(res, 'Cache-Control: max-age=10')
})
app.get('/status5', function (req, res) {
  res.setHeader('ETag', 'etag111')
  return render(res, 'ETag: etag111')
})
app.get('/status6', function (req, res) {
  res.setHeader('expires', '10')
  return render(res, 'expires: 10')
})
app.get('/status7', function (req, res) {
  res.setHeader('Last-Modified', 'Sun, Mar 15 2020 22:25:25 GMT')
  return render(res, 'Last-Modified: Sun, Mar 15 2020 22:25:25 GMT')
})

app.listen(3000, () => {
  console.log('服务已启动')
})

let count = 0;

function render (res, text) {
  count = count + 1

  return res.render('status', {
    code: res.statusCode,
    text,
    count
  })
}