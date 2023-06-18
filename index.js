const express = require('express');
const todo_router = require('./routes/todos');
const list_router = require ('./routes/listOfTodos')
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;

//for local dev
const dbLocalUrl=process.env.DB_URL_Local;

mongoose.connect(dbUrl, {useNewUrlParser: true})
    .then(()=>{console.log("connection Open to local DB")})
    .catch(err => {console.log("Error"), console.log(err)});

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', todo_router);
app.use('/api', list_router)

const port = process.env.PORT;

app.listen(port, ()=>{console.log(`listening on ${port}`)})
