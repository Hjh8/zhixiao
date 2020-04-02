const express = require("express")
const bodyparser = require("body-parser")
const compression = require('compression')

const path = require('path')
const app = express()

// 如果环境变量中配置了端口就使用环境配置的端口 否则端口为8989
// const port = process.env.port || 8989;
const port = 8989

// 一定要把注册compression放在托管静态资源之前
app.use(compression())
// 配置静态文件的地址，可以直接通过url拿到资源
app.use(express.static(path.join(__dirname,'./dist')))
app.use(express.static(path.join(__dirname,'./static')))

// 解决跨域问题
app.all('/*', function(req, res, next) {
  // 允许的跨域的域名
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  // 允许跨域请求携带的请求头
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  // 允许跨域的方法
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  
  if (req.method == 'OPTIONS') res.send(200)
  else next() /*让options请求快速返回*/ 
})

// 使用body-parser中间件 （需要放在路由配置之前！）
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

const users = require("./routes/api/users")
app.use('/api/users',users) // 使用路由中间件

const zhixiao = require("./routes/api/zhixiao")
app.use('/api/zhixiao',zhixiao)

app.listen(port,() =>{
  console.log(`服务器正在开启 ${port}`)
})
