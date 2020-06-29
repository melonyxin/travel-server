//mysql配置文件
var mysql = require('mysql');
// 创建连接池
var pool = mysql.createPool({
  host: "127.0.0.1", //这是数据库的地址
  port: '3306',
  user: "root", //需要用户的名字
  password: "990315", //用户密码 ，如果你没有密码，直接双引号就是
  database: "travel" //数据库名字
});

// 连接公用方法
var query=function(sql,callback){
  pool.getConnection(function(err,conn){
      if(err){
          callback(err,null);
      }else{
          conn.query(sql,function(err,results){
              //释放连接  
              conn.release();
              //事件驱动回调  
              callback(err,results);
          });
      }
  });
};

module.exports=query; 