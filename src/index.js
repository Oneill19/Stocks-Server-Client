// dotenv variables
require('dotenv').config();

// imports
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const errorHandler = require('./controllers/error.controller').errorHandle;

// middlewares
const cat = require('./routes/cat.router');
const signIn = require('./routes/sign-in.router');
const error = require('./routes/error.router');

const app = express();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/stocks';
const NODE_ENV = process.env.NODE_ENV || 'production';

// website hot reload on local
if (NODE_ENV === 'dev') {
  const livereload = require('livereload');
  const connectLivereload = require('connect-livereload');

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, 'views'));

  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 50);
  });

  app.use(connectLivereload());
}

// database connection
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

// sign-in middlewares
app.use('/sign-in', signIn);

// error middlewares
app.use('/error', error);

// cat middlewares
app.use('/cat', cat);

app.use('/', (req, res) => res.redirect('/sign-in'));

// default page
app.get('*', (req, res) => res.redirect('/error'));

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
  if (NODE_ENV === 'dev') {
    console.log(`\n**********************************\n** local: http://localhost:${PORT} **\n**********************************\n`);
  }
});
