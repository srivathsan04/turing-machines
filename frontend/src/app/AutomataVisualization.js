import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

const AutomataVisualization = ({ transitions, currentState }) => {
  const cyRef = useRef(null);

  useEffect(() => {
    const elements = [];

    // Add nodes
    Object.keys(transitions).forEach((state) => {
      elements.push({ data: { id: state, label: state } });
    });

    // Add edges
    Object.keys(transitions).forEach((state) => {
      Object.keys(transitions[state]).forEach((symbol) => {
        const { nextState } = transitions[state][symbol];
        elements.push({
          data: {
            source: state,
            target: nextState,
            label: `${symbol} -> ${transitions[state][symbol].write}, ${transitions[state][symbol].move}`,
          },
        });
      });
    });

    cyRef.current = cytoscape({
      container: document.getElementById("cy"),
      elements,
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "text-valign": "center",
            "text-halign": "center",
            "background-color": "#666",
            color: "#fff",
            "font-size": "12px",
            width: "40px",
            height: "40px",
          },
        },
        {
          selector: "edge",
          style: {
            label: "data(label)",
            width: 2,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            "font-size": "10px",
            color: "#000",
          },
        },
        {
          selector: `node[id = "${currentState}"]`,
          style: {
            "background-color": "red",
          },
        },
      ],
      layout: {
        name: "grid",
        rows: 1,
      },
    });

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [transitions, currentState]);

  return (
    <div
      id="cy"
      style={{ width: "600px", height: "400px", margin: "0 auto" }}
    />
  );
};

export default AutomataVisualization;
