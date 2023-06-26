const express = require('express');
const todo_router = express.Router();
const Todo = require("../models/todo");
const { ensureAuthenticated } = require('../authMiddleware');

//todos: komplett alle cases testen und Kommentare umschreiben, refactoring betreiben

todo_router.get('/todos', ensureAuthenticated, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const userTodos = await Todo.find({ user_id: loggedInUserId });
    res.json(userTodos);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

todo_router.post("/todos", ensureAuthenticated, async (req, res) => {
  try {
    const loggedInUserId = req.user._id; 
    const newTodo = new Todo({ ...req.body, user_id: loggedInUserId });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    
    res.status(500).send("Internal Server Error");
    throw(err)
  }
});

todo_router.delete("/todos", ensureAuthenticated, async (req, res) => {
  try {
    const loggedInUserId = req.user._id; 
    const todoId = req.query.id; 
    const todo = await Todo.findById(todoId).where({ user_id: loggedInUserId });
    if (!todo) {
      return res.sendStatus(404); 
    }
    await todo.deleteOne(); 
    res.sendStatus(204); 
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

todo_router.put("/todos", ensureAuthenticated, async (req, res) => {
  try {
    const loggedInUserId = req.user._id; 
    const todoId = req.query.id; 
    const updatedTodo = req.body;
    const todo = await Todo.findOne({ _id: todoId, user_id: loggedInUserId });
    if (!todo) {
      return res.sendStatus(404); 
    }
    await todo.updateOne(updatedTodo); 
    res.sendStatus(204); } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


module.exports = todo_router;