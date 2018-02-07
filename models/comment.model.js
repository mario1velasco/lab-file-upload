const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Comment need a content']
  },  
  image_path: {
    type: String,
    required: [true, 'Comment need a path']
  }, 
  image_name: {
    type: String,
    required: [true, 'Comment need a image_name']
  }, 
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `Couldnt match the comment with the user`]
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;