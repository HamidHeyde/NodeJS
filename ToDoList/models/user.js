const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const user_schema = new Schema({
    id:{
        type:number,
        required:true
    },
    email:{
        type:string,
        required:true
    },
    password:{
        type:string,
        required:true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
  });