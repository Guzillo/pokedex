import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log(`Welcome to the Pokedex!\nUsage:\n`);

  for (const cmd of Object.values(commands)) {
    console.log(`${cmd.name}: ${cmd.description}`);
  }
  console.log();
}
