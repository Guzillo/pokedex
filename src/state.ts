import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
import { getCommands } from "./commands.js";

export type State = {
  rlInterface: Interface,
  commandsRegistery: Record<string, CLICommand>,
  pokeAPI: PokeAPI,
  prevLocationURL?: string,
  nextLocationURL?: string
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
}

export function initState(): State {

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commandsRegistery: Record<string, CLICommand> = getCommands();

  const pokeAPI = new PokeAPI();


  return { rlInterface: rl, commandsRegistery, pokeAPI };
}
