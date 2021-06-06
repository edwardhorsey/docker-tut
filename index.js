const express = require("express");

const app = express();

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
