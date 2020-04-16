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

const artPiece = {
  name: "The Sea Triumph of Charles II",
  artist: "Antonio Verrio",
  description: "This was the first work painted for Charles II by Antonio Verrio, and is believed to have been a trial piece, allowing the artist to demonstrate his talents to his potential royal patron. By this date, c.1674, Verrio had already produced decorative schemes for a number of figures at court, including the Earl of Arlington at both Euston Hall in Suffolk and Arlington House in St James's Park. It was at Arlington House – the site of Buckingham Palace today, that the artist was first introduced to his future royal patron, who 'came in his walks round the Park to see the Workes Verrio was doing there'.",
  width: 565,
  height: 500,
  date: '2020-04-14T00:00:00.000Z'
};

beforeAll(async () => {
  await pool.query(
    'CREATE TABLE art( id SERIAL PRIMARY KEY, name TEXT, artist TEXT, description TEXT, width INT, height INT, date DATE );'
  );
});

beforeEach(async () => {
  // Seed with some data
  await pool.query(
    'INSERT INTO art(name, artist, description, width, height, date) VALUES ($1, $2, $3, $4, $5, $6), ($1, $2, $3, $4, $5, $6);',
    [artPiece.name, artPiece.artist, artPiece.description, artPiece.width, artPiece.height, artPiece.date]
  );
});

afterEach(async () => {
  await pool.query('DELETE FROM art');
});

afterAll(async () => {
  await pool.query('DROP TABLE art');
  pool.end();
});

describe("GET request to '/art'", () => {
  test('It should respond with an array of art', (done) => {
    supertest(app)
      .get('/art')
      .end((error, response) => {
        if (error) return done(error);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
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

describe("GET request to '/art/:id'", () => {
  test("It should respond with the requested art",  (done) => {
    supertest(app)
      .get('/art/4')
      .end((error, response) => {
        if (error) return done(error);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
          {
            id: 4,
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

describe("POST request to /art", () => {
  test("It should respond with the newly created art", (done) => {
  supertest(app)
    .post('/art')
    // .set('Accept', 'application/json')
    .send({
      name: "The Sea Triumph of Charles II",
      artist: "Antonio Verrio",
      description:
        "This was the first work painted for Charles II by Antonio Verrio, and is believed to have been a trial piece, allowing the artist to demonstrate his talents to his potential royal patron. By this date, c.1674, Verrio had already produced decorative schemes for a number of figures at court, including the Earl of Arlington at both Euston Hall in Suffolk and Arlington House in St James's Park. It was at Arlington House – the site of Buckingham Palace today, that the artist was first introduced to his future royal patron, who 'came in his walks round the Park to see the Workes Verrio was doing there'.",
      width: 565,
      height: 500,
      date: "2020-04-14T00:00:00.000Z"
    })
    .expect(201, function(error,response){
      expect(response.body).toEqual([
        {
          id: 7,
          name: "The Sea Triumph of Charles II",
          artist: "Antonio Verrio",
          description:
            "This was the first work painted for Charles II by Antonio Verrio, and is believed to have been a trial piece, allowing the artist to demonstrate his talents to his potential royal patron. By this date, c.1674, Verrio had already produced decorative schemes for a number of figures at court, including the Earl of Arlington at both Euston Hall in Suffolk and Arlington House in St James's Park. It was at Arlington House – the site of Buckingham Palace today, that the artist was first introduced to his future royal patron, who 'came in his walks round the Park to see the Workes Verrio was doing there'.",
          width: 565,
          height: 500,
          date: "2020-04-14T00:00:00.000Z"
        },
      ]);
      done();
    });
  });
});

describe("PUT request to /art", () => {
  test("It should respond with the updated art", (done) => {
  supertest(app)
    .put('/art/9')
    // .set('Accept', 'application/json')
    .send({
      name: "The Ocean Triumph of Charles III",
      description:
            "This was the second work painted for Charles II by Antonio Verrio, and is believed to have been a trial piece, allowing the artist to demonstrate his talents to his potential royal patron. By this date, c.1674, Verrio had already produced decorative schemes for a number of figures at court, including the Earl of Arlington at both Euston Hall in Suffolk and Arlington House in St James's Park. It was at Arlington House – the site of Buckingham Palace today, that the artist was first introduced to his future royal patron, who 'came in his walks round the Park to see the Workes Verrio was doing there'.",
    })
    .expect(200, function(error,response){
      expect(response.body).toEqual([
        {
          id: 9,
          name: "The Ocean Triumph of Charles III",
          artist: "Antonio Verrio",
          description:
            "This was the second work painted for Charles II by Antonio Verrio, and is believed to have been a trial piece, allowing the artist to demonstrate his talents to his potential royal patron. By this date, c.1674, Verrio had already produced decorative schemes for a number of figures at court, including the Earl of Arlington at both Euston Hall in Suffolk and Arlington House in St James's Park. It was at Arlington House – the site of Buckingham Palace today, that the artist was first introduced to his future royal patron, who 'came in his walks round the Park to see the Workes Verrio was doing there'.",
          width: 565,
          height: 500,
          date: "2020-04-14T00:00:00.000Z"
        },
      ]);
      done();
    });
  });
});

describe("DELETE request to /art", () => {
  test("It should respond with the deleted art", (done) => {
  supertest(app)
    .delete('/art/10')
    .expect(200, function(error,response){
      expect(response.body).toEqual([
        {
          id: 10
        },
      ]);
      done();
    });
  });
});

describe("Test a 404", () => {
  test("It should respond with a 404 status", async () => {
    const response = await supertest(app).get("/nowhere");
    expect(response.statusCode).toBe(404);
  });
});
