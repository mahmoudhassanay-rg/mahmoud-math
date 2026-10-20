/* Exact trigonometric values for special angles (multiples of 30° and 45°).
   Used by the unit-circle explorer and checked in tests/verify-math.js. */
(function (root) {
  "use strict";
  // Reference-angle values in the first quadrant.
  var BASE = {
    0:  { sin: "0",    cos: "1",    tan: "0" },
    30: { sin: "1/2",  cos: "√3/2", tan: "√3/3" },
    45: { sin: "√2/2", cos: "√2/2", tan: "1" },
    60: { sin: "√3/2", cos: "1/2",  tan: "√3" },
    90: { sin: "1",    cos: "0",    tan: "undefined" }
  };
  function neg(s) { return s === "0" || s === "undefined" ? s : "−" + s; }

  // Returns {sin, cos, tan, ref} as strings, or null if not a special angle.
  function exact(deg) {
    var d = ((Math.round(deg) % 360) + 360) % 360;
    if (d % 30 !== 0 && d % 45 !== 0) return null;
    var ref, sx, sy;
    if (d <= 90) { ref = d; sx = 1; sy = 1; }
    else if (d <= 180) { ref = 180 - d; sx = -1; sy = 1; }
    else if (d <= 270) { ref = d - 180; sx = -1; sy = -1; }
    else { ref = 360 - d; sx = 1; sy = -1; }
    var b = BASE[ref];
    var sin = sy < 0 ? neg(b.sin) : b.sin;
    var cos = sx < 0 ? neg(b.cos) : b.cos;
    var tan = (sx * sy) < 0 ? neg(b.tan) : b.tan;
    return { sin: sin, cos: cos, tan: tan, ref: ref };
  }

  var api = { exact: exact };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.TrigExact = api;
})(this);
