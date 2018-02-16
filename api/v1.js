var express = require("express");
var router = express.Router();
var http = require("http");
var fs = require("fs");
var path = require("path");

router.get("/", function(req, res, next) {
  var file = path.join(__dirname, "../api/patinoire.raml");
  res.download(file);
});

module.exports = router;