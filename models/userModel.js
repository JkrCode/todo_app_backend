const mongoose = require('mongoose');


const User_Schema = new mongoose.Schema({
    
        username: {type: String, required: true}, 
        password: {type: String, required: true},
        
      } 
)

const User=mongoose.model("user", User_Schema);

module.exports = User;