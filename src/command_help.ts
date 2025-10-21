import { type State } from "./state.js";

export async function commandHelp(state: State) {
  console.log(`Welcome to the Pokedex!\nUsage:\n`);

  for (const cmd of Object.values(state.commandsRegistery)) {
    console.log(`${cmd.name}: ${cmd.description}`);
  }
  console.log();
}
