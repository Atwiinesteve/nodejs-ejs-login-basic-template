const mongoose = require('mongoose');
require('dotenv').config();
// =================================.

mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => { console.log('Connected to database...') })
    .catch(err => {
        console.log({
            message: err.message
        })
    })

// =================================.
module.export = mongoose;