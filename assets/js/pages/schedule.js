/* Weekly timetable from assets/js/data/schedule.js (week starts Saturday) */
(function () {
  var bi = Site.bi;
  var DAYS = [
    { id: "sat", js: 6, en: "Saturday", ar: "السبت" },
    { id: "sun", js: 0, en: "Sunday", ar: "الأحد" },
    { id: "mon", js: 1, en: "Monday", ar: "الاثنين" },
    { id: "tue", js: 2, en: "Tuesday", ar: "الثلاثاء" },
    { id: "wed", js: 3, en: "Wednesday", ar: "الأربعاء" },
    { id: "thu", js: 4, en: "Thursday", ar: "الخميس" },
    { id: "fri", js: 5, en: "Friday", ar: "الجمعة" }
  ];
  var slots = window.SITE_DATA.schedule || [];

  function fmt(hhmm) {
    var p = hhmm.split(":"), h = +p[0], m = p[1];
    var h12 = ((h + 11) % 12) + 1;
    return { en: h12 + ":" + m + " " + (h < 12 ? "AM" : "PM"), ar: h12 + ":" + m + " " + (h < 12 ? "ص" : "م") };
  }
  function range(s) {
    var a = fmt(s.start), b = fmt(s.end);
    return { en: a.en + " – " + b.en, ar: a.ar + " – " + b.ar };
  }
  // Today's weekday in Cairo
  var todayName = new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Cairo", weekday: "short" }).format(new Date()).slice(0, 3).toLowerCase();

  document.getElementById("week").innerHTML = DAYS.map(function (d) {
    var items = slots.filter(function (s) { return s.day === d.id; })
      .sort(function (a, b) { return a.start.localeCompare(b.start); });
    var isToday = d.id === todayName;
    return '<div class="day' + (isToday ? " today" : "") + '"><h3>' + bi(d) +
      (isToday ? " · " + bi({ en: "Today", ar: "النهارده" }) : "") + "</h3><ul>" +
      (items.length ? items.map(function (s) {
        var online = s.mode === "online";
        return '<li class="slot' + (online ? " online" : "") + '"><span class="time">' + bi(range(s)) + "</span>" +
          "<span>" + bi(s.group) + "</span>" +
          "<small>" + bi(online ? { en: "Online", ar: "أونلاين" } : { en: "In person – Giza", ar: "حضوري – الجيزة" }) + "</small></li>";
      }).join("") : '<li class="empty">' + bi({ en: "No sessions", ar: "لا توجد حصص" }) + "</li>") +
      "</ul></div>";
  }).join("");
})();
