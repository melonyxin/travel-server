var express = require('express');
var router = express.Router();
var query = require("../mysql");

router.post('/verify', function(req, res, next) {
  account=req.body.account ;
  pwd=req.body.password;
  let sql = "SELECT account,telephone FROM tourist WHERE "+
            "account = '"+account+"' and password='"+pwd+"'";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,user:null});
    } else if(results.length === 0) {
      res.json({result:false,user:null});
    } else {
      console.log(results);
      results[0]['type']='tourist';
      res.json({result:true,user:results[0]});
    }
  })
});

router.post('/add', function(req, res, next) {
  let account=req.body.account;
  let pwd=req.body.password;
  let tel=req.body.telephone;
  
  let sql = "insert into tourist(account,password,telephone)" 
            + "values('"+account+"','"+pwd+"','"+tel+"')";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,user:null});
    } else {
      console.log(results);
      res.json({result:true,user:{account:account,telephone:tel,type:'tourist'}});
    }
  });
});

module.exports = router;
