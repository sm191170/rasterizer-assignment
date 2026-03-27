// DDA Line Drawing Algorithm Implementation

class DDARasterizer {
    rasterize(p1, p2) {
        let points = [];

        let x0 = p1.x;
        let y0 = p1.y;
        let x1 = p2.x;
        let y1 = p2.y;

        let dx = x1 - x0;
        let dy = y1 - y0;

        let steps = Math.max(Math.abs(dx), Math.abs(dy));

        let xInc = dx / steps;
        let yInc = dy / steps;

        let x = x0;
        let y = y0;

        for (let i = 0; i <= steps; i++) {
            points.push(new Point(Math.round(x), Math.round(y)));
            x += xInc;
            y += yInc;
        }

        return points;
    }
}