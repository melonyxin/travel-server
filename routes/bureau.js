var express = require('express');
var router = express.Router();
var query = require("../mysql");

router.post('/get', function(req, res, next) {
  account=req.body.account ;
  let sql = "SELECT name,telephone,address FROM bureau WHERE "+
            "account = '"+account+"'";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,bureau_info:null});
    } else if(results.length === 0) {
      res.json({result:false,bureau_info:null});
    } else {
      console.log(results);
      res.json({result:true,bureau_info:results[0]});
    }
  })
});

router.post('/verify', function(req, res, next) {
  account=req.body.account ;
  pwd=req.body.password;
  let sql = "SELECT account,name,address,telephone FROM bureau WHERE "+
            "account = '"+account+"' and password='"+pwd+"'";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,user:null});
    } else if(results.length === 0) {
      res.json({result:false,user:null});
    } else {
      console.log(results);
      results[0]['type']='bureau';
      res.json({result:true,user:results[0]});
    }
  })
});

router.post('/add', function(req, res, next) {
  let account=req.body.account;
  let name=req.body.name;
  let pwd=req.body.password;
  let address=req.body.address;
  let tel=req.body.telephone;
  
  let user = {
    account:account,
    name:name,
    address:address,
    telephone:tel,
    type:'bureau'
  }
  let sql = "insert into bureau(account,name,password,address,telephone)" 
            + "values('"+account+"','"+name+"','"+pwd+"','"+address+"','"+tel+"')";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,user:null});
    } else {
      console.log(results);
      res.json({result:true,user:user});
    }
  });
});

module.exports = router;
