const model = require('../models')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')


router.get('/login', (req, res)=>{
    res.render('customers/login-customer.ejs', {title: 'Login Customer'})
})

router.get('/signup', (req, res)=>{
    res.render('customers/register-customer.ejs', {title: 'Customer Form'})
})

router.post('/signup', (req, res)=>{
   model.Customer.create(req.body)
   .then(customer =>{
       res.redirect('/customer/login')
   })
   .catch(( { errors } ) =>{
       res.render('customers/register-customer.ejs', {errors})
   }) 
})

module.exports = router