var express = require('express');
var mysql = require('./dbcon.js');
var cors = require('cors');
const { json } = require('body-parser');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());
app.set('port', 7495);

var getQuery = 'SELECT * FROM workout';
var insertQuery = 'INSERT INTO workout (`name`, `reps`, `weight`, `unit`, `date`) VALUES (?, ?, ?, ?, ?)';
var updateQuery = 'UPDATE workout SET name=?, reps=?, weight=?, unit=?, date=? WHERE id=?';
var deleteQuery = `DELETE FROM workout WHERE id=?`;
var dropTableQuery = `DROP TABLE IF EXISTS workout`;
var makeTableQuery = `CREATE TABLE workout(
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(255) NOT NULL,
                    reps INT,
                    weight INT,
                    unit BOOLEAN,
                    date DATE);`;

function getData(res) {
  mysql.pool.query(getQuery, function(err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    res.json({rows: rows});
  })
}

app.get('/', function(req,res,next){
  getData(res);
});

app.post('/', function(req,res,next){
  mysql.pool.query(makeTableQuery);
  var {name, reps, weight, unit, date} = req.body;
  mysql.pool.query(insertQuery, [name, reps, weight, unit, date], function(err, result){
    if(err){
      next(err);
      return;
    }
    getData(res);
  });
});

app.delete('/', function(req,res,next){
  var {id} = req.body
  mysql.pool.query(deleteQuery, id, function(err, result){
    if(err){
      next(err);
      return;
    }
  });
  res.send("Deleted");
});


app.put('/', function(req,res,next){
  var {name, reps, weight, unit, date, id} = req.body;
  mysql.pool.query(updateQuery, [name, reps, weight, unit, date, id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
  });
  res.send("Update success");
});

app.get('/reset-table', function(req,res,next){
  mysql.pool.query(dropTableQuery, function(err){
    mysql.pool.query(makeTableQuery, function(err){
      res.send('Table reset');
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.send('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.send('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
