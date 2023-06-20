const express = require('express');
const list_router = express.Router();
const ListOfTodo = require("../models/listOfTodo");
const Todo = require("../models/todo");
const { ensureAuthenticated } = require('../authMiddleware');



  list_router.get("/listOfTodos", ensureAuthenticated, async (req,res)=>{
    try {
      const loggedInUserId = req.user._id; // Benutzer-ID des eingeloggten Benutzers
      const userTodos = await ListOfTodo.find({ user_id: loggedInUserId });
      res.send(userTodos);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  })

  list_router.post("/listOfTodos", async (req, res)=>{
    try {
      const loggedInUserId = req.user._id; // Benutzer-ID des eingeloggten Benutzers
      const newListOfTodo = new ListOfTodo({
        user_id: loggedInUserId,
        label: req.body.label,
        type: req.body.type
      });
      await newListOfTodo.save();
      res.sendStatus(201);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  })

  list_router.delete("/listOfTodos", ensureAuthenticated, async (req, res) => {
    try {
      const loggedInUserId = req.user._id; // Benutzer-ID des eingeloggten Benutzers
      const listId = req.query.id; // ID der zu löschenden Liste
  
      // Finde die Liste und überprüfe, ob sie dem eingeloggten Benutzer zugeordnet ist
      const list = await ListOfTodo.findOne({ _id: listId, user_id: loggedInUserId });
  
      if (list) {
        // Lösche die Liste und die dazugehörigen Todos
        await list.deleteOne({listId});
        await Todo.deleteMany({ listId: listId });
  
        res.sendStatus(202);
      } else {
        res.status(403).send("Forbidden"); // Wenn die Liste nicht dem eingeloggten Benutzer gehört
      }
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  });


module.exports = list_router;