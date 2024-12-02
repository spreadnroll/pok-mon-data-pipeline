const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const initializeDbTypeRelations = require("./typeRelationsConfig");

async function main() {
  console.log("Inizializzazione della tabella type_relations...");
  
  
  await initializeDbTypeRelations();

  
  await populateTypeRelations();
  
  console.log("Process completed.");
}


async function populateTypeRelations() {
  const dbPath = path.join(__dirname, "pokemon.db");

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Error while opening db:", err.message);
      return;
    }
    console.log("Db connected.");
  });

  
  const relations = [
    // double_damage_to
    { attacking_type: "fire", defending_type: "grass", relation_type: "double_damage_to" },
    { attacking_type: "fire", defending_type: "bug", relation_type: "double_damage_to" },
    { attacking_type: "fire", defending_type: "ice", relation_type: "double_damage_to" },
    { attacking_type: "electric", defending_type: "water", relation_type: "double_damage_to" },
    { attacking_type: "electric", defending_type: "flying", relation_type: "double_damage_to" },
    { attacking_type: "water", defending_type: "fire", relation_type: "double_damage_to" },
    { attacking_type: "grass", defending_type: "water", relation_type: "double_damage_to" },
    { attacking_type: "psychic", defending_type: "fighting", relation_type: "double_damage_to" },
    // half_damage_to
    { attacking_type: "fire", defending_type: "fire", relation_type: "half_damage_to" },
    { attacking_type: "water", defending_type: "water", relation_type: "half_damage_to" },
    { attacking_type: "grass", defending_type: "fire", relation_type: "half_damage_to" },
    { attacking_type: "electric", defending_type: "electric", relation_type: "half_damage_to" },
    { attacking_type: "ground", defending_type: "electric", relation_type: "half_damage_to" },
    { attacking_type: "fighting", defending_type: "psychic", relation_type: "half_damage_to" },
    // no_damage_to
    { attacking_type: "electric", defending_type: "ground", relation_type: "no_damage_to" },
    { attacking_type: "ghost", defending_type: "normal", relation_type: "no_damage_to" },
    { attacking_type: "dragon", defending_type: "fairy", relation_type: "no_damage_to" },
    // other
    { attacking_type: "grass", defending_type: "electric", relation_type: "half_damage_to" },
    { attacking_type: "fighting", defending_type: "flying", relation_type: "half_damage_to" },
    { attacking_type: "fighting", defending_type: "ghost", relation_type: "no_damage_to" },
    { attacking_type: "normal", defending_type: "ghost", relation_type: "no_damage_to" },
   
  ];

  
  const query = `INSERT INTO type_relations (attacking_type, defending_type, relation_type) VALUES (?, ?, ?)`;

  
  for (const relation of relations) {
    db.run(query, [relation.attacking_type, relation.defending_type, relation.relation_type], (err) => {
      if (err) {
        console.error("Error while inject data:", err.message);
      } else {
        console.log(`Relation injected: ${relation.attacking_type} => ${relation.defending_type}`);
      }
    });
  }

  
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database closed.");
    }
  });
}


main().catch((err) => {
  console.error("Error during script execution:", err.message);
});
