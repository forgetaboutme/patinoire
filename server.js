var express = require("express");
var helmet = require("helmet");
var compression = require("compression");
var bodyParser = require("body-parser");
var v1 = require("./api/v1");
var patinoires = require("./patinoire/patinoire");
var scheduler = require("./scripts/fetch-data");

var app = express();

scheduler();

app.use(helmet());
app.use(compression());

const port = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1", v1);
app.use("/api/v1/", patinoires);

// Error handling
app.get("*", function(req, res, next) {
  const err = new Error("Requested information not found");
  err.httpStatusCode = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(404).send(err);
});


app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
