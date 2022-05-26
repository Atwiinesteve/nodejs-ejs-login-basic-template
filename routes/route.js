const express = require('express');


// =================================

const router = express.Router();

// =================================

const { homePage, loginPage, signupPage, registerUser, loginUser, dashboard, auth } = require('../controllers/user_controls.js');

// =================================


// =================================

router.get('/', homePage);
router.get('/login', loginPage);
router.get('/signup', signupPage);
router.get('/dashboard', auth, dashboard);

router.post('/signup', registerUser);
router.post('/login', loginUser);

// =================================

module.exports = router;