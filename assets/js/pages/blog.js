/* Blog list from assets/js/data/blog.js */
(function () {
  var bi = Site.bi, esc = Site.esc;
  var posts = window.SITE_DATA.posts || [];
  function date(d) {
    var dt = new Date(d + "T00:00:00Z");
    return {
      en: dt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
      ar: dt.toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    };
  }
  document.getElementById("post-list").innerHTML = posts.map(function (p) {
    var d = date(p.date);
    return '<a class="card card-link post-card" href="' + esc(p.url) + '">' +
      (p.tag ? '<span class="tag mb-1">' + bi(p.tag) + "</span>" : "") +
      '<h3 class="mt-1">' + bi(p.title) + "</h3>" +
      '<p class="meta">' + bi(d) + (p.readMinutes ? " · " + bi({ en: p.readMinutes + " min read", ar: "قراءة " + p.readMinutes + " دقائق" }) : "") + "</p>" +
      '<p class="small muted">' + bi(p.summary) + "</p>" +
      '<span class="small" style="color:var(--primary);font-weight:600">' + bi({ en: "Read more →", ar: "اقرأ المزيد ←" }) + "</span></a>";
  }).join("");
})();
