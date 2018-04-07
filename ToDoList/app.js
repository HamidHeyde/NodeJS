//=========================
//Importing Packages
//=========================
const express = require ('express');
const exphbs  = require('express-handlebars');

const app = express();

//=========================
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
//=========================
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

//=========================
//App start Settings
//=========================
const port = 5000;

app.listen(port, () => {
    console.log('app started @ '+ port);
});