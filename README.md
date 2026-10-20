# Mahmoud Hassan – Math Teacher (website)

A bilingual (English / العربية) website for a mathematics teacher in Giza, Egypt.
Plain HTML, CSS and JavaScript, so there's no build step. It is ready for **GitHub Pages**.

## Pages

| Page | File |
|---|---|
| Home (intro, subjects, daily challenge) | `index.html` |
| About me | `about.html` |
| Secondary 2 resources | `resources.html` |
| Printable formula sheets | `formula-sheet.html?ch=<chapter-id>` (or `?ch=all`) |
| Interactive tools (binomial quiz, grapher, matrix calculator, unit circle) | `tools.html` (`#quiz`, `#grapher`, `#matrix`, `#unit-circle`) |
| Mock exams | `exams.html` |
| YouTube videos | `videos.html` |
| Weekly schedule | `schedule.html` |
| Book a lesson (WhatsApp) | `book.html` |
| Testimonials & Results | `testimonials.html` |
| Blog list + sample article | `blog.html`, `blog-sec2-final-study-guide.html` |
| FAQ | `faq.html` |
| Contact + newsletter | `contact.html` |

Most of the content you'll want to change lives in **`assets/js/config.js`** and the files in **`assets/js/data/`**.
You can edit them on GitHub: open the file, click the ✏️ pencil, make the change, then click **Commit changes**.
The live site updates about a minute later.

> **Tip:** each text usually has two versions, `en: "..."` and `ar: "..."`. Change both so the
> site reads correctly in each language. Keep the quotes and commas exactly as they are.

---

## 1. Change the WhatsApp number, Google Form link and YouTube channel

Open **`assets/js/config.js`**:

```js
whatsappNumber: "20XXXXXXXXXX",                        // ← your number
newsletterFormUrl: "https://forms.gle/YOUR-GOOGLE-FORM-ID",  // ← your Google Form
youtubeChannelUrl: "https://www.youtube.com/@YOUR-CHANNEL",  // ← your channel
email: "",        // optional, shown on the Contact page if filled in
facebookUrl: "",  // optional
```

- **WhatsApp number**: use the international format with digits only and no `+`.
  An Egyptian mobile `010 1234 5678` becomes `"201012345678"` (drop the first `0`, add `20`).
- **Google Form**: create the form, click **Send → 🔗 link**, copy the link and paste it here.

Every WhatsApp, YouTube and newsletter button on the site uses these values, including the booking form and the floating WhatsApp button.

## 2. Edit the weekly schedule

Open **`assets/js/data/schedule.js`**. Each line is one session:

```js
{ day: "sat", start: "16:00", end: "17:30", group: { en: "Sec 2 – Group A", ar: "تانية ثانوي – مجموعة أ" }, mode: "in-person" },
```

- `day`: one of `"sat" "sun" "mon" "tue" "wed" "thu" "fri"`
- `start` / `end`: 24-hour time, e.g. `"18:30"`. The page shows it as `6:30 PM` / `6:30 م`.
- `mode`: `"in-person"` or `"online"` (online sessions are shown in green)

To add a session, copy a line. To remove one, delete the line.
**The times in the file now are placeholders**, so replace them with your real groups.

## 3. Add YouTube videos

Open **`assets/js/data/videos.js`** and paste one line per video inside the list:

```js
window.SITE_DATA.videos = [
  { url: "https://youtu.be/VIDEO_ID", title: { en: "Binomial theorem – lesson 1", ar: "نظرية ذات الحدين – الدرس الأول" }, category: "Sec 2" },
  { url: "https://www.youtube.com/watch?v=VIDEO_ID", title: { en: "IGCSE – Quadratics", ar: "IGCSE – المعادلات التربيعية" }, category: "IGCSE" },
];
```

- Any normal YouTube link works (`watch?v=`, `youtu.be/`, `shorts/`).
- `category` is optional. If you use two or more categories, filter buttons appear automatically.
- Put the newest video at the top.

To attach a video or PDF to a specific **Secondary 2 chapter**, open `assets/js/data/resources.js` and add it to that chapter's `videos` or `pdfs` list:

