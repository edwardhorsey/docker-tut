const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, EDWARD, PORT, NODE_ENVIRONMENT } = require("./config/config");

const app = express();

const mongoAddress = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose
  .connect(mongoAddress)
  .then(() => console.log("successfully connected to DB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send([
    "<h2>Hi There Ed</h2>",
    `<p>Secret: ${EDWARD}</p>`,
    `<p>Using port: ${PORT} inside container</p>`,
    `<p>NODE_ENVIRONMENT: ${NODE_ENVIRONMENT}.</p>`,
  ].join(''));
});

const port = PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
