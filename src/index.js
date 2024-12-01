const { fetchPokemonData } = require('./fetchPoke.js');
const initializeDb = require('./db.js');

async function fetchAllPokemons() {
  const db = await initializeDb();  // Connessione al DB SQLite

  const pokemonsData = [];
  const seenPokemon = new Set();

  for (let id = 1; id <= 151; id++) {
    const pokemon = await fetchPokemonData(id);

    if (!seenPokemon.has(pokemon.name)) {
      seenPokemon.add(pokemon.name);

      // Inserimento nella tabella "pokemon"
      db.run(
        `INSERT INTO pokemon (name, weight, height, base_experience) VALUES (?, ?, ?, ?)`,
        [pokemon.name, pokemon.weight, pokemon.height, pokemon.baseExperience],
        function (err) {
          if (err) {
            console.error('Errore durante l\'inserimento del Pokémon:', err.message);
          } else {
            const pokemonId = this.lastID;  // Ottieni l'ID del Pokémon appena inserito

            // Inserimento dei tipi nella tabella "types" e nelle relazioni "pokemon_types"
            pokemon.types.forEach((type) => {
              db.run(
                `INSERT OR IGNORE INTO types (type_name) VALUES (?)`,  // Usa INSERT OR IGNORE
                [type.typeName],
                function (err) {
                  if (err) {
                    console.error('Errore durante l\'inserimento del tipo:', err.message);
                  } else {
                    const typeId = this.lastID;
                    db.run(
                      `INSERT OR IGNORE INTO pokemon_types (pokemon_id, type_id) VALUES (?, ?)`,  // Usa INSERT OR IGNORE
                      [pokemonId, typeId],
                      function (err) {
                        if (err) {
                          console.error('Errore durante l\'inserimento della relazione tipo:', err.message);
                        }
                      }
                    );
                  }
                }
              );
            });

            // Inserimento delle abilità nella tabella "abilities" e nelle relazioni "pokemon_abilities"
            pokemon.abilitiesAndDescription.forEach((ability) => {
              db.run(
                `INSERT OR IGNORE INTO abilities (ability_name, ability_description) VALUES (?, ?)`,  // Usa INSERT OR IGNORE
                [ability.abilityName, ability.abilityDescription],
                function (err) {
                  if (err) {
                    console.error('Errore durante l\'inserimento dell\'abilità:', err.message);
                  } else {
                    const abilityId = this.lastID;
                    db.run(
                      `INSERT OR IGNORE INTO pokemon_abilities (pokemon_id, ability_id) VALUES (?, ?)`,  // Usa INSERT OR IGNORE
                      [pokemonId, abilityId],
                      function (err) {
                        if (err) {
                          console.error('Errore durante l\'inserimento della relazione abilità:', err.message);
                        }
                      }
                    );
                  }
                }
              );
            });
          }
        }
      );

      pokemonsData.push(pokemon);
    } else {
      console.log(`Pokémon ${pokemon.name} già visto, saltato.`);
    }
  }

  console.log(pokemonsData);
}

fetchAllPokemons();
