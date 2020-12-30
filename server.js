require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const rfs = require('rotating-file-stream');
const path = require('path');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log'),
});

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(
  isProduction ? morgan('combined', { stream: accessLogStream }) : morgan('dev')
);

app.use(
  [
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        // connectSrc: [
        //   "'self'",
        //   'https://api.cloudinary.com',
        //   'https://www.sandbox.paypal.com',
        // ],
        frameSrc: [
          "'self'",
          'https://www.google.com',
          'https://www.sandbox.paypal.com',
        ],
        childSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://www.paypal.com'],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
          'https://cdnjs.cloudflare.com',
        ],
        fontSrc: [
          "'self'",
          'https://fonts.gstatic.com',
          'https://cdnjs.cloudflare.com',
        ],
        imgSrc: [
          "'self' blob: data:",
          'https://res.cloudinary.com',
          'https://www.paypalobjects.com',
        ],
        baseUri: ["'self'"],
      },
    })
  ]
);

// Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/contactRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/orderRouter'));
app.use('/api', require('./routes/paymentRouter'));
app.use('/api', require('./routes/productRouter'));
app.use('/api', require('./routes/mailRouter'));

// app.get('/api/config/paypal', (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// );

// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  }
);

if (isProduction) {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
