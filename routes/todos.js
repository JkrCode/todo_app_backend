const express = require('express');
const todo_router = express.Router();
const Todo = require("../models/todo");

todo_router.get('/todos', async (req, res) => {
  const todo = await Todo.find();
  res.json(todo);
});

todo_router.post("/todos", async(req, res)=>{
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.status(201).json(newTodo)
})

todo_router.delete("/todos", async (req,res)=>{
  const toDelete = await Todo.findOne(req.params.id);
  await toDelete.deleteOne();
  res.sendStatus(202)
} )

todo_router.put("/todos", async (req, res) => {
  const toUpdate = await Todo.findOne({_id: req.query.id})
  await toUpdate.updateOne(req.body)
  console.log(req.body)
  res.sendStatus(204);
})


module.exports = todo_router;