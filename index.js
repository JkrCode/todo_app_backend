const express = require('express');
const todo_router = require('./routes/todos');
const list_router = require ('./routes/listOfTodos');
const user_router = require('./routes/users')
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const bodyParser = require('body-parser');


const dbUrl = process.env.DB_URL;

//for local dev
const dbLocalUrl=process.env.DB_URL_Local;

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{console.log("connection mongo DB")})
    .catch(err => {console.log("Error"), console.log(err)});

const app = express();

//-------------------middlewhere----------------------
app.use(cors({
    origin: ["http://localhost:3000"],//connection of React App, most likely only for dev
    credentials: true

}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser("secretcode"))
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session(
    {cookie: 
        {sameSite: 'None',
        secure: false
}}
));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
require("./passportConfig")(passport);
app.use('/api', todo_router);
app.use('/api', list_router);
app.use('/api', user_router);
//---------end of Middleware ----------

//userrouter --> to move later to user route file

const port = process.env.PORT;

app.listen(port, ()=>{console.log(`listening on ${port}`)})
