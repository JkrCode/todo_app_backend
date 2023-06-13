const express = require('express');
const list_router = express.Router();
const { randomBytes} = require('crypto');

let listOfLists = []

  list_router.get("/listOfTodos", (req,res)=>{
    res.json(listOfLists)
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