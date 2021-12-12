var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_xuj2',
  password        : '6659',
  database        : 'cs290_xuj2'
});

module.exports.pool = pool;
