var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')
var Offers = require('./models/OffersSchema');
// var UsersList = require('./models/UsersSchema');
var Rides = require('./models/RidesSchema');
var database = require('./database');
var app = express();
var loginRouter = require('./routes/login');
var ridesRouter = require('./routes/rides');
var offerRideRouter = require('./routes/offerride');
var cancelRideRouter = require('./routes/cancelride');
var bookRideRouter = require('./routes/bookride');

app.use(cors())

//DB connection sttring
mongoose.connect('mongodb://localhost/Carpoolz')

//For CORS
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.disable("x-powered-by");
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization ,Accept');
  next();
});

//setting the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* app.get("/", function (req, res) {
  res.render("index")
}) */

//Login functionality
app.use('/login', loginRouter);


//Show the existing rides functionality
app.use('/show_rides', ridesRouter);


//Booking a ride
app.use('/book_ride', bookRideRouter);


//Cancel a ride
app.use('/cancel_ride', cancelRideRouter);
app.post('/cancel_ride', function (req, res) {
  
})


//Offer a ride
app.use('/offer_ride', offerRideRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("not found")
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(5000, '0.0.0.0', function () {
  console.log('Listening to port:  ' + 5000);
});


module.exports = app;