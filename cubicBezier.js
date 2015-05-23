var cubicBezier = function (p1x, p1y, p2x, p2y) {
    var that = this,
        p1 = {
            x: p1x,
            y: p1y
        },
        p2 = {
            x: p2x,
            y: p2y
        };
    ["x", "y"].forEach(function (axis) {
        that["C" + axis] = 3 * p1[axis];
        that["B" + axis] = 3 * (p2[axis] - p1[axis]) - that["C" + axis];
        that["A" + axis] = 1 - that["C" + axis] - that["B" + axis];
        that["Z" + axis] = function (t) {
            return t * (that["C" + axis] + t * (that["B" + axis] + t * that["A" + axis]));
        };
        that["dZ" + axis] = function (t) {
            return that["C" + axis] + t * (2 * that["B" + axis] + 3 * that["A" + axis] * t);
        };
        that["F" + axis] = function (f, r) {
            if (r === 'undefined') {
                r = 5;
            }
            var t = f,
                i = 0,
                z;
            while (i < r) {
                z = that["Z" + axis](t) - f;
                if (Math.abs(z) < 1e-3) {
                    break;
                }

                t = t - z / that["dZ" + axis](t);
                i = i + 1;
            }
            return t;
        };
    });
    return {
        compute: function (t) {
            return {
                x: that.Zx(t),
                y: that.Zy(t),
                dx: that.dZx(t),
                dy: that.dZy(t)
            };
        },
        computeFromX: function (x, r) {
            return this.compute(that.Fx(x, r));
        },
        computeFromY: function (y, r) {
            return this.compute(that.Fy(y, r));
        }
    };
};
