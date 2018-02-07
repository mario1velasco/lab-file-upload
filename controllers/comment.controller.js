const User = require('../models/user.model');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const mongoose = require('mongoose');

module.exports.show = (req, res, next) => {
  Comment.find({postId:req.params.postId})
    .then((comments) => {
      console.log(comments);
      res.render('comment/index', {
        postId:req.params.postId,
        comments: comments
      });
    });
};

module.exports.create = (req, res, next) => {
  res.render('comment/new',{
    postId:req.params.postId
  });
};

module.exports.doCreate = (req, res, next) => {
  if (!req.file) {
    res.render('comment/new', {
      postId:req.params.postId,
      error: {
        photo: 'Photo is required'
      }
    });
  } else {
    const comment = new Comment({
      content: req.body.content,
      image_path: `/uploads/${req.file.filename}`,
      image_name: req.body.image_name,
      authorId: req.user._id,
      postId: req.params.postId
    });
    const file_name = req.file.originalname;
    
    if (!comment.content || !comment.image_path || !comment.image_name) {
      res.render('comment/new', {
        postId:req.params.postId,
        error: {
          content: comment.content ? '' : 'Content is required',
          image_path: comment.image_path ? '' : 'Name is required',
          image_name: comment.image_name ? '' : 'Post name is required'
        }
      });
    }
    comment.save()
      .then(() => {
        res.redirect(`/posts/${req.params.postId}/comments`);
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