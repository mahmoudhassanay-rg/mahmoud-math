/* Booking form -> WhatsApp message (wa.me link with the text filled in) */
(function () {
  var form = document.getElementById("book-form");
  var preview = document.getElementById("wa-preview");

  function val(id) { return document.getElementById(id).value.trim(); }
  function label(id) { // the visible (translated) text of a <select>
    var s = document.getElementById(id);
    var o = s.options[s.selectedIndex];
    return o && o.value ? o.textContent.trim() : "";
  }

  function message() {
    var ar = Site.lang() === "ar";
    var lines = ar ? [
      "السلام عليكم أستاذ محمود، أرغب في حجز حصة رياضيات.",
      "",
      "الاسم: " + val("f-name"),
      "الصف: " + val("f-grade"),
      "المنهج: " + label("f-curriculum"),
      "المادة: " + label("f-subject"),
      "نوع الحصة: " + label("f-type"),
      "الوقت المفضل: " + val("f-time")
    ] : [
      "Hello Mr. Mahmoud, I'd like to book a math lesson.",
      "",
      "Name: " + val("f-name"),
      "Grade: " + val("f-grade"),
      "Curriculum: " + label("f-curriculum"),
      "Subject: " + label("f-subject"),
      "Lesson type: " + label("f-type"),
      "Preferred time: " + val("f-time")
    ];
    if (val("f-notes")) lines.push((ar ? "ملاحظات: " : "Notes: ") + val("f-notes"));
    return lines.join("\n");
  }

  function updatePreview() { preview.textContent = message(); }
  form.addEventListener("input", updatePreview);
  form.addEventListener("change", updatePreview);
  document.addEventListener("langchange", updatePreview);
  updatePreview();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true, first = null;
    ["f-name", "f-curriculum", "f-grade", "f-subject", "f-time"].forEach(function (id) {
      var el = document.getElementById(id);
      var bad = !el.value.trim();
      el.closest(".field").classList.toggle("invalid", bad);
      el.setAttribute("aria-invalid", bad);
      if (bad) { ok = false; if (!first) first = el; }
    });
    if (!ok) { first.focus(); return; }
    window.open(Site.waLink(message()), "_blank", "noopener");
  });
})();
