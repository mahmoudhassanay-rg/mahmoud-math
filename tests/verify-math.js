#!/usr/bin/env node
/* =========================================================
   Verifies ALL the maths on the site:
   - daily challenges, binomial quiz, mock exams (MCQ + essay key results)
   - the grapher's expression parser, matrix calculator and exact trig values
   Every expected answer below is computed independently in code
   (polynomial expansion, numeric limits, matrix arithmetic…),
   then compared with what the site data says.
   Run:  node tests/verify-math.js
   ========================================================= */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const ctx = { window: {}, Math };
vm.createContext(ctx);
for (const f of ["challenges", "binomial-quiz", "exams", "resources"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js/data", f + ".js"), "utf8"), ctx);
}
const D = ctx.window.SITE_DATA;
const MathExpr = require("../assets/js/tools/expr.js");
const M = require("../assets/js/tools/matrix-core.js");
const TrigExact = require("../assets/js/tools/trig-exact.js");

let passed = 0, failed = 0;
function check(name, cond, info) {
  if (cond) passed++;
  else { failed++; console.error("✗ FAIL:", name, info !== undefined ? "→ " + JSON.stringify(info) : ""); }
}
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
const rad = (d) => (d * Math.PI) / 180;

// ---------- Exact helpers ----------
function nCr(n, r) {
  if (r < 0 || r > n) return 0;
  let c = 1n;
  for (let i = 1n; i <= BigInt(r); i++) c = (c * (BigInt(n) - i + 1n)) / i;
  return Number(c);
}
// Laurent polynomials in x: Map exponent -> integer coefficient (exact, BigInt)
function poly(terms) { const m = new Map(); for (const [e, c] of terms) m.set(e, (m.get(e) || 0n) + BigInt(c)); return m; }
function pmul(a, b) {
  const m = new Map();
  for (const [e1, c1] of a) for (const [e2, c2] of b) m.set(e1 + e2, (m.get(e1 + e2) || 0n) + c1 * c2);
  return m;
}
function ppow(p, n) { let r = poly([[0, 1]]); for (let i = 0; i < n; i++) r = pmul(r, p); return r; }
function coef(p, e) { return Number(p.get(e) || 0n); }
function terms(p) { return [...p.entries()].filter(([, c]) => c !== 0n).sort((a, b) => b[0] - a[0]); } // descending powers
// numeric limit by approaching from both sides
function limit(f, a) {
  const hs = [1e-4, 1e-5, 1e-6];
  const vals = hs.flatMap((h) => [f(a + h), f(a - h)]);
  return round(vals.reduce((s, v) => s + v, 0) / vals.length, 6);
}
function limitInf(f) { return f(1e8); }
function solveRealRoots(f, lo, hi, step = 1e-3) {
  // sign-change + exact-zero scan, refined by bisection
  const roots = [];
  let x0 = lo, f0 = f(x0);
  for (let x = lo + step; x <= hi + 1e-12; x += step) {
    const f1 = f(x);
    if (Number.isFinite(f0) && Number.isFinite(f1)) {
      if (f0 === 0) roots.push(x0);
      else if (f0 * f1 < 0) {
        let a = x0, b = x;
        for (let k = 0; k < 80; k++) { const m = (a + b) / 2; if (f(a) * f(m) <= 0) b = m; else a = m; }
        roots.push((a + b) / 2);
      }
    }
    x0 = x; f0 = f1;
  }
  return roots.map((r) => round(r, 6)).filter((r, i, arr) => arr.indexOf(r) === i);
}

// ---------- Generic MCQ check ----------
function checkMCQ(q, expected, label) {
  const correct = q.options[q.answer];
  const eq = (v) => (typeof expected === "string" ? v === expected : (expected === Infinity ? v === Infinity : close(v, expected, 1e-9)));
  check(label + " correct option matches computed answer (" + expected + ")", correct && eq(correct.v), correct && correct.v);
  const others = q.options.filter((o, i) => i !== q.answer && eq(o.v));
  check(label + " no distractor equals the answer", others.length === 0, others);
  check(label + " has 4 distinct options", new Set(q.options.map((o) => String(o.v))).size === 4);
}

// =========================================================
// 1. DAILY CHALLENGES
// =========================================================
const challengeExpected = {
  c01: coef(ppow(poly([[0, 1], [1, 2]]), 5), 3),                         // (1+2x)^5, x^3
  c02: solveRealRoots((x) => Math.log2(x) + Math.log2(x - 2) - 3, 2.0001, 50)[0],
  c03: limit((x) => (x * x - 4) / (x - 2), 2),
  c04: (Math.acos((5 ** 2 + 3 ** 2 - 7 ** 2) / (2 * 5 * 3)) * 180) / Math.PI,
  c05: M.power([[1, 1], [0, 1]], 5)[0][1],
  c06: (() => { const t = terms(ppow(poly([[1, 1], [-1, 1]]), 8)); return Number(t[4][1]); })(), // 9 terms, 5th is middle
  c07: solveRealRoots((x) => 3 ** (x + 1) - 81, -10, 10)[0],
  c08: ((x) => 2 * x - 3)(3 ** 2),
  c09: [...ppow(poly([[1, 3], [0, -1]]), 4).values()].reduce((s, c) => s + Number(c), 0),
  c10: limit((x) => Math.sin(3 * x) / x, 0),
  c11: round((10 * Math.sin(rad(45))) / Math.sin(rad(30)), 2),
  c12: coef(ppow(poly([[2, 1], [-1, 2]]), 6), 0),
  c13: Math.log(54) / Math.log(3) - Math.log(2) / Math.log(3),
  c14: M.det([[2, 3], [1, 4]])
};
for (const c of D.challenges) {
  const exp = challengeExpected[c.id];
  check("challenge " + c.id + " has an independent check", exp !== undefined);
  if (exp !== undefined) check("challenge " + c.id + " value", close(c.value, exp, 1e-6), { data: c.value, computed: exp });
}
// The bold answer at the start of each explanation must show the value
for (const c of D.challenges) {
  const v = String(c.value);
  check("challenge " + c.id + " explanation states the answer (en)", c.a.en.includes(v), c.a.en.slice(0, 60));
  check("challenge " + c.id + " explanation states the answer (ar)", c.a.ar.includes(v), c.a.ar.slice(0, 60));
}

// =========================================================
// 2. BINOMIAL QUIZ
// =========================================================
const quizExpected = {
  b01: ppow(poly([[1, 2], [0, 3]]), 7).size,                                             // number of terms
  b02: Number(terms(ppow(poly([[1, 1], [0, 2]]), 5))[2][1]),                              // 3rd term coefficient
  b03: coef(ppow(poly([[0, 1], [1, -1]]), 9), 4),
  b04: (() => { const t = terms(ppow(poly([[1, 1], [-1, -1]]), 10)); return Number(t[5][1]); })(), // 11 terms, 6th
  b05: coef(ppow(poly([[1, 1], [-2, 1]]), 9), 0),
  b06: [...ppow(poly([[1, 2], [0, -1]]), 6).values()].reduce((s, c) => s + Number(c), 0),
  b07: [...Array(100).keys()].find((n) => nCr(n, 2) === 45),
  b08: coef(ppow(poly([[0, 1], [1, 1]]), 12), 5) / coef(ppow(poly([[0, 1], [1, 1]]), 12), 4),
  b09: 1 + nCr(5, 1) * 0.01 + nCr(5, 2) * 0.01 ** 2,
  b10: [...Array(100).keys()].find((n) => n >= 4 && nCr(n, 2) === nCr(n, 4)),
  b11: [...Array(9).keys()].reduce((s, r) => s + nCr(8, r), 0),
  b12: coef(pmul(ppow(poly([[0, 1], [1, 1]]), 3), ppow(poly([[0, 1], [1, -1]]), 3)), 2)
};
for (const q of D.binomialQuiz) {
  const exp = quizExpected[q.id];
  check("quiz " + q.id + " has an independent check", exp !== undefined);
  if (exp !== undefined) checkMCQ(q, exp, "quiz " + q.id);
}
// extra sanity on b09: approximation is close to the true value
check("quiz b09 approximation within 2e-5 of exact", Math.abs(1.01 ** 5 - quizExpected.b09) < 2e-5);

// =========================================================
// 3. MOCK EXAMS
// =========================================================
const mcqExpected = {
  // Exam 1
  e1m1: ((x) => x * x - 1)(2 + 1),
  e1m2: Math.log2(32),
  e1m3: solveRealRoots((x) => 2 ** x - 1 / 8, -10, 10)[0],
  e1m4: limit((x) => (x * x - 9) / (x - 3), 3),
  e1m5: limitInf((x) => (3 * x * x + 1) / (x * x - 5)),
  e1m6: Math.sin(rad(30)) * Math.cos(rad(60)) + Math.cos(rad(30)) * Math.sin(rad(60)),
  e1m7: 8 / (1 / 2) / 2,                                   // a / sinA = 2r
  e1m8: coef(ppow(poly([[0, 1], [1, 3]]), 4), 2),
  e1m9: M.det([[3, -1], [2, 4]]),
  e1m10: (() => { const [r] = M.shape(M.mul([[1, 2, 3], [4, 5, 6]], [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]])); return r + "x" + M.mul([[1, 2, 3], [4, 5, 6]], [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]])[0].length; })(),
  // Exam 2
  e2m1: solveRealRoots((x) => 3 * x + 2 - 11, -100, 100)[0],
  e2m2: Math.log10(5) + Math.log10(20),
  e2m3: Math.log(8) / Math.log(4),
  e2m4: limit((x) => Math.sin(4 * x) / (2 * x), 0),
  e2m5: limit((x) => (x ** 3 - 1) / (x - 1), 1),
  e2m6: Math.cos(rad(22.5)) ** 2 - Math.sin(rad(22.5)) ** 2,
  e2m7: Math.tan(rad(75)),
  e2m8: ppow(poly([[1, 1], [0, 1]]), 12).size,
  e2m9: M.det(M.scale([[2, 0], [1, 3]], 2)),
  e2m10: (Math.acos((6 ** 2 + 8 ** 2 - 10 ** 2) / (2 * 6 * 8)) * 180) / Math.PI
};
const essayExpected = {
  e1s1: { x: solveRealRoots((x) => Math.log(x + 1) / Math.log(3) + Math.log(x - 1) / Math.log(3) - 1, 1.0001, 100)[0] },
  e1s2: { limit: limit((x) => (Math.sin(5 * x) + Math.tan(3 * x)) / (2 * x), 0) },
  e1s3: {
    c: round(Math.sqrt(5 ** 2 + 7 ** 2 - 2 * 5 * 7 * Math.cos(rad(60))), 2),
    area: round(0.5 * 5 * 7 * Math.sin(rad(60)), 2)
  },
  e1s4: { term: coef(ppow(poly([[1, 2], [-2, -1]]), 9), 0) },
  e2s1: { roots: solveRealRoots((x) => 2 ** (2 * x) - 5 * 2 ** x + 4, -10, 10, 1e-3) },
  e2s2: { limit: limit((x) => (x ** 5 - 32) / (x ** 2 - 4), 2) },
  e2s3: {
    A: 180 - 40 - 75,
    b: round((12 * Math.sin(rad(40))) / Math.sin(rad(65)), 2),
    c: round((12 * Math.sin(rad(75))) / Math.sin(rad(65)), 2)
  },
  e2s4: { AB: M.mul([[1, 2], [3, 4]], [[2, 0], [1, 1]]), Ainv: M.inverse([[1, 2], [3, 4]]) }
};
function deepClose(a, b) {
  if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every((v, i) => deepClose(v, b[i]));
  return close(a, b, 1e-6);
}
for (const ex of D.exams) {
  const mcqMarks = ex.mcq.reduce((s, q) => s + q.marks, 0);
  const essayMarks = ex.essay.reduce((s, q) => s + q.marks, 0);
  check(ex.id + " format is 50% MCQ / 50% essay", mcqMarks === essayMarks, { mcqMarks, essayMarks });
  for (const q of ex.mcq) {
    const exp = mcqExpected[q.id];
    check(ex.id + " " + q.id + " has an independent check", exp !== undefined);
    if (exp !== undefined) checkMCQ(q, exp, ex.id + " " + q.id);
  }
  for (const q of ex.essay) {
    const exp = essayExpected[q.id];
    check(ex.id + " " + q.id + " has an independent check", exp !== undefined);
    if (!exp) continue;
    for (const c of q.checks) {
      check(q.id + "." + c.name + " key result is correct", c.name in exp && deepClose(c.value, exp[c.name]), { data: c.value, computed: exp[c.name] });
      check(q.id + "." + c.name + " result is shown in model answer (en)", q.model.en.includes(c.show), c.show);
      check(q.id + "." + c.name + " result is shown in model answer (ar)", q.model.ar.includes(c.show), c.show);
    }
    check(q.id + " every computed result has a data check", Object.keys(exp).every((k) => q.checks.some((c) => c.name === k)));
  }
}
// Intermediate steps written in the model answers
check("e1s3 intermediate: c² = 39", close(25 + 49 - 2 * 5 * 7 * Math.cos(rad(60)), 39));
check("e1s4 intermediate: r = 3, 9C3·2^6 = 84·64", nCr(9, 3) === 84 && 84 * 64 === 5376);
check("e2s2 intermediate: 5·2^4 / (2·2) = 20", (5 * 2 ** 4) / (2 * 2) === 20);
check("e2s4 intermediate: |A| = −2", M.det([[1, 2], [3, 4]]) === -2);
check("e1m7: circumradius via sine rule", close(8 / Math.sin(rad(30)) / 2, 8));

