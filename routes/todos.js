const express = require('express');
const todo_router = express.Router();
const Todo = require("../models/todo");
const { ensureAuthenticated } = require('../authMiddleware');

//todos: komplett alle cases testen und Kommentare umschreiben, refactoring betreiben

todo_router.get('/todos', ensureAuthenticated, async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Benutzer-ID des eingeloggten Benutzers
    const userTodos = await Todo.find({ user_id: loggedInUserId });
    res.json(userTodos);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

todo_router.post("/todos", ensureAuthenticated, async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Benutzer-ID des eingeloggten Benutzers
    const newTodo = new Todo({ ...req.body, user_id: loggedInUserId });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

todo_router.delete("/todos", ensureAuthenticated, async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Benutzer-ID des eingeloggten Benutzers
    const todoId = req.query.id; // ID des zu löschenden Todos
    // Überprüfe, ob das zu löschende Todo dem eingeloggten Benutzer gehört
    const todo = await Todo.findById(todoId).where({ user_id: loggedInUserId });
    if (!todo) {
      return res.sendStatus(404); // Wenn das Todo nicht gefunden wird oder nicht dem Benutzer gehört, sende einen 404-Statuscode
    }
    await todo.deleteOne(); // Lösche das Todo
    res.sendStatus(204); // Sende einen 204-Statuscode, um anzuzeigen, dass die Löschung erfolgreich war
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

todo_router.put("/todos", ensureAuthenticated, async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Benutzer-ID des eingeloggten Benutzers
    const todoId = req.query.id; // Todo-ID aus dem Pfad-Parameter
    const updatedTodo = req.body;
    // Überprüfe, ob das zu aktualisierende Todo dem eingeloggten Benutzer gehört
    const todo = await Todo.findOne({ _id: todoId, user_id: loggedInUserId });
    if (!todo) {
      return res.sendStatus(404); // Wenn das Todo nicht gefunden wird oder nicht dem Benutzer gehört, sende einen 404-Statuscode
    }
    await todo.updateOne(updatedTodo); // Aktualisiere das Todo
    res.sendStatus(204); // Sende einen 204-Statuscode, um anzuzeigen, dass die Aktualisierung erfolgreich war
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


module.exports = todo_router;