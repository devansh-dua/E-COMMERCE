const path = require('path');
const express = require('express');
const usersModel = require('../models/users');
const { createUser, loginUser } = require('../controllers/users.controller');
const router = express.Router();

// This will create new user
router.post('/create', createUser);
router.post('/signup', createUser);


router.post('/login', loginUser);



module.exports = router;