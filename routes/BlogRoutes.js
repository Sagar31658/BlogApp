const express = require('express');
const router = express.Router();

const isAuth = require('../isAuth/auth');

const BlogController = require('../controllers/BlogController.js');
// const UserController = require('../controllers/UserController.js');

router.get('/', isAuth, BlogController.getAllBlogs);

router.get('/create', isAuth, BlogController.getBlogPage);

router.post('/create', isAuth, BlogController.postBlog);

router.get('/edit/:blogId', isAuth, BlogController.getEditPage);

router.post('/edit/:blogId', isAuth, BlogController.postEdit);

router.get('/delete/:blogId', isAuth, BlogController.deleteBlog);

module.exports = router;