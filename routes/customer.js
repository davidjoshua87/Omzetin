const model = require('../models')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const registerLoginMiddleware = require('../middlewares/registerLoginMiddleware.js');


router.get('/login', registerLoginMiddleware, (req, res, next)=>{
    res.render('customers/login-customer.ejs', {err: 'none'})
})

router.get('/signup', registerLoginMiddleware, (req, res, next)=>{
    res.render('customers/register-customer.ejs', {title: 'Customer Form'})
})

router.post('/signup', registerLoginMiddleware, (req, res, next)=>{
   model.Customer.create(req.body)
   .then(customer =>{
       res.redirect('/customer/login')
   })
   .catch(( { errors } ) =>{
       res.render('customers/register-customer.ejs', {errors})
   }) 
})

router.post('/login', registerLoginMiddleware, (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    model.Customer.findEmailLogin(email)
       .then(user => {
          if (user.loginCheck(password)) {
             req.session.user = user;
             res.redirect('/customer/profile');
          } else {
             res.render('customers/login-customer.ejs', {
                err: 'wrong email/password'
             });
          }
       });
 });
 
 router.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
 });
 
 router.get('/profile', (req, res, next) => {
    res.render('customers/profile');
 });
 

module.exports = router