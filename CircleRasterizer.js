class CircleRasterizer {
    rasterize(center, radius) {
        let points = [];

        let xc = center.x;
        let yc = center.y;

        let x = 0;
        let y = radius;
        let p = 1 - radius;

        function addPoints(x, y) {
            points.push(new Point(xc + x, yc + y));
            points.push(new Point(xc - x, yc + y));
            points.push(new Point(xc + x, yc - y));
            points.push(new Point(xc - x, yc - y));
            points.push(new Point(xc + y, yc + x));
            points.push(new Point(xc - y, yc + x));
            points.push(new Point(xc + y, yc - x));
            points.push(new Point(xc - y, yc - x));
        }

        addPoints(x, y);

        while (x < y) {
            x++;

            if (p < 0) {
                p += 2 * x + 1;
            } else {
                y--;
                p += 2 * (x - y) + 1;
            }

            addPoints(x, y);
        }

        return points;
    }
}