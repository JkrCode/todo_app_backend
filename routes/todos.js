const express = require('express');
const todo_router = express.Router();
const Todo = require("../models/Todo");


// Beispiel-Endpunkt
todo_router.get('/todos', async (req, res) => {
  const todo = await Todo.find();
  res.json(todo);
});

todo_router.post("/todos", async(req, res)=>{
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.status(201).json(newTodo)
})

todo_router.delete("/todos", (req,res)=>{
  const todoId = req.params;
  todos = todos.filter(item => item.id ===todoId)
  res.sendStatus(201)
} )

module.exports = todo_router;