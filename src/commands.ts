import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandCatch } from "./command_catch.js";

import type { CLICommand } from "./state.js";
import { commandExplore } from "./command_explore.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Get the next page of locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Get the previous page of locations",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Get the pokemons available in specified area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Try to catch the specified pokemon",
      callback: commandCatch,
    },
  };
}

