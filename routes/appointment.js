var express = require('express');
var router = express.Router();
var query = require("../mysql");

router.post('/getByUser', function(req, res, next) {
  let tourist_account = req.body.tourist_account;
  let sql = "SELECT * FROM appointment WHERE tourist_account='"+tourist_account+"'";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,consistList:null});
    } else {
      console.log(results);
      res.json({result:true,consistList:results});
    }
  });
});

router.post('/getBySpot', function(req, res, next) {
  let spot_name = req.body.spot_name;
  let sql = "SELECT * FROM appointment WHERE spot_name='"+spot_name+"'";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,consistList:null});
    } else {
      console.log(results);
      res.json({result:true,consistList:results});
    }
  });
});

router.post('/add', function(req, res, next) {
  let tourist_account = req.body.tourist_account;
  let spot_name = req.body.spot_name;
  let date = req.body.date;
  let appointment = {
    tourist_account:tourist_account,
    spot_name:spot_name,
    date:date
  }
  let sql = "insert into appointment(tourist_account,spot_name,date)"+
            "values('"+tourist_account+"','"+spot_name+"','"+date+"')";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,appointment:null});
    } else {
      console.log(results);
      res.json({result:true,appointment:appointment});
    }
  });
});

router.post('/delete', function(req, res, next) {
  let tourist_account = req.body.tourist_account;
  let spot_name = req.body.spot_name;
  let date = req.body.date;
  let sql = "delete from appointment where "+
            "tourist_account='"+tourist_account+
            "' and spot_name='"+spot_name+
            "' and date='"+date+"'";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false});
    } else {
      console.log(results);
      res.json({result:true});
    }
  });
});

module.exports = router;