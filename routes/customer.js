/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

const model = require('../models');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


router.get('/login/customer', (req, res)=>{
    res.render('customers/login-customer.ejs', {title: 'Login Customer'});
});

router.get('/signup/customer', (req, res)=>{
    res.render('customers/register-customer.ejs', {title: 'Customer Form'});
});

router.post('/signup/customer', (req, res)=>{
   model.Customer.create(req.body)
   .then(customer =>{
       res.redirect('/login/customer');
   })
   .catch(( { errors } ) =>{
       res.render('customers/register-customer.ejs', {errors});
   });
});

module.exports = router
