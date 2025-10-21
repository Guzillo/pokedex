
export type CacheEntry<T> = {
  createdAt: number;
  val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  #reap(): void {
    for (const [k, v] of this.#cache.entries()) {
      const toDelete: boolean = v.createdAt <= (Date.now() - this.#interval);
      if (toDelete) {
        this.#cache.delete(k);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(
      this.#reap.bind(this),
      this.#interval
    );
  }

  stopReapLoop(): void {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, { createdAt: Date.now(), val });
  }

  get<T>(key: string): T | undefined {
    if (this.#cache.has(key)) {
      return this.#cache.get(key)?.val;
    } else {
      return undefined;
    }
  }

  displayCache() {
    for (const [k, v] of this.#cache.entries()) {
      console.log(`[${k}]: ${v}`);
    }
  }

}
