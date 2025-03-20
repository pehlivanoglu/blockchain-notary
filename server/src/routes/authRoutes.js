const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { tckn, fullName, phoneNumber, password } = req.body;
  const nid = tckn;
  const ifUnique = await User.find({ nid: nid });
  
  if(ifUnique[0]!=undefined){
    return res
      .status(422)
      .send({ error: 'This user already registered!' });
  }

  try {
    const user = new User({ nid, fullName, phoneNumber, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token, nid, fullName, phoneNumber});
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { nid, password } = req.body;
  
  if (!nid || !password) {
    return res.status(422).send({ error: 'Must provide national identification number and password' });
  }

  const user = await User.findOne({ nid });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or nid' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token, nid, fullName: user.fullName, phoneNumber: user.phoneNumber });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or nid' });
  }
});

router.get('/verify-token', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ valid: false });
    }

    jwt.verify(token, 'MY_SECRET_KEY', (err, decoded) => {
      if (err) {
        return res.status(401).json({ valid: false });
      }
      
      res.json({ valid: true, userId: decoded.userId });
    });
    
  } catch (err) {
    res.status(500).json({ valid: false });
  }
});

module.exports = router;