// =========================================================
// 4. TOOLS: expression parser, matrix core, exact trig
// =========================================================
const exprCases = [
  ["2x+1", 3, 7], ["x^2", -3, 9], ["-x^2", 3, -9], ["2^-1", 0, 0.5], ["2^3^2", 0, 512],
  ["3(x+1)", 2, 9], ["(x+1)(x-1)", 4, 15], ["sin(pi/2)", 0, 1], ["2sin(x)", Math.PI / 6, 1],
  ["sin x", Math.PI / 2, 1], ["sin 2x", Math.PI / 4, 1], ["sin(x)^2+cos(x)^2", 1.234, 1],
  ["|x-5|", 2, 3], ["sqrt(16)", 0, 4], ["√x", 9, 3], ["ln(e)", 0, 1], ["log(1000)", 0, 3],
  ["x²+1", 2, 5], ["1/x", 4, 0.25], ["2pi", 0, 2 * Math.PI], ["e^x", 1, Math.E], ["10 - 2 - 3", 0, 5],
  ["12/3/2", 0, 2], ["abs(-x)", 5, 5], ["x sin x", Math.PI / 2, Math.PI / 2], ["2|x|", -3, 6]
];
for (const [src, x, want] of exprCases) {
  let got;
  try { got = MathExpr.compile(src)(x); } catch (e) { got = "ERR " + e.message; }
  check("parser: " + src + " at x=" + x, typeof got === "number" && close(got, want), got);
}
for (const bad of ["2+", "sin(", "foo(x)", "x)", "()"]) {
  let threw = false;
  try { MathExpr.compile(bad); } catch (e) { threw = true; }
  check("parser rejects “" + bad + "”", threw);
}

