import { commandMap } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";
import { type State } from "./state.js";

async function main() {
  const state: State = initState(1000 * 60 * 5); // 5 min
  await startREPL(state);
}

main();
