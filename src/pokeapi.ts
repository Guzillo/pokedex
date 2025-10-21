import { Cache, type CacheEntry } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private pokeCache: Cache;

  constructor(cacheInterval: number) {
    this.pokeCache = new Cache(cacheInterval);
  }

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
    this.pokeCache.displayCache();
    const locationsURL = `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;
    const cacheRecord = this.pokeCache.get(pageURL ?? locationsURL);
    if (cacheRecord) {
      return cacheRecord as ShallowLocations;
    }
    try {
      const response = await this.fetchURL(pageURL ?? locationsURL);
      this.pokeCache.add(pageURL ?? locationsURL, response);
      return response as ShallowLocations;
    } catch (error) {
      throw error;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const locationURL = `${PokeAPI.baseURL}/location-area/${locationName}/`;
    const cacheValue = this.pokeCache.get(locationURL);
    if (cacheValue) {
      return cacheValue as Location;
    }
    try {
      const response = await this.fetchURL(locationURL);
      this.pokeCache.add(locationURL, response);
      return response as Location;
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
