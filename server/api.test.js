process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const {Pool} = require('pg');
const app = require('./server');

const pool = new Pool({
  user: 'user',
  host: 'postgres',
  database: 'db_test',
  password: 'pass',
  port: 5432
});

beforeAll(async () => {
  await pool.query(
    'CREATE TABLE art( id SERIAL PRIMARY KEY, name TEXT, artist TEXT, description TEXT, width INT, height INT, date DATE )'
  );
});

beforeEach(async () => {
  const name = "The Sea Triumph of Charles II";
  const artist = "Antonio Verrio";
  const description = "This was the first work painted for Charles II by Antonio Verrio, and is believed to have been a trial piece, allowing the artist to demonstrate his talents to his potential royal patron. By this date, c.1674, Verrio had already produced decorative schemes for a number of figures at court, including the Earl of Arlington at both Euston Hall in Suffolk and Arlington House in St James's Park. It was at Arlington House – the site of Buckingham Palace today, that the artist was first introduced to his future royal patron, who 'came in his walks round the Park to see the Workes Verrio was doing there'.";
  const width = 565;
  const height = 500;
  const date = '2020-04-14T00:00:00.000Z';

  // Seed with some data
  await pool.query(
    'INSERT INTO art(name, artist, description, width, height, date) VALUES ($1, $2, $3, $4, $5, $6), ($1, $2, $3, $4, $5, $6)',
    [name, artist, description, width, height, date]
  );
});

afterEach(async () => {
  await pool.query('DELETE FROM art');
});

afterAll(async () => {
  await pool.query('DROP TABLE art');
  pool.end();
});

describe('GET /art ', () => {
  test('It should respond with an array of art', done => {
    supertest(app)
      .get('/art')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual([
          {
            id: 2,
            name: "The Sea Triumph of Charles II",
            artist: "Antonio Verrio",
            description:
              "This was the first work painted for Charles II by Antonio Verrio, and is believed to have been a trial piece, allowing the artist to demonstrate his talents to his potential royal patron. By this date, c.1674, Verrio had already produced decorative schemes for a number of figures at court, including the Earl of Arlington at both Euston Hall in Suffolk and Arlington House in St James's Park. It was at Arlington House – the site of Buckingham Palace today, that the artist was first introduced to his future royal patron, who 'came in his walks round the Park to see the Workes Verrio was doing there'.",
            width: 565,
            height: 500,
            date: "2020-04-14T00:00:00.000Z",
          },
          {
            id: 1,
            name: "The Sea Triumph of Charles II",
            artist: "Antonio Verrio",
            description:
              "This was the first work painted for Charles II by Antonio Verrio, and is believed to have been a trial piece, allowing the artist to demonstrate his talents to his potential royal patron. By this date, c.1674, Verrio had already produced decorative schemes for a number of figures at court, including the Earl of Arlington at both Euston Hall in Suffolk and Arlington House in St James's Park. It was at Arlington House – the site of Buckingham Palace today, that the artist was first introduced to his future royal patron, who 'came in his walks round the Park to see the Workes Verrio was doing there'.",
            width: 565,
            height: 500,
            date: "2020-04-14T00:00:00.000Z",
          },
        ]);
        done();
      });
  });
});

describe("GET /art/:id ", () => {
  test("It will return a piece of art", async () => {
    supertest(app)
      .get('/art/1')
      .end((err, res) => {
        console.log(res.body);
        // if (err) return done(err);
        // expect(res.body).toEqual([
        //   {
        //     id: 1,
        //     name: "The Sea Triumph of Charles II",
        //     artist: "Antonio Verrio",
        //     description:
        //       "This was the first work painted for Charles II by Antonio Verrio, and is believed to have been a trial piece, allowing the artist to demonstrate his talents to his potential royal patron. By this date, c.1674, Verrio had already produced decorative schemes for a number of figures at court, including the Earl of Arlington at both Euston Hall in Suffolk and Arlington House in St James's Park. It was at Arlington House – the site of Buckingham Palace today, that the artist was first introduced to his future royal patron, who 'came in his walks round the Park to see the Workes Verrio was doing there'.",
        //     width: 565,
        //     height: 500,
        //     date: "2020-04-14T00:00:00.000Z",
        //   },
        // ]);
        done();
      });
  });
});

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
