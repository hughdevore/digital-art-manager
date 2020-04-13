const app = require("./server");
const supertest = require("supertest");

test("GET /", (done) => {
  supertest(app)
    .get("/")
    .expect(
      200,
      JSON.stringify({
        data: {
          message: "Welcome to the API!",
          routes: {
            getArt: "GET request to /art",
            createArt: "POST request to /art",
            updateArt: "PUT request to /art",
            deleteArt: "DELETE request to /art",
          },
        },
      })
    )
    .end(done);
});
