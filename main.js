const ctx = document.getElementById("canvas").getContext("2d");

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.scale(20, 20); // scale one unit to 20 pixels in both directions

const t = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1]
];

function draw() {
    clearCanvas()
    ctx.fillStyle = "#E633FF"
    t.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val === 1) {
                ctx.fillRect(x + gameState.pos.x, y + gameState.pos.y, 1, 1);
            }
        });
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        gameState.pos.x--;
        draw();
    } else if (event.key === 'ArrowRight') {
        gameState.pos.x++;
        draw();
    } else if (event.key === 'ArrowUp') {
        // spin
    } else if (event.key === 'ArrowDown') {
        gameState.pos.y++;
        draw();
    } else if (event.key === ' ') {
        // drop
    }
});

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let lastTimestamp = 0;
function dropPiece() {
    clearCanvas();
    draw(0, gameState.pos.y++);
}

function tick(timestamp) {
    const elapsed = timestamp - lastTimestamp;
    if (elapsed > 1000) {
        dropPiece();
        lastTimestamp = timestamp;
        // console.log(timestamp)
    }

    window.requestAnimationFrame(tick);
}

let gridDimmension = {width: 10, height: 20};
const gridInst = new Array(gridDimmension.height).fill(0).map(() => new Array(gridDimmension.width).fill(0)); 

let gameState = {
    tetromino: t,
    pos: {x: 0, y: 0},
    grid: gridInst
};

window.requestAnimationFrame(tick);