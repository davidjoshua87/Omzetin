/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/
const model = require('../models');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const op = sequelize.Op;
const registerLoginMiddleware = require('../middlewares/registerLoginMiddleware.js');


router.get('/login', registerLoginMiddleware, (req, res, next)=>{
    res.render('customers/login-customer.ejs', {err: 'none'});
});

router.get('/signup', registerLoginMiddleware, (req, res, next)=>{
    res.render('customers/register-customer.ejs', {title: 'Customer Form'});
});

router.post('/signup', registerLoginMiddleware, (req, res, next)=>{
   model.Customer.create(req.body)
   .then(customer =>{
       res.redirect('/customer/login');
   })
   .catch(( { errors } ) =>{
       res.render('customers/register-customer.ejs', {errors});
   });
});

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
    model.Customer.findById(req.session.user.id)
    .then(customer =>{
        res.render('customers/profile', {customer});
    })
    .catch(err =>{
        console.log(err);
    });
});

router.get('/profile/edit', (req, res)=>{
    model.Customer.findById(req.session.user.id)
    .then(customer=>{
        res.render('customers/edit-customer.ejs', {customer});
    })
    .catch(err=>{
        console.log(err);
    });
});

router.post('/profile/edit', (req, res)=>{
    let id = req.session.user.id;
    model.Customer.update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },{
        where: {id: id},
        individualHooks: true
    })
    .then(result=>{
        res.redirect('/customer/profile');
    })
    .catch(err=>{
        console.log(err);
    });
});

router.get('/profile/delete', (req, res)=>{
    model.Customer.destroy({where: {id: req.session.user.id}})
    .then(result=>{
        delete req.session.user;
        res.redirect('/');
    })
    .catch(err=>{
        console.log(err);
    });
});

router.get('/service', (req, res)=>{
    model.Provider.findAll()
    .then(providers => {
        res.render('customers/service.ejs',{providers});
    });
});

router.post('/service', (req,res) => {
    let keys = req.body.search_type;
    let search = req.body.search;
    model.Provider.findAll({
        where:{
            [keys]:{
                [op.iLike]: '%'+search+'%'
            }
        }
    })
    .then((providers) => {
        res.render('customers/service.ejs',{providers});
    });

});

module.exports = router;
