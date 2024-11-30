const fetchPokemonData = require('./fetchPoke.js');
const initializeDb = require('./db.js');

// Funzione per verificare la connessione al DB
async function checkDbConnection(client) {
  let isConnected = false;
  while (!isConnected) {
    try {
      await client.query('SELECT 1');
      isConnected = true;
    } catch (err) {
      console.log('Waiting for database connection...');
      await new Promise(resolve => setTimeout(resolve, 5000)); // Attende 5 secondi prima di ritentare
    }
  }
}

async function fetchAllPokemons() {
  const db = await initializeDb();
  await checkDbConnection(db); // Verifica la connessione al DB

  const pokemonsData = [];
  const seenPokemon = new Set();

  for (let id = 1; id <= 151; id++) {
    const pokemon = await fetchPokemonData(id);

    if (!seenPokemon.has(pokemon.name)) {
      seenPokemon.add(pokemon.name);

      await db.query(
        `INSERT INTO pokemon (name, weight, height, base_experience) VALUES ($1, $2, $3, $4)`,
        [pokemon.name, pokemon.weight, pokemon.height, pokemon.baseExperience]
      );

      // Inserisci i tipi del Pokémon
      for (const type of pokemon.types) {
        await db.query(
          `INSERT INTO types (type_name) VALUES ($1) ON CONFLICT (type_name) DO NOTHING`,
          [type.typeName]
        );

        const typeResult = await db.query(
          `SELECT id FROM types WHERE type_name = $1`,
          [type.typeName]
        );

        const typeId = typeResult.rows[0].id;

        await db.query(
          `INSERT INTO pokemon_types (pokemon_id, type_id) VALUES ($1, $2)`,
          [pokemon.id, typeId]
        );
      }

      // Inserisci le abilità del Pokémon
      for (const ability of pokemon.abilitiesAndDescription) {
        await db.query(
          `INSERT INTO abilities (ability_name, ability_description) VALUES ($1, $2) ON CONFLICT (ability_name) DO NOTHING`,
          [ability.abilityName, ability.abilityDescription]
        );

        const abilityResult = await db.query(
          `SELECT id FROM abilities WHERE ability_name = $1`,
          [ability.abilityName]
        );

        const abilityId = abilityResult.rows[0].id;

        await db.query(
          `INSERT INTO pokemon_abilities (pokemon_id, ability_id) VALUES ($1, $2)`,
          [pokemon.id, abilityId]
        );
      }

      pokemonsData.push(pokemon);
    } else {
      console.log(`Pokémon ${pokemon.name} già visto, saltato.`);
    }
  }

  console.log(pokemonsData);
}

fetchAllPokemons();
