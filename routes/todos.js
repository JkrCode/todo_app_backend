const express = require('express');
const todo_router = express.Router();
const { randomBytes} = require('crypto');


let todos= []

// Beispiel-Endpunkt
todo_router.get('/todos', (req, res) => {
  res.json(todos);
  console.log(res.json)
});

todo_router.post("/todos", (req, res)=>{
  const newTodoId = randomBytes(4).toString('hex');
  const newTodo = {
    label: req.body.label, 
    description: req.body.description,
    id: newTodoId,
    listId: req.body.listId
  }
  todos.push(newTodo);
  res.status(201).json(newTodo)
})

todo_router.delete("/todos", (req,res)=>{
  const todoId = req.params;
  todos = todos.filter(item => item.id ===todoId)
  res.sendStatus(201)
} )

module.exports = todo_router;