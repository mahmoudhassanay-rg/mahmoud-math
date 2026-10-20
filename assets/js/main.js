/* =========================================================
   Shared site script: header, footer, language toggle, helpers.
   The navigation lives here, so you only edit it in ONE place.
   ========================================================= */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};

  // ---------- Navigation (edit labels / order here) ----------
  var NAV_MAIN = [
    { id: "home", href: "index.html", en: "Home", ar: "الرئيسية" },
    { id: "about", href: "about.html", en: "About", ar: "عني" },
    { id: "resources", href: "resources.html", en: "Sec 2 Resources", ar: "مصادر تانية ثانوي" },
    { id: "tools", href: "tools.html", en: "Interactive Tools", ar: "أدوات تفاعلية" },
    { id: "exams", href: "exams.html", en: "Mock Exams", ar: "امتحانات تجريبية" },
    { id: "videos", href: "videos.html", en: "Videos", ar: "الفيديوهات" },
    { id: "schedule", href: "schedule.html", en: "Schedule", ar: "المواعيد" }
  ];
  var NAV_MORE = [
    { id: "testimonials", href: "testimonials.html", en: "Testimonials & Results", ar: "آراء ونتائج الطلاب" },
    { id: "blog", href: "blog.html", en: "Blog / Tips", ar: "المدونة / نصائح" },
    { id: "faq", href: "faq.html", en: "FAQ", ar: "الأسئلة الشائعة" },
    { id: "contact", href: "contact.html", en: "Contact", ar: "تواصل معي" }
  ];
  var BOOK = { id: "book", href: "book.html", en: "Book a lesson", ar: "احجز حصة" };

  // ---------- Helpers (also used by other scripts) ----------
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Bilingual text -> two spans; CSS shows the active language.
  // Accepts {en, ar} or a plain string. Strings in {en, ar} are treated as HTML.
  function bi(obj, tag) {
    tag = tag || "span";
    if (obj == null) return "";
    if (typeof obj !== "object") return String(obj);
    return "<" + tag + ' class="en" lang="en">' + (obj.en || "") + "</" + tag + ">" +
           "<" + tag + ' class="ar" lang="ar" dir="rtl">' + (obj.ar || obj.en || "") + "</" + tag + ">";
  }
  function lang() { return document.documentElement.lang === "ar" ? "ar" : "en"; }
  function t(obj) { return obj && typeof obj === "object" ? (obj[lang()] || obj.en) : obj; }
  function waLink(text) {
    var n = String(CFG.whatsappNumber || "").replace(/[\s+()-]/g, ""); // keep digits (and the X placeholder)
    return "https://wa.me/" + n + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  // "Get updates" sign-up: Google Form if one is set, otherwise a WhatsApp message.
  function updatesLink() {
    return CFG.newsletterFormUrl ||
      waLink("Hello Mr. Mahmoud, please add me to your updates list (new videos, groups and exams).\nName: \nGrade: \nCurriculum: ");
  }

  window.Site = { esc: esc, bi: bi, t: t, lang: lang, waLink: waLink, updatesLink: updatesLink, config: CFG };

  // ---------- Header ----------
  var page = document.body.getAttribute("data-page") || "";

  function navLink(item) {
    var cur = item.id === page ? ' aria-current="page"' : "";
    return '<a href="' + item.href + '"' + cur + ">" + bi(item) + "</a>";
  }

  var moreActive = NAV_MORE.some(function (i) { return i.id === page; });

  var headerHTML =
    '<a class="skip-link" href="#main">' + bi({ en: "Skip to content", ar: "تخطَّ إلى المحتوى" }) + "</a>" +
    '<div class="container header-inner">' +
      '<a class="brand" href="index.html" aria-label="Mahmoud Hassan – Math Teacher">' +
        '<span class="brand-logo" aria-hidden="true">∑</span>' +
        '<span class="brand-text">' + bi({ en: "Mahmoud Hassan", ar: "محمود حسن" }) +
        "<small>" + bi({ en: "Math Teacher · Giza", ar: "مدرس رياضيات · الجيزة" }) + "</small></span>" +
      "</a>" +
      '<nav class="nav" aria-label="Main">' +
        '<ul class="nav-list">' +
          NAV_MAIN.map(function (i) { return "<li>" + navLink(i) + "</li>"; }).join("") +
          '<li class="nav-more">' +
            '<button class="nav-more-btn" aria-expanded="false" aria-haspopup="true"' + (moreActive ? ' style="color:var(--primary)"' : "") + ">" +
              bi({ en: "More", ar: "المزيد" }) + " ▾</button>" +
            '<ul class="nav-dropdown">' + NAV_MORE.map(function (i) { return "<li>" + navLink(i) + "</li>"; }).join("") + "</ul>" +
          "</li>" +
        "</ul>" +
      "</nav>" +
      '<div class="header-actions">' +
        '<a class="btn btn-accent btn-sm header-book" href="book.html">' + bi(BOOK) + "</a>" +
        '<button class="lang-toggle" type="button" aria-label="Switch language / تغيير اللغة">' +
          '<span class="en">عربي</span><span class="ar">English</span></button>' +
        '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Menu">' +
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
        "</button>" +
      "</div>" +
    "</div>" +
    '<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">' +
      "<ul>" + NAV_MAIN.concat(NAV_MORE, [BOOK]).map(function (i) { return "<li>" + navLink(i) + "</li>"; }).join("") + "</ul>" +
    "</nav>";

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = headerHTML;
  document.body.insertBefore(header, document.body.firstChild);

  // ---------- Footer ----------
  var year = new Date().getFullYear();
  var footerHTML =
    '<div class="container">' +
      '<div class="footer-grid">' +
        "<div>" +
          "<h4>" + bi({ en: "Mahmoud Hassan – Math Teacher", ar: "محمود حسن – مدرس رياضيات" }) + "</h4>" +
          '<p class="small">' + bi({
            en: "Mathematics teacher in Giza, Egypt. IGCSE (Edexcel &amp; Cambridge), American curriculum and Egyptian Thanaweya (Secondary) math — online and in person.",
            ar: "مدرس رياضيات في الجيزة، مصر. IGCSE (إديكسل وكامبريدج)، المنهج الأمريكي، ومنهج الثانوية العامة المصري — أونلاين وحضوري."
          }) + "</p>" +
          '<div class="btn-row">' +
            '<a class="btn btn-whatsapp btn-sm" href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp</a>' +
            '<a class="btn btn-youtube btn-sm" href="' + esc(CFG.youtubeChannelUrl) + '" target="_blank" rel="noopener">YouTube</a>' +
            '<a class="btn btn-light btn-sm" href="' + esc(updatesLink()) + '" target="_blank" rel="noopener">' + bi({ en: "Get updates", ar: "تابع الجديد" }) + "</a>" +
          "</div>" +
        "</div>" +
        "<div><h4>" + bi({ en: "Learn", ar: "تعلّم" }) + '</h4><ul class="footer-links">' +
          NAV_MAIN.slice(2).map(function (i) { return '<li><a href="' + i.href + '">' + bi(i) + "</a></li>"; }).join("") +
        "</ul></div>" +
        "<div><h4>" + bi({ en: "Info", ar: "معلومات" }) + '</h4><ul class="footer-links">' +
          [NAV_MAIN[1]].concat(NAV_MORE, [BOOK]).map(function (i) { return '<li><a href="' + i.href + '">' + bi(i) + "</a></li>"; }).join("") +
        "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom">' +
        "<span>© " + year + " " + bi({ en: "Mahmoud Hassan. All rights reserved.", ar: "محمود حسن. جميع الحقوق محفوظة." }) + "</span>" +
        "<span>" + bi(CFG.location || { en: "Giza, Egypt", ar: "الجيزة، مصر" }) + "</span>" +
      "</div>" +
    "</div>";

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = footerHTML;
  document.body.appendChild(footer);

  // Floating WhatsApp button
  var wa = document.createElement("a");
  wa.className = "wa-float no-print";
  wa.href = waLink("Hello Mr. Mahmoud, I'd like to ask about math lessons.");
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.setAttribute("aria-label", "WhatsApp");
  wa.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.1 1.4 15.2.2 12 .2 5.5.2.2 5.5.2 12c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.7c1.7.9 3.7 1.4 5.6 1.4 6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.4-8.3z"/></svg>';
  document.body.appendChild(wa);

  // ---------- Fill config links anywhere on the page ----------
  // <a data-link="whatsapp|youtube|newsletter|email">
  function fillLinks(root) {
    (root || document).querySelectorAll("[data-link]").forEach(function (a) {
      var k = a.getAttribute("data-link");
      if (k === "whatsapp") a.href = waLink(a.getAttribute("data-wa-text") || "");
      if (k === "youtube") a.href = CFG.youtubeChannelUrl;
      if (k === "newsletter") a.href = updatesLink();
      if (k === "email") {
        if (CFG.email) { a.href = "mailto:" + CFG.email; a.textContent = CFG.email; }
        else { var row = a.closest("[data-hide-if-empty]"); if (row) row.style.display = "none"; }
      }
      if (k === "facebook") {
        if (CFG.facebookUrl) a.href = CFG.facebookUrl;
        else { var r2 = a.closest("[data-hide-if-empty]"); if (r2) r2.style.display = "none"; }
      }
      if (/^(whatsapp|youtube|newsletter|facebook)$/.test(k)) { a.target = "_blank"; a.rel = "noopener"; }
    });
    (root || document).querySelectorAll("[data-config='whatsapp-number']").forEach(function (el) {
      el.textContent = "+" + CFG.whatsappNumber;
    });
  }
  fillLinks();
  window.Site.fillLinks = fillLinks;

  // ---------- Language ----------
  function applyLang(l) {
    var html = document.documentElement;
    html.lang = l;
    html.dir = l === "ar" ? "rtl" : "ltr";
    try { localStorage.setItem("lang", l); } catch (e) {}
    // Title / description per language
    var tAr = document.querySelector('meta[name="title-ar"]');
    if (!html.getAttribute("data-title-en")) html.setAttribute("data-title-en", document.title);
    document.title = l === "ar" && tAr ? tAr.content : html.getAttribute("data-title-en");
    // Translated placeholders: data-ph-en / data-ph-ar
    document.querySelectorAll("[data-ph-en]").forEach(function (el) {
      el.placeholder = el.getAttribute("data-ph-" + l) || el.getAttribute("data-ph-en");
    });
    // Translated <option>s: data-en / data-ar
    document.querySelectorAll("option[data-ar]").forEach(function (o) {
      o.textContent = o.getAttribute("data-" + l);
    });
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: l } }));
  }
  header.querySelector(".lang-toggle").addEventListener("click", function () {
    applyLang(lang() === "ar" ? "en" : "ar");
  });
  applyLang(lang());

  // ---------- Menus ----------
  var menuBtn = header.querySelector(".menu-toggle");
  var mobileNav = header.querySelector(".mobile-nav");
  menuBtn.addEventListener("click", function () {
    var open = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  var more = header.querySelector(".nav-more");
  var moreBtn = more.querySelector(".nav-more-btn");
  moreBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = more.classList.toggle("open");
    moreBtn.setAttribute("aria-expanded", open);
  });
  document.addEventListener("click", function () {
    more.classList.remove("open");
    moreBtn.setAttribute("aria-expanded", "false");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { more.classList.remove("open"); mobileNav.classList.remove("open"); }
  });
})();
