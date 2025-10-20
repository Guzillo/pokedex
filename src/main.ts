import { startREPL } from "./repl.js";
import { initState } from "./state.js";
import { type State } from "./state.js";
function main() {
  const state: State = initState();
  startREPL(state);
}

main();
