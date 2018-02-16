var express = require("express");
var router = express.Router();
var http = require("http");
var fs = require("fs");
var path = require("path");

// to parse XML
var xml2js = require("xml2js");
var parser = new xml2js.Parser({ explicitArray: false });

router.get("/patinoires", function(req, res, next) {
  let condition = req.query.condition;
  let ouvert = req.query.ouvert;
  let arrondissement = req.query.arrondissement;

  fs.readFile(path.join(__dirname, "../data/patinoire.xml"), function(
    err,
    data
  ) {
    if (err) {
      const err = new Error("Could not find the rinks data file on the server");
      err.httpStatusCode = 500;
      return next(err);
    }
    parser.parseString(data, function(err, result) {
      if (err) {
        const err = new Error("Could not parse the rinks data");
        err.httpStatusCode = 500;
        return next(err);
      }
      res.setHeader("Content-Type", "application/json");
      var result = result.patinoires.patinoire;

      if (condition) {
        result = result.filter(rink => rink.condition.includes(condition));
      }

      if (ouvert) {
        result = result.filter(rink => rink.ouvert.includes(ouvert));
      }

      if (arrondissement) {
        result = result.filter(rink => rink.arrondissement.nom_arr.includes(arrondissement));
      }

      res.send(JSON.stringify(result));
    });
  });
});

module.exports = router;
