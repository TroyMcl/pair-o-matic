const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/students', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', () => console.error('error connecting to mongodb'));
db.once('open', () => console.log('connected to mongodb'));

module.exports.db = db;