const express = require('express');


// =================================

const router = express.Router();

// =================================

const { homePage, loginPage, signupPage, registerUser, loginUser } = require('../controllers/user_controls.js');

// =================================


// =================================

router.get('/', homePage);
router.get('/login', loginPage);
router.get('/signup', signupPage);

router.post('/signup', registerUser);
router.post('/login', loginUser);

// =================================

module.exports = router;