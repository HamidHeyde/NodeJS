const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const list_item_schema = new Schema({
    user_id:{
        type:number,
        required:true
    },
    title:{
        type:string,
        required:true
    },
    Description:{
        type:string,
        required:true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
  });