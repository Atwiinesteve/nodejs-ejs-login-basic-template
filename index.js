const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
require('./database/database.js');
require('dotenv').config();

// =============================

const routes = require('./routes/route.js');


// =============================

const app = express();
const PORT = process.env.PORT || 3000;

// ==============================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// ==============================

app.set('view engine', 'ejs');
app.set('views', './views');

// ==============================

app.use('/', routes);
app.use('/home', (req, res) => {
    res.send('Hello, Express');
});

// ==============================

app.listen(PORT, () => { console.log(`Server Listening at http://localhost:${PORT}`) });