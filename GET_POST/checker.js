var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
const { query } = require('express');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6868);

app.get('/',function(req,res){
  var qParams = [];
  for (var p in req.query) {
    qParams.push({'name':p, 'value':req.query[p]});
  }
  var context = {};
  context.data = qParams;
  console.log(context);
  res.render('get', context);
});

app.post('/', function(req, res) {
  var context = {};
  if (JSON.stringify(req.body) !== '{}') {
    var bodyParams = [];
    for (var p in req.body) {
      bodyParams.push({'name':p, 'value':req.body[p]});
    }
    context.body = bodyParams;
  }
  var qParams = [];
  for (var p in req.query) {
    qParams.push({'name':p, 'value':req.query[p]});
  }
  context.q = qParams;
  res.render('post', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log(`Express started on http://${process.env.HOSTNAME}:${app.get('port')}; press Ctrl-C to terminate.`);
});