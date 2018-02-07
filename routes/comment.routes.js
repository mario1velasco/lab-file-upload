const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const secure = require('../configs/passport.config');

const multer = require('multer');
// Route to upload from project base path
const upload = multer({
  dest: './public/uploads/'
});

router.get('/:id', commentController.show);
// router.get('/new', secure.isAuthenticated, commentController.create);
// router.comment('/', secure.isAuthenticated, upload.single('photo'), commentController.doCreate);
// router.comment('/:id/', secure.isAuthenticated, commentController.doUpdate);

module.exports = router;