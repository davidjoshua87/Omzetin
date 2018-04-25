/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

const router = require('express').Router();
const {
   Provider
} = require('../models');

router.get('/login/provider', (req, res) => {
   res.render('providers/login');
});

router.get('/signup/provider', (req, res) => {
   res.render('providers/signup');
});

router.post('/signup/provider', (req, res) => {
   Provider
      .create(req.body)
      .then(result => {
         res.redirect('/login/provider');
      })
      .catch((err) => {
         res.render('providers/signup', {
            err
         });

      });
});


//
// router.post('/login', (req, res) => {
//    res.render('providers/login');
// });

module.exports = router;
