import { createInterface } from "readline";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(word => word !== "");
}

export function startREPL(): void {

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex >",
  });
  // display the prompt 
  rl.prompt();
  // listen to the input
  rl.on('line', (line) => {
    const words = cleanInput(line);
    if (line === "") {
      rl.prompt();
      return;
    }

    console.log(`Your command was: ${words[0]}`)
    rl.prompt();
  });
}
