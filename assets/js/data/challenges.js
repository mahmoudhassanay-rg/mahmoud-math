/* =========================================================
   DAILY CHALLENGE QUESTIONS (Home page)
   One question is shown per day, cycling through this list.
   To add a question, copy a block and give it a new unique id.
   `value` is the numeric answer, used by tests/verify-math.js.
   ========================================================= */
window.SITE_DATA = window.SITE_DATA || {};
window.SITE_DATA.challenges = [
  {
    id: "c01",
    topic: { en: "Binomial theorem", ar: "نظرية ذات الحدين" },
    q: {
      en: 'Find the coefficient of <span class="math"><i>x</i><sup>3</sup></span> in the expansion of <span class="math">(1 + 2<i>x</i>)<sup>5</sup></span>.',
      ar: 'أوجد معامل <span class="math"><i>x</i><sup>3</sup></span> في مفكوك <span class="math">(1 + 2<i>x</i>)<sup>5</sup></span>.'
    },
    a: {
      en: '<strong>80.</strong> The term is <span class="math"><sup>5</sup>C<sub>3</sub>(2<i>x</i>)<sup>3</sup> = 10 × 8<i>x</i><sup>3</sup> = 80<i>x</i><sup>3</sup></span>.',
      ar: '<strong>80.</strong> الحد هو <span class="math"><sup>5</sup>C<sub>3</sub>(2<i>x</i>)<sup>3</sup> = 10 × 8<i>x</i><sup>3</sup> = 80<i>x</i><sup>3</sup></span>.'
    },
    value: 80
  },
  {
    id: "c02",
    topic: { en: "Logarithms", ar: "اللوغاريتمات" },
    q: {
      en: 'Solve: <span class="math">log<sub>2</sub> <i>x</i> + log<sub>2</sub>(<i>x</i> − 2) = 3</span>.',
      ar: 'حل المعادلة: <span class="math">log<sub>2</sub> <i>x</i> + log<sub>2</sub>(<i>x</i> − 2) = 3</span>.'
    },
    a: {
      en: '<strong><i>x</i> = 4.</strong> <span class="math"><i>x</i>(<i>x</i> − 2) = 2<sup>3</sup> = 8 ⇒ <i>x</i><sup>2</sup> − 2<i>x</i> − 8 = 0 ⇒ (<i>x</i> − 4)(<i>x</i> + 2) = 0</span>. Reject <span class="math"><i>x</i> = −2</span> (log of a negative number is undefined).',
      ar: '<strong><i>x</i> = 4.</strong> <span class="math"><i>x</i>(<i>x</i> − 2) = 2<sup>3</sup> = 8 ⇒ <i>x</i><sup>2</sup> − 2<i>x</i> − 8 = 0 ⇒ (<i>x</i> − 4)(<i>x</i> + 2) = 0</span>. نرفض <span class="math"><i>x</i> = −2</span> لأن لوغاريتم العدد السالب غير معرّف.'
    },
    value: 4
  },
  {
    id: "c03",
    topic: { en: "Limits", ar: "النهايات" },
    q: {
      en: 'Find <span class="math">lim<sub><i>x</i>→2</sub> (<i>x</i><sup>2</sup> − 4) / (<i>x</i> − 2)</span>.',
      ar: 'أوجد <span class="math">lim<sub><i>x</i>→2</sub> (<i>x</i><sup>2</sup> − 4) / (<i>x</i> − 2)</span>.'
    },
    a: {
      en: '<strong>4.</strong> Factor: <span class="math">(<i>x</i> − 2)(<i>x</i> + 2)/(<i>x</i> − 2) = <i>x</i> + 2 → 4</span>.',
      ar: '<strong>4.</strong> بالتحليل: <span class="math">(<i>x</i> − 2)(<i>x</i> + 2)/(<i>x</i> − 2) = <i>x</i> + 2 → 4</span>.'
    },
    value: 4
  },
  {
    id: "c04",
    topic: { en: "Trigonometry", ar: "حساب المثلثات" },
    q: {
      en: 'In triangle ABC, <span class="math"><i>a</i> = 7</span> cm, <span class="math"><i>b</i> = 5</span> cm and <span class="math"><i>c</i> = 3</span> cm. Find the measure of angle A.',
      ar: 'في المثلث ABC: <span class="math"><i>a</i> = 7</span> سم، <span class="math"><i>b</i> = 5</span> سم، <span class="math"><i>c</i> = 3</span> سم. أوجد قياس الزاوية A.'
    },
    a: {
      en: '<strong>120°.</strong> <span class="math">cos A = (<i>b</i><sup>2</sup> + <i>c</i><sup>2</sup> − <i>a</i><sup>2</sup>)/(2<i>bc</i>) = (25 + 9 − 49)/30 = −½</span>, so A = 120°.',
      ar: '<strong>120°.</strong> <span class="math">cos A = (<i>b</i><sup>2</sup> + <i>c</i><sup>2</sup> − <i>a</i><sup>2</sup>)/(2<i>bc</i>) = (25 + 9 − 49)/30 = −½</span> إذن A = 120°.'
    },
    value: 120
  },
  {
    id: "c05",
    topic: { en: "Matrices", ar: "المصفوفات" },
    q: {
      en: 'If <span class="math">A = <span class="matrix"><table><tr><td>1</td><td>1</td></tr><tr><td>0</td><td>1</td></tr></table></span></span>, find the element in the first row, second column of <span class="math">A<sup>5</sup></span>.',
      ar: 'إذا كانت <span class="math">A = <span class="matrix"><table><tr><td>1</td><td>1</td></tr><tr><td>0</td><td>1</td></tr></table></span></span> فأوجد العنصر في الصف الأول والعمود الثاني من <span class="math">A<sup>5</sup></span>.'
    },
    a: {
      en: '<strong>5.</strong> <span class="math">A<sup>2</sup></span> has 2 in that position, <span class="math">A<sup>3</sup></span> has 3, … so <span class="math">A<sup><i>n</i></sup></span> has <i>n</i>: <span class="math">A<sup>5</sup> = <span class="matrix"><table><tr><td>1</td><td>5</td></tr><tr><td>0</td><td>1</td></tr></table></span></span>.',
      ar: '<strong>5.</strong> في <span class="math">A<sup>2</sup></span> يكون العنصر 2، وفي <span class="math">A<sup>3</sup></span> يكون 3، … إذن <span class="math">A<sup>5</sup> = <span class="matrix"><table><tr><td>1</td><td>5</td></tr><tr><td>0</td><td>1</td></tr></table></span></span>.'
    },
    value: 5
  },
  {
    id: "c06",
    topic: { en: "Binomial theorem", ar: "نظرية ذات الحدين" },
    q: {
      en: 'Find the middle term in the expansion of <span class="math">(<i>x</i> + 1/<i>x</i>)<sup>8</sup></span>.',
      ar: 'أوجد الحد الأوسط في مفكوك <span class="math">(<i>x</i> + 1/<i>x</i>)<sup>8</sup></span>.'
    },
    a: {
      en: '<strong>70.</strong> There are 9 terms, so the middle term is <span class="math">T<sub>5</sub> = <sup>8</sup>C<sub>4</sub> <i>x</i><sup>4</sup>(1/<i>x</i>)<sup>4</sup> = 70</span>.',
      ar: '<strong>70.</strong> عدد الحدود 9 فالحد الأوسط هو <span class="math">T<sub>5</sub> = <sup>8</sup>C<sub>4</sub> <i>x</i><sup>4</sup>(1/<i>x</i>)<sup>4</sup> = 70</span>.'
    },
    value: 70
  },
  {
    id: "c07",
    topic: { en: "Exponential equations", ar: "المعادلات الأسية" },
    q: {
      en: 'Solve: <span class="math">3<sup><i>x</i> + 1</sup> = 81</span>.',
      ar: 'حل المعادلة: <span class="math">3<sup><i>x</i> + 1</sup> = 81</span>.'
    },
    a: {
      en: '<strong><i>x</i> = 3.</strong> <span class="math">81 = 3<sup>4</sup> ⇒ <i>x</i> + 1 = 4</span>.',
      ar: '<strong><i>x</i> = 3.</strong> <span class="math">81 = 3<sup>4</sup> ⇒ <i>x</i> + 1 = 4</span>.'
    },
    value: 3
  },
  {
    id: "c08",
    topic: { en: "Functions", ar: "الدوال" },
    q: {
      en: 'If <span class="math"><i>f</i>(<i>x</i>) = 2<i>x</i> − 3</span> and <span class="math"><i>g</i>(<i>x</i>) = <i>x</i><sup>2</sup></span>, find <span class="math">(<i>f</i> ∘ <i>g</i>)(3)</span>.',
      ar: 'إذا كانت <span class="math"><i>f</i>(<i>x</i>) = 2<i>x</i> − 3</span> و <span class="math"><i>g</i>(<i>x</i>) = <i>x</i><sup>2</sup></span> فأوجد <span class="math">(<i>f</i> ∘ <i>g</i>)(3)</span>.'
    },
    a: {
      en: '<strong>15.</strong> <span class="math"><i>g</i>(3) = 9</span>, then <span class="math"><i>f</i>(9) = 18 − 3 = 15</span>.',
      ar: '<strong>15.</strong> <span class="math"><i>g</i>(3) = 9</span> ثم <span class="math"><i>f</i>(9) = 18 − 3 = 15</span>.'
    },
    value: 15
  },
  {
    id: "c09",
    topic: { en: "Binomial theorem", ar: "نظرية ذات الحدين" },
    q: {
      en: 'Find the sum of the coefficients in the expansion of <span class="math">(3<i>x</i> − 1)<sup>4</sup></span>.',
      ar: 'أوجد مجموع معاملات حدود مفكوك <span class="math">(3<i>x</i> − 1)<sup>4</sup></span>.'
    },
    a: {
      en: '<strong>16.</strong> Put <span class="math"><i>x</i> = 1</span>: <span class="math">(3 − 1)<sup>4</sup> = 2<sup>4</sup> = 16</span>.',
      ar: '<strong>16.</strong> نضع <span class="math"><i>x</i> = 1</span>: <span class="math">(3 − 1)<sup>4</sup> = 2<sup>4</sup> = 16</span>.'
    },
    value: 16
  },
  {
    id: "c10",
    topic: { en: "Limits", ar: "النهايات" },
    q: {
      en: 'Find <span class="math">lim<sub><i>x</i>→0</sub> sin(3<i>x</i>) / <i>x</i></span>.',
      ar: 'أوجد <span class="math">lim<sub><i>x</i>→0</sub> sin(3<i>x</i>) / <i>x</i></span>.'
    },
    a: {
      en: '<strong>3.</strong> <span class="math">sin(3<i>x</i>)/<i>x</i> = 3 · sin(3<i>x</i>)/(3<i>x</i>) → 3 × 1 = 3</span>.',
      ar: '<strong>3.</strong> <span class="math">sin(3<i>x</i>)/<i>x</i> = 3 · sin(3<i>x</i>)/(3<i>x</i>) → 3 × 1 = 3</span>.'
    },
    value: 3
  },
  {
    id: "c11",
    topic: { en: "Sine rule", ar: "قاعدة الجيب" },
    q: {
      en: 'In triangle ABC, <span class="math"><i>a</i> = 10</span> cm, A = 30° and B = 45°. Find <span class="math"><i>b</i></span> (to 2 decimal places).',
      ar: 'في المثلث ABC: <span class="math"><i>a</i> = 10</span> سم، A = 30°، B = 45°. أوجد <span class="math"><i>b</i></span> لأقرب رقمين عشريين.'
    },
    a: {
      en: '<strong>14.14 cm.</strong> <span class="math"><i>b</i> = <i>a</i> sin B / sin A = 10 × (√2/2) / (1/2) = 10√2 ≈ 14.14</span>.',
      ar: '<strong>14.14 سم.</strong> <span class="math"><i>b</i> = <i>a</i> sin B / sin A = 10 × (√2/2) / (1/2) = 10√2 ≈ 14.14</span>.'
    },
    value: 14.14
  },
  {
    id: "c12",
    topic: { en: "Binomial theorem", ar: "نظرية ذات الحدين" },
    q: {
      en: 'Find the term independent of <span class="math"><i>x</i></span> in <span class="math">(<i>x</i><sup>2</sup> + 2/<i>x</i>)<sup>6</sup></span>.',
      ar: 'أوجد الحد الخالي من <span class="math"><i>x</i></span> في مفكوك <span class="math">(<i>x</i><sup>2</sup> + 2/<i>x</i>)<sup>6</sup></span>.'
    },
    a: {
      en: '<strong>240.</strong> <span class="math">T<sub><i>r</i>+1</sub> = <sup>6</sup>C<sub><i>r</i></sub> 2<sup><i>r</i></sup> <i>x</i><sup>12 − 3<i>r</i></sup></span>; <span class="math">12 − 3<i>r</i> = 0 ⇒ <i>r</i> = 4</span>, so the term is <span class="math">15 × 16 = 240</span>.',
      ar: '<strong>240.</strong> <span class="math">T<sub><i>r</i>+1</sub> = <sup>6</sup>C<sub><i>r</i></sub> 2<sup><i>r</i></sup> <i>x</i><sup>12 − 3<i>r</i></sup></span>؛ <span class="math">12 − 3<i>r</i> = 0 ⇒ <i>r</i> = 4</span> فيكون الحد <span class="math">15 × 16 = 240</span>.'
    },
    value: 240
  },
  {
    id: "c13",
    topic: { en: "Logarithms", ar: "اللوغاريتمات" },
    q: {
      en: 'Evaluate <span class="math">log<sub>3</sub> 54 − log<sub>3</sub> 2</span>.',
      ar: 'أوجد قيمة <span class="math">log<sub>3</sub> 54 − log<sub>3</sub> 2</span>.'
    },
    a: {
      en: '<strong>3.</strong> <span class="math">log<sub>3</sub>(54/2) = log<sub>3</sub> 27 = 3</span>.',
      ar: '<strong>3.</strong> <span class="math">log<sub>3</sub>(54/2) = log<sub>3</sub> 27 = 3</span>.'
    },
    value: 3
  },
  {
    id: "c14",
    topic: { en: "Matrices", ar: "المصفوفات" },
    q: {
      en: 'Find the determinant <span class="math"><span class="matrix"><table><tr><td>2</td><td>3</td></tr><tr><td>1</td><td>4</td></tr></table></span></span>.',
      ar: 'أوجد قيمة المحدد <span class="math"><span class="matrix"><table><tr><td>2</td><td>3</td></tr><tr><td>1</td><td>4</td></tr></table></span></span>.'
    },
    a: {
      en: '<strong>5.</strong> <span class="math">2 × 4 − 3 × 1 = 5</span>.',
      ar: '<strong>5.</strong> <span class="math">2 × 4 − 3 × 1 = 5</span>.'
    },
    value: 5
  }
];
