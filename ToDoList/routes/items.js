const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//==============================

//Loading Models
require('../models/list_item.js');
const list_item_model = mongoose.model('list_item');

//Items
router.get('/', (req, res) => {
    list_item_model.find({})
    .sort({date:'desc'})
    .then(list_items => {
        res.render('items', {
            list_items:list_items
        });
    });
    
})



router.post('/', (req, res) => {
    const referal = req.body.referal;
    //console.log(referal);
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


router.get('/delete/:id', (req, res) => {
    
    if (req.params.id)
    {
        list_item_model.remove({
            _id:req.params.id
        })
        .then(() => {
            res.redirect('/items');
        })
        .catch(err => console.log(err));
    }
    else
    {
        res.redirect('/items');
    }
    
})


router.get('/edit/:id', (req,res) => {
    
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
router.get('/add', (req, res) => {
    res.render('items/add');
})

//==============================
module.exports = router;