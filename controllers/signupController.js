var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

 
var User = mongoose.model('User');

module.exports = function(app){
  
  app.post('/signup', function(req, res){
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    var user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash
    });
    user.save(function(err){
      if (err){
        var error = 'Oops something bad happened! Try again';
        res.render('signup', {error: error});
      }
      else{
        res.render('index', {signup: 'You have been signed up! You can now log in'} );
      }
    });
  });
  
  app.get('/signup', function(req, res){
    res.render('signup');
  });
  

};