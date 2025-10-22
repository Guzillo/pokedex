import { type ShallowLocations } from "./pokeapi.js";
import { State } from "./state.js";


function displayLocations(locations: ShallowLocations) {
  for (const location of locations.results) {
    console.log(location.name);
  }
}

export async function commandMap(state: State): Promise<void> {
  let locations: ShallowLocations;
  try {
    const {
      pokeAPI, nextLocationURL } = state
    if (!nextLocationURL) {
      locations = await pokeAPI.fetchLocations();
    }
    else {
      locations = await pokeAPI.fetchLocations(nextLocationURL);
    }
    state.nextLocationURL = locations.next;
    state.prevLocationURL = locations.previous;
    displayLocations(locations);
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function commandMapb(state: State): Promise<void> {
  let locations: ShallowLocations;
  try {
    const {
      pokeAPI, prevLocationURL } = state
    if (!prevLocationURL) {
      console.log("you're on the first page");
      return
    }
    else {
      locations = await pokeAPI.fetchLocations(prevLocationURL);
    }
    state.prevLocationURL = locations.previous;
    state.nextLocationURL = locations.next;
    displayLocations(locations);
    return;
  } catch (error) {
    console.log(error);
  }
}
