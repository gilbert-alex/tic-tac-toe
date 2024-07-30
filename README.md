# Tic-tac-toe

## Summary
A 2-player tic-tac-toe browser game created as part of The Odin Project's curriculum. A full description of the project can be found [here](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe#project-solution).

## Usage
Click 'new game' to begin after optionally changing the player names. The game state and display is updated on each X or O click. 

## Discussion of Code and Concepts Used
The purpose of creating this project was to practice encapsulating a code base into factory functions and module patters (IIFE).

The game play code is encapsulated into an IIFE named Tic-Tac-Toe which contains three factory functions; GameBoard, BoardSpace, and GameController. 

The game UI uses the ScreenController function to connect to the game play which serves two purposes. One, to initialize a tic-tac-toe object, and two, add an if else logic tree to each button which interacts with the current state of the tic-tac-toe object. 

## Planned updates
- I'll make the UI better but have prioritized OOP practice
- A reset button to start a new game without refreshing the browser
- This would be a good place to learn CSS animations 
- Potentially include an AI opponent
