const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const secure = require('../configs/passport.config');

const multer = require('multer');
// Route to upload from project base path
const upload = multer({
  dest: './public/uploads/'
});

router.get('/:postId/comments', commentController.show);
router.get('/:postId/comments/new', secure.isAuthenticated, commentController.create);
router.post('/:postId/comments', secure.isAuthenticated, upload.single('photo'), commentController.doCreate);
// router.comment('/:id/', secure.isAuthenticated, commentController.doUpdate);

module.exports = router;