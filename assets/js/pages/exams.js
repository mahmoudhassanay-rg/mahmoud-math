/* Mock exams: timer, auto-marked MCQ, essay model answers after submitting. */
(function () {
  "use strict";
  var bi = Site.bi;
  var exams = window.SITE_DATA.exams;
  var root = document.getElementById("exam-root");
  var LETTERS = ["A", "B", "C", "D"];
  var timerId = null, inProgress = false;

  window.addEventListener("beforeunload", function (e) {
    if (inProgress) { e.preventDefault(); e.returnValue = ""; }
  });

  function marks(list) { return list.reduce(function (s, q) { return s + q.marks; }, 0); }

  // ---------- List of exams ----------
  function showList() {
    inProgress = false;
    clearInterval(timerId);
    root.innerHTML =
      '<div class="callout mb-2">' + bi({
        en: "<strong>How it works:</strong> each exam is timed. Part A (multiple choice) is marked automatically. In Part B (essay) write your full working — on paper or in the boxes — then compare with the model answers and mark yourself honestly.",
        ar: "<strong>طريقة الامتحان:</strong> كل امتحان له وقت محدد. الجزء (أ) اختيار من متعدد بيتصحح تلقائيًا. في الجزء (ب) المقالي اكتب الحل بالخطوات — في ورقة أو في المربعات — وبعدين قارن بالإجابة النموذجية وصحّح لنفسك بأمانة."
      }) + "</div>" +
      '<div class="grid grid-2">' + exams.map(function (ex, i) {
        var m1 = marks(ex.mcq), m2 = marks(ex.essay);
        return '<div class="card"><span class="tag mb-1">⏱ ' + bi({ en: ex.duration + " minutes", ar: ex.duration + " دقيقة" }) + "</span>" +
          '<h2 class="mt-1" style="font-size:1.3rem">' + bi(ex.title) + "</h2>" +
          '<ul class="small">' +
            "<li>" + bi({ en: "Part A: " + ex.mcq.length + " multiple-choice questions (" + m1 + " marks)", ar: "الجزء (أ): " + ex.mcq.length + " أسئلة اختيار من متعدد (" + m1 + " درجة)" }) + "</li>" +
            "<li>" + bi({ en: "Part B: " + ex.essay.length + " essay questions (" + m2 + " marks)", ar: "الجزء (ب): " + ex.essay.length + " أسئلة مقالية (" + m2 + " درجة)" }) + "</li>" +
            "<li>" + bi({ en: "Total: " + (m1 + m2) + " marks", ar: "المجموع: " + (m1 + m2) + " درجة" }) + "</li>" +
          "</ul>" +
          '<button class="btn btn-primary" type="button" data-start="' + i + '">' + bi({ en: "Start exam", ar: "ابدأ الامتحان" }) + "</button></div>";
      }).join("") + "</div>";
    root.querySelectorAll("[data-start]").forEach(function (b) {
      b.addEventListener("click", function () { startExam(exams[+b.getAttribute("data-start")]); });
    });
  }

  // ---------- Exam ----------
  function startExam(ex) {
    inProgress = true;
    var chosen = {}; // mcq id -> option index
    var submitted = false;
    var endAt = Date.now() + ex.duration * 60000;
    var m1 = marks(ex.mcq), m2 = marks(ex.essay);

    root.innerHTML =
      '<div class="exam-bar">' +
        "<strong>" + bi(ex.title) + "</strong>" +
        '<div style="display:flex;align-items:center;gap:12px">' +
          '<span class="timer" id="timer" role="timer" aria-live="off"></span>' +
          '<button class="btn btn-accent btn-sm" type="button" id="submit-top">' + bi({ en: "Submit", ar: "تسليم" }) + "</button>" +
        "</div>" +
      "</div>" +
      '<div id="result"></div>' +
      '<section class="exam-part card mb-2">' +
        "<h2>" + bi({ en: "Part A — Multiple choice", ar: "الجزء (أ) — اختيار من متعدد" }) + ' <span class="tag">' + bi({ en: m1 + " marks", ar: m1 + " درجة" }) + "</span></h2>" +
        '<p class="small muted">' + bi({ en: "Choose one answer for each question.", ar: "اختر إجابة واحدة لكل سؤال." }) + "</p>" +
        ex.mcq.map(function (q, qi) {
          return '<div class="quiz-q" data-q="' + q.id + '">' +
            '<div class="q-num">' + bi({ en: "Question " + (qi + 1) + " · " + q.marks + " marks", ar: "السؤال " + (qi + 1) + " · " + q.marks + " درجة" }) + "</div>" +
            '<div class="q-text">' + bi(q.q) + "</div>" +
            '<div class="options">' + q.options.map(function (o, oi) {
              return '<button class="option" type="button" data-o="' + oi + '" aria-pressed="false"><span class="opt-letter">' + LETTERS[oi] + '</span><span class="math">' + o.h + "</span></button>";
            }).join("") + "</div>" +
          "</div>";
        }).join("") +
      "</section>" +
      '<section class="exam-part card mb-2">' +
        "<h2>" + bi({ en: "Part B — Essay questions", ar: "الجزء (ب) — أسئلة مقالية" }) + ' <span class="tag">' + bi({ en: m2 + " marks", ar: m2 + " درجة" }) + "</span></h2>" +
        '<p class="small muted">' + bi({ en: "Show all your working. Model answers appear after you submit.", ar: "اكتب كل خطوات الحل. الإجابات النموذجية بتظهر بعد التسليم." }) + "</p>" +
        ex.essay.map(function (q, qi) {
          return '<div class="essay-q quiz-q" data-e="' + q.id + '">' +
            '<div class="q-num">' + bi({ en: "Question " + (ex.mcq.length + qi + 1) + " · " + q.marks + " marks", ar: "السؤال " + (ex.mcq.length + qi + 1) + " · " + q.marks + " درجة" }) + "</div>" +
            '<div class="q-text">' + bi(q.q) + "</div>" +
            '<textarea rows="5" aria-label="Your answer" data-ph-en="Your working…" data-ph-ar="اكتب الحل هنا…"></textarea>' +
            '<div class="model-answer"><strong>' + bi({ en: "Model answer", ar: "الإجابة النموذجية" }) + "</strong><br>" + bi(q.model) +
              '<div class="self-mark"><label class="mb-0" for="sm-' + q.id + '">' + bi({ en: "Your mark:", ar: "درجتك:" }) + '</label>' +
              '<input type="number" min="0" max="' + q.marks + '" step="0.5" id="sm-' + q.id + '" data-self="' + q.id + '" value="0"> / ' + q.marks + "</div>" +
            "</div>" +
          "</div>";
        }).join("") +
      "</section>" +
      '<div class="btn-row"><button class="btn btn-primary" type="button" id="submit-bottom">' + bi({ en: "Submit exam", ar: "تسليم الامتحان" }) + '</button>' +
      '<button class="btn btn-ghost" type="button" id="quit">' + bi({ en: "Exit", ar: "خروج" }) + "</button></div>";

    // translate the textarea placeholders now
    root.querySelectorAll("[data-ph-en]").forEach(function (el) { el.placeholder = el.getAttribute("data-ph-" + Site.lang()); });
    window.scrollTo(0, root.offsetTop - 80);

    // choose MCQ answers (changeable until submitted)
    root.querySelectorAll("[data-q]").forEach(function (qEl) {
      qEl.addEventListener("click", function (e) {
        var b = e.target.closest(".option");
        if (!b || submitted) return;
        qEl.querySelectorAll(".option").forEach(function (x) { x.classList.remove("selected"); x.setAttribute("aria-pressed", "false"); });
        b.classList.add("selected"); b.setAttribute("aria-pressed", "true");
        chosen[qEl.getAttribute("data-q")] = +b.getAttribute("data-o");
      });
    });

    // timer
    var timerEl = document.getElementById("timer");
    function tick() {
      var left = Math.max(0, Math.round((endAt - Date.now()) / 1000));
      var mm = Math.floor(left / 60), ss = left % 60;
      timerEl.textContent = (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
      timerEl.classList.toggle("warn", left <= 300);
      if (left === 0) {
        alert(Site.lang() === "ar" ? "انتهى الوقت! سيتم تسليم الامتحان." : "Time is up! Your exam will be submitted.");
        submit(true);
      }
    }
    tick();
    timerId = setInterval(tick, 1000);

    function confirmSubmit() {
      if (submitted) return;
      var unanswered = ex.mcq.length - Object.keys(chosen).length;
      var msg = Site.lang() === "ar"
        ? (unanswered ? "لسه فيه " + unanswered + " سؤال اختياري بدون إجابة. " : "") + "تأكيد تسليم الامتحان؟"
        : (unanswered ? unanswered + " multiple-choice question(s) unanswered. " : "") + "Submit your exam now?";
      if (confirm(msg)) submit(false);
    }
    document.getElementById("submit-top").addEventListener("click", confirmSubmit);
    document.getElementById("submit-bottom").addEventListener("click", confirmSubmit);
    document.getElementById("quit").addEventListener("click", function () {
      if (submitted || confirm(Site.lang() === "ar" ? "الخروج من الامتحان؟ إجاباتك مش هتتحفظ." : "Leave this exam? Your answers will be lost.")) showList();
    });

    function submit(timeUp) {
      if (submitted) return;
      submitted = true; inProgress = false;
      clearInterval(timerId);
      var mcqScore = 0;
      ex.mcq.forEach(function (q) {
        var qEl = root.querySelector('[data-q="' + q.id + '"]');
        var pick = chosen[q.id];
        if (pick === q.answer) mcqScore += q.marks;
        qEl.querySelectorAll(".option").forEach(function (b, oi) {
          b.disabled = true;
          if (oi === q.answer) b.classList.add("correct");
          else if (oi === pick) b.classList.add("wrong");
        });
        var fb = document.createElement("div");
        fb.className = "feedback show " + (pick === q.answer ? "ok" : "bad");
        fb.innerHTML = pick === undefined ? bi({ en: "Not answered — 0 marks.", ar: "لم تتم الإجابة — 0 درجة." })
          : pick === q.answer ? bi({ en: "✔ Correct — " + q.marks + " marks.", ar: "✔ صحيح — " + q.marks + " درجة." })
          : bi({ en: "✘ Incorrect. The answer is " + LETTERS[q.answer] + ".", ar: "✘ إجابة خاطئة. الإجابة الصحيحة " + LETTERS[q.answer] + "." });
        qEl.appendChild(fb);
      });
      root.querySelectorAll(".model-answer").forEach(function (m) { m.classList.add("show"); });
      root.querySelectorAll(".essay-q textarea").forEach(function (t) { t.readOnly = true; });
      document.getElementById("submit-top").style.display = "none";
      document.getElementById("submit-bottom").style.display = "none";

      var resultEl = document.getElementById("result");
      function renderResult() {
        var self = 0;
        root.querySelectorAll("[data-self]").forEach(function (inp) {
          var max = +inp.max, v = Math.min(max, Math.max(0, parseFloat(inp.value) || 0));
          self += v;
        });
        self = Math.round(self * 2) / 2;
        var total = mcqScore + self, pct = Math.round((total / (m1 + m2)) * 100);
        resultEl.innerHTML = '<div class="card result-card mb-2">' +
          (timeUp ? '<p class="err">' + bi({ en: "⏰ Time was up — the exam was submitted automatically.", ar: "⏰ انتهى الوقت — تم تسليم الامتحان تلقائيًا." }) + "</p>" : "") +
          "<h2>" + bi({ en: "Your result", ar: "نتيجتك" }) + "</h2>" +
          '<div class="grid grid-3">' +
            '<div><div class="score-big">' + mcqScore + "/" + m1 + '</div><p class="muted mb-0">' + bi({ en: "Part A (auto-marked)", ar: "الجزء (أ) — تصحيح تلقائي" }) + "</p></div>" +
            '<div><div class="score-big">' + self + "/" + m2 + '</div><p class="muted mb-0">' + bi({ en: "Part B (your self-marking)", ar: "الجزء (ب) — تصحيحك لنفسك" }) + "</p></div>" +
            '<div><div class="score-big">' + total + "/" + (m1 + m2) + '</div><p class="muted mb-0">' + bi({ en: "Total", ar: "المجموع" }) + " · " + pct + "%</p></div>" +
          "</div>" +
          '<p class="small muted mt-1">' + bi({ en: "Compare your essay answers with the model answers below and enter your marks — the total updates automatically.", ar: "قارن إجاباتك المقالية بالإجابات النموذجية تحت ودخّل درجاتك — المجموع بيتحدث تلقائيًا." }) + "</p>" +
          '<div class="btn-row" style="justify-content:center">' +
            '<button class="btn btn-primary" type="button" id="retake">' + bi({ en: "↻ Retake", ar: "↻ إعادة الامتحان" }) + "</button>" +
            '<button class="btn btn-outline" type="button" id="back">' + bi({ en: "All exams", ar: "كل الامتحانات" }) + "</button>" +
          "</div></div>";
        document.getElementById("retake").addEventListener("click", function () { startExam(ex); });
        document.getElementById("back").addEventListener("click", showList);
      }
      renderResult();
      root.querySelectorAll("[data-self]").forEach(function (inp) { inp.addEventListener("input", renderResult); });
      window.scrollTo(0, root.offsetTop - 80);
    }
  }

  showList();
})();
