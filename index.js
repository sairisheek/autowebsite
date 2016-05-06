
//require statements
var express = require('express');
var app = express();
var pg = require('pg');
var router = express.Router();

var bodyParser = require('body-parser');
var text;

var port = process.env.PORT || 8080;
console.log(process.env.PWD);
console.log("Here is  dburl: "+process.env.DATABASE_URL);
var conString = process.env.DATABASE_URL;

/*router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});
*/
client.on("error", function (err) {
console.log("error event - " + client.host + ":" + client.port + " - " + err);
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

//routing for GET /login
app.get("/login",function(req,res){
  res.sendFile(process.env.PWD+"/resources/index.html");
}); 

//routing for POST /login
app.post("login",function(req,res){
	console.log(res.body.inputEmail);
	console.log(res.body.inputPassword);
});

//app.use("/",router);
// loading static files
app.use("/css", express.static(__dirname + '/resources/css'));
app.use("/fonts", express.static(__dirname + '/resources/fonts'));
app.use("/js", express.static(__dirname + '/resources/js'));

// routing for root
app.get('/', function(req, res){
	var client = new pg.Client(conString);
	client.on('drain', client.end.bind(client)); //after queries have completed, close the pool
	client.connect();
	var query = client.query("SELECT * FROM master_table");
	query.on('row', function(row){
		 text = row;
	})


	res.send(text);
});

app.listen(port, function(){
	console.log('Running! '+port);
});