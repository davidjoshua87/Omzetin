
const app = require('express')();
const bodyParser = require('body-parser');
const port = 3000;

const indexRoutes = require('./routes');
const providersRoutes = require('./routes/provider');
const routeCustomer = require('./routes/customer')


// Template Engine
app.set('view engine', 'ejs');

// Body Parser
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());

// Routes
app.use('/', indexRoutes);
app.use('/', providersRoutes);
app.use('/customers', routeCustomer)

// -----------------------------------------------------------------------------
app.listen(port, console.log(`Listening on port ${port}`));
