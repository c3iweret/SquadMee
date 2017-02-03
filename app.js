var express = require('express');
var bodyParser = require('body-parser');
var sessions = require('client-sessions');
var indexController = require('./controllers/indexController');
var signupController = require('./controllers/signupController');
var profileController = require('./controllers/profileController');
var eventsController = require('./controllers/eventsController');
//var csrf = 
var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./assets'));


app.use(bodyParser.urlencoded({extended: true}));
app.use(sessions({
    cookieName: 'session',
    secret: 'vbfjs771%bkbeebcs999',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true 
}));
//app.use(csrf());


//fire controllers
indexController(app);
signupController(app);
profileController(app);
eventsController(app);

//listen to port
app.listen(8080);
console.log('listening on port 8080!');
