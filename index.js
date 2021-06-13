const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  EDWARD,
  PORT,
  NODE_ENVIRONMENT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require('./config/config');

const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

const mongoAddress = 'mongodb://'
  + `${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`
  + '/?authSource=admin';

const connectWithRetry = () => {
  mongoose
    .connect(mongoAddress, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('successfully connected to DB'))
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Ensures body of a request gets attached to request object.
app.use(express.json());
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true, // httpOnly - JS cannot access the cookie
    maxAge: 3_600_000, // 1 hour
  },
}));

app.get('/api/v1', (req, res) => {
  res.send([
    '<h2>Hi There Ed</h2>',
    `<p>Secret: ${EDWARD}</p>`,
    `<p>Using port: ${PORT} inside container</p>`,
    `<p>NODE_ENVIRONMENT: ${NODE_ENVIRONMENT}.</p>`,
  ].join(''));
});

// localhost:3000/api/v1/posts
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const port = PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
