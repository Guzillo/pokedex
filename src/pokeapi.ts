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
    const cacheRecord = this.pokeCache.get<ShallowLocations>(pageURL ?? locationsURL);
    if (cacheRecord) {
      return cacheRecord;
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
    const cacheValue = this.pokeCache.get<Location>(locationURL);
    if (cacheValue) {
      return cacheValue;
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
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
