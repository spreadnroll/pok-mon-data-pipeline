const sqlite3 = require("sqlite3").verbose();
const path = require("path");

async function initializeDbTypeRelations() {
  try {
   
    const dbPath = path.join(__dirname, "pokemon.db");
    console.log("Database path:", dbPath);

    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        throw new Error(`Error opening database: ${err.message}`);
      }
      console.log("SQLite DB Connected.");
    });

    
    const query = `
    CREATE TABLE IF NOT EXISTS type_relations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      attacking_type TEXT NOT NULL,
      defending_type TEXT NOT NULL,
      relation_type TEXT NOT NULL
    );`;

    db.exec(query, (err) => {
      if (err) {
        console.error("There was an error during table creation:", err.message);
      } else {
        console.log("Table 'type_relations' created (or already existing).");
      }
    });

    // Chiudi la connessione
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Connection closed.");
      }
    });
  } catch (error) {
    console.error("General error:", error.message);
  }
}

module.exports = initializeDbTypeRelations;
