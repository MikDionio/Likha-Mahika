const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');
 
const tokenList = {};
const router = express.Router();

//check current status of the sit3
router.get('/status', (req, res, next) => {
  res.status(200).json({ status: 'ok' });
});
 
//for making of new accounts, no login yet
router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
  res.status(200).json({ message: 'signup successful' });
});
 
//the login function
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occured');
        return next(error);
      }
      //returns user credentials if a match is found
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = {
          _id: user._id,
          username: user.username
        };
 
        //used for signing jwt-passports
        const token = jwt.sign({ user: body }, 'top_secret', { expiresIn: 300 }); //key used in auth.js
        const refreshToken = jwt.sign({ user: body }, 'top_secret_refresh', { expiresIn: 86400 });
 
        // store tokens in cookie
        res.cookie('jwt', token);
        res.cookie('refreshJwt', refreshToken);
 
        // store tokens in memory
        tokenList[refreshToken] = {
          token,
          refreshToken,
          username: user.username,
          _id: user._id
        };
 
        //Send back the token to the user
        return res.status(200).json({ token, refreshToken });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});
 
//get jwt-token
router.post('/token', (req, res) => {
  const { username, refreshToken } = req.body;
 
  if ((refreshToken in tokenList) && (tokenList[refreshToken].username === username)) {
    const body = { username, _id: tokenList[refreshToken]._id };
    const token = jwt.sign({ user: body }, 'top_secret', { expiresIn: 300 });
 
    // update jwt
    res.cookie('jwt', token);
    tokenList[refreshToken].token = token;
 
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});
 
//handles logout and clears all authenticators
router.post('/logout', (req, res) => {
  if (req.cookies) {
    const refreshToken = req.cookies['refreshJwt'];
    if (refreshToken in tokenList) delete tokenList[refreshToken]
    res.clearCookie('refreshJwt');
    res.clearCookie('jwt');
  }
 
  res.status(200).json({ message: 'logged out' });
});
 
module.exports = router;