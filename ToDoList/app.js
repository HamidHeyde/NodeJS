//=========================
//Importing Packages
//=========================
const express = require ('express');

const app = express();

//=========================
//Middleware
//=========================
app.use((req,res,next) => {
    
    next();
})
//=========================
//Routes
//=========================
//Index
app.get('/', (req,res) => {
    res.send(`index page`);
})

//About
app.get('/about', (req,res) => {
    console.log(req.name);
    res.send(`about page`);
})

//=========================
//App start Settings
//=========================
const port = 5000;

app.listen(port, () => {
    console.log(`app started @ ${port}`);
});