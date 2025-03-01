const express = require('express');
const  mongoose = require('mongoose');
const User = require('../models/Utilizador');

const {
    login,
    loginPost,
    logout,

} = require('../controllers/auth_controller');

const router = express.Router();

router
    .get('/login', login)
    .post('/login',loginPost)
    .get('/logout',logout)

;

module.exports = router