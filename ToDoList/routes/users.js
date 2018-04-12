const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {requireLogin} = require ('../helpers/auth')
//==============================

//Loading models
require('../models/user');
const user_model = mongoose.model('user');

//logout
router.get('/logout', (req, res) => {
    req.session.reset();
    res.redirect('/users/login');
})

//Login
router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post ('/login', (req,res) =>{
    let errors = [];
    user_model.findOne({
        email:req.body.email
    })
    .then(user_model=>{
        if(!user_model)
        {
            console.log("No User Model");
            errors.push({text:"Email / Password Do Not Match!"});
        }
        else if (req.body.password != user_model.password)
        {
            console.log("No pass");
            errors.push({text:"Email / Password Do Not Match!"});
        }

        if (errors.length>0)
        {
            res.render('users/login',{
                errors:errors,
            });
        }
        else
        {
            req.session.user = user_model;
            res.redirect('/items');
            //res.send('Passed');
        }
        
    });
})

//Register
router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post ('/register', (req,res) =>{
    
    let errors = [];

    if (req.body.password != req.body.password2)
    {
        errors.push({text:"passwords do not match"});
    }
    if (req.body.password.length < 4)
    {
        errors.push({text:"password length can not be less than 4 characters"});
    }
    //console.log(req.body.email);

    user_model.findOne({
        email:req.body.email
    })
    .then(user_model => {
        if (user_model)
        {
            //console.log('match found');
            errors.push({text:"The user already Exist"});
        }

        //console.log(errors.length);
    });
    

    //console.log(errors.length);
    if (errors.length>0)
    {
        res.render('users/register',{
            errors:errors,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            password2:req.body.password
        });
    }
    else
    {
        const new_item ={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
        new user_model (new_item)
        .save()
        .then(
            res.redirect('/users/login')
        )
        .catch(err => console.log(err));
    }
})

//==============================
module.exports = router;