const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../models/userModel')

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

router.get('/scores', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});
 
module.exports = router;