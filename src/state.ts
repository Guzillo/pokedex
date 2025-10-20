import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type State = {
  rlInterface: Interface,
  commandsRegistery: Record<string, CLICommand>,
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
}

export function initState(): State {

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commandsRegistery: Record<string, CLICommand> = {
    exit: {
      name: "exit",
      description: "Exit the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Prints the help guide",
      callback: commandHelp,
    }
  };
  return { rlInterface: rl, commandsRegistery };
}
