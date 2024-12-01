const sqlite3 = require('sqlite3').verbose();
const path = require('path');

async function initializeDb() {
  const dbPath = path.resolve(__dirname, 'pokemon.db');
  console.log('Database path:', dbPath);

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Errore durante l\'apertura del database:', err.message);
    } else {
      console.log('Connesso al database SQLite.');
    }
  });

  const queries = `
    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      weight INTEGER,
      height INTEGER,
      base_experience INTEGER
    );

    CREATE TABLE IF NOT EXISTS types (
      id INTEGER PRIMARY KEY,
      type_name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS pokemon_types (
      pokemon_id INTEGER,
      type_id INTEGER,
      FOREIGN KEY (pokemon_id) REFERENCES pokemon (id),
      FOREIGN KEY (type_id) REFERENCES types (id)
    );

    CREATE TABLE IF NOT EXISTS abilities (
      id INTEGER PRIMARY KEY,
      ability_name TEXT NOT NULL UNIQUE,
      ability_description TEXT
    );

    CREATE TABLE IF NOT EXISTS pokemon_abilities (
      pokemon_id INTEGER,
      ability_id INTEGER,
      FOREIGN KEY (pokemon_id) REFERENCES pokemon (id),
      FOREIGN KEY (ability_id) REFERENCES abilities (id)
    );
  `;

  db.exec(queries, (err) => {
    if (err) {
      console.error('Errore durante la creazione delle tabelle:', err.message);
    } else {
      console.log('Tabelle create o già esistenti.');
    }
  });

  return db;
}

module.exports = initializeDb;
