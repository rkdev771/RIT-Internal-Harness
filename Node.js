export class Node {

  constructor(name, pinCount) {
    this.name = name;
    this.pins = new Set();

    // Adds the amount of pins desired to the pins collection
    for (let i = 0; i < pinCount; i++) {
      this.pins.add(i);

    }
  }

  addPins(amount) {
    // Should add the amount of pins as unique subsequent numbers
    const size = this.pins.size;
    for (let i = size; i < size + amount; i++) {
      this.pins.add(i);
    }
  }

  printPins() {
    // A test method just to see how methods are done in js
    for (const pin of this.pins) {
      console.log(pin);
    }
  }

}
