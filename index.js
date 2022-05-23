const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);
const { v4: uuid } = require('uuid');
require('./database/database.js');
require('dotenv').config();

// =============================

const routes = require('./routes/route.js');
// =============================

const app = express();
const PORT = process.env.PORT || 3000;


const store = new mongoDBSession({
    uri: process.env.DATABASE,
    collection: 'sessions'
})


// ==============================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: `${ uuid }`,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: { expires: 1000 }
    })
);

// ==============================

app.set('view engine', 'ejs');
app.set('views', './views');

// ==============================

app.use('/', routes);

// ==============================

app.listen(PORT, () => { console.log(`Server Listening at http://localhost:${PORT}`) });