//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../server");
let should = chai.should();

describe("Server", () => {
  // Test the /GET route
  describe("/GET *", () => {
    it("should return a 404 error", done => {
      chai
        .request(app)
        .get("/test")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
