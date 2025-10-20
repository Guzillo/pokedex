import { createInterface } from "readline";
import { getCommands } from "./get_commands.js";

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
    prompt: "Pokedex > ",
  });
  // display the prompt 
  rl.prompt();
  // listen to the input
  rl.on('line', (line) => {
    if (line === "") {
      rl.prompt();
      return;
    }
    const args: string[] = cleanInput(line);
    const commands = getCommands();
    const command = commands[args[0]];
    // if command is found -> call it, if not -> print the information
    if (command) {
      try {
        command.callback(commands);
      }
      catch (err) {
        console.log(err);
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}
