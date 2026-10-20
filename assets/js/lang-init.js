/* Runs in <head> before the page paints, so the right language/direction
   is applied immediately (no flash of the wrong language). */
(function () {
  var lang = "en";
  try {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "ar" || q === "en") { lang = q; localStorage.setItem("lang", q); }
    else lang = localStorage.getItem("lang") || "en";
  } catch (e) { /* storage blocked: keep default */ }
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
})();
