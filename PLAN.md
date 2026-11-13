# Harness Script Prototype

Build a JavaScript terminal program using Node.js and readline for user input. Store everything in memory while the program runs. Add JSON saving/loading later.

## Data
- Nodes have unique names and a set of pins.
- Pin names must be unique within their node.
- Wires have a name and two endpoints, each specifying a node name and pin name.
- Store each wire once.

## Features
1. Create a node with pins.
2. Add pins to an existing node.
3. List nodes or inspect one node and its connections.
4. Create a named wire between two pins.
5. List wires and their endpoints.
6. Add deletion last: wires, pins, then nodes.

## Rules
- Both endpoint nodes and pins must exist.
- A pin cannot connect to itself.
- Block deleting connected nodes or pins until their wires are deleted.
- Decide whether wire names must be unique and whether pins can have multiple wires.

## First Goal
Create two nodes, connect their pins with a named wire, and display the connection from either node.
