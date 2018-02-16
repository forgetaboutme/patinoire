var http = require("http");
var fs = require("fs");
var path = require("path");

// cron-style scheduling
var schedule = require("node-schedule");
var URL =
  "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_PATINOIRE.xml";

var scheduler = function() {
  schedule.scheduleJob("03 * * * *", function() {
    try {
      http.get(URL, function(res) {
        console.log("read file");
        if (
          res.pipe(
            fs.createWriteStream(path.join(__dirname, "../data/patinoire.xml"))
          )
        );
      });
    } catch (e) {
      console.log("Could not fetch latest data!");
    }
  });
};

module.exports = scheduler;
