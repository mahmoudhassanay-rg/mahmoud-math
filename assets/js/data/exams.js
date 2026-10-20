/* =========================================================
   MOCK EXAMS
   Format: 50% multiple choice (marked automatically) + 50% essay
   (model answers shown after submitting).
   - duration: minutes
   - mcq[].options: `h` = shown HTML, `v` = value checked by tests
   - essay[].checks: key results; tests/verify-math.js recomputes them
     and confirms each `show` text appears in the model answer.
   ========================================================= */
window.SITE_DATA = window.SITE_DATA || {};
window.SITE_DATA.exams = [
  {
    id: "exam1",
    title: { en: "Mock Exam 1 — Secondary 2 (Pure Math)", ar: "الامتحان التجريبي 1 — الصف الثاني الثانوي (رياضيات بحتة)" },
    duration: 60,
    mcq: [
      {
        id: "e1m1", marks: 2,
        q: { en: 'If <span class="math"><i>f</i>(<i>x</i>) = <i>x</i><sup>2</sup> − 1</span> and <span class="math"><i>g</i>(<i>x</i>) = <i>x</i> + 1</span>, then <span class="math">(<i>f</i> ∘ <i>g</i>)(2)</span> =',
             ar: 'إذا كانت <span class="math"><i>f</i>(<i>x</i>) = <i>x</i><sup>2</sup> − 1</span> و <span class="math"><i>g</i>(<i>x</i>) = <i>x</i> + 1</span> فإن <span class="math">(<i>f</i> ∘ <i>g</i>)(2)</span> =' },
        options: [{ h: "8", v: 8 }, { h: "3", v: 3 }, { h: "9", v: 9 }, { h: "5", v: 5 }], answer: 0
      },
      {
        id: "e1m2", marks: 2,
        q: { en: '<span class="math">log<sub>2</sub> 32</span> =', ar: '<span class="math">log<sub>2</sub> 32</span> =' },
        options: [{ h: "4", v: 4 }, { h: "5", v: 5 }, { h: "16", v: 16 }, { h: "6", v: 6 }], answer: 1
      },
      {
        id: "e1m3", marks: 2,
        q: { en: 'If <span class="math">2<sup><i>x</i></sup> = 1/8</span>, then <span class="math"><i>x</i></span> =', ar: 'إذا كان <span class="math">2<sup><i>x</i></sup> = 1/8</span> فإن <span class="math"><i>x</i></span> =' },
        options: [{ h: "3", v: 3 }, { h: "1/3", v: 1 / 3 }, { h: "−3", v: -3 }, { h: "−1/3", v: -1 / 3 }], answer: 2
      },
      {
        id: "e1m4", marks: 2,
        q: { en: '<span class="math">lim<sub><i>x</i>→3</sub> (<i>x</i><sup>2</sup> − 9)/(<i>x</i> − 3)</span> =', ar: '<span class="math">lim<sub><i>x</i>→3</sub> (<i>x</i><sup>2</sup> − 9)/(<i>x</i> − 3)</span> =' },
        options: [{ h: "0", v: 0 }, { h: "3", v: 3 }, { h: "9", v: 9 }, { h: "6", v: 6 }], answer: 3
      },
      {
        id: "e1m5", marks: 2,
        q: { en: '<span class="math">lim<sub><i>x</i>→∞</sub> (3<i>x</i><sup>2</sup> + 1)/(<i>x</i><sup>2</sup> − 5)</span> =', ar: '<span class="math">lim<sub><i>x</i>→∞</sub> (3<i>x</i><sup>2</sup> + 1)/(<i>x</i><sup>2</sup> − 5)</span> =' },
        options: [{ h: "3", v: 3 }, { h: "0", v: 0 }, { h: "∞", v: Infinity }, { h: "−1/5", v: -0.2 }], answer: 0
      },
      {
        id: "e1m6", marks: 2,
        q: { en: '<span class="math">sin 30° cos 60° + cos 30° sin 60°</span> =', ar: '<span class="math">sin 30° cos 60° + cos 30° sin 60°</span> =' },
        options: [{ h: "0", v: 0 }, { h: "1/2", v: 0.5 }, { h: "1", v: 1 }, { h: "√3/2", v: Math.sqrt(3) / 2 }], answer: 2
      },
      {
        id: "e1m7", marks: 2,
        q: { en: 'In triangle ABC, <span class="math"><i>a</i> = 8</span> cm and <span class="math">sin A = 1/2</span>. The radius of its circumcircle is:',
             ar: 'في المثلث ABC: <span class="math"><i>a</i> = 8</span> سم و <span class="math">sin A = 1/2</span>. طول نصف قطر الدائرة المارة برؤوسه يساوي:' },
        options: [{ h: "16 cm", v: 16 }, { h: "8 cm", v: 8 }, { h: "4 cm", v: 4 }, { h: "12 cm", v: 12 }], answer: 1
      },
      {
        id: "e1m8", marks: 2,
        q: { en: 'The coefficient of <span class="math"><i>x</i><sup>2</sup></span> in <span class="math">(1 + 3<i>x</i>)<sup>4</sup></span> is:', ar: 'معامل <span class="math"><i>x</i><sup>2</sup></span> في مفكوك <span class="math">(1 + 3<i>x</i>)<sup>4</sup></span> هو:' },
        options: [{ h: "6", v: 6 }, { h: "36", v: 36 }, { h: "12", v: 12 }, { h: "54", v: 54 }], answer: 3
      },
      {
        id: "e1m9", marks: 2,
        q: { en: '<span class="math"><span class="matrix"><table><tr><td>3</td><td>−1</td></tr><tr><td>2</td><td>4</td></tr></table></span></span> (determinant) =',
             ar: 'قيمة المحدد <span class="math"><span class="matrix"><table><tr><td>3</td><td>−1</td></tr><tr><td>2</td><td>4</td></tr></table></span></span> =' },
        options: [{ h: "14", v: 14 }, { h: "10", v: 10 }, { h: "−14", v: -14 }, { h: "2", v: 2 }], answer: 0
      },
      {
        id: "e1m10", marks: 2,
        q: { en: 'If A is a matrix of order 2 × 3 and B is of order 3 × 4, then AB is of order:', ar: 'إذا كانت A مصفوفة على النظم 2 × 3 و B على النظم 3 × 4 فإن AB على النظم:' },
        options: [{ h: "3 × 3", v: "3x3" }, { h: "2 × 4", v: "2x4" }, { h: "4 × 2", v: "4x2" }, { h: "undefined / غير معرفة", v: "undefined" }], answer: 1
      }
    ],
    essay: [
      {
        id: "e1s1", marks: 5,
        q: { en: 'Solve the equation: <span class="math">log<sub>3</sub>(<i>x</i> + 1) + log<sub>3</sub>(<i>x</i> − 1) = 1</span>.',
             ar: 'حل المعادلة: <span class="math">log<sub>3</sub>(<i>x</i> + 1) + log<sub>3</sub>(<i>x</i> − 1) = 1</span>.' },
        model: {
          en: '<span class="math">log<sub>3</sub>[(<i>x</i> + 1)(<i>x</i> − 1)] = 1 ⇒ <i>x</i><sup>2</sup> − 1 = 3 ⇒ <i>x</i><sup>2</sup> = 4 ⇒ <i>x</i> = ±2</span>.<br>Both logs need <span class="math"><i>x</i> − 1 &gt; 0</span>, so reject <span class="math"><i>x</i> = −2</span>.<br><strong>Answer: <span class="math"><i>x</i> = 2</span></strong>.<br><em>Marking: combine logs (1), convert to exponential form (1), solve quadratic (2), reject −2 (1).</em>',
          ar: '<span class="math">log<sub>3</sub>[(<i>x</i> + 1)(<i>x</i> − 1)] = 1 ⇒ <i>x</i><sup>2</sup> − 1 = 3 ⇒ <i>x</i><sup>2</sup> = 4 ⇒ <i>x</i> = ±2</span>.<br>يجب أن يكون <span class="math"><i>x</i> − 1 &gt; 0</span> فنرفض <span class="math"><i>x</i> = −2</span>.<br><strong>الحل: <span class="math"><i>x</i> = 2</span></strong>.<br><em>توزيع الدرجات: دمج اللوغاريتمات (1)، التحويل للصورة الأسية (1)، حل المعادلة (2)، رفض −2 (1).</em>'
        },
        checks: [{ name: "x", value: 2, show: "<i>x</i> = 2</span></strong>" }]
      },
      {
        id: "e1s2", marks: 5,
        q: { en: 'Find <span class="math">lim<sub><i>x</i>→0</sub> (sin 5<i>x</i> + tan 3<i>x</i>) / (2<i>x</i>)</span>.',
             ar: 'أوجد <span class="math">lim<sub><i>x</i>→0</sub> (sin 5<i>x</i> + tan 3<i>x</i>) / (2<i>x</i>)</span>.' },
        model: {
          en: 'Split the fraction: <span class="math">½ [ sin 5<i>x</i>/<i>x</i> + tan 3<i>x</i>/<i>x</i> ]</span>.<br>Using <span class="math">lim sin <i>ax</i>/<i>x</i> = <i>a</i></span> and <span class="math">lim tan <i>bx</i>/<i>x</i> = <i>b</i></span>: <span class="math">½ (5 + 3) = 4</span>.<br><strong>Answer: 4</strong>',
          ar: 'نجزّئ الكسر: <span class="math">½ [ sin 5<i>x</i>/<i>x</i> + tan 3<i>x</i>/<i>x</i> ]</span>.<br>باستخدام <span class="math">lim sin <i>ax</i>/<i>x</i> = <i>a</i></span> و <span class="math">lim tan <i>bx</i>/<i>x</i> = <i>b</i></span>: <span class="math">½ (5 + 3) = 4</span>.<br><strong>الناتج: 4</strong>'
        },
        checks: [{ name: "limit", value: 4, show: "½ (5 + 3) = 4" }]
      },
      {
        id: "e1s3", marks: 5,
        q: { en: 'In triangle ABC, <span class="math"><i>a</i> = 5</span> cm, <span class="math"><i>b</i> = 7</span> cm and C = 60°. Find: (i) the length of <span class="math"><i>c</i></span>, (ii) the area of the triangle (both to 2 d.p.).',
             ar: 'في المثلث ABC: <span class="math"><i>a</i> = 5</span> سم، <span class="math"><i>b</i> = 7</span> سم، C = 60°. أوجد: (1) طول <span class="math"><i>c</i></span>، (2) مساحة المثلث (لأقرب رقمين عشريين).' },
        model: {
          en: '(i) Cosine rule: <span class="math"><i>c</i><sup>2</sup> = 25 + 49 − 2(5)(7)cos 60° = 74 − 35 = 39</span>, so <span class="math"><i>c</i> = √39 ≈ 6.24</span> cm.<br>(ii) Area <span class="math">= ½<i>ab</i> sin C = ½(5)(7)(√3/2) = 35√3/4 ≈ 15.16</span> cm².',
          ar: '(1) قاعدة جيب التمام: <span class="math"><i>c</i><sup>2</sup> = 25 + 49 − 2(5)(7)cos 60° = 74 − 35 = 39</span> إذن <span class="math"><i>c</i> = √39 ≈ 6.24</span> سم.<br>(2) المساحة <span class="math">= ½<i>ab</i> sin C = ½(5)(7)(√3/2) = 35√3/4 ≈ 15.16</span> سم².'
        },
        checks: [
          { name: "c", value: 6.24, show: "√39 ≈ 6.24" },
          { name: "area", value: 15.16, show: "35√3/4 ≈ 15.16" }
        ]
      },
      {
        id: "e1s4", marks: 5,
        q: { en: 'Find the term independent of <span class="math"><i>x</i></span> in the expansion of <span class="math">(2<i>x</i> − 1/<i>x</i><sup>2</sup>)<sup>9</sup></span>.',
             ar: 'أوجد الحد الخالي من <span class="math"><i>x</i></span> في مفكوك <span class="math">(2<i>x</i> − 1/<i>x</i><sup>2</sup>)<sup>9</sup></span>.' },
        model: {
          en: '<span class="math">T<sub><i>r</i>+1</sub> = <sup>9</sup>C<sub><i>r</i></sub>(2<i>x</i>)<sup>9−<i>r</i></sup>(−1/<i>x</i><sup>2</sup>)<sup><i>r</i></sup> = <sup>9</sup>C<sub><i>r</i></sub> 2<sup>9−<i>r</i></sup>(−1)<sup><i>r</i></sup> <i>x</i><sup>9−3<i>r</i></sup></span>.<br><span class="math">9 − 3<i>r</i> = 0 ⇒ <i>r</i> = 3</span>, the 4th term.<br><span class="math">T<sub>4</sub> = 84 × 2<sup>6</sup> × (−1) = −5376</span>.',
          ar: '<span class="math">T<sub><i>r</i>+1</sub> = <sup>9</sup>C<sub><i>r</i></sub>(2<i>x</i>)<sup>9−<i>r</i></sup>(−1/<i>x</i><sup>2</sup>)<sup><i>r</i></sup> = <sup>9</sup>C<sub><i>r</i></sub> 2<sup>9−<i>r</i></sup>(−1)<sup><i>r</i></sup> <i>x</i><sup>9−3<i>r</i></sup></span>.<br><span class="math">9 − 3<i>r</i> = 0 ⇒ <i>r</i> = 3</span> أي الحد الرابع.<br><span class="math">T<sub>4</sub> = 84 × 2<sup>6</sup> × (−1) = −5376</span>.'
        },
        checks: [{ name: "term", value: -5376, show: "= −5376" }]
      }
    ]
  },
  {
    id: "exam2",
    title: { en: "Mock Exam 2 — Secondary 2 (Pure Math)", ar: "الامتحان التجريبي 2 — الصف الثاني الثانوي (رياضيات بحتة)" },
    duration: 60,
    mcq: [
      {
        id: "e2m1", marks: 2,
        q: { en: 'If <span class="math"><i>f</i>(<i>x</i>) = 3<i>x</i> + 2</span>, then <span class="math"><i>f</i><sup>−1</sup>(11)</span> =', ar: 'إذا كانت <span class="math"><i>f</i>(<i>x</i>) = 3<i>x</i> + 2</span> فإن <span class="math"><i>f</i><sup>−1</sup>(11)</span> =' },
        options: [{ h: "35", v: 35 }, { h: "3", v: 3 }, { h: "1/35", v: 1 / 35 }, { h: "9", v: 9 }], answer: 1
      },
      {
        id: "e2m2", marks: 2,
        q: { en: '<span class="math">log 5 + log 20</span> (base 10) =', ar: '<span class="math">log 5 + log 20</span> (للأساس 10) =' },
        options: [{ h: "2", v: 2 }, { h: "100", v: 100 }, { h: "25", v: 25 }, { h: "1", v: 1 }], answer: 0
      },
      {
        id: "e2m3", marks: 2,
        q: { en: 'If <span class="math">4<sup><i>x</i></sup> = 8</span>, then <span class="math"><i>x</i></span> =', ar: 'إذا كان <span class="math">4<sup><i>x</i></sup> = 8</span> فإن <span class="math"><i>x</i></span> =' },
        options: [{ h: "2", v: 2 }, { h: "2/3", v: 2 / 3 }, { h: "3/2", v: 1.5 }, { h: "1/2", v: 0.5 }], answer: 2
      },
      {
        id: "e2m4", marks: 2,
        q: { en: '<span class="math">lim<sub><i>x</i>→0</sub> sin 4<i>x</i> / (2<i>x</i>)</span> =', ar: '<span class="math">lim<sub><i>x</i>→0</sub> sin 4<i>x</i> / (2<i>x</i>)</span> =' },
        options: [{ h: "4", v: 4 }, { h: "1/2", v: 0.5 }, { h: "0", v: 0 }, { h: "2", v: 2 }], answer: 3
      },
      {
        id: "e2m5", marks: 2,
        q: { en: '<span class="math">lim<sub><i>x</i>→1</sub> (<i>x</i><sup>3</sup> − 1)/(<i>x</i> − 1)</span> =', ar: '<span class="math">lim<sub><i>x</i>→1</sub> (<i>x</i><sup>3</sup> − 1)/(<i>x</i> − 1)</span> =' },
        options: [{ h: "3", v: 3 }, { h: "1", v: 1 }, { h: "0", v: 0 }, { h: "2", v: 2 }], answer: 0
      },
      {
        id: "e2m6", marks: 2,
        q: { en: '<span class="math">cos<sup>2</sup> 22.5° − sin<sup>2</sup> 22.5°</span> =', ar: '<span class="math">cos<sup>2</sup> 22.5° − sin<sup>2</sup> 22.5°</span> =' },
        options: [{ h: "1", v: 1 }, { h: "√2/2", v: Math.SQRT2 / 2 }, { h: "1/2", v: 0.5 }, { h: "√3/2", v: Math.sqrt(3) / 2 }], answer: 1
      },
      {
        id: "e2m7", marks: 2,
        q: { en: '<span class="math">tan 75°</span> =', ar: '<span class="math">tan 75°</span> =' },
        options: [{ h: "√3", v: Math.sqrt(3) }, { h: "1 + √3", v: 1 + Math.sqrt(3) }, { h: "2 − √3", v: 2 - Math.sqrt(3) }, { h: "2 + √3", v: 2 + Math.sqrt(3) }], answer: 3
      },
      {
        id: "e2m8", marks: 2,
        q: { en: 'The number of terms in the expansion of <span class="math">(<i>x</i> + <i>y</i>)<sup>12</sup></span> is:', ar: 'عدد حدود مفكوك <span class="math">(<i>x</i> + <i>y</i>)<sup>12</sup></span> هو:' },
        options: [{ h: "12", v: 12 }, { h: "13", v: 13 }, { h: "11", v: 11 }, { h: "24", v: 24 }], answer: 1
      },
      {
        id: "e2m9", marks: 2,
        q: { en: 'If <span class="math">A = <span class="matrix"><table><tr><td>2</td><td>0</td></tr><tr><td>1</td><td>3</td></tr></table></span></span>, then <span class="math">|2A|</span> =',
             ar: 'إذا كانت <span class="math">A = <span class="matrix"><table><tr><td>2</td><td>0</td></tr><tr><td>1</td><td>3</td></tr></table></span></span> فإن <span class="math">|2A|</span> =' },
        options: [{ h: "12", v: 12 }, { h: "48", v: 48 }, { h: "24", v: 24 }, { h: "6", v: 6 }], answer: 2
      },
      {
        id: "e2m10", marks: 2,
        q: { en: 'In triangle ABC, <span class="math"><i>a</i> = 6</span>, <span class="math"><i>b</i> = 8</span>, <span class="math"><i>c</i> = 10</span>. Then m(∠C) =', ar: 'في المثلث ABC: <span class="math"><i>a</i> = 6</span>، <span class="math"><i>b</i> = 8</span>، <span class="math"><i>c</i> = 10</span>. إذن ق(∠C) =' },
        options: [{ h: "60°", v: 60 }, { h: "45°", v: 45 }, { h: "90°", v: 90 }, { h: "120°", v: 120 }], answer: 2
      }
    ],
    essay: [
      {
        id: "e2s1", marks: 5,
        q: { en: 'Solve: <span class="math">2<sup>2<i>x</i></sup> − 5 × 2<sup><i>x</i></sup> + 4 = 0</span>.', ar: 'حل المعادلة: <span class="math">2<sup>2<i>x</i></sup> − 5 × 2<sup><i>x</i></sup> + 4 = 0</span>.' },
        model: {
          en: 'Let <span class="math"><i>y</i> = 2<sup><i>x</i></sup></span>: <span class="math"><i>y</i><sup>2</sup> − 5<i>y</i> + 4 = 0 ⇒ (<i>y</i> − 1)(<i>y</i> − 4) = 0</span>.<br><span class="math">2<sup><i>x</i></sup> = 1 ⇒ <i>x</i> = 0</span> or <span class="math">2<sup><i>x</i></sup> = 4 ⇒ <i>x</i> = 2</span>.<br><strong>Solution set: {0, 2}</strong>',
          ar: 'نضع <span class="math"><i>y</i> = 2<sup><i>x</i></sup></span>: <span class="math"><i>y</i><sup>2</sup> − 5<i>y</i> + 4 = 0 ⇒ (<i>y</i> − 1)(<i>y</i> − 4) = 0</span>.<br><span class="math">2<sup><i>x</i></sup> = 1 ⇒ <i>x</i> = 0</span> أو <span class="math">2<sup><i>x</i></sup> = 4 ⇒ <i>x</i> = 2</span>.<br><strong>مجموعة الحل: {0, 2}</strong>'
        },
        checks: [{ name: "roots", value: [0, 2], show: "{0, 2}" }]
      },
      {
        id: "e2s2", marks: 5,
        q: { en: 'Find <span class="math">lim<sub><i>x</i>→2</sub> (<i>x</i><sup>5</sup> − 32)/(<i>x</i><sup>2</sup> − 4)</span>.', ar: 'أوجد <span class="math">lim<sub><i>x</i>→2</sub> (<i>x</i><sup>5</sup> − 32)/(<i>x</i><sup>2</sup> − 4)</span>.' },
        model: {
          en: 'Write it as <span class="math">[(<i>x</i><sup>5</sup> − 2<sup>5</sup>)/(<i>x</i> − 2)] ÷ [(<i>x</i><sup>2</sup> − 2<sup>2</sup>)/(<i>x</i> − 2)]</span> and use <span class="math">lim (<i>x</i><sup><i>n</i></sup> − <i>a</i><sup><i>n</i></sup>)/(<i>x</i> − <i>a</i>) = <i>n</i><i>a</i><sup><i>n</i>−1</sup></span>:<br><span class="math">(5 × 2<sup>4</sup>) ÷ (2 × 2) = 80 ÷ 4 = 20</span>.<br><strong>Answer: 20</strong>',
          ar: 'نكتبها على الصورة <span class="math">[(<i>x</i><sup>5</sup> − 2<sup>5</sup>)/(<i>x</i> − 2)] ÷ [(<i>x</i><sup>2</sup> − 2<sup>2</sup>)/(<i>x</i> − 2)]</span> ونستخدم <span class="math">lim (<i>x</i><sup><i>n</i></sup> − <i>a</i><sup><i>n</i></sup>)/(<i>x</i> − <i>a</i>) = <i>n</i><i>a</i><sup><i>n</i>−1</sup></span>:<br><span class="math">(5 × 2<sup>4</sup>) ÷ (2 × 2) = 80 ÷ 4 = 20</span>.<br><strong>الناتج: 20</strong>'
        },
        checks: [{ name: "limit", value: 20, show: "80 ÷ 4 = 20" }]
      },
      {
        id: "e2s3", marks: 5,
        q: { en: 'Solve triangle ABC given <span class="math"><i>a</i> = 12</span> cm, B = 40° and C = 75° (lengths to 2 d.p.).', ar: 'حل المثلث ABC الذي فيه <span class="math"><i>a</i> = 12</span> سم، B = 40°، C = 75° (الأطوال لأقرب رقمين عشريين).' },
        model: {
          en: 'A = 180° − (40° + 75°) = 65°.<br>Sine rule: <span class="math"><i>b</i> = 12 sin 40° / sin 65° ≈ 8.51</span> cm, <span class="math"><i>c</i> = 12 sin 75° / sin 65° ≈ 12.79</span> cm.',
          ar: 'A = 180° − (40° + 75°) = 65°.<br>بقاعدة الجيب: <span class="math"><i>b</i> = 12 sin 40° / sin 65° ≈ 8.51</span> سم، <span class="math"><i>c</i> = 12 sin 75° / sin 65° ≈ 12.79</span> سم.'
        },
        checks: [
          { name: "A", value: 65, show: "= 65°" },
          { name: "b", value: 8.51, show: "≈ 8.51" },
          { name: "c", value: 12.79, show: "≈ 12.79" }
        ]
      },
      {
        id: "e2s4", marks: 5,
        q: { en: 'If <span class="math">A = <span class="matrix"><table><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></table></span></span> and <span class="math">B = <span class="matrix"><table><tr><td>2</td><td>0</td></tr><tr><td>1</td><td>1</td></tr></table></span></span>, find (i) AB, (ii) A<sup>−1</sup>.',
             ar: 'إذا كانت <span class="math">A = <span class="matrix"><table><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></table></span></span> و <span class="math">B = <span class="matrix"><table><tr><td>2</td><td>0</td></tr><tr><td>1</td><td>1</td></tr></table></span></span> فأوجد (1) AB، (2) A<sup>−1</sup>.' },
        model: {
          en: '(i) <span class="math">AB = <span class="matrix"><table><tr><td>1·2 + 2·1</td><td>1·0 + 2·1</td></tr><tr><td>3·2 + 4·1</td><td>3·0 + 4·1</td></tr></table></span> = <span class="matrix"><table><tr><td>4</td><td>2</td></tr><tr><td>10</td><td>4</td></tr></table></span></span><br>(ii) <span class="math">|A| = 4 − 6 = −2</span>, so <span class="math">A<sup>−1</sup> = −½ <span class="matrix"><table><tr><td>4</td><td>−2</td></tr><tr><td>−3</td><td>1</td></tr></table></span> = <span class="matrix"><table><tr><td>−2</td><td>1</td></tr><tr><td>3/2</td><td>−1/2</td></tr></table></span></span>',
          ar: '(1) <span class="math">AB = <span class="matrix"><table><tr><td>1·2 + 2·1</td><td>1·0 + 2·1</td></tr><tr><td>3·2 + 4·1</td><td>3·0 + 4·1</td></tr></table></span> = <span class="matrix"><table><tr><td>4</td><td>2</td></tr><tr><td>10</td><td>4</td></tr></table></span></span><br>(2) <span class="math">|A| = 4 − 6 = −2</span> إذن <span class="math">A<sup>−1</sup> = −½ <span class="matrix"><table><tr><td>4</td><td>−2</td></tr><tr><td>−3</td><td>1</td></tr></table></span> = <span class="matrix"><table><tr><td>−2</td><td>1</td></tr><tr><td>3/2</td><td>−1/2</td></tr></table></span></span>'
        },
        checks: [
          { name: "AB", value: [[4, 2], [10, 4]], show: "<td>4</td><td>2</td></tr><tr><td>10</td><td>4</td>" },
          { name: "Ainv", value: [[-2, 1], [1.5, -0.5]], show: "<td>−2</td><td>1</td></tr><tr><td>3/2</td><td>−1/2</td>" }
        ]
      }
    ]
  }
];
