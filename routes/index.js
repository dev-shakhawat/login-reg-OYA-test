const express = require('express');
const router = express.Router();

const Login = require('../controllers/loginController');
const Registration = require('../controllers/regController');

// auth router
router.post('/login', Login);

// product router
router.post('/registration', Registration);

module.exports = router;
