const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  EDWARD,
  PORT,
  NODE_ENVIRONMENT,
} = require('./config/config');

const postRouter = require('./routes/postRoutes');

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

app.get('/', (req, res) => {
  res.send([
    '<h2>Hi There Ed</h2>',
    `<p>Secret: ${EDWARD}</p>`,
    `<p>Using port: ${PORT} inside container</p>`,
    `<p>NODE_ENVIRONMENT: ${NODE_ENVIRONMENT}.</p>`,
  ].join(''));
});

// localhost:3000/api/v1/posts
app.use('/api/v1/posts', postRouter);
const port = PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
