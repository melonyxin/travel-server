var express = require('express');
var router = express.Router();
var query = require("../mysql");

router.post('/getByUser', function(req, res, next) {
  let tourist_account = req.body.tourist_account;
  let sql = "SELECT * FROM tourism_platform.order WHERE tourist_account='"+tourist_account+"'";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,ordertList:null});
    } else {
      console.log(results);
      res.json({result:true,ordertList:results});
    }
  });
});

router.post('/getByGroup', function(req, res, next) {
  let group_name = req.body.group_name;
  let sql = "SELECT * FROM tourism_platform.order WHERE group_name='"+group_name+"'";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,ordertList:null});
    } else {
      console.log(results);
      res.json({result:true,ordertList:results});
    }
  });
});

router.post('/add', function(req, res, next) {
  let id = req.body.id;
  let time = req.body.time;
  let tourist_account = req.body.tourist_account;
  let group_name = req.body.group_name;
  let order = {
    id:id,
    time:time,
    tourist_account:tourist_account,
    group_name:group_name
  }
  let sql = "insert into tourism_platform.order(id,time,tourist_account,group_name)"+
            "values('"+id+"','"+time+"','"+tourist_account+"','"+group_name+"')";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,order:null});
    } else {
      console.log(results);
      res.json({result:true,order:order});
    }
  });
});

module.exports = router;