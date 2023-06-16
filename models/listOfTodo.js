const mongoose = require('mongoose');


const listOfTodosSchema = new mongoose.Schema({
    
        label: {type: String, required: true}, 
        type: {type: String, required: true},
        
      } 
)

const ListOfTodo=mongoose.model("listOfTodo", listOfTodosSchema);

module.exports = ListOfTodo;