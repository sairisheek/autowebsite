module.exports = function(app,passport) {
var text;
var pg = require('pg');
//routing for GET /login
app.get("/login",function(req,res) {
  res.render('index.ejs', { message: req.flash('loginMessage') });
}); 


//routing for /register
app.get('/register',function(req,res){
	if(isLoggedIn){req.logout();}
	res.render('register.ejs',{ message: req.flash('signUpMessage') });
});


//routing for /home
app.get('/home',isLoggedIn, function(req,res){
	res.sendFile(__dirname+'/resources/search.html');
});

//routing for auth
app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/home', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));
app.post('/register',regAuth, passport.authenticate('local-signup', {
			successRedirect : '/login', // redirect to the secure profile section
			failureRedirect : '/register', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

// routing for root
app.get('/', function(req, res){
	res.render('index.ejs',{ message: req.flash('loginMessage') })
});

//routing for logout
app.get('/logout',function(req,res){
	req.logout();
	res.redirect('/');
}); 


};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/login');
}


function regAuth(req, res, next) {
	if(req.body.regstring == "RandomassString"){
		return next()
	}

	req.flash('signUpMessage','Wrong Registration Code')
}