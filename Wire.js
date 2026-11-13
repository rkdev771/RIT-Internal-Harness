export class Wire {
  constructor(name, endpointA, endpointB) {
    this.name = name;
    /*
    endpoint object example
    endpoint = {nodeName: String, pin: Number}
    */
    this.endpointA = endpointA;
    this.endpointB = endpointB;
  }

  /*
  consider an overarching class like BreadBoard or smthn that will interface the other classes together
  will likely be needed for validation and there needs to be a class for overall board state anyway
  */

  /*
  validation function
    confirms that the pin exists
    confirms the pin isnt already connected
    confirms the pin isnt connected to itself
  */
}
