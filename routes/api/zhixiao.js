const express = require("express")
const jwt = require('jsonwebtoken')
const router = express.Router();

const mysql = require('mysql')
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '5642818',
  database : 'zhixiao'
})

router.get('/xiaoji',(req,res) => {
  const sql = 'select name from xiaoji'
  connection.query(sql,(err,result) => {
    if(err) throw err
    res.json({data:result})
  })
})

router.get('/yuanji',(req,res) => {
  const sql = "select sortage,group_concat(name) as name from yuanji GROUP BY sortage;"
  connection.query(sql,(err,result) => {
    if(err) throw err
    res.json({data:result})
  })
})

router.get('/xiehui',(req,res) => {
  const sql = "select sortage,group_concat(name) as name from xiehui GROUP BY sortage;"
  connection.query(sql,(err,result) => {
    if(err) throw err
    res.json({data:result})
  })
})

router.get('/show',(req,res) => {
  jwt.verify(req.headers.authorization,'CodeKiang',(error,decoded)=>{
    if (error) {
      switch (error.name) {
        case 'JsonWebTokenError':
          res.status(401).send({msg: '无效的token'});
          break;
        case 'TokenExpiredError':
          res.status(401).send({msg: 'token过期'});
          break;
      }
    }
  })

  // 判断前端请求是否为院级发送的
  if(typeof(req.query.sortage) == "string"){
    //院级查询
    const yj_sql = "select detail,department,activity from "
    + req.query.table +" where name=? and sortage=?;"
    connection.query(yj_sql,[req.query.name,req.query.sortage],(err,result) => {
      if(err) {
        throw err
      }
      res.json({result})
    })
  }
  else{
    // 校级，协会查询
    const sql =  "select detail,department,activity from "
    + req.query.table +" where name=?;"
    connection.query(sql,[req.query.name],(err,result) => {
      if(err) {
        throw err
      }
      res.json({result})
    })
  }
})

router.get('/question',(req,res)=>{
  const sql='select question from question;'
  connection.query(sql,[],(err,result)=>{
    if(err) {
      throw err
    }
    res.json({result})
  })

})
module.exports = router;