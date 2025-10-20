import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(word => word !== "");
}

export function startREPL(state: State): void {
  const { rlInterface, commandsRegistery } = state;
  // display the prompt 
  rlInterface.prompt();
  // listen to the input
  rlInterface.on('line', (line) => {
    if (line === "") {
      rlInterface.prompt();
      return;
    }
    const args: string[] = cleanInput(line);
    const command = commandsRegistery[args[0]];
    // if command is found -> call it, if not -> print the information
    if (command) {
      try {
        command.callback(state);
      }
      catch (err) {
        console.log(err);
      }
    } else {
      console.log("Unknown command");
    }

    rlInterface.prompt();
  });
}
