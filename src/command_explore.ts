import { State } from "./state.js";
import { Location } from "./pokeapi.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
  const { pokeAPI } = state;
  let location: Location;
  try {
    const locationToSearch = args[0];
    if (!locationToSearch) {
      throw new Error("You have to provide location\n Usage: explore <location-area>\n");
    }

    location = await pokeAPI.fetchLocation(locationToSearch);
    console.log("\nFound Pokemon:");

    location.pokemon_encounters.forEach((encounter) => {
      console.log(`- ${encounter.pokemon.name}`);
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

  }
}
