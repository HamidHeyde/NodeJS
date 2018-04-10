const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const list_item_schema = new Schema({
    user_id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
  });

  mongoose.model('list_item',list_item_schema);