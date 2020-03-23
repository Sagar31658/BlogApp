const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Blog = require('../models/BlogModel');

const UserSchema = mongoose.Schema({
    Email: {
        type: String,
        unique: true
    },
    Password: {
        type: String
    }
    // Blogs: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: Blog
    // }]
});

module.exports = mongoose.model('User', UserSchema);