const router       = require('express').Router();
const { Provider } = require('../models');


router.get('/provider', (req, res) => {
   res.send('===== Masuk woi');
});





module.exports = router;
