const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'user',
  host: 'postgres',
  database: 'db',
  password: 'pass',
  port: 5432,
});

const getArt = (request, response) => {
  pool.query('SELECT * FROM art ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const createArt = (request, response) => {
  const {
    name,
    artist,
    description,
    width,
    height,
    date,
  } = request.body;
  pool.query(
    'INSERT INTO art(name, artist, description, width, height, date) VALUES ($1, $2, $3, $4, $5, $6)',
    [name, artist, description, width, height, date],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
}

const updateArt = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, description } = request.body;
  pool.query(
    'UPDATE art SET name = $1, description = $2 WHERE id = $3',
    [name, description, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Art modified with ID: ${id}`);
    }
  );
}

const deleteArt = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    'DELETE FROM art WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Art deleted with ID: ${id}`);
    }
  )
}

module.exports = {
  getArt,
  createArt,
  updateArt,
  deleteArt,
}