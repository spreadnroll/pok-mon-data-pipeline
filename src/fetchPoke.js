import axios from "axios";

export async function fetchPokemonData(idPoke) {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";
  const baseAbilityUrl = "https://pokeapi.co/api/v2/ability";

  try {
    const response = await axios.get(`${baseUrl}/${idPoke}`);
    const pokemon = response.data;

    const name = pokemon.name;
    const weight = pokemon.weight;
    const height = pokemon.height;
    const baseExperience = pokemon.base_experience;
    const type = pokemon.types[0].type.name;
    // const abilities = pokemon.abilities.map((ability) => ability.ability.name);

    const abilitiesAndDescription = await Promise.all (pokemon.abilities.map(async (ability) => {
      const abilityReponse = await axios.get(`${baseAbilityUrl}/${ability.ability.name}`);
      const abilityData = abilityReponse.data;

      const abilityName = abilityData.name;
      const abilityDescription = abilityData.effect_entries.find(element => element.language.name === "en").effect;

      return {abilityName, abilityDescription}
      
    }));

    return {
      name,
      weight,
      height,
      baseExperience,
      type,
      abilitiesAndDescription,
    };
  } catch (error) {
    throw new Error(
      `Error during loading Pokémon with ID ${idPoke}: ${error.message}`
    );
  }
}
