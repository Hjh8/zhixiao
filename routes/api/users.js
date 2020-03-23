const express = require("express")
const gravatar = require("gravatar")
const jwt = require('jsonwebtoken')

const router = express.Router();

const mysql = require('mysql')
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '5642818',
  database : 'zhixiao'
})
router.get("/users",(req,res) => { // 路由跳转
  res.json({msg: "我是users路由"})
})

router.post("/register",(req,res)=>{ // 路由跳转
  const sql = 'select * from Users where email = ?'
  connection.query(sql,[req.body.email,req.body.password],(err,user)=>{
    if(err) throw err
    if(user.length === 1){
      // 判断邮箱是否被注册，是则返回400状态码
      return res.json({status:400})
    }
    else{
      //一个邮箱对应一个头像 s:size  r:rating  d:default没有这张图片是返回的内容
      const avatar = gravatar.url(req.body.email,{s:'200',r:'pg',d:'wavatar'})
      const  addSql = 'INSERT INTO Users(name,email,password,avatar) VALUES(?,?,?,?)';
      const  addSqlParams = [req.body.username, req.body.email,req.body.password, avatar];
      connection.query(addSql,addSqlParams,(err) => {
        if(err) throw err
        res.send({status:200})
      })
    }
  })
})

router.post("/login",(req,res) => {
  const  Sql = 'select * from Users where email = ? and password = ?';
  connection.query(Sql,[req.body.email,req.body.password],(err,user) => {
    if(err) throw err
    if(user.length == 0){
      res.json({status:400})
    }
    // jwt.sign(要加密的对象,密钥,过期时间,箭头函数)
    const data = {name:user[0].name,email:user[0].email,password:user[0].password}
    console.log(data)
    jwt.sign(data,'CodeKiang',{expiresIn:'0.5h'},(err,token) =>{
      if(err) throw err
      res.json({status:200,success:true,token:token})
    })
  })
})
module.exports = router;