import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";
const testCases = [
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
  {
    key: "https://pokemon.com/something",
    val: "blah",
    interval: 2000, // 2 sec
  }
];
test.concurrent.each(testCases)
  ("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    await new Promise((resolve) => setTimeout(resolve, interval + 100));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
  });

test.concurrent.each(testCases)
  ("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);
    cache.stopReapLoop();
    cache.add(key, val);
    const beforePotentialCaching = cache.get(key);
    await new Promise((resolve) => setTimeout(resolve, interval + 100));
    const afterPotentialCaching = cache.get(key);
    expect(afterPotentialCaching).toBe(beforePotentialCaching);
  });
