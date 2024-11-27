import axios from "axios";

export async function fetchPokemonData(idPoke) {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";

  try {
    const response = await axios.get(`${baseUrl}/${idPoke}`);
    const pokemon = response.data;

    const name = pokemon.name;
    const weight = pokemon.weight;
    const height = pokemon.height;
    const baseExperience = pokemon.base_experience;
    const type = pokemon.types[0].type.name;
    const abilities = pokemon.abilities.map((ability) => ability.ability.name);



    return {name, weight, height, baseExperience, type, abilities};
  } catch (error) {
    throw new Error(
      `Error during loading Pokémon with ID ${idPoke}: ${error.message}`
    );
  }
}
