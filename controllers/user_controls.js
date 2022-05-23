const User = require('../models/User.js');
const session = require('express-session');

// =============================.

const loginPage = (req, res) => {
    req.session.isAuthenticated = true;
    res.render('login', { title: 'Login' });
}

const signupPage = (req, res) => {
    res.render('signup', { title: 'Register' });
}

// =============================.

module.exports = {
    loginPage,
    signupPage
}