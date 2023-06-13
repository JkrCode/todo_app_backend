const express = require('express');
const todo_router = require('./routes/todos');
const list_router = require ('./routes/listOfTodos')
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', todo_router);
app.use('/api', list_router)

app.listen(3005, ()=>{console.log("listening on 3005")})
