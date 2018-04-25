const model = require('../models')
const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('customer page')    
})

module.exports = router