const express = require("express")
// const gravatar = require("gravatar")
const jwt = require('jsonwebtoken')
const formidable = require('formidable'); //上传功能的插件
const path = require('path')
const fs = require("fs");

const router = express.Router();

const mysql = require('mysql')
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'home',
  database : 'zhixiao'
})

// router.get('/user',(req,res) => {
//   res.json('是我')
// })

router.post("/register",(req,res)=>{
  const sql = 'select * from users where phone = ?'
  connection.query(sql,[req.body.phone],(err,user)=>{
    if(err) throw err
    if(user.length === 1){
      // 判断邮箱是否被注册，是则返回400状态码
      return res.json({status:400})
    }
    else{
      //一个邮箱对应一个头像 s:size  r:rating  d:default没有这张图片是返回的内容
      // const avatar = gravatar.url(req.body.email,{s:'200',r:'pg',d:'wavatar'})
      
      // 初始化用户头像
      const avatar = 'http://47.115.46.57:8989/upload/init.jpg'
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
      //无此账号
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

router.post('/upload_avatar',(req,res)=>{
  //上传文件只能通过这个插件接收  file是上传文件 fields是其他的
  let form = new formidable.IncomingForm();
  //文件保存的目录为static文件夹（文件夹不存在会报错，一会接受的file中的path就是这个）
  form.uploadDir = path.join(__dirname, '../../static/upload');
  form.keepExtensions = true; //使用文件的原扩展名  
  form.parse(req,(err, fields, file) => { //转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
    // 上传文件的路径
    let filePath = '';
    //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件  
    if (file.tmpFile) {
      filePath = file.tmpFile.path;
    } else { // 否则取循环第一个上传的文件。
      for (var key in file) {
        if (file[key].path && filePath === '') {
          filePath = file[key].path;
          break;
        }
      }
    }
    //文件移动的目录文件夹，不存在时创建目标文件夹  
    let targetDir = path.join(__dirname, '../../static/upload');
    if (!fs.existsSync(targetDir)) {
      fs.mkdir(targetDir,0777, function(err){
        if(err){
         console.log(err);
        }else{
         console.log("creat done!");
        }
      });
    }
    // 取文件名的后缀
    let fileExt = filePath.substring(filePath.lastIndexOf('.'));

    //以当前时间戳对上传文件进行重命名  
    let fileName = new Date().getTime() + fileExt;
    let targetFile = path.join(targetDir, fileName);
    //移动文件  
    fs.rename(filePath, targetFile, function (err) {
      if (err) {
        console.info(err);
        res.json({code: -1});
      } 
      else {
        //上传成功，将文件路径写入数据库并返回
        let fileUrl = 'http://47.115.46.57:8989/upload/' + fileName;
        const sql = 'update users set avatar=? where phone=?'
        connection.query(sql,[fileUrl,fields.phone],(err) => {
          if(err) throw err
        })
        //返回最新的文件路径
        res.json({code: 0,fileUrl});
      }
    })
  })
})

module.exports = router;