import sqlite3 from 'sqlite3';
import { open } from 'sqlite';



export async function initializeDb() {

  const db = await open({
    filename: './pokemons.db',
    driver: sqlite3.Database
  });

 
  await db.exec(`
    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      weight INTEGER,
      height INTEGER,
      base_experience INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type_name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pokemon_types (
      pokemon_id INTEGER,
      type_id INTEGER,
      FOREIGN KEY (pokemon_id) REFERENCES pokemon (id),
      FOREIGN KEY (type_id) REFERENCES types (id)
    );

    CREATE TABLE IF NOT EXISTS abilities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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

  console.log("Database initialized and tables created (if not already existing).");

  return db;
}
