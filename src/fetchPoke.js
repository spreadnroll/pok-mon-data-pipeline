import axios from "axios";

export async function fetchPokemonData(idPoke) {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";
  const baseAbilityUrl = "https://pokeapi.co/api/v2/ability";
  const baseTypesUrl="https://pokeapi.co/api/v2/type"

  try {
    const response = await axios.get(`${baseUrl}/${idPoke}`);
    const pokemon = response.data;

    const name = pokemon.name.toLowerCase();
    const weight = Number(pokemon.weight);
    const height = Number(pokemon.height);
    const baseExperience = pokemon.base_experience;
    // const type = pokemon.types[0].type.name;
    const types = await Promise.all(pokemon.types.map(async (type) => {
      const typeResponse = await axios.get(`${baseTypesUrl}/${type.type.name}`);
      const typeData = typeResponse.data;
  
      const damageRelations = {
          doubleDamageTo: typeData.damage_relations.double_damage_to.map((t) => t.name),
          doubleDamageFrom: typeData.damage_relations.double_damage_from.map((t) => t.name),
          halfDamageTo: typeData.damage_relations.half_damage_to.map((t) => t.name),
          halfDamageFrom: typeData.damage_relations.half_damage_from.map((t) => t.name),
          noDamageTo: typeData.damage_relations.no_damage_to.map((t) => t.name),
          noDamageFrom: typeData.damage_relations.no_damage_from.map((t) => t.name),
      };
  
      return {
          typeName: type.type.name,
          damageRelations,
      };
  }));
    // const abilities = pokemon.abilities.map((ability) => ability.ability.name);

    const abilitiesAndDescription = await Promise.all (pokemon.abilities.map(async (ability) => {
      const abilityReponse = await axios.get(`${baseAbilityUrl}/${ability.ability.name}`);
      const abilityData = abilityReponse.data;

      const abilityName = abilityData.name;
      const abilityDescription = abilityData.effect_entries.find(element => element.language.name === "en")?.effect || "No description available";

      return {abilityName, abilityDescription}
      
    }));

    return {
      name,
      weight,
      height,
      baseExperience,
      types,//: JSON.stringify(types),
      abilitiesAndDescription,//: JSON.stringify(abilitiesAndDescription),
    };
  } catch (error) {
    throw new Error(
      `Error during loading Pokémon with ID ${idPoke}: ${error.message}`
    );
  }
}
