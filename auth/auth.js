const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
 
const UserModel = require('../models/userModel');
 
// handle user registration
passport.use('signup', new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, async ( username, password, done) => {
  try {
    const user = await UserModel.create({ username, password });
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));

// handle user login
passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      const validate = await user.isValidPassword(password);
      if (!validate) {
        return done(null, false, { message: 'Wrong Password' });
      }
      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      return done(error);
    }
  }));
   
  // verify token is valid
  passport.use(new JWTstrategy({
    secretOrKey: 'top_secret', // key used as a hash of some sort
    
    jwtFromRequest: function (req) {
      let token = null;
      if (req && req.cookies) token = req.cookies['jwt'];
      return token;
    }
  }, async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));