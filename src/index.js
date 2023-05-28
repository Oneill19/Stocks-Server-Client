// dotenv variables
require('dotenv').config();

// imports
const express = require('express');
const mongoose = require('mongoose');
const cat = require('./routes/cat.router');
const errorHandler = require('./controllers/error.controller').errorHandle;

const app = express();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/stocks';
const NODE_ENV = process.env.NODE_ENV || false;

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to db'));

// parse data to json
app.use(express.json());

// make the assets files static
app.use('/views', express.static(__dirname + '/views'));

// ping request to check if site is up
app.get('/ping', (req, res) => { res.send('PONG') });

// cat middlewares
app.use('/cat', cat);

// default page
app.get('*', (req, res) => res.redirect('/cat'));

// error handler
app.use(errorHandler);

app.listen(PORT, () => { 
  console.log(`App running on port: ${PORT}`);
  if (!NODE_ENV) {
    console.log(`local: http://localhost:${PORT}`);
  }
});
