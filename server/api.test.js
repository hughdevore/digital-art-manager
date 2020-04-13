process.env.NODE_ENV = "test";
const app = require("./server");
const db = require('./queries');
const supertest = require("supertest");

beforeAll(async () => {
  await db.pool.query("CREATE TABLE art( id SERIAL PRIMARY KEY, name TEXT, artist TEXT, description TEXT, width INT, height INT, date DATE )");
});

beforeEach(async () => {
  const name = "Colorado Sunset in the Fall";
  const artist = "Hughie Devore";
  const description = "View from the top of Kenosha Pass in the fall at sunset.";
  const width = 1200;
  const height = 1600;
  const date = "2020-04-07";

  // seed with some data
  await db.pool.query(
    'INSERT INTO art(name, artist, description, width, height, date) VALUES ($1, $2, $3, $4, $5, $6), ($1, $2, $3, $4, $5, $6)',
    [name, artist, description, width, height, date],
  );
});

afterEach(async () => {
  await db.pool.query("DELETE FROM art");
});

afterAll(async () => {
  await db.pool.query("DROP TABLE art");
  db.end();
});

describe("GET /art ", () => {
  test("It should respond with an array of art", (done) => {
  supertest(app)
    .get("/art")
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
});


// describe("GET / ", () => {
//   test("It should respond with an array of art", async () => {
//     const response = await request(app).get("/");
//     expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe("GET /art", () => {
//   test("It should respond with an array of art objects", async () => {
//     const response = await request(app).get("/art");
//     expect(response.body.length).toBe(2);
//     expect(response.body[0]).toHaveProperty("id");
//     expect(response.body[0]).toHaveProperty("name");
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe("POST /art", () => {
//   test("It should respond with an array of art", async () => {
//     const newArt = await request(app)
//       .post("/art")
//       .send({
//         name: "New Art"
//       });
//     expect(newArt.body.name).toBe("New Art");
//     expect(newArt.body).toHaveProperty("id");
//     expect(newArt.body).toHaveProperty("name");
//     expect(newArt.statusCode).toBe(200);

//     // make sure we have 3 art
//     const response = await request(app).get("/art");
//     expect(response.body.length).toBe(3);
//   });
// });

// describe("PUT /art/1", () => {
//   test("It should respond with an array of art", async () => {
//     const newArt = await request(app)
//       .post("/art")
//       .send({
//         name: "Another one"
//       });
//     const updatedArt = await request(app)
//       .patch(`/art/${newArt.body.id}`)
//       .send({ name: "updated" });
//     expect(updatedArt.body.name).toBe("updated");
//     expect(updatedArt.body).toHaveProperty("id");
//     expect(updatedArt.body).toHaveProperty("name");
//     expect(updatedArt.statusCode).toBe(200);

//     // make sure we have 3 art
//     const response = await request(app).get("/art");
//     expect(response.body.length).toBe(3);
//   });
// });

// describe("DELETE /art/1", () => {
//   test("It should respond with an array of art", async () => {
//     const newArt = await request(app)
//       .post("/art")
//       .send({
//         name: "Another one"
//       });
//     const removedArt = await request(app).delete(
//       `/art/${newArt.body.id}`
//     );
//     expect(removedArt.body).toEqual({ message: "Deleted" });
//     expect(removedArt.statusCode).toBe(200);

//     // make sure we still have 2 art
//     const response = await request(app).get("/art");
//     expect(response.body.length).toBe(2);
//   });
// });

// describe("Test a 404", () => {
//   test("It should respond with a 404 status", async () => {
//     const response = await request(app).get("/nowhere");
//     expect(response.statusCode).toBe(404);
//   });
// });