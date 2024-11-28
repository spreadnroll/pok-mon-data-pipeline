import { fetchPokemonData } from '../src/fetchPoke.js';

// Test with Bulbasaur
describe('fetchPokemonData', () => {
  test('should return the correct data for Pokémon', async () => {
    const pokemon = await fetchPokemonData(1);
    
    expect(pokemon).toHaveProperty('name', 'bulbasaur');
    expect(pokemon).toHaveProperty('weight');
    expect(pokemon).toHaveProperty('height');
    expect(pokemon).toHaveProperty('types');
    expect(pokemon.types).toBeInstanceOf(Array);
    expect(pokemon.abilitiesAndDescription).toBeInstanceOf(Array);
  });
});

// Test with Pikachu
describe('fetchPokemonData', () => {
    test('should return the correct data for Pokémon', async () => {
      const pokemon = await fetchPokemonData(25);
      
      expect(pokemon).toHaveProperty('name', 'pikachu');
      expect(pokemon).toHaveProperty('weight');
      expect(pokemon).toHaveProperty('height');
      expect(pokemon).toHaveProperty('types');
      expect(pokemon.types).toBeInstanceOf(Array);
      expect(pokemon.abilitiesAndDescription).toBeInstanceOf(Array);
    });
  });


  // Test with Mew
describe('fetchPokemonData', () => {
    test('should return the correct data for Pokémon', async () => {
      const pokemon = await fetchPokemonData(151);
      
      expect(pokemon).toHaveProperty('name', 'mew');
      expect(pokemon).toHaveProperty('weight');
      expect(pokemon).toHaveProperty('height');
      expect(pokemon).toHaveProperty('types');
      expect(pokemon.types).toBeInstanceOf(Array);
      expect(pokemon.abilitiesAndDescription).toBeInstanceOf(Array);
    });
  });