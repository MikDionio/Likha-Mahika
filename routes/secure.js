const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const router = express.Router();
 
router.post('/submit-score', asyncMiddleware(async (req, res, next) => {
    const { email, score } = req.body;
    await UserModel.updateOne({ email }, { highScore: score });
    res.status(200).json({ status: 'ok' });
  }));
   
  router.get('/scores', asyncMiddleware(async (req, res, next) => {
    res.status(200);
  res.json({ 'status': 'ok' });
  }));


  router.get('/current', (req, res, next) => {
    const usertoken = req.cookies['jwt'];
    const decoded = jwt.verify(usertoken, 'top_secret');
    return UserModel.findById(decoded.user._id)
      .then((user) => {
        if(!user){
          return res.sendStatus(400)
        }
        return res.status(200).json(user.username)
      });
  });
module.exports = router;