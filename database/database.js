const mongoose = require('mongoose');
require('dotenv').config();

// =================================.

mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
    }).then(() => { console.log('Connected to database...') })
    .catch(err => {
        console.log({
            message: err.message
        })
    })

// =================================.
module.exports = mongoose;