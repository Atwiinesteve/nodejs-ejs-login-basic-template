const express = require('express');
const session = require('express-session');

// =================================

const router = express.Router();

// =================================

const { loginPage, signupPage } = require('../controllers/user_controls.js');

// =================================


// =================================

router.get('/', loginPage);
router.post('/login', loginPage);
router.post('/signup', signupPage);

// =================================

module.exports = router;