const A3 = [[2, -1, 0], [1, 3, 2], [0, 1, 4]];
check("matrix det 3x3", M.det(A3) === 2 * (12 - 2) - -1 * (4 - 0) + 0, M.det(A3));
const I3 = M.mul(A3, M.inverse(A3));
check("matrix A·A⁻¹ = I (3x3)", I3.every((r, i) => r.every((v, j) => close(v, i === j ? 1 : 0, 1e-9))), I3);
check("matrix transpose", JSON.stringify(M.transpose([[1, 2, 3], [4, 5, 6]])) === JSON.stringify([[1, 4], [2, 5], [3, 6]]));
check("matrix 4x4 det", M.det([[1, 0, 2, -1], [3, 0, 0, 5], [2, 1, 4, -3], [1, 0, 5, 0]]) === 30);
check("matrix fmt fractions", M.fmt(1.5) === "3/2" && M.fmt(-0.5) === "−1/2" && M.fmt(2) === "2" && M.fmt(1 / 3) === "1/3");
let singular = false;
try { M.inverse([[1, 2], [2, 4]]); } catch (e) { singular = true; }
check("matrix inverse rejects singular matrix", singular);

function evalExact(s) {
  if (s === "undefined") return NaN;
  const m = /^(−)?(\d+)?(?:√(\d+))?(?:\/(\d+))?$/.exec(s);
  if (!m) return "PARSE";
  let v = (m[2] ? +m[2] : 1) * (m[3] ? Math.sqrt(+m[3]) : 1) / (m[4] ? +m[4] : 1);
  return m[1] ? -v : v;
}
for (let d = 0; d <= 360; d += 15) {
  const ex = TrigExact.exact(d);
  if (d % 30 && d % 45) { check("trig " + d + "° not special", ex === null); continue; }
  check("trig sin " + d + "°", close(evalExact(ex.sin), Math.sin(rad(d)), 1e-12) || Math.abs(Math.sin(rad(d))) < 1e-12 && ex.sin === "0", ex.sin);
  check("trig cos " + d + "°", close(evalExact(ex.cos), Math.cos(rad(d)), 1e-12) || Math.abs(Math.cos(rad(d))) < 1e-12 && ex.cos === "0", ex.cos);
  if (d % 180 === 90) check("trig tan " + d + "° undefined", ex.tan === "undefined");
  else check("trig tan " + d + "°", close(evalExact(ex.tan), Math.tan(rad(d)), 1e-9) || Math.abs(Math.tan(rad(d))) < 1e-12 && ex.tan === "0", ex.tan);
}

