const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// const User = require('../models/UserModel');

const BlogSchema = mongoose.Schema({
    Title: String,
    Image: String,
    Content: String,
    // CreatedBy: {
    //     type: mongoose.Schema.Objectid,
    //     ref: User
    // },
    CreatedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', BlogSchema);