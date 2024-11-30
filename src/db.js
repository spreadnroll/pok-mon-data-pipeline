const { Client } = require('pg');

async function initializeDb() {
  const client = new Client({
    user: 'pokeuser',
    host: '172.22.0.2',
    database: 'pokemon_db',
    password: '123_Stella',
    port: 5432,
  });

  await client.connect();
  
  await client.query(`
    CREATE TABLE IF NOT EXISTS pokemon (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      weight INTEGER,
      height INTEGER,
      base_experience INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS types (
      id SERIAL PRIMARY KEY,
      type_name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pokemon_types (
      pokemon_id INTEGER,
      type_id INTEGER,
      FOREIGN KEY (pokemon_id) REFERENCES pokemon (id),
      FOREIGN KEY (type_id) REFERENCES types (id)
    );

    CREATE TABLE IF NOT EXISTS abilities (
      id SERIAL PRIMARY KEY,
      ability_name TEXT NOT NULL,
      ability_description TEXT
    );

    CREATE TABLE IF NOT EXISTS pokemon_abilities (
      pokemon_id INTEGER,
      ability_id INTEGER,
      FOREIGN KEY (pokemon_id) REFERENCES pokemon (id),
      FOREIGN KEY (ability_id) REFERENCES abilities (id)
    );
  `);

  console.log('Database initialized and tables created (if not already existing).');

  return client;
}

module.exports = initializeDb;
