const User = require('../models/user.model');
const Post = require('../models/post.model');
const mongoose = require('mongoose');

module.exports.index = (req, res, next) => {
  Post.find()
    .then((posts) => {
      console.log(posts);

      res.render('post/index', {
        posts: posts
      });
    });
};

module.exports.create = (req, res, next) => {
  res.render('post/new');
};

module.exports.doCreate = (req, res, next) => {
  if (!req.file) {
    res.render('post/new', {
      error: {
        photo: 'Photo is required'
      }
    });
  } else {
    const post = new Post({
      content: req.body.content,
      pic_path: `/uploads/${req.file.filename}`,
      pic_name: req.body.pic_name,
      _creator: req.user._id
    });
    const file_name = req.file.originalname;
    if (!post.content || !post.pic_path || !post.pic_name) {
      res.render('post/new', {
        error: {
          content: post.content ? '' : 'Content is required',
          pic_path: post.pic_path ? '' : 'Name is required',
          pic_name: post.pic_name ? '' : 'Post name is required'
        }
      });
    }
    post.save()
      .then(() => {
        res.redirect('/posts');
      })
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render('error', {
            message: "Error in save a post in DB",
            error: error.errors
          });
        } else {
          next(error);
        }
      });
  }
};