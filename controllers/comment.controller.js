const User = require('../models/user.model');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const mongoose = require('mongoose');

module.exports.show = (req, res, next) => {
  console.log("AAAAAAAAAAAAAAAAAA");
  console.log("AAAAAAAAAAAAAAAAAA");
  console.log("AAAAAAAAAAAAAAAAAA");
  
  Comment.find()
    .then((comments) => {
      console.log(comments);
      res.render('comment/index', {
        postId:req.params.postId,
        comments: comments
      });
    });
};

// module.exports.create = (req, res, next) => {
//   res.render('post/new');
// };

// module.exports.doCreate = (req, res, next) => {
//   if (!req.file) {
//     res.render('post/new', {
//       error: {
//         photo: 'Photo is required'
//       }
//     });
//   } else {
//     const pic = new Post({
//       content: req.body.content,
//       pic_path: `/uploads/${req.file.filename}`,
//       pic_name: req.body.pic_name,
//       _creator: req.user._id
//     });
//     const file_name = req.file.originalname;
//     if (!pic.content || !pic.pic_path || !pic.pic_name) {
//       res.render('post/new', {
//         error: {
//           content: pic.content ? '' : 'Content is required',
//           pic_path: pic.pic_path ? '' : 'Name is required',
//           pic_name: pic.pic_name ? '' : 'Post name is required'
//         }
//       });
//     }
//     pic.save()
//       .then(() => {
//         res.redirect('/posts');
//       })
//       .catch(error => {
//         if (error instanceof mongoose.Error.ValidationError) {
//           res.render('error', {
//             message: "Error in save a post in DB",
//             error: error.errors
//           });
//         } else {
//           next(error);
//         }
//       });
//   }
// };