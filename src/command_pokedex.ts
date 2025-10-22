import { State } from "./state";

export async function commandPokedex(state: State) {
  console.log("Your pokedex");
  for (const value of Object.values(state.pokedex)) {
    console.log(`  - ${value.name}`);
  }
}
