/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

const router = require('express').Router();
const {
   Provider
} = require('../models');
const registerLoginMiddleware = require('../middlewares/registerLoginMiddleware.js');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware.js');


router.get('/login', registerLoginMiddleware, (req, res, next) => {
   res.render('providers/login', {
      err: "none"
   });
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
   // .catch((err) => {
   //    res.render('providers/login', {
   //       err
   //    });
   // });
});

router.get('/logout', (req, res) => {
   delete req.session.user;
   res.redirect('/');
});

router.get('/profile', authenticationMiddleware, (req, res, next) => {
   Provider
      .findById(req.session.user.id)
      .then(provider => {
         res.render('providers/profile', {
            provider
         });
      });
});

router.get('/profile/edit', (req, res) => {
   Provider
      .findById(req.session.user.id)
      .then(provider => {
         res.render('providers/edit', {
            provider
         });
      });
});

router.get('/profile/edit', (req, res) => {
   Provider
      .update(req.session.user)
      .then(provider => {
         res.render('providers/edit', {
            provider
         });
      });
});

router.post('/profile/edit', (req, res) => {
   let id = req.session.user.id;
   Provider
      .update({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         service: req.body.service,
         price: req.body.price
      }, {
         where: {
            id: id
         },
         individualHooks: true
      })
      .then(result => {
         //    req.session.user = result;
         res.redirect('/provider/profile');
      })
      .catch(err => {
         console.log(err);
      });
});
router.get('/profile/delete/', (req, res) => {
   Provider
      .destroy({
         where: {
            id: req.session.user.id
         }
      })
      .then(function(success) {
         delete req.session.user;
         res.redirect('/');
      });
});


module.exports = router;
