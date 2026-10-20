/* Testimonials & results. Empty lists show clearly marked placeholders (no invented content). */
(function () {
  var bi = Site.bi, esc = Site.esc;
  var T = window.SITE_DATA.testimonials || [];
  var R = window.SITE_DATA.results || [];

  function placeholder(title, text) {
    return '<div class="placeholder"><span class="placeholder-label">PLACEHOLDER · ' + bi({ en: "to be added", ar: "سيتم الإضافة" }) + "</span>" +
      "<strong>" + bi(title) + "</strong><p class=\"mb-0\">" + bi(text) + "</p></div>";
  }

  document.getElementById("testimonials-list").innerHTML = T.length
    ? '<div class="grid grid-3">' + T.map(function (t) {
        return '<figure class="card testimonial" style="margin:0"><blockquote>' + bi(t.text) + "</blockquote>" +
          "<figcaption><cite>" + esc(t.name) + "</cite>" + (t.role ? '<br><span class="small muted">' + bi(t.role) + "</span>" : "") + "</figcaption></figure>";
      }).join("") + "</div>"
    : placeholder(
        { en: "Testimonials coming soon", ar: "آراء الطلاب قريبًا" },
        { en: "This section is reserved for real feedback from students and parents.", ar: "القسم ده مخصص لآراء حقيقية من الطلاب وأولياء الأمور." });

  document.getElementById("results-list").innerHTML = R.length
    ? '<div class="grid grid-3">' + R.map(function (r) {
        return '<div class="card"><h3>' + bi(r.title) + '</h3><p class="mb-0">' + bi(r.detail) + "</p></div>";
      }).join("") + "</div>"
    : placeholder(
        { en: "Results coming soon", ar: "النتائج قريبًا" },
        { en: "This section is reserved for real exam results.", ar: "القسم ده مخصص لنتائج امتحانات حقيقية." });
})();
