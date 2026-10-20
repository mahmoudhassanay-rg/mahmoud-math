/* Videos page: renders assets/js/data/videos.js with lightweight YouTube embeds */
(function () {
  var bi = Site.bi, esc = Site.esc;
  var videos = (window.SITE_DATA.videos || []).filter(function (v) { return v && v.url; });
  var grid = document.getElementById("video-grid");
  var filters = document.getElementById("video-filters");

  // Works with watch?v=, youtu.be/, shorts/, embed/, live/ links
  function youtubeId(url) {
    var m = String(url).match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  if (!videos.length) {
    grid.outerHTML = '<div class="placeholder"><span class="placeholder-label">PLACEHOLDER</span>' +
      "<strong>" + bi({ en: "Videos will appear here soon", ar: "الفيديوهات هتظهر هنا قريب" }) + "</strong>" +
      "<p class=\"mb-0\">" + bi({ en: "In the meantime, visit the YouTube channel using the button above.", ar: "لحد ما تنزل، تقدر تزور القناة من الزرار اللي فوق." }) + "</p></div>";
    return;
  }

  var cats = [];
  videos.forEach(function (v) { if (v.category && cats.indexOf(v.category) < 0) cats.push(v.category); });
  var active = "all";

  function render() {
    grid.innerHTML = videos.filter(function (v) { return active === "all" || v.category === active; }).map(function (v) {
      var id = youtubeId(v.url);
      var title = v.title ? bi(v.title) : "";
      if (!id) {
        return '<div class="card"><p class="err">Could not read this YouTube link:</p><code>' + esc(v.url) + "</code></div>";
      }
      return '<div class="card video-card">' +
        '<div class="video-frame">' +
          '<img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="" loading="lazy">' +
          '<button class="video-play" type="button" data-id="' + id + '" aria-label="Play video"><span>▶</span></button>' +
        "</div>" +
        '<div class="video-body"><h3>' + title + "</h3>" +
          (v.category ? '<span class="tag">' + esc(v.category) + "</span>" : "") +
        "</div></div>";
    }).join("");
  }

  if (cats.length > 1) {
    filters.innerHTML = ['<button class="chip active" data-cat="all">' + bi({ en: "All", ar: "الكل" }) + "</button>"]
      .concat(cats.map(function (c) { return '<button class="chip" data-cat="' + esc(c) + '">' + esc(c) + "</button>"; })).join("");
    filters.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      active = b.getAttribute("data-cat");
      filters.querySelectorAll(".chip").forEach(function (x) { x.classList.toggle("active", x === b); });
      render();
    });
  }

  // Load the real player only when clicked (faster page)
  grid.addEventListener("click", function (e) {
    var b = e.target.closest(".video-play");
    if (!b) return;
    var frame = b.parentNode;
    frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + b.getAttribute("data-id") +
      '?autoplay=1&rel=0" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  });

  render();
})();
