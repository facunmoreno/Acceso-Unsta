const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/Acceso-Unsta', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => console.log(`Connected to MongoDB...`));
};