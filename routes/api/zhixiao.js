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
router.get("/zhixiao",(req,res) => { // 路由跳转
  res.json({msg: "我是zhixiao路由"})
})

module.exports = router;