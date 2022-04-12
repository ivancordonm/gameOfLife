let resolution = 10;
let width = 600;
let height = 400;
let cols = width / resolution;
let rows = height / resolution;
let grid, next;

function create2DArray(rows, cols) {
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}

function setup() {
    createCanvas(width, height);

    frameRate(20);
    grid = create2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function countNeighbors(x, y) {
    let total = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            total += grid[col][row];
        }
    }
    return total - grid[x][y];
}



function draw() {
    console.log(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;

            if (grid[i][j] === 1) {
                fill(0);
                rect(x, y, resolution, resolution);
            } else {
                fill(255);
                rect(x, y, resolution, resolution);
            }
        }
    }

    next = create2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let neighbors = countNeighbors(i, j);
            if (state === 0 && neighbors === 3) next[i][j] = 1;
            else if (state === 1 && (neighbors < 2 || neighbors > 3)) next[i][j] = 0;
            else next[i][j] = state;
        }
    }

    grid = next;

}
