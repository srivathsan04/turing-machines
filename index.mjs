import process from "process";
import { singleTM } from "./dist/turing-machines.umd.js";

if (process?.argv[1]?.includes("index.mjs")) {
  const [, , input, graph, ...flags] = process.argv;

  function printUsage() {
    console.log("Usage: node index.mjs <input> <graph> [flags]");
    console.log("Or");
    console.log("Usage: npm run start <input> <graph>  [--] [flags]\n");
    console.log("Input: The input string to run on the machine");
    console.log("Graphs:");
    console.log("\tcopyAndPaste: Copy and paste the input");
    console.log("\tflipTheBits: Flip the bits of the input");
    console.log("\treverseString: Reverse the input string");
    console.log("Flags:");
    console.log("\t--history: Print the history of the machine");
  }

  const graphToUse = singleTM.machineGraphs[graph] || null;

  if (input) {
    if (!graphToUse) {
      console.error(`Graph ${graph} not found!`);
      printUsage();
      process.exit(1);
    }

    const machine = singleTM.machine({
      input,
      transitions: graphToUse.transitions,
      startingState: graphToUse.startingState,
    });

    const result = singleTM.runner(machine);

    console.log("Input :", input);
    console.log("Result:", result.tape.join(""));
    console.log("Steps :", result.history.stateHistory.length.toString());

    if (flags.includes("--history")) {
      console.log("\nHistory:");
      singleTM.printHistory(result);
    }
  } else {
    console.error("No input provided!\n");
    printUsage();
    process.exit(1);
  }
}
