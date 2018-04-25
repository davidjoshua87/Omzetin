const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine','ejs')

const routeCustomer = require('./routes/customer')
app.use('/customers', routeCustomer)

app.listen(3000, console.log('listening on port 3000'))