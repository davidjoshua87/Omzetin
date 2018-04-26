/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

const router = require('express').Router();
const {
   Provider
} = require('../models');
const registerLoginMiddleware = require('../middlewares/registerLoginMiddleware.js');


router.get('/login', registerLoginMiddleware, (req, res, next) => {
   res.render('providers/login', {err:'none'});
});

router.get('/signup', registerLoginMiddleware, (req, res, next) => {
   res.render('providers/signup');
});

router.post('/signup', registerLoginMiddleware, (req, res, next) => {
   Provider
      .create(req.body)
      .then(result => {
         res.redirect('/provider/login');
      })
      .catch((err) => {
         res.render('providers/signup', {
            err
         });

      });
});

router.post('/login', registerLoginMiddleware, (req, res, next) => {
   let email = req.body.email;
   let password = req.body.password;
   Provider
      .findEmailLogin(email)
      .then(user => {
         if (user.loginCheck(password)) {
            req.session.user = user;
            res.redirect('/provider/profile');
         } else {
            res.render('providers/login', {
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
   res.render('providers/profile');
});

module.exports = router;
