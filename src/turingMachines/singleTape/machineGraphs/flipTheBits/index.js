export const flipTheBits = {
  q0: {
    0: { write: "1", move: "R", nextState: "q0" },
    1: { write: "0", move: "R", nextState: "q0" },
    " ": { write: " ", move: "L", nextState: "accept" },
  },
  accept: {},
};