```js
pdfs: [
  { title: { en: "Chapter 1 notes", ar: "مذكرة الفصل الأول" }, file: "assets/pdfs/ch1-notes.pdf" }
],
videos: [
  { title: { en: "Lesson 1", ar: "الدرس الأول" }, url: "https://youtu.be/VIDEO_ID" }
],
```

Upload PDFs into the `assets/pdfs/` folder (on GitHub: **Add file → Upload files**).
You can also rename chapters or edit the formula sheets in the same file.

## 4. Add a blog post

1. Copy `blog-sec2-final-study-guide.html` to a new file, for example `blog-igcse-revision.html`
   (on GitHub, open the file, copy its contents, then **Add file → Create new file**).
2. In the new file, change the `<title>`, the `title-ar` and `description` lines at the top, the heading, the date and the article text. There's an English block (`<div class="en">`) and an Arabic block (`<div class="ar">`).
3. Add the post at the **top** of the list in `assets/js/data/blog.js`:

```js
{
  url: "blog-igcse-revision.html",
  date: "2026-11-01",
  readMinutes: 5,
  tag: { en: "IGCSE", ar: "IGCSE" },
  title: { en: "Post title", ar: "عنوان المقال" },
  summary: { en: "One or two sentences.", ar: "جملة أو جملتين." }
},
```

4. Optional: add the new page to `sitemap.xml`.

## 5. Add testimonials and results

Open **`assets/js/data/testimonials.js`**. Both lists start empty on purpose. While a list is empty, the page shows a clearly marked placeholder. Add only real feedback, with permission:

```js
window.SITE_DATA.testimonials = [
  { name: "Parent of a Year 11 student", role: { en: "IGCSE Edexcel", ar: "IGCSE إديكسل" },
    text: { en: "What they said…", ar: "ما قالوه…" } },
];
window.SITE_DATA.results = [
  { title: { en: "IGCSE 2026", ar: "IGCSE 2026" }, detail: { en: "…", ar: "…" } },
];
```

## 6. Other common edits

| What | Where |
|---|---|
| Daily challenge questions | `assets/js/data/challenges.js` (one is shown per day, in rotation) |
| Binomial quiz questions | `assets/js/data/binomial-quiz.js` |
| Mock exams (questions, timing, model answers) | `assets/js/data/exams.js` (`duration` is in minutes) |
| Menu items / footer | top of `assets/js/main.js` (`NAV_MAIN`, `NAV_MORE`) |
| Colours and fonts | `:root` at the top of `assets/css/style.css` |
| Your photo | save it as `assets/img/mahmoud.jpg`, then follow the comment in `about.html` |
| Page text (intro, about, FAQ…) | the page's `.html` file. Every text has a `class="en"` and a `class="ar"` version |

## 7. Checking the maths

All answers in the daily challenges, the binomial quiz and the mock exams are checked by code.
Key formula-sheet identities, the grapher's expression parser, the matrix calculator and the unit-circle exact values are checked too.
Every expected answer is recomputed independently (exact polynomial expansion, numerical limits, matrix arithmetic, and so on) and compared with the site's data.
If you add or change questions, run:

```bash
node tests/verify-math.js
```

It prints `… checks passed, 0 failed.` when everything is correct.
New questions need a matching entry in the test file. The script tells you if one is missing.

## 8. Publish on GitHub Pages

1. On GitHub, open the repository and go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, select the `main` branch and the `/ (root)` folder, then click **Save**.
3. After a minute the site is live at `https://<your-username>.github.io/mahmoud-math/`.

If your address is different (for example a custom domain), replace
`https://mahmoudhassanay-rg.github.io/mahmoud-math/` in the `<link rel="canonical">` / `og:url` tags, `sitemap.xml` and `robots.txt`.

To preview locally, run `python3 -m http.server` in this folder and open <http://localhost:8000>.

## Language

The **عربي / English** button switches the whole site and the layout direction (right-to-left for Arabic).
The choice is remembered on that device. You can also link to a language directly with `?lang=ar` or `?lang=en`, e.g. `index.html?lang=ar`.
