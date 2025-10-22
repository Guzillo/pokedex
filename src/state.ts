import { createInterface, type Interface } from "readline";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { getCommands } from "./commands.js";

export type State = {
  rlInterface: Interface,
  commandsRegistery: Record<string, CLICommand>,
  pokeAPI: PokeAPI,
  pokedex: Record<string, Pokemon>,
  prevLocationURL?: string,
  nextLocationURL?: string
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
}

export function initState(cacheInterval: number): State {

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  const commandsRegistery: Record<string, CLICommand> = getCommands();
  const pokeAPI = new PokeAPI(cacheInterval);
  const pokedex: Record<string, Pokemon> = {};

  return { rlInterface: rl, commandsRegistery, pokeAPI, pokedex };
}