// Formula sheet spot-checks (identities hold at random angles / values)
for (let k = 0; k < 20; k++) {
  const A = Math.random() * 3, B = Math.random() * 3, x = 1 + Math.random() * 9, y = 1 + Math.random() * 9, a = 2 + Math.random() * 5;
  check("identity sin(A+B)", close(Math.sin(A + B), Math.sin(A) * Math.cos(B) + Math.cos(A) * Math.sin(B), 1e-9));
  check("identity cos(A−B)", close(Math.cos(A - B), Math.cos(A) * Math.cos(B) + Math.sin(A) * Math.sin(B), 1e-9));
  check("identity tan(A+B)", close(Math.tan(A + B), (Math.tan(A) + Math.tan(B)) / (1 - Math.tan(A) * Math.tan(B)), 1e-6));
  check("identity cos2A", close(Math.cos(2 * A), 1 - 2 * Math.sin(A) ** 2, 1e-9));
  check("log product rule", close(Math.log(x * y) / Math.log(a), Math.log(x) / Math.log(a) + Math.log(y) / Math.log(a), 1e-9));
  check("change of base", close((Math.log(x) / Math.log(a)) * (Math.log(a) / Math.log(x)), 1, 1e-9));
  const n = 2 + Math.floor(Math.random() * 5), p = 1 + Math.random() * 3;
  check("standard limit n·a^(n−1)", close(limit((t) => (t ** n - p ** n) / (t - p), p), n * p ** (n - 1), 1e-5));
}
for (let n = 1; n <= 12; n++) {
  check("sum of nCr = 2^n (n=" + n + ")", [...Array(n + 1).keys()].reduce((s, r) => s + nCr(n, r), 0) === 2 ** n);
  for (let r = 1; r <= n; r++) check("ratio rule n=" + n + " r=" + r, close(nCr(n, r) / nCr(n, r - 1), (n - r + 1) / r));
}

// Every chapter has a formula sheet
for (const ch of D.chapters) check("chapter " + ch.id + " has formulas", ch.formulas.length >= 5);

console.log(`\n${passed} checks passed, ${failed} failed.`);
process.exit(failed ? 1 : 0);
