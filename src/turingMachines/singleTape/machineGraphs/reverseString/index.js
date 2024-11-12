const reverseString = {
  q0: {
    0: { write: "x", move: "R", nextState: "q1" }, // Mark leftmost 0 as x, move right
    1: { write: "x", move: "R", nextState: "q2" }, // Mark leftmost 1 as x, move right
    " ": { write: " ", move: "L", nextState: "q5" }, // Halt when blank (accepting state)
  },
  q1: {
    0: { write: "0", move: "R", nextState: "q1" }, // Skip over 0s to the right
    1: { write: "1", move: "R", nextState: "q1" }, // Skip over 1s to the right
    " ": { write: " ", move: "L", nextState: "q3" }, // Found end of input, move left
  },
  q2: {
    0: { write: "0", move: "R", nextState: "q2" }, // Skip over 0s to the right
    1: { write: "1", move: "R", nextState: "q2" }, // Skip over 1s to the right
    " ": { write: " ", move: "L", nextState: "q4" }, // Found end of input, move left
  },
  q3: {
    0: { write: "x", move: "L", nextState: "q0" }, // Replace last 0 with x, move to start
    x: { write: "x", move: "L", nextState: "q3" }, // Skip over x markers on the way left
    1: { write: "1", move: "L", nextState: "q3" }, // Skip over 1s on the way left
  },
  q4: {
    1: { write: "x", move: "L", nextState: "q0" }, // Replace last 1 with x, move to start
    x: { write: "x", move: "L", nextState: "q4" }, // Skip over x markers on the way left
    0: { write: "0", move: "L", nextState: "q4" }, // Skip over 0s on the way left
  },
  q5: {
    x: { write: " ", move: "R", nextState: "q6" }, // Replace x with blank, move right
    " ": { write: " ", move: "N", nextState: "accept" }, // Halt when blank (accepting state)
  },
  q6: {
    x: { write: "0", move: "R", nextState: "q6" }, // Replace x with 0, move right
    " ": { write: " ", move: "N", nextState: "accept" }, // Halt when blank (accepting state)
  },
  accept: {},
};

export default reverseString;
