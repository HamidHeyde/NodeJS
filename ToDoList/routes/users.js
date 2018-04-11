const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//==============================

//Loading models
require('../models/user');
const user_model = mongoose.model('user');

//Login
router.get('/login', (req, res) => {
    res.send('login');
})

//Register
router.get('/register', (req, res) => {
    res.send('register');
})

//==============================
module.exports = router;