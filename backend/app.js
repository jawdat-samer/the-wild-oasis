const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const globalErrorController = require('./controllers/errorController');
const AppError = require('./utils/appError');

const cabinRouter = require('./routes/cabinRoutes');
const settingRouter = require('./routes/settingRoutes');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.options('/{*path}', cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limitter = rateLimit({
  limit: 1000,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from this IP!',
  legacyHeaders: false,
});

app.use(limitter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: false }));
app.use(cookieParser());

app.use(hpp());

app.use('/api/v1/cabins', cabinRouter);
app.use('/api/v1/settings', settingRouter);

app.all('/{*path}', (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

module.exports = app;
