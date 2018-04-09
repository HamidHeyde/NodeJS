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
})
.then(() => console.log('... Now Connected to mongo db .... '))
.catch(err => console.log(err));

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