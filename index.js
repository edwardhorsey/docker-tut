const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongoIpAddress = 'mongo';
const mongoPort = '27017';
mongoose
  .connect(`mongodb://ed:password@${mongoIpAddress}:${mongoPort}/?authSource=admin`)
  .then(() => console.log("successfully connected to DB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send([
    "<h2>Hi There Ed</h2>",
    `<p>Secret: ${process.env.EDWARD}</p>`,
    `<p>Using port: ${process.env.PORT} inside container</p>`,
    `<p>NODE_ENVIRONMENT: ${process.env.NODE_ENVIRONMENT}.</p>`,
  ].join(''));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
