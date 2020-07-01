var express = require('express');
var router = express.Router();
var query = require("../mysql");

router.get('/get', function(req, res, next) {
  let sql = "SELECT * FROM tourism_platform.group";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,groupList:null});
    } else {
      console.log(results);
      res.json({result:true,groupList:results});
    }
  });
});

router.post('/update', function(req, res, next) {
  let last_name=req.body.last_name;
  let name=req.body.name;
  let maximum=req.body.maximum;
  let price=req.body.price;
  let brief=req.body.brief;
  let agency_account=req.body.agency_account;
  let group = {
    name:name,
    maximum:maximum,
    price:price,
    brief:brief,
    agency_account:agency_account
  }

  let sql = "update tourism_platform.group set "+
            "name='"+name+"',maximum='"+maximum+"',price='"+price+
            "',brief='"+brief+"',agency_account='"+agency_account+"'"+
            "where name='"+last_name+"'";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,group:null});
    } else {
      console.log(results);
      res.json({result:true,group:group});
    }
  });
});

router.post('/add', function(req, res, next) {
  let name=req.body.name;
  let maximum=req.body.maximum;
  let price=req.body.price;
  let brief=req.body.brief;
  let agency_account=req.body.agency_account;
  
  let group = {
    name:name,
    maximum:maximum,
    price:price,
    brief:brief,
    agency_account:agency_account
  }
  let sql = "insert into tourism_platform.group(name,maximum,price,brief,agency_account)"
           +"values('"+name+"','"+maximum+"','"+price+"','"+brief+"','"+agency_account+"')";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,group:null});
    } else {
      console.log(results);
      res.json({result:true,group:group});
    }
  });
});

module.exports = router;