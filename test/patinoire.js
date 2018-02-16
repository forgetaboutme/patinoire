//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../server");
let sinon = require("sinon");
let should = chai.should();

var fs = require("fs");

chai.use(chaiHttp);

describe("Patinoire", () => {
  describe("/GET", () => {
    it("should get the patinoire info", done => {
      chai
        .request(app)
        .get("/api/patinoires")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    // it("should throw an error if FS fails", done => {
    //   mock({
    //    'data' : {
    //     'patinoire.xml' : 'test'
    //   }
    // });
    //   chai
    //   .request(app)
    //   .get("/api/patinoires")
    //   .end((err, res) => {
    //     res.should.have.status(500);
    //     done();
    //   });
    //   mock.restore();
    // });

    // TODO: test if it cannot parse XML
    // it("should throw an error if it cannot parse XML", () => {
    //   mock({
    //     'ptjs/data': {
    //       'patinoire.xml': 'mock xml'
    //     }
    //   });
    //   chai
    //     .request(app)
    //     .get("/api/patinoires")
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       done();
    //     });
    //   mock.restore();
    // });
  });
});
