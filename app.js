/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

const app             = require('express')();
const bodyParser      = require('body-parser');
const port            = 3000;
const indexRoutes     = require('./routes');
const providersRoutes = require('./routes/provider');
const session         = require('express-session');


// Template Engine
app.set('view engine', 'ejs');

// Body Parser
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());

app.use(session({
   secret: "express secret key",
   resave: false,
   saveUninitialized: true
}));

// Routes
app.use('/', indexRoutes);
app.use('/provider', providersRoutes);

// -----------------------------------------------------------------------------
app.listen(port, console.log(`Listening on port ${port}`));
