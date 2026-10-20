/* Interactive tools page: tabs, binomial quiz, function grapher, matrix calculator, unit circle. */
(function () {
  "use strict";
  var bi = Site.bi, esc = Site.esc;

  // =========================================================
  // Tabs (also opens a tab from the URL hash, e.g. tools.html#grapher)
  // =========================================================
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tool-tab"));
  var onShow = {};
  function showTab(id, push) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("aria-controls") === id;
      t.setAttribute("aria-selected", on);
      document.getElementById(t.getAttribute("aria-controls")).classList.toggle("active", on);
    });
    if (push) history.replaceState(null, "", "#" + id);
    if (onShow[id]) onShow[id]();
  }
  tabs.forEach(function (t) {
    t.addEventListener("click", function () { showTab(t.getAttribute("aria-controls"), true); });
  });

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  // =========================================================
  // 1. Binomial theorem quiz
  // =========================================================
  (function quiz() {
    var bank = window.SITE_DATA.binomialQuiz;
    var body = document.getElementById("quiz-body");
    var scoreEl = document.getElementById("quiz-score");
    var bar = document.getElementById("quiz-progress");
    var order, idx, score, answered;
    var LETTERS = ["A", "B", "C", "D"];

    function start() {
      order = shuffle(bank).map(function (q) {
        return { q: q, opts: shuffle(q.options.map(function (o, i) { return { o: o, correct: i === q.answer }; })) };
      });
      idx = 0; score = 0;
      render();
    }
    function updateScore() {
      scoreEl.innerHTML = bi({ en: "Score: " + score + " / " + order.length, ar: "الدرجة: " + score + " / " + order.length });
      bar.style.width = (idx / order.length) * 100 + "%";
    }
    function render() {
      answered = false;
      updateScore();
      if (idx >= order.length) return finish();
      var item = order[idx];
      body.innerHTML =
        '<div class="quiz-q">' +
          '<div class="q-num">' + bi({ en: "Question " + (idx + 1) + " of " + order.length, ar: "السؤال " + (idx + 1) + " من " + order.length }) + "</div>" +
          '<div class="q-text">' + bi(item.q.q) + "</div>" +
          '<div class="options" role="group">' +
            item.opts.map(function (o, i) {
              return '<button class="option" type="button" data-i="' + i + '"><span class="opt-letter">' + LETTERS[i] + '</span><span class="math">' + o.o.h + "</span></button>";
            }).join("") +
          "</div>" +
          '<div class="feedback" aria-live="polite"></div>' +
        "</div>" +
        '<div class="btn-row"><button class="btn btn-primary" id="quiz-next" type="button" disabled>' +
          bi(idx === order.length - 1 ? { en: "See result", ar: "اعرض النتيجة" } : { en: "Next question →", ar: "السؤال التالي ←" }) + "</button></div>";
      body.querySelector(".options").addEventListener("click", choose);
      document.getElementById("quiz-next").addEventListener("click", function () { idx++; render(); });
    }
    function choose(e) {
      var btn = e.target.closest(".option");
      if (!btn || answered) return;
      answered = true;
      var item = order[idx];
      var i = +btn.getAttribute("data-i");
      var right = item.opts[i].correct;
      if (right) score++;
      body.querySelectorAll(".option").forEach(function (b, j) {
        b.disabled = true;
        if (item.opts[j].correct) b.classList.add("correct");
        else if (j === i) b.classList.add("wrong");
      });
      var fb = body.querySelector(".feedback");
      fb.className = "feedback show " + (right ? "ok" : "bad");
      fb.innerHTML = "<strong>" + bi(right ? { en: "✔ Correct!", ar: "✔ إجابة صحيحة!" } : { en: "✘ Not quite.", ar: "✘ إجابة غير صحيحة." }) + "</strong> " + bi(item.q.explain);
      document.getElementById("quiz-next").disabled = false;
      document.getElementById("quiz-next").focus();
      updateScore();
    }
    function finish() {
      bar.style.width = "100%";
      var pct = Math.round((score / order.length) * 100);
      var msg = pct >= 85 ? { en: "Excellent work! 🌟", ar: "ممتاز جدًا! 🌟" }
              : pct >= 60 ? { en: "Good job — review the explanations for the ones you missed.", ar: "شغل كويس — راجع شرح الأسئلة اللي غلطت فيها." }
              : { en: "Keep practising — revise the formula sheet and try again.", ar: "كمّل تدريب — راجع ورقة القوانين وجرّب تاني." };
      body.innerHTML = '<div class="center"><div class="score-big">' + score + " / " + order.length + "</div>" +
        '<p class="lead" style="margin:0 auto 1rem">' + pct + "% — " + bi(msg) + "</p>" +
        '<div class="btn-row" style="justify-content:center">' +
          '<button class="btn btn-primary" id="quiz-restart" type="button">' + bi({ en: "↻ Try again (new order)", ar: "↻ حاول تاني (بترتيب جديد)" }) + "</button>" +
          '<a class="btn btn-outline" href="formula-sheet.html?ch=binomial">' + bi({ en: "Binomial formula sheet", ar: "قوانين ذات الحدين" }) + "</a>" +
        "</div></div>";
      document.getElementById("quiz-restart").addEventListener("click", start);
    }
    start();
  })();

  // =========================================================
  // 2. Function grapher
  // =========================================================
  (function grapher() {
    var COLORS = ["#1d4ed8", "#dc2626", "#16a34a", "#9333ea", "#ea580c"];
    var canvas = document.getElementById("graph");
    var ctx = canvas.getContext("2d");
    var listEl = document.getElementById("fn-list");
    var coordEl = document.getElementById("coord");
    var view = { cx: 0, cy: 0, scale: 40 }; // scale = pixels per unit
    var fns = [];
    var W = 0, H = 0, dpr = 1;

    function addFn(src) {
      if (fns.length >= COLORS.length) return;
      var usedColors = fns.map(function (f) { return f.color; });
      var color = COLORS.filter(function (c) { return usedColors.indexOf(c) < 0; })[0];
      fns.push({ src: src || "", color: color, f: null, err: "" });
      renderList();
      compileAll();
    }
    function renderList() {
      listEl.innerHTML = fns.map(function (fn, i) {
        return '<div class="fn-row"><span class="swatch" style="background:' + fn.color + '"></span>' +
          '<span class="fn-label">y =</span>' +
          '<input type="text" value="' + esc(fn.src) + '" data-i="' + i + '" aria-label="Function ' + (i + 1) + '" spellcheck="false" autocomplete="off" autocapitalize="off">' +
          '<button class="btn btn-ghost btn-sm" type="button" data-remove="' + i + '" aria-label="Remove">✕</button></div>' +
          '<div class="err" id="fn-err-' + i + '"></div>';
      }).join("");
      document.getElementById("fn-add").disabled = fns.length >= COLORS.length;
    }
    function compileAll() {
      fns.forEach(function (fn, i) {
        fn.f = null; fn.err = "";
        if (fn.src.trim()) {
          try { fn.f = MathExpr.compile(fn.src); fn.f(1); }
          catch (e) { fn.f = null; fn.err = e.message; }
        }
        var el = document.getElementById("fn-err-" + i);
        if (el) el.textContent = fn.err;
      });
      draw();
    }
    listEl.addEventListener("input", function (e) {
      var i = e.target.getAttribute("data-i");
      if (i === null) return;
      fns[+i].src = e.target.value;
      compileAll();
    });
    listEl.addEventListener("click", function (e) {
      var r = e.target.closest("[data-remove]");
      if (!r) return;
      fns.splice(+r.getAttribute("data-remove"), 1);
      renderList(); compileAll();
    });
    document.getElementById("fn-add").addEventListener("click", function () {
      addFn("");
      var inputs = listEl.querySelectorAll("input");
      inputs[inputs.length - 1].focus();
    });

    function resize() {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      dpr = window.devicePixelRatio || 1;
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }
    function toPx(x, y) { return [W / 2 + (x - view.cx) * view.scale, H / 2 - (y - view.cy) * view.scale]; }
    function toWorld(px, py) { return [view.cx + (px - W / 2) / view.scale, view.cy - (py - H / 2) / view.scale]; }
    function niceStep(pxPerUnit) {
      var raw = 80 / pxPerUnit, p = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / p;
      return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * p;
    }
    function label(v, step) {
      var dp = Math.max(0, -Math.floor(Math.log10(step)));
      return (+v.toFixed(dp)).toString().replace("-", "−");
    }

    function draw() {
      if (!W) return;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, W, H);
      var step = niceStep(view.scale);
      var tl = toWorld(0, 0), br = toWorld(W, H);
      // minor grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#f1f5f9";
      var minor = step / 5;
      for (var x = Math.ceil(tl[0] / minor) * minor; x <= br[0]; x += minor) { var px = toPx(x, 0)[0]; ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, H); ctx.stroke(); }
      for (var y = Math.ceil(br[1] / minor) * minor; y <= tl[1]; y += minor) { var py = toPx(0, y)[1]; ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(W, py); ctx.stroke(); }
      // major grid + labels
      ctx.strokeStyle = "#e2e8f0";
      ctx.fillStyle = "#64748b";
      ctx.font = "11px Inter, system-ui, sans-serif";
      var origin = toPx(0, 0);
      var axisY = Math.min(Math.max(origin[1], 12), H - 4);   // where x labels sit
      var axisX = Math.min(Math.max(origin[0], 4), W - 30);   // where y labels sit
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      for (x = Math.ceil(tl[0] / step) * step; x <= br[0]; x += step) {
        px = toPx(x, 0)[0];
        ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, H); ctx.stroke();
        if (Math.abs(x) > step / 2) ctx.fillText(label(x, step), px, Math.min(axisY + 4, H - 14));
      }
      ctx.textAlign = "left"; ctx.textBaseline = "middle";
      for (y = Math.ceil(br[1] / step) * step; y <= tl[1]; y += step) {
        py = toPx(0, y)[1];
        ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(W, py); ctx.stroke();
        if (Math.abs(y) > step / 2) ctx.fillText(label(y, step), axisX + 5, py);
      }
      // axes
      ctx.strokeStyle = "#0f172a"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(0, origin[1]); ctx.lineTo(W, origin[1]); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(origin[0], 0); ctx.lineTo(origin[0], H); ctx.stroke();
      ctx.fillStyle = "#0f172a"; ctx.font = "italic 13px Georgia, serif";
      ctx.fillText("x", W - 14, origin[1] - 10);
      ctx.fillText("y", origin[0] + 8, 10);
      // functions
      fns.forEach(function (fn) {
        if (!fn.f) return;
        ctx.strokeStyle = fn.color; ctx.lineWidth = 2.5; ctx.lineJoin = "round";
        ctx.beginPath();
        var pen = false, prevY = null;
        for (var sx = 0; sx <= W; sx += 1) {
          var wx = toWorld(sx, 0)[0], wy;
          try { wy = fn.f(wx); } catch (e) { wy = NaN; }
          var syp = toPx(0, wy)[1];
          var ok = isFinite(wy) && Math.abs(syp) < 1e6;
          // break the line at asymptotes / jumps
          if (ok && pen && prevY !== null && Math.abs(syp - prevY) > H * 1.5) pen = false;
          if (ok) { if (pen) ctx.lineTo(sx, syp); else ctx.moveTo(sx, syp); pen = true; prevY = syp; }
          else { pen = false; prevY = null; }
        }
        ctx.stroke();
      });
    }

    // Pan (pointer drag) and zoom (wheel / buttons / pinch)
    var pointers = {}, lastDist = 0;
    canvas.addEventListener("pointerdown", function (e) { canvas.setPointerCapture(e.pointerId); pointers[e.pointerId] = [e.clientX, e.clientY]; });
    canvas.addEventListener("pointermove", function (e) {
      var rect = canvas.getBoundingClientRect();
      var w = toWorld(e.clientX - rect.left, e.clientY - rect.top);
      coordEl.textContent = "x: " + w[0].toFixed(2) + ", y: " + w[1].toFixed(2);
      if (!pointers[e.pointerId]) return;
      var ids = Object.keys(pointers);
      if (ids.length === 2) {
        pointers[e.pointerId] = [e.clientX, e.clientY];
        var a = pointers[ids[0]], b = pointers[ids[1]];
        var d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (lastDist) zoomAt((a[0] + b[0]) / 2 - rect.left, (a[1] + b[1]) / 2 - rect.top, d / lastDist);
        lastDist = d;
        return;
      }
      var p = pointers[e.pointerId];
      view.cx -= (e.clientX - p[0]) / view.scale;
      view.cy += (e.clientY - p[1]) / view.scale;
      pointers[e.pointerId] = [e.clientX, e.clientY];
      draw();
    });
    function up(e) { delete pointers[e.pointerId]; lastDist = 0; }
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    function zoomAt(px, py, factor) {
      var before = toWorld(px, py);
      view.scale = Math.min(5000, Math.max(2, view.scale * factor));
      var after = toWorld(px, py);
      view.cx += before[0] - after[0]; view.cy += before[1] - after[1];
      draw();
    }
    canvas.addEventListener("wheel", function (e) {
      e.preventDefault();
      var rect = canvas.getBoundingClientRect();
      zoomAt(e.clientX - rect.left, e.clientY - rect.top, e.deltaY < 0 ? 1.15 : 1 / 1.15);
    }, { passive: false });
    document.getElementById("zoom-in").addEventListener("click", function () { zoomAt(W / 2, H / 2, 1.4); });
    document.getElementById("zoom-out").addEventListener("click", function () { zoomAt(W / 2, H / 2, 1 / 1.4); });
    document.getElementById("zoom-reset").addEventListener("click", function () { view = { cx: 0, cy: 0, scale: 40 }; draw(); });
    document.getElementById("trig-view").addEventListener("click", function () { view = { cx: Math.PI, cy: 0, scale: Math.max(W / (2.6 * Math.PI), 20) }; draw(); });

    window.addEventListener("resize", resize);
    onShow.grapher = resize;
    addFn("x^2 - 2");
    addFn("2sin(x)");
  })();

  // =========================================================
  // 3. Matrix calculator
  // =========================================================
  (function matrix() {
    var M = window.MatrixCore;
    var state = {
      a: { rows: 2, cols: 2, vals: [[1, 2], [3, 4]] },
      b: { rows: 2, cols: 2, vals: [[2, 0], [1, 1]] }
    };
    var out = document.getElementById("m-result");

    ["a", "b"].forEach(function (k) {
      ["rows", "cols"].forEach(function (dim) {
        var sel = document.getElementById(k + "-" + dim);
        sel.innerHTML = [1, 2, 3, 4].map(function (n) { return "<option>" + n + "</option>"; }).join("");
        sel.value = state[k][dim];
        sel.addEventListener("change", function () { read(k); state[k][dim] = +sel.value; build(k); });
      });
      build(k);
    });

    function build(k) {
      var s = state[k], grid = document.getElementById(k + "-grid");
      grid.style.gridTemplateColumns = "repeat(" + s.cols + ", auto)";
      var html = "";
      for (var i = 0; i < s.rows; i++) for (var j = 0; j < s.cols; j++) {
        var v = s.vals[i] && s.vals[i][j] !== undefined ? s.vals[i][j] : 0;
        html += '<input type="text" inputmode="decimal" value="' + v + '" data-r="' + i + '" data-c="' + j + '" aria-label="' + k.toUpperCase() + " row " + (i + 1) + " column " + (j + 1) + '">';
      }
      grid.innerHTML = html;
    }
    // Accepts integers, decimals and fractions like 3/4 or −1/2
    function parseCell(str) {
      str = String(str).replace(/[−–]/g, "-").trim();
      if (str === "") return 0;
      var m = /^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/.exec(str);
      if (m) return +m[1] / +m[2];
      var n = Number(str);
      if (!isFinite(n)) throw new Error("cell");
      return n;
    }
    function read(k) {
      var s = state[k], vals = [];
      document.getElementById(k + "-grid").querySelectorAll("input").forEach(function (inp) {
        var i = +inp.getAttribute("data-r"), j = +inp.getAttribute("data-c");
        (vals[i] = vals[i] || [])[j] = inp.value;
      });
      s.vals = vals;
      return vals.map(function (r) { return r.map(parseCell); });
    }
    function table(Mx) {
      return '<table>' + Mx.map(function (r) { return "<tr>" + r.map(function (v) { return "<td>" + M.fmt(v) + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
    }
    function show(labelHtml, content, extra) {
      out.innerHTML = '<div class="matrix-result"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><strong style="font-family:Georgia,serif;font-size:1.1rem">' + labelHtml + " =</strong>" + content + "</div></div>" + (extra || "");
    }
    function error(msg) { out.innerHTML = '<p class="err" style="font-size:1rem">⚠ ' + bi(msg) + "</p>"; }

    var ERR = {
      size: { en: "The matrices must have the same order for addition/subtraction.", ar: "لازم المصفوفتين يكونوا من نفس النظم في الجمع والطرح." },
      mul: { en: "A × B needs (columns of A) = (rows of B).", ar: "الضرب A × B يتطلب أن عدد أعمدة A = عدد صفوف B." },
      square: { en: "A must be a square matrix.", ar: "لازم A تكون مصفوفة مربعة." },
      singular: { en: "|A| = 0, so A has no multiplicative inverse (it is singular).", ar: "|A| = 0، إذن A ليس لها معكوس ضربي (مصفوفة منفردة)." },
      cell: { en: "Please enter numbers only (fractions like 3/4 are fine).", ar: "من فضلك اكتب أرقام فقط (الكسور مثل 3/4 مسموحة)." }
    };

    document.querySelectorAll("[data-op]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var A, B;
        try { A = read("a"); B = read("b"); } catch (e) { return error(ERR.cell); }
        var op = btn.getAttribute("data-op");
        var square = A.length === A[0].length;
        try {
          if (op === "add") { if (A.length !== B.length || A[0].length !== B[0].length) return error(ERR.size); show("A + B", table(M.add(A, B))); }
          if (op === "sub") { if (A.length !== B.length || A[0].length !== B[0].length) return error(ERR.size); show("A − B", table(M.sub(A, B))); }
          if (op === "mul") { if (A[0].length !== B.length) return error(ERR.mul); show("A × B", table(M.mul(A, B)), '<p class="small muted mt-1">' + bi({ en: "Order: ", ar: "النظم: " }) + '<span class="ltr">' + A.length + " × " + B[0].length + "</span></p>"); }
          if (op === "tA") show("A<sup>T</sup>", table(M.transpose(A)));
          if (op === "kA") { var k = parseCell(document.getElementById("k-val").value); show(M.fmt(k) + "A", table(M.scale(A, k))); }
          if (op === "sqA") { if (!square) return error(ERR.square); show("A<sup>2</sup>", table(M.mul(A, A))); }
          if (op === "detA") {
            if (!square) return error(ERR.square);
            var d = M.det(A), steps = "";
            if (A.length === 2) {
              steps = '<p class="small muted mt-1 ltr">= (' + M.fmt(A[0][0]) + ")(" + M.fmt(A[1][1]) + ") − (" + M.fmt(A[0][1]) + ")(" + M.fmt(A[1][0]) + ") = " + M.fmt(d) + "</p>";
            } else if (A.length === 3) {
              var m = function (r, c) { return M.det(A.filter(function (_, i) { return i !== r; }).map(function (row) { return row.filter(function (_, j) { return j !== c; }); })); };
              steps = '<p class="small muted mt-1 ltr">= ' + M.fmt(A[0][0]) + "(" + M.fmt(m(0, 0)) + ") − " + M.fmt(A[0][1]) + "(" + M.fmt(m(0, 1)) + ") + " + M.fmt(A[0][2]) + "(" + M.fmt(m(0, 2)) + ") = " + M.fmt(d) + "</p>";
            }
            show("|A|", '<span style="font-family:Georgia,serif;font-size:1.3rem">' + M.fmt(d) + "</span>", steps);
          }
          if (op === "invA") {
            if (!square) return error(ERR.square);
            var dd = M.det(A);
            if (Math.abs(dd) < 1e-10) return error(ERR.singular);
            show("A<sup>−1</sup>", table(M.inverse(A)), '<p class="small muted mt-1">|A| = <span class="ltr">' + M.fmt(dd) + "</span></p>");
          }
        } catch (e) { error(ERR[e.message] || { en: e.message, ar: e.message }); }
      });
    });
    document.getElementById("m-clear").addEventListener("click", function () {
      ["a", "b"].forEach(function (k) { state[k].vals = []; build(k); });
      out.innerHTML = "";
    });
  })();

  // =========================================================
  // 4. Unit circle explorer
  // =========================================================
  (function unitCircle() {
    var svg = document.getElementById("uc-svg");
    var slider = document.getElementById("uc-angle");
    var NS = "http://www.w3.org/2000/svg";
    var SPECIAL = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];

    function el(tag, attrs, parent) {
      var e = document.createElementNS(NS, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      (parent || svg).appendChild(e);
      return e;
    }
    // static parts
    el("line", { x1: -1.3, y1: 0, x2: 1.3, y2: 0, stroke: "#94a3b8", "stroke-width": 0.008 });
    el("line", { x1: 0, y1: -1.3, x2: 0, y2: 1.3, stroke: "#94a3b8", "stroke-width": 0.008 });
    el("circle", { cx: 0, cy: 0, r: 1, fill: "none", stroke: "#0f172a", "stroke-width": 0.012 });
    SPECIAL.slice(0, -1).forEach(function (d) {
      var r = d * Math.PI / 180;
      el("circle", { cx: Math.cos(r), cy: -Math.sin(r), r: 0.018, fill: "#cbd5e1" });
    });
    [["I", 0.65, -0.65], ["II", -0.65, -0.65], ["III", -0.65, 0.7], ["IV", 0.65, 0.7]].forEach(function (q) {
      var t = el("text", { x: q[1], y: q[2], "font-size": 0.1, fill: "#cbd5e1", "text-anchor": "middle", "font-family": "Georgia, serif" });
      t.textContent = q[0];
    });
    var arc = el("path", { fill: "rgba(245,158,11,.18)", stroke: "#f59e0b", "stroke-width": 0.01 });
    var cosLine = el("line", { stroke: "#1d4ed8", "stroke-width": 0.03, "stroke-linecap": "round" });
    var sinLine = el("line", { stroke: "#dc2626", "stroke-width": 0.03, "stroke-linecap": "round" });
    var radius = el("line", { x1: 0, y1: 0, stroke: "#0f172a", "stroke-width": 0.015 });
    var dot = el("circle", { r: 0.055, fill: "#f59e0b", stroke: "#fff", "stroke-width": 0.015, style: "cursor:grab" });
    var cosLbl = el("text", { "font-size": 0.085, fill: "#1d4ed8", "text-anchor": "middle", "font-family": "Georgia, serif", "font-style": "italic" });
    var sinLbl = el("text", { "font-size": 0.085, fill: "#dc2626", "font-family": "Georgia, serif", "font-style": "italic" });
    var ptLbl = el("text", { "font-size": 0.08, fill: "#0f172a", "font-family": "Georgia, serif" });

    document.getElementById("uc-special").innerHTML = SPECIAL.map(function (d) {
      return '<button class="chip" type="button" data-deg="' + d + '">' + d + "°</button>";
    }).join("");
    document.getElementById("uc-special").addEventListener("click", function (e) {
      var b = e.target.closest("[data-deg]");
      if (b) set(+b.getAttribute("data-deg"));
    });

    function gcd(a, b) { return b ? gcd(b, a % b) : a; }
    function radText(d) {
      if (d === 0) return "0";
      var g = gcd(d, 180), n = d / g, den = 180 / g;
      return (n === 1 ? "" : n) + "π" + (den === 1 ? "" : "/" + den);
    }
    function num(v) { return Math.abs(v) < 1e-12 ? "0" : (+v.toFixed(4)).toString().replace("-", "−"); }

    function set(deg) {
      deg = Math.max(0, Math.min(360, Math.round(deg)));
      slider.value = deg;
      var r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
      if (Math.abs(c) < 1e-12) c = 0;
      if (Math.abs(s) < 1e-12) s = 0;
      var x = c, y = -s;
      radius.setAttribute("x2", x); radius.setAttribute("y2", y);
      dot.setAttribute("cx", x); dot.setAttribute("cy", y);
      cosLine.setAttribute("x1", 0); cosLine.setAttribute("y1", 0); cosLine.setAttribute("x2", x); cosLine.setAttribute("y2", 0);
      sinLine.setAttribute("x1", x); sinLine.setAttribute("y1", 0); sinLine.setAttribute("x2", x); sinLine.setAttribute("y2", y);
      cosLbl.setAttribute("x", x / 2); cosLbl.setAttribute("y", s >= 0 ? 0.12 : -0.06); cosLbl.textContent = "cos θ";
      sinLbl.setAttribute("x", x + (c >= 0 ? 0.04 : -0.27)); sinLbl.setAttribute("y", y / 2); sinLbl.textContent = "sin θ";
      ptLbl.setAttribute("x", x + (c >= 0 ? 0.07 : -0.6)); ptLbl.setAttribute("y", y + (s >= 0 ? -0.07 : 0.13));
      ptLbl.textContent = "(" + num(c).slice(0, 6) + ", " + num(s).slice(0, 6) + ")";
      var ar = 0.22, large = deg > 180 ? 1 : 0;
      arc.setAttribute("d", deg === 0 ? "" : deg === 360
        ? "M " + ar + " 0 A " + ar + " " + ar + " 0 1 0 " + (-ar) + " 0 A " + ar + " " + ar + " 0 1 0 " + ar + " 0"
        : "M 0 0 L " + ar + " 0 A " + ar + " " + ar + " 0 " + large + " 0 " + (ar * Math.cos(r)) + " " + (-ar * Math.sin(r)) + " Z");

      document.getElementById("uc-deg").textContent = deg + "°";
      var ex = TrigExact.exact(deg);
      var tanUndef = Math.abs(c) < 1e-12;
      var quadrant = deg % 90 === 0 ? { en: "On an axis", ar: "على أحد المحورين" }
        : { en: "Quadrant " + ["I", "II", "III", "IV"][Math.floor(deg / 90)], ar: "الربع " + ["الأول", "الثاني", "الثالث", "الرابع"][Math.floor(deg / 90)] };
      var refAngle = deg <= 90 ? deg : deg <= 180 ? 180 - deg : deg <= 270 ? deg - 180 : 360 - deg;
      function box(k, v, color) {
        return '<div class="uc-value"><span class="k">' + k + '</span><span class="v"' + (color ? ' style="color:' + color + '"' : "") + ">" + v + "</span></div>";
      }
      function both(exact, dec) { return exact && exact !== dec && exact !== "undefined" ? exact + " ≈ " + dec : dec; }
      document.getElementById("uc-values").innerHTML =
        box(bi({ en: "Degrees", ar: "بالدرجات" }), deg + "°") +
        box(bi({ en: "Radians", ar: "بالراديان" }), radText(deg) + (deg ? " ≈ " + num(r) : "")) +
        box("sin θ", both(ex && ex.sin, num(s)), "#dc2626") +
        box("cos θ", both(ex && ex.cos, num(c)), "#1d4ed8") +
        box("tan θ", tanUndef ? bi({ en: "undefined", ar: "غير معرف" }) : both(ex && ex.tan, num(s / c))) +
        box(bi({ en: "Reference angle", ar: "الزاوية المرجعية" }), refAngle + "°") +
        box(bi({ en: "Position", ar: "الموقع" }), bi(quadrant)) +
        box(bi({ en: "Signs (sin, cos, tan)", ar: "الإشارات (sin، cos، tan)" }), sign(s) + ", " + sign(c) + ", " + (tanUndef ? "—" : sign(s / c)));
      document.getElementById("uc-note").innerHTML = bi({
        en: "Point on the circle = (cos θ, sin θ). " + (ex ? "This is a special angle — the exact values are shown." : "Pick a special angle above to see exact values."),
        ar: "النقطة على الدائرة = (cos θ، sin θ). " + (ex ? "دي زاوية خاصة — القيم الدقيقة ظاهرة." : "اختار زاوية خاصة من فوق علشان تشوف القيم الدقيقة.")
      });
    }
    function sign(v) { return Math.abs(v) < 1e-12 ? "0" : v > 0 ? "+" : "−"; }

    slider.addEventListener("input", function () { set(+slider.value); });

    var dragging = false;
    function angleFromEvent(e) {
      var pt = svg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      var p = pt.matrixTransform(svg.getScreenCTM().inverse());
      var a = Math.atan2(-p.y, p.x) * 180 / Math.PI;
      return a < 0 ? a + 360 : a;
    }
    svg.addEventListener("pointerdown", function (e) { dragging = true; svg.setPointerCapture(e.pointerId); set(angleFromEvent(e)); });
    svg.addEventListener("pointermove", function (e) { if (dragging) set(angleFromEvent(e)); });
    svg.addEventListener("pointerup", function () { dragging = false; });
    svg.addEventListener("pointercancel", function () { dragging = false; });

    set(30);
  })();

  // Open the tab named in the URL hash (e.g. tools.html#matrix)
  function fromHash() {
    var el = document.getElementById(location.hash.slice(1));
    if (el && el.classList.contains("tool-panel")) showTab(el.id, false);
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
