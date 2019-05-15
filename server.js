// Established the sever
const express = require('express');
const app = express();
require('dotenv').config();

// requires the ORM to the applicaiton
const mongoose = require('mongoose');

// sets the PORT
const PORT = process.env.PORT || 3001;

//models
const Product = require('./models/Product.js')

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Requires the routes and hands them off to express
require('./routes/api-routes.js')(app);

// Established the connection to the remote-db or the local mongo-db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/weather_gear', {
  useNewUrlParser: true
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});