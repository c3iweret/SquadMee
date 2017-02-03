var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/squadme');

//create User model
var User = mongoose.model('User', new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
    
  }));


module.exports = function(app){
  
  //middleware function for sessions
  app.use(function(req, res, next){
    if(req.session && req.session.user){
      User.findOne({email: req.session.user.email}, function(err, user){
        if(user){
          req.user = user;
          delete req.user.password;
          req.session.user = user;
          res.locals.user = user;
        }
        next();
      });
    }
    else{
      next();
    }
    });
  
  app.get('/home', function(req, res){
    res.render('index');
  });
  
  app.post('/login', function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
      if (!user){
         res.render('index', {error: 'Invalid username or password'});
      }
      else{
        if(bcrypt.compareSync(req.body.password, user.password)){
          req.session.user = user;
          res.redirect('/profile');
        }
        else{
          res.render('index', {error: 'Invalid username or password'});
        }
      }
      });
  });
  
  app.get('/logout', function(req, res){
    req.session.reset();
    res.redirect('/home');
  });
};
