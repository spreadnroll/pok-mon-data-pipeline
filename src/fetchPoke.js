import axios from 'axios';


export async function fetchPokemonData(idPoke) {
    const baseUrl = "https://pokeapi.co/api/v2/pokemon"

    try {
        const response = await axios.get(`${baseUrl}/${idPoke}`);
        const pokemon = response.data;

        const name = pokemon.name;

        return name;
    } catch (error) {
        console.error(`Error during loading Pokémon with ID ${idPoke}: ${error.message}`);
        return null
    }
}