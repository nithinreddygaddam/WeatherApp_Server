/**
 * Created by Nithin on 08/25/16.
 */
 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use('local', new LocalStrategy(
    function(username, password,  done) {

          User.findOne({username: username}, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              console.log(username);
              return done(null, false, {message: 'Incorrect username.'});
            }
            if (!user.validPassword(password)) {
              return done(null, false, {message: 'Incorrect password.'}); 
            }
            return done(null, user);
          });

    }

));
