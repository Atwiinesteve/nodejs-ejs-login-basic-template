const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const mongoDBSession = require('connect-mongodb-session')(session);
require('./database/database.js');
require('dotenv').config();

// =============================

const routes = require('./routes/route.js');

// =============================

const store = new mongoDBSession({
    uri: process.env.DATABASE,
    collection: 'mySessions'
})

// =============================

const app = express();
const PORT = process.env.PORT || 3000;

// ==============================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: `${ uuidv4()}`,
    resave: false,
    saveUninitialized: false,
    store: store,
}));


// ==============================

app.set('view engine', 'ejs');
app.set('views', './views');

// ==============================

app.use('/', routes);
app.use('/home', (req, res) => {
    req.session.isAuth = true;
    console.log(req.session.id);
    res.send('Hello, Express - Sessions Tutorial with session: ' + req.session);
});

// ==============================

app.listen(PORT, () => { console.log(`Server Listening at http://localhost:${PORT}`) });