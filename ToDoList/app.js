//Importing Packages
//=========================//=========================
const express = require('express');
const session = require('client-sessions');
//const session = require('express-session')
const path = require ('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {requireLogin} = require ('./helpers/auth')


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
require('./models/user');
const user_model = mongoose.model('user');

//Middleware
//=========================//=========================
//Sample
// app.use((req,res,next) => {

//     next();
// })
//sessions
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 2 * 60 * 1000,
    activeDuration: 1 * 60 * 1000,
  }));

  app.use(function(req, res, next) {
    if (req.session && req.session.user) {
        
        user_model.findOne({
            email: req.session.user.email
        })
        .then(user_model=>{

            if (user_model) {
                // expose the user to the template
                req.user = user_model;
                delete req.user.password; // delete the password from the session
                req.session.user = user_model;  //refresh the session value
                res.locals.user = user_model;

                
              }

              next();

        });

        //next();
    } else {
      next();
    }
  });

//   function requireLogin (req, res, next) {
//     if (!req.user) {
//       res.redirect('users/login');
//     } else {
//       next();
//     }
//   };

//Express - Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Express Body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Routes
//=========================//=========================

//Index
app.get('/', requireLogin, (req, res) => { 
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