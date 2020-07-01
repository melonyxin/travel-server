var express = require('express');
var router = express.Router();
var query = require("../mysql");

router.get('/get', function(req, res, next) {
  let sql = "SELECT * FROM spot";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,spotList:null});
    } else {
      console.log(results);
      res.json({result:true,spotList:results});
    }
  });
});

router.post('/update', function(req, res, next) {
  let last_name=req.body.last_name;
  let name=req.body.name;
  let site=req.body.site;
  let open_time=req.body.open_time;
  let maximum=req.body.maximum;
  let brief=req.body.brief;
  let picture=req.body.picture;
  let price=req.body.price;
  let bureau_account=req.body.bureau_account;
  
  let spot = {
    name:name,
    site:site,
    open_time:open_time,
    maximum:maximum,
    brief:brief,
    picture:picture,
    price:price,
    bureau_account:bureau_account
  }
  let sql = "update spot set " 
            +"name='"+name+"',site='"+site+"',open_time='"+open_time+"',maximum='"+maximum+"',"
            +"brief='"+brief+"',picture='"+picture+"',price='"+price+"',bureau_account='"+bureau_account+"'"
            +"where name='"+last_name+"'";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,spot:null});
    } else {
      console.log(results);
      res.json({result:true,spot:spot});
    }
  });
});

router.post('/add', function(req, res, next) {
  let name=req.body.name;
  let site=req.body.site;
  let open_time=req.body.open_time;
  let maximum=req.body.maximum;
  let brief=req.body.brief;
  let picture=req.body.picture;
  let price=req.body.price;
  let bureau_account=req.body.bureau_account;
  
  let spot = {
    name:name,
    site:site,
    open_time:open_time,
    maximum:maximum,
    brief:brief,
    picture:picture,
    price:price,
    bureau_account:bureau_account
  }
  let sql = "insert into spot(name,site,open_time,maximum,brief,picture,price,bureau_account)" 
            + "values('"+name+"','"+site+"','"+open_time+"','"+maximum+"','"
                        +brief+"','"+picture+"','"+price+"','"+bureau_account+"')";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,spot:null});
    } else {
      console.log(results);
      res.json({result:true,spot:spot});
    }
  });
});

module.exports = router;