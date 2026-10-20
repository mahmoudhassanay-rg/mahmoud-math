/* Renders the Secondary 2 chapters from assets/js/data/resources.js */
(function () {
  var bi = Site.bi, esc = Site.esc;
  var chapters = window.SITE_DATA.chapters;

  document.getElementById("chapter-toc").innerHTML = chapters.map(function (ch, i) {
    return '<a href="#' + ch.id + '">' + (i + 1) + ". " + bi(ch.title) + "</a>";
  }).join("");

  function list(items, empty, render) {
    if (!items || !items.length) return '<p class="placeholder-note">' + bi(empty) + "</p>";
    return "<ul>" + items.map(render).join("") + "</ul>";
  }

  document.getElementById("chapters").innerHTML = chapters.map(function (ch, i) {
    return '<details class="acc chapter" id="' + ch.id + '"' + (i === 0 ? " open" : "") + ">" +
      '<summary><span class="chapter-head"><span class="chapter-num">' + (i + 1) + "</span><span>" + bi(ch.title) + "</span></span></summary>" +
      '<div class="acc-body">' +
        '<p class="muted">' + bi(ch.summary) + "</p>" +
        '<div class="res-cols">' +
          '<div class="res-box"><h4>📄 ' + bi({ en: "PDF notes & worksheets", ar: "مذكرات وأوراق عمل PDF" }) + "</h4>" +
            list(ch.pdfs, { en: "PDFs coming soon.", ar: "الملفات قريبًا." }, function (p) {
              return '<li><a href="' + esc(p.file) + '" target="_blank" rel="noopener">' + bi(p.title) + "</a></li>";
            }) + "</div>" +
          '<div class="res-box"><h4>🎬 ' + bi({ en: "Video lessons", ar: "فيديوهات الشرح" }) + "</h4>" +
            list(ch.videos, { en: "Videos coming soon.", ar: "الفيديوهات قريبًا." }, function (v) {
              return '<li><a href="' + esc(v.url) + '" target="_blank" rel="noopener">' + bi(v.title) + "</a></li>";
            }) + "</div>" +
          '<div class="res-box"><h4>🧾 ' + bi({ en: "Formula sheet", ar: "ورقة القوانين" }) + "</h4>" +
            '<p class="small">' + bi({ en: ch.formulas.length + " key formulas, ready to print.", ar: ch.formulas.length + " قانون أساسي جاهزين للطباعة." }) + "</p>" +
            '<a class="btn btn-primary btn-sm" href="formula-sheet.html?ch=' + ch.id + '">' + bi({ en: "🖨 Open printable sheet", ar: "🖨 افتح ورقة الطباعة" }) + "</a></div>" +
        "</div>" +
      "</div></details>";
  }).join("");

  // Open the chapter linked in the URL hash
  function openHash() {
    var el = location.hash && document.getElementById(location.hash.slice(1));
    if (el && el.tagName === "DETAILS") { el.open = true; el.scrollIntoView(); }
  }
  window.addEventListener("hashchange", openHash);
  openHash();
})();
