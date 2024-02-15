const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'done'],
    default: 'to-do',
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
