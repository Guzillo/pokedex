import { commandMap } from "./command_map.js";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";
import { type State } from "./state.js";

async function main() {
  const state: State = initState();
  await startREPL(state);
}

main();
