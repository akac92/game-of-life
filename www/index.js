import { Universe, Cell } from "game-of-life";

const CELL_SIZE = 5; // px
const CELL_SIZE_ = CELL_SIZE + 1;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

// Construct the universe, and get its width and height
const universe = Universe.new();
const width = universe.width();
const height = universe.height();

// Get 2D context of our sized canvas DOM object
const canvas = document.getElementById("game-of-life-canvas");
// Give the canvas room for all of our cells and a 1px border around each of them.
canvas.height = CELL_SIZE_ * height + 1;
canvas.width = CELL_SIZE_ * width + 1;
const ctx = canvas.getContext('2d');

// Draw equal-distant overlapping vertical and horizontal lines to create the grid overlay
const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;
  
    // Define constant coordinates
    const x_begin = 0;
    const x_end = CELL_SIZE_ * width + 1;

    const y_begin = 0;
    const y_end = CELL_SIZE_ * height + 1;
    
    // Draw vertical lines
    for (let i = 0; i <= width; i++) {
        const X = i * CELL_SIZE_ + 1;
        ctx.moveTo(X, y_begin);
        ctx.lineTo(X, y_end);
    }
  
    // Draw horizontal lines
    for (let j = 0; j <= height; j++) {
        const Y = j * CELL_SIZE_ + 1;
        ctx.moveTo(x_begin, Y);
        ctx.lineTo(x_end, Y);
    }
  
    ctx.stroke();
};

const renderLoop = () => {
    universe.tick();

    drawGrid();
    drawCells();

    requestAnimationFrame(renderLoop);
}

// Start loop
requestAnimationFrame(renderLoop);