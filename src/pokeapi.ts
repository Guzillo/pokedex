
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  constructor() { }

  async fetchURL(pageURL: string): Promise<any> {
    const response = await fetch(pageURL);
    if (!response.ok) throw new Error("Error: api failed, code:" + response.status);
    try {
      const json = response.json();
      return json;
    } catch (error) {
      throw error;
    }
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const locationsURL = `${PokeAPI.baseURL}/location-area/`;
    try {
      const promise = await this.fetchURL(pageURL || locationsURL);
      return promise as ShallowLocations;
    } catch (error) {
      throw error;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const locationURL = `${PokeAPI.baseURL}/location-area/${locationName}/`;
    try {
      const promise = await this.fetchURL(locationURL);
      return promise as Location;
    } catch (error) {
      throw error;
    }
  }

}

export type ShallowLocations = {
  count: number,
  next?: string,
  previous?: string,
  results: Location[]
};

export type Location = {
  name: "string",
  url: "string"
};
