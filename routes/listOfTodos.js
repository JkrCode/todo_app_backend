const express = require('express');
const list_router = express.Router();
const { randomBytes} = require('crypto');
const ListOfTodo = require("../models/listOfTodo");


  list_router.get("/listOfTodos", async (req,res)=>{
    const list = await ListOfTodo.find({})
    res.json(list)
  })

  list_router.post("/listOfTodos", (req, res)=>{
    const newListId = randomBytes(4).toString('hex');
    const newList = {
      label: req.body.label, 
      type: req.body.type,
      id: newListId
    }
    listOfLists.push(newList);
    res.send(newList)
  })

  list_router.delete("/listOfTodos", (req,res)=>{
    const listId = req.params;
    listOfLists = listOfLists.filter(item => item.id ===listId)
    res.sendStatus(200)
  } )

module.exports = list_router;