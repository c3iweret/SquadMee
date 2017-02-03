var mongoose = require('mongoose');
var User = mongoose.model('User');


//use for pages that require login
var requirelogin = function requirelogin(req, res, next){
    if(!req.user){
      res.redirect('/home');
    }
    else{
      next();
    }
  };
  
module.exports = function(app){
    
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
    
    app.get('/profile', requirelogin, function(req, res){
    if (req.session && req.session.user){
      User.findOne({email: req.session.user.email}, function(err, user){
        if(!user){
          req.session.reset();
          res.redirect('/home');
        }
        else{
          res.locals.user = user;
          res.render('profile');
      }
        
      });
    }
    else{
        res.redirect('/home');
    }
    });
};