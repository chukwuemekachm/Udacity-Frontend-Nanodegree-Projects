const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./router');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/v1/', router);
app.use('/', express.static(path.join(process.cwd(), 'public')));

// Error Handler
app.use((error, req, resp, next) => {
  return resp.status(500).json({
    message: 'Internal Server error',
  });
});

module.exports = app;
