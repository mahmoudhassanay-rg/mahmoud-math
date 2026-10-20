/* Safe maths expression parser for the function grapher (no eval).
   Supports: + − * / ^, brackets, |x|, implicit multiplication (2x, 3(x+1), 2sin x),
   functions sin cos tan sec csc cot asin acos atan sqrt √ abs ln log exp floor ceil,
   constants pi/π and e. Angles are in radians. */
(function (root) {
  "use strict";

  var FUNCS = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    sec: function (x) { return 1 / Math.cos(x); },
    csc: function (x) { return 1 / Math.sin(x); },
    cot: function (x) { return 1 / Math.tan(x); },
    asin: Math.asin, acos: Math.acos, atan: Math.atan,
    sqrt: Math.sqrt, abs: Math.abs, ln: Math.log, log: Math.log10, exp: Math.exp,
    floor: Math.floor, ceil: Math.ceil
  };
  var CONSTS = { pi: Math.PI, e: Math.E };
  var NAMES = Object.keys(FUNCS).concat(Object.keys(CONSTS), ["x"])
    .sort(function (a, b) { return b.length - a.length; });

  function tokenize(src) {
    var s = String(src)
      .replace(/[−–]/g, "-").replace(/×|·/g, "*").replace(/÷/g, "/")
      .replace(/π/g, "pi").replace(/√/g, "sqrt").replace(/²/g, "^2").replace(/³/g, "^3")
      .toLowerCase();
    var tokens = [], i = 0;
    while (i < s.length) {
      var c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (/[0-9.]/.test(c)) {
        var m = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/.exec(s.slice(i));
        if (!m) throw new Error("Bad number");
        tokens.push({ t: "num", v: parseFloat(m[0]) });
        i += m[0].length; continue;
      }
      if (/[a-z]/.test(c)) {
        var found = null;
        for (var k = 0; k < NAMES.length; k++) {
          if (s.substr(i, NAMES[k].length) === NAMES[k]) { found = NAMES[k]; break; }
        }
        if (!found) throw new Error("Unknown name at “" + s.slice(i, i + 6) + "”");
        tokens.push({ t: FUNCS[found] ? "fn" : "id", v: found });
        i += found.length; continue;
      }
      if ("+-*/^()|".indexOf(c) >= 0) { tokens.push({ t: c }); i++; continue; }
      throw new Error("Unexpected “" + c + "”");
    }
    return tokens;
  }

  // Returns a function f(x) built from closures.
  function compile(src) {
    var tokens = tokenize(src), pos = 0, absDepth = 0;
    if (!tokens.length) throw new Error("Empty expression");
    function peek() { return tokens[pos]; }
    function eat(t) {
      var tok = tokens[pos];
      if (!tok || tok.t !== t) throw new Error("Expected “" + t + "”");
      pos++; return tok;
    }
    function startsOperand(tok) {
      if (!tok) return false;
      if (tok.t === "|") return absDepth === 0; // an opening bar only
      return tok.t === "num" || tok.t === "id" || tok.t === "fn" || tok.t === "(";
    }
    function expr() {
      var left = term();
      while (peek() && (peek().t === "+" || peek().t === "-")) {
        let op = tokens[pos++].t, a = left, b = term();
        left = op === "+" ? function (x) { return a(x) + b(x); } : function (x) { return a(x) - b(x); };
      }
      return left;
    }
    function term() {
      var left = unary();
      for (;;) {
        var tok = peek();
        if (tok && (tok.t === "*" || tok.t === "/")) {
          pos++;
          let a = left, b = unary();
          left = tok.t === "*" ? function (x) { return a(x) * b(x); } : function (x) { return a(x) / b(x); };
        } else if (startsOperand(tok)) { // implicit multiplication
          let a2 = left, b2 = power();
          left = function (x) { return a2(x) * b2(x); };
        } else break;
      }
      return left;
    }
    function unary() {
      var tok = peek();
      if (tok && tok.t === "-") { pos++; var a = unary(); return function (x) { return -a(x); }; }
      if (tok && tok.t === "+") { pos++; return unary(); }
      return power();
    }
    function power() {
      var base = primary();
      if (peek() && peek().t === "^") {
        pos++;
        var ex = unary(); // right-associative, allows 2^-x
        return function (x) { return Math.pow(base(x), ex(x)); };
      }
      return base;
    }
    function primary() {
      var tok = tokens[pos++];
      if (!tok) throw new Error("Unexpected end");
      if (tok.t === "num") { var v = tok.v; return function () { return v; }; }
      if (tok.t === "id") {
        if (tok.v === "x") return function (x) { return x; };
        var cv = CONSTS[tok.v]; return function () { return cv; };
      }
      if (tok.t === "fn") {
        var f = FUNCS[tok.v], arg;
        if (peek() && peek().t === "(") { pos++; arg = expr(); eat(")"); }
        else {
          // sin x, sin 2x: the argument is the product that follows (stops at another function)
          arg = power();
          while (peek() && (peek().t === "num" || peek().t === "id" || peek().t === "(")) {
            var p = arg, q = power();
            arg = (function (p, q) { return function (x) { return p(x) * q(x); }; })(p, q);
          }
        }
        // allow sin(x)^2
        if (peek() && peek().t === "^") {
          pos++; var ex = unary(), g = arg;
          return function (x) { return Math.pow(f(g(x)), ex(x)); };
        }
        return function (x) { return f(arg(x)); };
      }
      if (tok.t === "(") { var e = expr(); eat(")"); return e; }
      if (tok.t === "|") { absDepth++; var inner = expr(); absDepth--; eat("|"); return function (x) { return Math.abs(inner(x)); }; }
      throw new Error("Unexpected “" + tok.t + "”");
    }
    var fn = expr();
    if (pos < tokens.length) throw new Error("Unexpected “" + (tokens[pos].v || tokens[pos].t) + "”");
    return fn;
  }

  var api = { compile: compile, tokenize: tokenize };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.MathExpr = api;
})(this);
