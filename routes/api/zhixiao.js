const express = require("express")

const router = express.Router();

const mysql = require('mysql')
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '5642818',
  database : 'zhixiao'
})
router.get("/zhixiao",(req,res) => { // 路由跳转
  res.json({msg: "我是zhixiao路由"})
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
  console.log(req.query)
  if(typeof(req.query.name)!=="string"){
    console.log(typeof(req.query.name)!==String)
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

module.exports = router;