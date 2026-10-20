/* =========================================================
   BINOMIAL THEOREM QUIZ (Interactive Tools page)
   - `options`: each has `h` (what is shown, HTML) and `v` (numeric value
     used by tests/verify-math.js to check the maths).
   - `answer`: index (0-based) of the correct option.
   Options are shuffled on screen, so order here doesn't matter.
   ========================================================= */
window.SITE_DATA = window.SITE_DATA || {};
window.SITE_DATA.binomialQuiz = [
  {
    id: "b01",
    q: {
      en: 'How many terms are in the expansion of <span class="math">(2<i>x</i> + 3)<sup>7</sup></span>?',
      ar: 'ما عدد حدود مفكوك <span class="math">(2<i>x</i> + 3)<sup>7</sup></span>؟'
    },
    options: [{ h: "8", v: 8 }, { h: "7", v: 7 }, { h: "6", v: 6 }, { h: "9", v: 9 }],
    answer: 0,
    explain: {
      en: 'An expansion of <span class="math">(<i>a</i> + <i>b</i>)<sup><i>n</i></sup></span> has <span class="math"><i>n</i> + 1</span> terms, so <span class="math">7 + 1 = 8</span>.',
      ar: 'مفكوك <span class="math">(<i>a</i> + <i>b</i>)<sup><i>n</i></sup></span> يحتوي على <span class="math"><i>n</i> + 1</span> حدًا، إذن <span class="math">7 + 1 = 8</span>.'
    }
  },
  {
    id: "b02",
    q: {
      en: 'In the expansion of <span class="math">(<i>x</i> + 2)<sup>5</sup></span> in descending powers of <span class="math"><i>x</i></span>, the coefficient of the third term is:',
      ar: 'في مفكوك <span class="math">(<i>x</i> + 2)<sup>5</sup></span> حسب قوى <span class="math"><i>x</i></span> التنازلية، معامل الحد الثالث هو:'
    },
    options: [{ h: "40", v: 40 }, { h: "10", v: 10 }, { h: "80", v: 80 }, { h: "20", v: 20 }],
    answer: 0,
    explain: {
      en: '<span class="math">T<sub>3</sub> = <sup>5</sup>C<sub>2</sub> <i>x</i><sup>3</sup> (2)<sup>2</sup> = 10 × 4 <i>x</i><sup>3</sup> = 40<i>x</i><sup>3</sup></span>. Remember <span class="math">T<sub><i>r</i>+1</sub></span> uses <span class="math"><sup><i>n</i></sup>C<sub><i>r</i></sub></span>, so the 3rd term uses <span class="math"><i>r</i> = 2</span>.',
      ar: '<span class="math">T<sub>3</sub> = <sup>5</sup>C<sub>2</sub> <i>x</i><sup>3</sup> (2)<sup>2</sup> = 10 × 4 <i>x</i><sup>3</sup> = 40<i>x</i><sup>3</sup></span>. تذكّر أن <span class="math">T<sub><i>r</i>+1</sub></span> يستخدم <span class="math"><sup><i>n</i></sup>C<sub><i>r</i></sub></span>، فالحد الثالث يعني <span class="math"><i>r</i> = 2</span>.'
    }
  },
  {
    id: "b03",
    q: {
      en: 'The coefficient of <span class="math"><i>x</i><sup>4</sup></span> in <span class="math">(1 − <i>x</i>)<sup>9</sup></span> is:',
      ar: 'معامل <span class="math"><i>x</i><sup>4</sup></span> في مفكوك <span class="math">(1 − <i>x</i>)<sup>9</sup></span> هو:'
    },
    options: [{ h: "126", v: 126 }, { h: "−126", v: -126 }, { h: "84", v: 84 }, { h: "−84", v: -84 }],
    answer: 0,
    explain: {
      en: 'The term is <span class="math"><sup>9</sup>C<sub>4</sub>(−<i>x</i>)<sup>4</sup> = 126<i>x</i><sup>4</sup></span>. The sign is positive because the power 4 is even.',
      ar: 'الحد هو <span class="math"><sup>9</sup>C<sub>4</sub>(−<i>x</i>)<sup>4</sup> = 126<i>x</i><sup>4</sup></span>، والإشارة موجبة لأن الأس 4 زوجي.'
    }
  },
  {
    id: "b04",
    q: {
      en: 'The middle term in the expansion of <span class="math">(<i>x</i> − 1/<i>x</i>)<sup>10</sup></span> is:',
      ar: 'الحد الأوسط في مفكوك <span class="math">(<i>x</i> − 1/<i>x</i>)<sup>10</sup></span> هو:'
    },
    options: [{ h: "−252", v: -252 }, { h: "252", v: 252 }, { h: "210", v: 210 }, { h: "−210", v: -210 }],
    answer: 0,
    explain: {
      en: 'There are 11 terms, so the middle one is <span class="math">T<sub>6</sub> = <sup>10</sup>C<sub>5</sub> <i>x</i><sup>5</sup>(−1/<i>x</i>)<sup>5</sup> = −252</span>.',
      ar: 'عدد الحدود 11 فالحد الأوسط هو <span class="math">T<sub>6</sub> = <sup>10</sup>C<sub>5</sub> <i>x</i><sup>5</sup>(−1/<i>x</i>)<sup>5</sup> = −252</span>.'
    }
  },
  {
    id: "b05",
    q: {
      en: 'The term independent of <span class="math"><i>x</i></span> in <span class="math">(<i>x</i> + 1/<i>x</i><sup>2</sup>)<sup>9</sup></span> is:',
      ar: 'الحد الخالي من <span class="math"><i>x</i></span> في مفكوك <span class="math">(<i>x</i> + 1/<i>x</i><sup>2</sup>)<sup>9</sup></span> هو:'
    },
    options: [{ h: "84", v: 84 }, { h: "126", v: 126 }, { h: "36", v: 36 }, { h: "9", v: 9 }],
    answer: 0,
    explain: {
      en: '<span class="math">T<sub><i>r</i>+1</sub> = <sup>9</sup>C<sub><i>r</i></sub> <i>x</i><sup>9 − <i>r</i></sup> <i>x</i><sup>−2<i>r</i></sup> = <sup>9</sup>C<sub><i>r</i></sub> <i>x</i><sup>9 − 3<i>r</i></sup></span>. Set <span class="math">9 − 3<i>r</i> = 0 ⇒ <i>r</i> = 3</span>: the term is <span class="math"><sup>9</sup>C<sub>3</sub> = 84</span>.',
      ar: '<span class="math">T<sub><i>r</i>+1</sub> = <sup>9</sup>C<sub><i>r</i></sub> <i>x</i><sup>9 − <i>r</i></sup> <i>x</i><sup>−2<i>r</i></sup> = <sup>9</sup>C<sub><i>r</i></sub> <i>x</i><sup>9 − 3<i>r</i></sup></span>. نضع <span class="math">9 − 3<i>r</i> = 0 ⇒ <i>r</i> = 3</span> فيكون الحد <span class="math"><sup>9</sup>C<sub>3</sub> = 84</span>.'
    }
  },
  {
    id: "b06",
    q: {
      en: 'The sum of the coefficients in the expansion of <span class="math">(2<i>x</i> − 1)<sup>6</sup></span> is:',
      ar: 'مجموع معاملات حدود مفكوك <span class="math">(2<i>x</i> − 1)<sup>6</sup></span> يساوي:'
    },
    options: [{ h: "1", v: 1 }, { h: "64", v: 64 }, { h: "729", v: 729 }, { h: "0", v: 0 }],
    answer: 0,
    explain: {
      en: 'Substitute <span class="math"><i>x</i> = 1</span>: <span class="math">(2 − 1)<sup>6</sup> = 1</span>.',
      ar: 'نعوض بـ <span class="math"><i>x</i> = 1</span>: <span class="math">(2 − 1)<sup>6</sup> = 1</span>.'
    }
  },
  {
    id: "b07",
    q: {
      en: 'If <span class="math"><sup><i>n</i></sup>C<sub>2</sub> = 45</span>, then <span class="math"><i>n</i></span> =',
      ar: 'إذا كان <span class="math"><sup><i>n</i></sup>C<sub>2</sub> = 45</span> فإن <span class="math"><i>n</i></span> ='
    },
    options: [{ h: "10", v: 10 }, { h: "9", v: 9 }, { h: "45", v: 45 }, { h: "15", v: 15 }],
    answer: 0,
    explain: {
      en: '<span class="math"><i>n</i>(<i>n</i> − 1)/2 = 45 ⇒ <i>n</i>(<i>n</i> − 1) = 90 = 10 × 9</span>, so <span class="math"><i>n</i> = 10</span>.',
      ar: '<span class="math"><i>n</i>(<i>n</i> − 1)/2 = 45 ⇒ <i>n</i>(<i>n</i> − 1) = 90 = 10 × 9</span> إذن <span class="math"><i>n</i> = 10</span>.'
    }
  },
  {
    id: "b08",
    q: {
      en: 'In <span class="math">(1 + <i>x</i>)<sup>12</sup></span>, the ratio (coefficient of <span class="math"><i>x</i><sup>5</sup></span>) : (coefficient of <span class="math"><i>x</i><sup>4</sup></span>) is:',
      ar: 'في مفكوك <span class="math">(1 + <i>x</i>)<sup>12</sup></span>، النسبة (معامل <span class="math"><i>x</i><sup>5</sup></span>) : (معامل <span class="math"><i>x</i><sup>4</sup></span>) هي:'
    },
    options: [{ h: "8 : 5", v: 1.6 }, { h: "5 : 8", v: 0.625 }, { h: "12 : 5", v: 2.4 }, { h: "3 : 2", v: 1.5 }],
    answer: 0,
    explain: {
      en: 'Use <span class="math"><sup><i>n</i></sup>C<sub><i>r</i></sub> / <sup><i>n</i></sup>C<sub><i>r</i>−1</sub> = (<i>n</i> − <i>r</i> + 1)/<i>r</i></span> with <span class="math"><i>n</i> = 12, <i>r</i> = 5</span>: <span class="math">8/5</span>. (Check: 792 : 495 = 8 : 5.)',
      ar: 'نستخدم <span class="math"><sup><i>n</i></sup>C<sub><i>r</i></sub> / <sup><i>n</i></sup>C<sub><i>r</i>−1</sub> = (<i>n</i> − <i>r</i> + 1)/<i>r</i></span> حيث <span class="math"><i>n</i> = 12، <i>r</i> = 5</span>: النسبة <span class="math">8/5</span>. (تحقق: 792 : 495 = 8 : 5.)'
    }
  },
  {
    id: "b09",
    q: {
      en: 'Using the first three terms of a binomial expansion, <span class="math">(1.01)<sup>5</sup> ≈</span>',
      ar: 'باستخدام أول ثلاثة حدود من مفكوك ذات الحدين، <span class="math">(1.01)<sup>5</sup> ≈</span>'
    },
    options: [{ h: "1.051", v: 1.051 }, { h: "1.05", v: 1.05 }, { h: "1.0051", v: 1.0051 }, { h: "1.501", v: 1.501 }],
    answer: 0,
    explain: {
      en: '<span class="math">(1 + 0.01)<sup>5</sup> ≈ 1 + 5(0.01) + 10(0.01)<sup>2</sup> = 1 + 0.05 + 0.001 = 1.051</span>. (The exact value is 1.0510100501…)',
      ar: '<span class="math">(1 + 0.01)<sup>5</sup> ≈ 1 + 5(0.01) + 10(0.01)<sup>2</sup> = 1 + 0.05 + 0.001 = 1.051</span>. (القيمة الدقيقة 1.0510100501…)'
    }
  },
  {
    id: "b10",
    q: {
      en: 'If the coefficients of the 3rd and 5th terms in the expansion of <span class="math">(1 + <i>x</i>)<sup><i>n</i></sup></span> are equal, then <span class="math"><i>n</i></span> =',
      ar: 'إذا كان معامل الحد الثالث يساوي معامل الحد الخامس في مفكوك <span class="math">(1 + <i>x</i>)<sup><i>n</i></sup></span> فإن <span class="math"><i>n</i></span> ='
    },
    options: [{ h: "6", v: 6 }, { h: "7", v: 7 }, { h: "8", v: 8 }, { h: "5", v: 5 }],
    answer: 0,
    explain: {
      en: '<span class="math"><sup><i>n</i></sup>C<sub>2</sub> = <sup><i>n</i></sup>C<sub>4</sub></span> and <span class="math">2 ≠ 4</span>, so <span class="math">2 + 4 = <i>n</i> ⇒ <i>n</i> = 6</span>.',
      ar: '<span class="math"><sup><i>n</i></sup>C<sub>2</sub> = <sup><i>n</i></sup>C<sub>4</sub></span> و <span class="math">2 ≠ 4</span> إذن <span class="math">2 + 4 = <i>n</i> ⇒ <i>n</i> = 6</span>.'
    }
  },
  {
    id: "b11",
    q: {
      en: '<span class="math"><sup>8</sup>C<sub>0</sub> + <sup>8</sup>C<sub>1</sub> + <sup>8</sup>C<sub>2</sub> + … + <sup>8</sup>C<sub>8</sub> =</span>',
      ar: '<span class="math"><sup>8</sup>C<sub>0</sub> + <sup>8</sup>C<sub>1</sub> + <sup>8</sup>C<sub>2</sub> + … + <sup>8</sup>C<sub>8</sub> =</span>'
    },
    options: [{ h: "256", v: 256 }, { h: "128", v: 128 }, { h: "64", v: 64 }, { h: "512", v: 512 }],
    answer: 0,
    explain: {
      en: 'Put <span class="math"><i>x</i> = 1</span> in <span class="math">(1 + <i>x</i>)<sup>8</sup></span>: the sum is <span class="math">2<sup>8</sup> = 256</span>.',
      ar: 'نضع <span class="math"><i>x</i> = 1</span> في <span class="math">(1 + <i>x</i>)<sup>8</sup></span>: المجموع <span class="math">2<sup>8</sup> = 256</span>.'
    }
  },
  {
    id: "b12",
    q: {
      en: 'The coefficient of <span class="math"><i>x</i><sup>2</sup></span> in <span class="math">(1 + <i>x</i>)<sup>3</sup>(1 − <i>x</i>)<sup>3</sup></span> is:',
      ar: 'معامل <span class="math"><i>x</i><sup>2</sup></span> في مفكوك <span class="math">(1 + <i>x</i>)<sup>3</sup>(1 − <i>x</i>)<sup>3</sup></span> هو:'
    },
    options: [{ h: "−3", v: -3 }, { h: "3", v: 3 }, { h: "0", v: 0 }, { h: "−6", v: -6 }],
    answer: 0,
    explain: {
      en: 'Combine first: <span class="math">(1 + <i>x</i>)<sup>3</sup>(1 − <i>x</i>)<sup>3</sup> = (1 − <i>x</i><sup>2</sup>)<sup>3</sup> = 1 − 3<i>x</i><sup>2</sup> + 3<i>x</i><sup>4</sup> − <i>x</i><sup>6</sup></span>, so the coefficient is <span class="math">−3</span>.',
      ar: 'نجمع أولًا: <span class="math">(1 + <i>x</i>)<sup>3</sup>(1 − <i>x</i>)<sup>3</sup> = (1 − <i>x</i><sup>2</sup>)<sup>3</sup> = 1 − 3<i>x</i><sup>2</sup> + 3<i>x</i><sup>4</sup> − <i>x</i><sup>6</sup></span> إذن المعامل <span class="math">−3</span>.'
    }
  }
];
