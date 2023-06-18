const express = require('express');
const list_router = express.Router();
const ListOfTodo = require("../models/listOfTodo");
const Todo = require("../models/todo");


  list_router.get("/listOfTodos", async (req,res)=>{
    const list = await ListOfTodo.find({})
    res.json(list)
  })

  list_router.post("/listOfTodos", async (req, res)=>{
    const newList = new ListOfTodo(req.body)
    await newList.save();
    res.status(201).json(newList);
  })

  list_router.delete("/listOfTodos", async (req,res)=>{
    await ListOfTodo.findOneAndDelete({_id: req.query.id});
    await Todo.deleteMany({listId: req.query.id});
    res.sendStatus(202)
  } )


module.exports = list_router;