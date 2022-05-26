const express = require('express');
const User = require('../models/User.js');
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// =========================================================================
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==============================

const store = new mongoDBSession({
    uri: process.env.DATABASE,
    collection: 'sessions'
})

app.use(
    session({
        secret: `${ uuidv4() }`,
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

// ==============================

const homePage = (req, res) => {
    res.render('home', { title: 'Home' });
}

const loginPage = (req, res) => {
    res.render('login', { title: 'Login' });
}

const signupPage = (req, res) => {
    res.render('signup', { title: 'Register' });
}

const registerUser = async(req, res) => {
    const userAlreadyExists = await User.findOne({ email: req.body.email })

    if (userAlreadyExists) {

        // res.send('User Already Exists..');
        return res.render('alreadyExists', { alert: 'User Already Exists.', title: 'Already Exists' });

    } else {

        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await user.save()
            .then(() => {
                return res.redirect('/login')
            })
            .catch(err => {
                console.log({
                    message: err.message,
                    stack: err.stack
                })
            })

    }
}

const loginUser = async(req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.send('User not found')
    } else {
        req.session.user = req.body.email;
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.send('Invalid password.');
        } else {}
        res.redirect('/dashboard')
    }
}

const dashboard = (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user, title: 'Dashboard' });
    } else {
        res.render('403', { title: 'Unauthorised Access', alert: 'Unauthorised User' })
    }
}

// =============================.

module.exports = {
    homePage,
    loginPage,
    signupPage,
    registerUser,
    loginUser,
    dashboard
}