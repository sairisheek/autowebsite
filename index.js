
//require statements
var express = require('express');
var app = express();
var pg = require('pg');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');

var session      = require('express-session');

var bodyParser = require('body-parser');
var text;

var port = process.env.PORT || 8080;
console.log(process.env.PWD);
console.log("Here is  dburl: "+process.env.DATABASE_URL);
var conString = process.env.DATABASE_URL;



app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.set('view engine', 'ejs');
app.use(flash());
//routing for GET /login
app.get("/login",function(req,res) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
}); 



// loading static files
app.use("/css", express.static(__dirname + '/resources/css'));
app.use("/fonts", express.static(__dirname + '/resources/fonts'));
app.use("/js", express.static(__dirname + '/resources/js'));

//routing for /home
app.get('/home', function(req,res){
	res.sendFile(__dirname+'/resources/search.html');
});


// routing for root
app.get('/', function(req, res){
	var client = new pg.Client(conString);
	client.on('drain', client.end.bind(client)); //after queries have completed, close the pool
	client.connect();
	var query = client.query("SELECT * FROM master_table");
	query.on('row', function(row){
		 text = row;
	});
	res.send(text);
});



app.listen(port, function(){
	console.log('Running! '+port);
});