//Importing Packages
//=========================//=========================
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')


//app
//=========================//=========================
const app = express();

//Some Code to get rid of some mongodb_errorsc
mongoose.Promise = global.Promise;
//Mongoose Connect
mongoose.connect('mongodb://127.0.0.1:27017/todolist-dev', {
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

//Items
app.get('/items', (req, res) => {
    list_item_model.find({})
    .sort({date:'desc'})
    .then(list_items => {
        res.render('items', {
            list_items:list_items
        });
    });
    
})



app.post('/items', (req, res) => {
    const referal = req.body.referal;
    console.log(referal);
    let errors = [];
    if (!req.body.title) {
        errors.push({ text: "Please Add a Title" });
    }
    if (!req.body.description) {
        errors.push({ text: "Please Add a description" });
    }
    if (errors.length>0)
    {
        res.render('items/' + referal,{
            errors:errors,
            title:req.body.title,
            description:req.body.description
        });
    }
    else if (referal == 'add')
    {
        const new_item ={
            user_id:1,
            title:req.body.title,
            Description:req.body.description
        }
        new list_item_model (new_item)
        .save()
        .then(
            res.redirect('/items')
        )
        .catch(err => console.log(err));
    }
    else if (referal == 'edit')
    {
        list_item_model.findOne({
            _id:req.body.id
        })
        .then(list_item_model => {
            //console.log(req.body);
            //console.log(list_item_model);
            list_item_model.title = req.body.title;
            list_item_model.Description = req.body.description;

            list_item_model.save()
            .then(list_item_model => {
                res.redirect('/items')
            })
            .catch(err => console.log(err));

        });
    }
    
})

app.get('/items/edit/:id', (req,res) => {
    list_item_model.findOne({
        _id:req.params.id
    })
    .then(list_item_model => {
        res.render('items/edit',{
            id: list_item_model._id,
            title:list_item_model.title,
            description:list_item_model.Description
        });
    });
});
//Add New Items
app.get('/items/add', (req, res) => {
    res.render('items/add');
})

//About
app.get('/about', (req, res) => {
    res.render('about');
})

//App start Settings
//=========================//=========================
const port = 5000;

app.listen(port, () => {
    console.log('... app started @ ' + port + '...');
});