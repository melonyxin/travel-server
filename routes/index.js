var express = require('express');
var router = express.Router();

// 处理/login请求
router.post('/login',function(req,res){
  //获取登录名称和密码
  name=req.body.name ;
  pwd=req.body.pwd;
  //向前台反馈信息
  res.status(200).send(
      "后台反馈信息：登录帐号："+name+" | 登录密码："+pwd
    ) ;
});

module.exports = router;
