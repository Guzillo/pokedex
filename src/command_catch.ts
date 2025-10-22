import { type Pokemon } from "./pokeapi.js";
import { type State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const { pokeAPI } = state;
  try {
    if (args.length !== 1) {
      throw new Error("You have to provide pokemon name\nUsage: catch <pokemon name>");
    }
    const pokemon: Pokemon = await pokeAPI.fetchPokemon(args[0]);
    const { name, base_experience } = pokemon;
    console.log(`Throwing a Pokeball at ${name}...`);
    const chance = Math.floor(Math.random() * 101);
    const min = 45;
    const max = 200;
    const low = 20;
    const high = 85;
    const clampedBx =
      base_experience < min ? min :
        base_experience > max ? max :
          base_experience;
    const t = (clampedBx - min) / (max - min);
    const threshold = low + t * (high - low);
    const caught: boolean = chance >= threshold;
    if (caught) {
      console.log("Pokemon has been caught");
      state.pokedex[pokemon.name] = pokemon;
    } else {
      console.log("Pokemon escaped");
    }
  } catch (error) {
    console.log(error);
  }
}
