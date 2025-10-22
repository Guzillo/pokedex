import { type State } from "./state.js";
import { type Pokemon } from "./pokeapi.js";
export async function commandInspect(state: State, ...args: string[]) {
  try {
    if (args.length !== 1) {
      throw new Error("You have to provide the pokemon name\nUsage: inspect <pokemonName>\n");
    }
    const pokemonName: string = args[0];
    const pokemon: Pokemon = state.pokedex[pokemonName];
    if (!pokemon) {
      throw new Error("The pokemon you're trying to inspect is not present in the pokedex");
    }
    const { name, height, weight, stats, types } = pokemon;

    const statBlocks = stats.map((s) => {
      return `  - ${s.stat.name}: ${s.base_stat}`
    }).join("\n");

    const typesBlocks = types.map((t) => {
      return `  - ${t.type.name}`
    }).join("\n");

    console.log(
      `Name: ${name}
Height: ${height}
Weight: ${weight}
Stats: 
${statBlocks}
Types: 
${typesBlocks}`
    );

  } catch (error) {
    if (error instanceof Error)
      console.log(error.message);
  }
}


