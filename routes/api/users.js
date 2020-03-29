const express = require("express")
const gravatar = require("gravatar")
const jwt = require('jsonwebtoken')

const router = express.Router();

const mysql = require('mysql')
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Hjh5642818$$$',
  database : 'zhixiao'
})

// router.get('/user',(req,res) => {
//   res.json('是我')
// })

router.post("/register",(req,res)=>{
  const sql = 'select * from users where phone = ?'
  connection.query(sql,[req.body.phone,req.body.password],(err,user)=>{
    if(err) throw err
    if(user.length === 1){
      // 判断邮箱是否被注册，是则返回400状态码
      return res.json({status:400})
    }
    else{
      //一个邮箱对应一个头像 s:size  r:rating  d:default没有这张图片是返回的内容
      const avatar = gravatar.url(req.body.email,{s:'200',r:'pg',d:'wavatar'})
      const addSql = 'INSERT INTO users(name,phone,sex,birthday,email,password,avatar) VALUES(?,?,?,?,?,?,?)';
      const addSqlParams = [
        req.body.username, req.body.phone,req.body.sex,
        req.body.birthday,req.body.email,req.body.password, avatar
      ]
      connection.query(addSql,addSqlParams,(err) => {
        if(err) throw err
        res.json({status:200})
      })
    }
  })
})

router.post("/login",(req,res) => {
  const  Sql = 'select * from users where phone = ? and password = ?';
  connection.query(Sql,[req.body.phone,req.body.password],(err,user) => {
    if(user.length == 0){
      return res.json({status:400})
    }
    if(err) throw err
    
    // jwt.sign(要加密的对象,密钥,过期时间,箭头函数)
    const data = {
      name:user[0].name,
      phone:user[0].phone,
      sex:user[0].sex,
      birthday:user[0].birthday,
      email:user[0].email,
      avatar:user[0].avatar,
      register_date:user[0].date
    }
    jwt.sign(data,'CodeKiang',{expiresIn:'2h'},(err,token) =>{
      if(err) res.status(401)
      res.json({status:200,token:token})
    })
  })
})

module.exports = router;