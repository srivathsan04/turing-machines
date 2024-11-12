"use client";
import { useState } from "react";
import { singleTM } from "../../../../turing-machines/src/turingMachines/singleTape/index"; // Adjust the path accordingly
import AutomataVisualization from "./AutomataVisualization"; // Import the visualization component

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [currentState, setCurrentState] = useState("");

  const runTuringMachine = () => {
    const { machine, runner, machineGraphs } = singleTM;
    const { transitions, startingState } = machineGraphs.flipTheBits;

    let tape = input.split("");
    let state = startingState;
    let head = 0;
    let history = [];

    while (state !== "halt") {
      const symbol = tape[head] || " ";
      const transition = transitions[state][symbol];

      if (!transition) break;

      tape[head] = transition.write;
      head += transition.move === "R" ? 1 : -1;
      state = transition.nextState;

      // Capture the current state of the machine
      history.push({
        tape: tape.join(""),
        state,
        head,
      });
    }

    setOutput(tape.join(""));
    setHistory(history);
    setCurrentState(state);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        1's Complement Turing Machine
      </h1>
      <div className="mb-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter binary string"
          className="border border-gray-300 p-2 rounded-lg w-full text-lg"
        />
        <button
          onClick={runTuringMachine}
          className="bg-blue-500 text-white p-2 rounded-lg mt-4 w-full hover:bg-blue-600"
        >
          Run Turing Machine
        </button>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Output</h2>
        <div className="border border-gray-300 p-4 rounded-lg text-lg">
          {output}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">History</h2>
        <ul className="list-disc list-inside">
          {history.map((step, index) => (
            <li key={index} className="mb-2">
              <strong>Step {index + 1}:</strong> Tape: {step.tape}, State:{" "}
              {step.state}, Head Position: {step.head}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8 ">
        <h2 className="text-2xl font-semibold mb-4">Automata Visualization</h2>
        <AutomataVisualization
          transitions={singleTM.machineGraphs.flipTheBits.transitions}
          currentState={currentState}
        />
      </div>
    </div>
  );
}
