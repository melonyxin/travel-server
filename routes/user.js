var express = require('express');
var router = express.Router();
var query = require("../mysql");

router.get('/', function(req, res, next) {
  let sql = "SELECT * FROM user";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
    } else {
      console.log(results);
      res.json(results);
    }
  })
});

router.post('/checkUser', function(req, res, next) {
  name=req.body.name ;
  pwd=req.body.password;
  let sql = "SELECT * FROM user WHERE name = '"+name+"'";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
    } else if(results.length === 0) {
      res.json({result:null,user:null});
    } else if(results[0].password === pwd) {
      console.log(results);
      delete results[0].password
      res.json({result:true,user:results[0]});
    } else {
      console.log(results);
      res.json({result:false,user:null});
    }
  })
});

router.post('/addUser', function(req, res, next) {
  let name=req.body.name ;
  let pwd=req.body.password;
  let tel=req.body.telephone;

  let sql = "insert into user(name,password,telephone)"
            + "values('"+name+"','"+pwd+"','"+tel+"')";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,user:null});
    } else {
      console.log(results);
      res.json({result:true,user:{name:name,telephone:tel}});
    }
  });
});

module.exports = router;
