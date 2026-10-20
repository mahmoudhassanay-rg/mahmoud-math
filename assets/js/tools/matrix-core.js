/* Matrix maths used by the matrix calculator (and tested in tests/verify-math.js). */
(function (root) {
  "use strict";
  var EPS = 1e-10;

  function shape(A) { return [A.length, A[0].length]; }
  function same(A, B) { return A.length === B.length && A[0].length === B[0].length; }

  function add(A, B) {
    if (!same(A, B)) throw new Error("size");
    return A.map(function (r, i) { return r.map(function (v, j) { return v + B[i][j]; }); });
  }
  function sub(A, B) {
    if (!same(A, B)) throw new Error("size");
    return A.map(function (r, i) { return r.map(function (v, j) { return v - B[i][j]; }); });
  }
  function scale(A, k) { return A.map(function (r) { return r.map(function (v) { return v * k; }); }); }
  function mul(A, B) {
    if (A[0].length !== B.length) throw new Error("size");
    var out = [];
    for (var i = 0; i < A.length; i++) {
      out.push([]);
      for (var j = 0; j < B[0].length; j++) {
        var s = 0;
        for (var k = 0; k < B.length; k++) s += A[i][k] * B[k][j];
        out[i].push(s);
      }
    }
    return out;
  }
  function transpose(A) {
    return A[0].map(function (_, j) { return A.map(function (r) { return r[j]; }); });
  }
  // Determinant by cofactor expansion (exact for integer input up to 4x4).
  function det(A) {
    var n = A.length;
    if (n !== A[0].length) throw new Error("square");
    if (n === 1) return A[0][0];
    if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
    var d = 0;
    for (var j = 0; j < n; j++) {
      d += (j % 2 ? -1 : 1) * A[0][j] * det(minor(A, 0, j));
    }
    return d;
  }
  function minor(A, row, col) {
    return A.filter(function (_, i) { return i !== row; })
            .map(function (r) { return r.filter(function (_, j) { return j !== col; }); });
  }
  // Inverse via adjugate / determinant.
  function inverse(A) {
    var n = A.length, d = det(A);
    if (Math.abs(d) < EPS) throw new Error("singular");
    if (n === 1) return [[1 / d]];
    var adj = [];
    for (var i = 0; i < n; i++) {
      adj.push([]);
      for (var j = 0; j < n; j++) {
        // adj[i][j] = cofactor C[j][i]
        adj[i].push(((i + j) % 2 ? -1 : 1) * det(minor(A, j, i)) / d);
      }
    }
    return adj;
  }
  function power(A, p) {
    if (A.length !== A[0].length) throw new Error("square");
    var R = A.map(function (r, i) { return r.map(function (_, j) { return i === j ? 1 : 0; }); });
    for (var k = 0; k < p; k++) R = mul(R, A);
    return R;
  }

  // Pretty number: integers, simple fractions (denominator ≤ 1000) or decimals.
  function fmt(x) {
    if (!isFinite(x)) return String(x);
    if (Math.abs(x) < EPS) return "0";
    var r = Math.round(x);
    if (Math.abs(x - r) < 1e-9) return String(r).replace("-", "−");
    for (var q = 2; q <= 1000; q++) {
      var p = Math.round(x * q);
      if (Math.abs(x - p / q) < 1e-9) {
        return (p < 0 ? "−" : "") + Math.abs(p) + "/" + q;
      }
    }
    return String(+x.toFixed(4)).replace("-", "−");
  }

  var api = { add: add, sub: sub, scale: scale, mul: mul, transpose: transpose, det: det,
              inverse: inverse, power: power, fmt: fmt, shape: shape };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.MatrixCore = api;
})(this);
