require('dotenv/config');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const zlib = require('zlib');
const router = require('./router');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression({ level: zlib.constants.Z_BEST_COMPRESSION }));
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

app.listen(PORT, () => console.log(`API running on /${PORT}/api/v1 \nApp running on /${PORT}`));
