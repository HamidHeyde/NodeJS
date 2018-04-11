//Importing Packages
//=========================//=========================
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')


//app
//=========================//=========================
const app = express();

//Defining Routes
const items = require('./routes/items');
const users = require('./routes/users');

//Some Code to get rid of some mongodb_errorsc
mongoose.Promise = global.Promise;
//Mongoose Connect
mongoose.connect('mongodb://127.0.0.1:27017/todolist-dev', {
    //useMongoClient:true
})
    .then(() => console.log('... Now Connected to mongo db .... '))
    .catch(err => console.log(err));

//Loading Models
//===========

//Middleware
//=========================//=========================
//Sample
// app.use((req,res,next) => {

//     next();
// })

//Express - Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Express Body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
//=========================//=========================

//Index
app.get('/', (req, res) => {
    res.render('index');
})

//About
app.get('/about', (req, res) => {
    res.render('about');
})

//handling routes
app.use('/items', items);
app.use('/users', users);
//App start Settings
//=========================//=========================
const port = 5000;

app.listen(port, () => {
    console.log('... app started @ ' + port + '...');
});