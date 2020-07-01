var express = require('express');
var router = express.Router();
var query = require("../mysql");

router.post('/get', function(req, res, next) {
  let group_name=req.body.group_name;
  let sql = "SELECT * FROM consist WHERE group_name='"+group_name+"'";
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
  let spot_name=req.body.spot_name;
  let group_name=req.body.group_name;
  let date = req.body.date;
  let consist = {
    spot_name:spot_name,
    group_name:group_name,
    date:date
  }
  let sql = "insert into consist(spot_name,group_name,date)"+
            "values('"+spot_name+"','"+group_name+"','"+date+"')";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,consist:null});
    } else {
      console.log(results);
      res.json({result:true,consist:consist});
    }
  });
});

router.post('/update', function(req, res, next) {
  let last_spot_name=req.body.last_spot_name;
  let last_group_name=req.body.last_group_name;
  let spot_name=req.body.spot_name;
  let group_name=req.body.group_name;
  let date = req.body.date;
  let consist = {
    spot_name:spot_name,
    group_name:group_name,
    date:date
  }
  let sql = "update consist set "+
            "spot_name='"+spot_name+"',group_name='"+group_name+"',date='"+date+"'"+
            "where spot_name='"+last_spot_name+"' and group_name='"+last_group_name+"'";
  query(sql,(err,results)=>{
    if(err) {
      console.log(err);
      res.json({result:false,consist:null});
    } else {
      console.log(results);
      res.json({result:true,consist:consist});
    }
  });
});

router.post('/delete', function(req, res, next) {
  let spot_name=req.body.spot_name;
  let group_name=req.body.group_name;

  let sql = "delete from consist where "+
            "spot_name='"+spot_name+"' and group_name='"+group_name+"'";
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