const { fetchPokemonData } = require('./fetchPoke.js');
const initializeDb = require('./db.js');

async function fetchAllPokemons() {
  const db = await initializeDb();  

  const pokemonsData = [];
  const seenPokemon = new Set();

  for (let id = 1; id <= 151; id++) {
    const pokemon = await fetchPokemonData(id);

    if (!seenPokemon.has(pokemon.name)) {
      seenPokemon.add(pokemon.name);

      
      db.run(
        `INSERT INTO pokemon (name, weight, height, base_experience) VALUES (?, ?, ?, ?)`,
        [pokemon.name, pokemon.weight, pokemon.height, pokemon.baseExperience],
        function (err) {
          if (err) {
            console.error('Errore durante l\'inserimento del Pokémon:', err.message);
          } else {
            const pokemonId = this.lastID; 

            
            pokemon.types.forEach((type) => {
              db.run(
                `INSERT INTO types (type_name) VALUES (?) ON CONFLICT(type_name) DO NOTHING`,
                [type.typeName],
                function (err) {
                  if (err) {
                    console.error('Errore durante l\'inserimento del tipo:', err.message);
                  } else {
                    const typeId = this.lastID;
                    db.run(
                      `INSERT INTO pokemon_types (pokemon_id, type_id) VALUES (?, ?)`,
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
            pokemon.abilitiesAndDescription.forEach((ability) => {
              db.run(
                `INSERT INTO abilities (ability_name, ability_description) VALUES (?, ?) ON CONFLICT(ability_name) DO NOTHING`,
                [ability.abilityName, ability.abilityDescription],
                function (err) {
                  if (err) {
                    console.error('Errore durante l\'inserimento dell\'abilità:', err.message);
                  } else {
                    // Ottieni l'ID dell'abilità e inserisci nella relazione
                    const abilityId = this.lastID;
                    db.run(
                      `INSERT INTO pokemon_abilities (pokemon_id, ability_id) VALUES (?, ?)`,

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
