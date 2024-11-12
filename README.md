##### Flip the Bits

For example, the included machine to flip the bits can be expressed graphically as:

![flipTheBits](./assets/images/flipBits.png)

The corresponding `StateTransitions`:

```ts
/**
 * Flips the bits in a binary string
 *
 * Σ = {0, 1}
 * Γ = {0, 1, Λ}
 * L(A) = (0, 1)*
 */
const flipTheBits = {
  A: {
    0: { write: "1", move: "R", nextState: "A" },
    1: { write: "0", move: "R", nextState: "A" },
    " ": { write: " ", move: "L", nextState: "accept" },
  },
  accept: {},
};
```
