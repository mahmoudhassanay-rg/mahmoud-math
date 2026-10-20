/* Printable formula sheet: formula-sheet.html?ch=<chapter id> or ?ch=all */
(function () {
  var bi = Site.bi;
  var chapters = window.SITE_DATA.chapters;
  var params = new URLSearchParams(location.search);
  var id = params.get("ch") || chapters[0].id;

  var select = document.getElementById("fs-select");
  select.innerHTML = '<option value="all" data-en="All chapters" data-ar="كل الفصول">All chapters</option>' +
    chapters.map(function (c, i) {
      return '<option value="' + c.id + '" data-en="' + (i + 1) + ". " + c.title.en + '" data-ar="' + (i + 1) + ". " + c.title.ar + '">' + (i + 1) + ". " + c.title.en + "</option>";
    }).join("");
  select.value = id;
  select.querySelectorAll("option").forEach(function (o) { o.textContent = o.getAttribute("data-" + Site.lang()); });
  select.addEventListener("change", function () { location.search = "?ch=" + select.value; });

  var list = id === "all" ? chapters : chapters.filter(function (c) { return c.id === id; });
  if (!list.length) list = [chapters[0]];

  if (list.length === 1) {
    document.getElementById("fs-title").innerHTML = bi({ en: "Formula sheet: " + list[0].title.en, ar: "ورقة القوانين: " + list[0].title.ar });
    document.querySelector('meta[name="title-ar"]').content = "ورقة القوانين: " + list[0].title.ar + " | محمود حسن";
    document.documentElement.setAttribute("data-title-en", "Formula Sheet: " + list[0].title.en + " | Mahmoud Hassan");
    document.title = Site.lang() === "ar" ? "ورقة القوانين: " + list[0].title.ar + " | محمود حسن" : "Formula Sheet: " + list[0].title.en + " | Mahmoud Hassan";
  } else {
    document.getElementById("fs-title").innerHTML = bi({ en: "Formula sheets – all chapters", ar: "ورق القوانين – كل الفصول" });
  }

  document.getElementById("fs-content").innerHTML = list.map(function (ch) {
    var n = chapters.indexOf(ch) + 1;
    return '<div class="card mb-2"><h2>' + n + ". " + bi(ch.title) + "</h2>" +
      '<div class="table-wrap" style="border:0"><table class="table" style="min-width:0">' +
      ch.formulas.map(function (f) {
        return '<tr><th scope="row" style="width:32%;text-transform:none;letter-spacing:0;font-size:.95rem;color:var(--text)">' + bi(f.name) + "</th>" +
          '<td><span class="math">' + bi(f.f) + "</span></td></tr>";
      }).join("") +
      "</table></div></div>";
  }).join("");
})();
