import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "                           ",
    expected: [],
  },
  {
    input: "h e  l   o ",
    expected: ["h", "e", "l", "o"],
  },
  {
    input: "Hello World",
    expected: ["hello", "world"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
