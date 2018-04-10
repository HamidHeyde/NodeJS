//Importing Packages
//=========================
const express = require ('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

//app
//=========================
const app = express();

//Some Code to get rid of some mongodb_errorsc
mongoose.Promise = global.Promise;
//Mongoose Connect
mongoose.connect('mongodb://127.0.0.1:27017/todolist-dev',{
 //useMongoClient:true
})
.then(() => console.log('... Now Connected to mongo db .... '))
.catch(err => console.log(err));

//Loading Models
require('./models/list_item.js');
const list_item_model = mongoose.model('list_item');

require('./models/user');
const user_model = mongoose.model('user');

//Middleware
//=========================
//Sample
// app.use((req,res,next) => {
    
//     next();
// })

//Express - Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
 }));
app.set('view engine', 'handlebars');

//Routes
//=========================
//Index
app.get('/', (req,res) => {
    res.render('index');
})

//Items
app.get('/items', (req,res) => {
    res.render('items');
})

//Add New Items
app.get('/items/add', (req,res) => {
    res.render('items/add');
})

//About
app.get('/about', (req,res) => {
    res.render('about');
})

//App start Settings
//=========================
const port = 5000;

app.listen(port, () => {
    console.log('... app started @ '+ port+ '...');
});