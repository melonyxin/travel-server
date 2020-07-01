var express = require('express');
var router = express.Router();
var query = require("../mysql");

router.post('/verify', function(req, res, next) {
  account=req.body.account ;
  pwd=req.body.password;
  let sql = "SELECT account,telephone FROM agency WHERE "+
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
  let name=req.body.name;
  let tel=req.body.telephone;
  let brief=req.body.brief;
  let user = {
    account:account,
    name:name,
    telephone:tel,
    brief:brief,
    type:'agency'
  }

  let sql = "insert into agency(account,password,name,telephone,brief)" 
            + "values('"+account+"','"+pwd+"','"+name+"','"+tel+"','"+brief+"')";
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
