
# Color Lines

A colorful and challenging game implemented in TypeScript where you need to strategically move balls to form lines and earn points.  
Game created as part of high school projects, inspired by balls games --> https://www.kurnik.pl/kulki/

## How to Play

1. Open the game in a compatible web browser.
2. Click on an occupied field to select a ball and then click on an empty and reachable field to move the selected ball to that location.
3. Form lines of balls of the same color horizontally, vertically, or diagonally to earn points.
4. You can preview the possible path of the ball before making a move.
5. The game ends when you have too many balls on the grid and no more valid moves can be made.
6. Aim for the highest score by creating long lines and making strategic moves!
   
## Features

- Interactive gameplay where you select and move balls to form lines.
- Path preview to help you plan your moves strategically.
- Score display to keep track of your points.
- Timer display to show how long you've been playing.
- Game ends when there are no more valid moves available.
- Shortest path algorithm (BFS)

## Code Overview

The game consists of the following main files:

- `index.ts`: Entry point that initializes the game and starts the timer.
- `spawner.ts`: Handles the game grid creation, ball spawning, pathfinding, and user interactions.
- `balls.ts`: Manages ball colors, drawing, and ball movement.
- `points.ts`: Calculates and updates the player's score.
- `shortest_path.ts`: Implements the pathfinding algorithm to preview possible ball movement paths.



## Getting Started

To run the project locally, follow these steps:

```bash
git clone https://github.com/MiernikA/Color-Lines.git
cd Color-Lines
npm install
```

Initialize the app with:

```bash
npm run dev
```
And open `index.html`

```bash
index.html
```

## Technologies Used

- HTML5
- CSS3
- TypeScript
- Webpack






