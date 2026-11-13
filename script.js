import * as readline from "node:readline/promises";
import { Harness } from "./Harness.js";

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const harness = new Harness();
  const ask = async (prompt) => (await rl.question(prompt)).trim();
  // Repeat the menu until the user chooses Exit.
  while (true) {
    console.log("\n1. Add node\n2. Add wire\n3. List nodes\n4. List wires\n5. Exit");
    const choice = await ask("Choose an option: ");

    if (choice === "1") {
      const name = await ask("Node name: ");
      const count = Number(await ask("Number of pins (starting at 0): "));
      // Require a name and a nonnegative whole-number count.
      if (!name || !Number.isSafeInteger(count) || count < 0) {
        console.log("Enter a name and a valid pin count.");
        continue;
      }
      harness.createNode(name, count);
    } else if (choice === "2") {
      const name = await ask("Wire name: ");
      const nodeAName = await ask("First node name: ");
      const pinA = Number(await ask("First pin number: "));
      const nodeBName = await ask("Second node name: ");
      const pinB = Number(await ask("Second pin number: "));
      // Check names and pin numbers before asking the harness to connect them.
      if (!name || !nodeAName || !nodeBName ||
          !Number.isSafeInteger(pinA) || !Number.isSafeInteger(pinB) || pinA < 0 || pinB < 0) {
        console.log("Enter names and valid pin numbers.");
        continue;
      }
      const nodeA = harness.findNode(nodeAName);
      const nodeB = harness.findNode(nodeBName);
      if (nodeA === undefined || nodeB === undefined) continue;
      harness.createWire(name, nodeA, pinA, nodeB, pinB);
    } else if (choice === "3") {
      if (harness.nodes.length === 0) console.log("No nodes yet.");
      for (const node of harness.nodes) {
        console.log(`${node.name}: pins ${[...node.pins].join(", ") || "(none)"}`);
      }
    } else if (choice === "4") {
      if (harness.wires.length === 0) console.log("No wires yet.");
      for (const wire of harness.wires) {
        console.log(`${wire.name}: ${wire.endpointA.nodeName} pin ${wire.endpointA.pin} <-> ${wire.endpointB.nodeName} pin ${wire.endpointB.pin}`);
      }
    } else if (choice === "5") {
      break;
    } else {
      console.log("Choose an option from 1 to 5.");
    }
  }
  rl.close();
}

await main();
