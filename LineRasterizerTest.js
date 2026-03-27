// Global variables
const GRID_SIZE = 50;
const CELL_SIZE = 10;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
const ENDPOINT_RADIUS = 8;

let endpoint1;
let endpoint2;
let dragging = null;

// Change here to test
let mode = "circle";        // "line" or "circle"
let lineAlgo = "bresenham";     // "dda" or "bresenham"

let rasterizer;

function setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    
    endpoint1 = new Point(10, 10);
    endpoint2 = new Point(40, 35);
}

function draw() {
    background(255);
    
    // Draw grid
    stroke(220);
    strokeWeight(1);
    for (let i = 0; i <= GRID_SIZE; i++) {
        line(i * CELL_SIZE, 0, i * CELL_SIZE, CANVAS_SIZE);
        line(0, i * CELL_SIZE, CANVAS_SIZE, i * CELL_SIZE);
    }

    let rasterizedPixels = [];

    // 🔹 LINE MODE
    if (mode === "line") {

        if (lineAlgo === "dda") {
            rasterizer = new DDARasterizer();
        } else {
            rasterizer = new BresenhamRasterizer();
        }

        rasterizedPixels = rasterizer.rasterize(endpoint1, endpoint2);

        // Draw reference line
        stroke(255, 0, 0);
        strokeWeight(1);
        line(endpoint1.x * CELL_SIZE + CELL_SIZE/2, 
             endpoint1.y * CELL_SIZE + CELL_SIZE/2,
             endpoint2.x * CELL_SIZE + CELL_SIZE/2, 
             endpoint2.y * CELL_SIZE + CELL_SIZE/2);
    }

    // 🔹 CIRCLE MODE
    else if (mode === "circle") {
        const center = endpoint1;
        const radius = Math.abs(endpoint2.x - endpoint1.x);

        rasterizedPixels = new CircleRasterizer().rasterize(center, radius);
    }

    // Draw pixels
    fill(100, 150, 255, 150);
    noStroke();
    for (let p of rasterizedPixels) {
        rect(p.x * CELL_SIZE, p.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }

    // Draw endpoints
    fill(255, 100, 100);
    stroke(200, 50, 50);
    strokeWeight(2);

    ellipse(endpoint1.x * CELL_SIZE + CELL_SIZE/2, 
            endpoint1.y * CELL_SIZE + CELL_SIZE/2, 
            ENDPOINT_RADIUS * 2, ENDPOINT_RADIUS * 2);

    ellipse(endpoint2.x * CELL_SIZE + CELL_SIZE/2, 
            endpoint2.y * CELL_SIZE + CELL_SIZE/2, 
            ENDPOINT_RADIUS * 2, ENDPOINT_RADIUS * 2);
}

function mousePressed() {
    const d1 = dist(mouseX, mouseY, 
                    endpoint1.x * CELL_SIZE + CELL_SIZE/2, 
                    endpoint1.y * CELL_SIZE + CELL_SIZE/2);
    if (d1 < ENDPOINT_RADIUS) {
        dragging = endpoint1;
        return;
    }
    
    const d2 = dist(mouseX, mouseY, 
                    endpoint2.x * CELL_SIZE + CELL_SIZE/2, 
                    endpoint2.y * CELL_SIZE + CELL_SIZE/2);
    if (d2 < ENDPOINT_RADIUS) {
        dragging = endpoint2;
        return;
    }
}

function mouseDragged() {
    if (dragging !== null) {
        const gridX = constrain(floor(mouseX / CELL_SIZE), 0, GRID_SIZE - 1);
        const gridY = constrain(floor(mouseY / CELL_SIZE), 0, GRID_SIZE - 1);
        
        dragging.x = gridX;
        dragging.y = gridY;
    }
}

function mouseReleased() {
    dragging = null;
}