require('./database/database');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const { v4: uuid } = require('uuid');
require('dotenv').config();

// =============================

const app = express();
const PORT = process.env.PORT || 3000;

// ==============================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        key: 'user_id',
        secret: `${ uuid }`,
        resave: false,
        saveUninitialized: false,
        cookie: { expires: 1000 }
    })
);

// ==============================

app.use((req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        res.redirect('/dashboard')
    }
    next();
});

const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

// ==============================

// app.get('/', (req, res) => { res.send('Welcome!') });
app.get('/', sessionChecker, (req, res) => { res.redirect('/login') });

// ==============================

app.get('/login', sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/signup', sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

// ==============================

app.listen(PORT, () => { console.log(`Server Listening at http://localhost:${PORT}`) });