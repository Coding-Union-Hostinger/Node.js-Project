const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const db = require('./src/config/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to DB
db.connect();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./src/routes/api'));
app.use('/admin', require('./src/routes/admin'));

// Root
app.get('/', (req, res) => {
  res.render('index', { title: 'Time-wise Results' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});