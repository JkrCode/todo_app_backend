const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  label: { type: String, required: true },
  description: { type: String, required: true },
  listId: { type: String, required: true },
  done: { type: Boolean, required: true },
  important: { type: Boolean, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;