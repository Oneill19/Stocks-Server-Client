// dotenv variables
require('dotenv').config();

// imports
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const errorHandler = require('./controllers/error.controller').errorHandle;

// middlewares
const signIn = require('./routes/sign-in.router');
const signOut = require('./routes/sign-out.router');
const register = require('./routes/register.router');
const contactUs = require('./routes/contact-us.router');
const dashboard = require('./routes/dashboard.router');
const cat = require('./routes/cat.router');
const error = require('./routes/error.router');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stocks';
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
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to db'));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// parse data to json
app.use(express.json());

// make the assets files static
app.use('/views', express.static(__dirname + '/views'));

// ping request to check if site is up
app.get('/ping', (req, res) => { res.send('PONG') });

// sign-in middlewares
app.use('/sign-in', signIn);

// sign-out middlewares
app.use('/sign-out', signOut);

// register middleware
app.use('/register', register);

// register middleware
app.use('/contact-us', contactUs);

// dashboard middleware
app.use('/dashboard', dashboard);

// cat middlewares
app.use('/cat', cat);

// error middlewares
app.use('/error', error);

// on start go to sign-in page
app.get('/', (req, res) => res.redirect('/sign-in'));

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
