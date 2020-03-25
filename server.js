const express = require("express")
const bodyparser = require("body-parser")

const app = express()
// 如果环境变量中配置了端口就使用环境配置的端口 否则端口为9999
const port = process.env.port || 8989;
// const port = 8989

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
app.use(users) // 使用路由中间件

const zhixiao = require("./routes/api/zhixiao")
app.use(zhixiao)

app.get('/',(req,res) => {
  res.send('hello world')
})

app.listen(port,() =>{
  console.log(`服务器正在开启 ${port}`)
})
