const Blog = require('../models/BlogModel');

exports.getAllBlogs = (req, res) => {
    Blog.find({}).then(blogs => {
        res.render('home.ejs', {
            blogs: blogs
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.getBlogPage = (req, res) => {
    res.render('createBlog.ejs');
}

exports.postBlog = (req, res) => {
    let blog = new Blog({
        Title: req.body.title,
        Image: req.body.image,
        Content: req.body.content,
    }).save().then(blog => {
        console.log('blog created!');
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
}

exports.getEditPage = (req, res) => {
    Blog.findById(req.params.blogId).then(blog => {
        res.render('editBlog.ejs', {
            id: req.params.blogId,
            title: blog.Title,
            image: blog.Image,
            content: blog.Content
        })
    }).catch(err => {
        console.log(err);
    });
}

exports.postEdit = (req, res) => {
    console.log('hey');
    const blogId = req.params.blogId;
    Blog.findByIdAndUpdate(
        blogId, {
            Title: req.body.title,
            Image: req.body.image,
            Content: req.body.content
        }, {
            new: true
        }).then(blog => {
        console.log('blog updated!');
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
}

exports.deleteBlog = (req, res) => {
    Blog.findByIdAndDelete(req.params.blogId).then(blog => {
        console.log('blog deleted!');
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
}