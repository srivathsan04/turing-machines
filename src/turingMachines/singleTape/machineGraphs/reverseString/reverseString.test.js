import assert from "node:assert";
import { describe, it } from "node:test";
import reverseString from "./index.js";
import { runSingleTapeTM } from "../../runner/index.js";
import { singleTapeTuringMachine } from "../../machine/index.js";

describe("Reverse String", () => {
  it("should run the Turing Machine until it reaches a final state", () => {
    const machine = singleTapeTuringMachine({
      input: "1010",
      transitions: reverseString,
      startingState: "q0",
    });

    const finalMachine = runSingleTapeTM(machine);

    assert.strictEqual(finalMachine.state, "accept");
    assert.deepStrictEqual(finalMachine.tape, ["0", "1", "0", "1", " "]);
  });

  it("should run the Turing Machine until it reaches a reject state", () => {
    const machine = singleTapeTuringMachine({
      input: "10p1",
      transitions: reverseString,
      startingState: "q0",
    });

    const finalMachine = runSingleTapeTM(machine);

    assert.strictEqual(finalMachine.state, "reject");
  });
});
