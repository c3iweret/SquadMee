var mongoose = require('mongoose');
var User = mongoose.model('User');

//create Event model
var Event = mongoose.model('Event', new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
    eventname: {
    type: String,
    required: true
  },
    participants: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
    
  }));

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
    
    app.get('/events', requirelogin, function(req, res){
        if (req.session && req.session.user){
            User.findOne({email: req.session.user.email}, function(err, user){
                if(!user){
                    req.session.reset();
                    res.redirect('/home');
                }
                else{
                    res.locals.user = user;
                    Event.find(function(err, results){
                      if (err){
                        var error = "couldnt load events";
                        res.render('events', {error: error});
                      }
                      else{
                        events = results;
                        console.log(events);
                        res.render('events', {data: events});
                      }
                      });
                    
                }   
        
            });
        }
        else{
            res.redirect('/home');
        }
    });
    
    app.post('/create-event', requirelogin, function(req, res){
        if (req.session && req.session.user){
            
            User.findOne({email: req.session.user.email}, function(err, user){
                if(!user){
                    req.session.reset();
                    res.redirect('/home');
                }
                else{
                    res.locals.user = user;
                    var event = new Event({
                        eventname: req.body.eventname,
                        participants: req.body.number,
                        email: user.email,
                        time: req.body.datetime,
                        description: req.body.description
                    });
                    event.save(function(err){
                        if (err){
                            var error = 'Oops something bad happened! Try again';
                            res.render('events', {error: error});
                        }
                        else{
                            res.render('events', {message: 'event created!'});
                        }
                    });
                }   
        
            });
        }
        else{
            res.redirect('/home');
        }
    });
    
    app.get('/create-event', requirelogin, function(req, res){
        if (req.session && req.session.user){
            res.render('events');
        }
        else{
            res.redirect('/home');
        }
    });
    
  
  
};