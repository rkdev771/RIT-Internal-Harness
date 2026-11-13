import { Node } from "./Node.js";
import { Wire } from "./Wire.js";

export class Harness {
  constructor() {
    this.nodes = [];
    this.wires = [];
  }

  // Create a new node and add it to the list of nodes
  createNode(name, pinCount) {
    // Check if a node already uses this name.
    if (this.findNode(name) !== undefined) {
      console.log("node already exists...");
      return undefined;
    } else {
      const node = new Node(name, pinCount);
      this.nodes.push(node);
    }
  }

  createWire(name, nodeA, pinA, nodeB, pinB) {
    const endpointA = { nodeName: nodeA?.name, pin: pinA };
    const endpointB = { nodeName: nodeB?.name, pin: pinB };
    const wire = new Wire(name, endpointA, endpointB);
    const isValid = this.validateWire(wire);

    // Only store the wire if validation passed.
    if (isValid) {
      this.wires.push(wire);
    } else {
      console.log("invalid wire definition...");
      return undefined;
    }
  }

  // Access a specific node by name will return undefined if node isnt found HANDLE THAT
  findNode(targetName) {
    const node = this.nodes.find(node => node.name === targetName);
    // Check if no matching node was found.
    if (node === undefined) {
      return null;
      // the node will be an undefined no need for a return here
    }
    return node;
  }

  validateWire(wire) {
    const nodeA = this.findNode(wire.endpointA.nodeName);
    const nodeB = this.findNode(wire.endpointB.nodeName);
    // Reject the wire if either node is missing.
    if (nodeA === undefined || nodeB === undefined) {
      return false;
    }
    // Reject the wire if either pin is missing from its node.
    if (!nodeA.pins.has(wire.endpointA.pin) || !nodeB.pins.has(wire.endpointB.pin)) {
      return false;
    }
    // Reject connecting a pin to itself.
    if (wire.endpointA.nodeName === wire.endpointB.nodeName && wire.endpointA.pin === wire.endpointB.pin) {
      return false;
    }
    // Both pins must be unoccupied.
    return !this.isEndpointOccupied(wire.endpointA) && !this.isEndpointOccupied(wire.endpointB);
  }

  isEndpointOccupied(endpointC) {
    let isOccupied = false;
    for (const wire of this.wires) {
      // Check if either end of this wire matches the requested node and pin.
      if (
        (wire.endpointA.nodeName === endpointC.nodeName && wire.endpointA.pin === endpointC.pin) ||
        (wire.endpointB.nodeName === endpointC.nodeName && wire.endpointB.pin === endpointC.pin)
      ) {
        isOccupied = true;
      }
    }
    return isOccupied;
  }

}
