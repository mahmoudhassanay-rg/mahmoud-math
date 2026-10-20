/* =========================================================
   SECONDARY 2 RESOURCES — chapters, PDFs, videos, formula sheets
   ---------------------------------------------------------
   To add a PDF:   put the file in assets/pdfs/ and add
                   { title: {en:"...", ar:"..."}, file: "assets/pdfs/name.pdf" }
                   to that chapter's `pdfs` list.
   To add a video: add { title: {en:"...", ar:"..."}, url: "https://youtu.be/..." }
                   to that chapter's `videos` list.
   Chapter titles can be renamed freely to match the current syllabus.
   ========================================================= */
window.SITE_DATA = window.SITE_DATA || {};
window.SITE_DATA.chapters = [
  {
    id: "functions",
    title: { en: "Real Functions & Their Graphs", ar: "الدوال الحقيقية ورسم منحنياتها" },
    summary: { en: "Domain & range, even/odd functions, composition, inverse functions and transformations of graphs.",
               ar: "المجال والمدى، الدوال الزوجية والفردية، تركيب الدوال، الدالة العكسية وتحويلات المنحنيات." },
    pdfs: [],
    videos: [],
    formulas: [
      { name: { en: "Even function", ar: "الدالة الزوجية" }, f: { en: '<i>f</i>(−<i>x</i>) = <i>f</i>(<i>x</i>) — symmetric about the <i>y</i>-axis', ar: '<i>f</i>(−<i>x</i>) = <i>f</i>(<i>x</i>) — متماثلة حول محور الصادات' } },
      { name: { en: "Odd function", ar: "الدالة الفردية" }, f: { en: '<i>f</i>(−<i>x</i>) = −<i>f</i>(<i>x</i>) — symmetric about the origin', ar: '<i>f</i>(−<i>x</i>) = −<i>f</i>(<i>x</i>) — متماثلة حول نقطة الأصل' } },
      { name: { en: "Composition", ar: "تركيب دالتين" }, f: '(<i>f</i> ∘ <i>g</i>)(<i>x</i>) = <i>f</i>(<i>g</i>(<i>x</i>))' },
      { name: { en: "Inverse function", ar: "الدالة العكسية" }, f: { en: '<i>f</i>(<i>f</i><sup>−1</sup>(<i>x</i>)) = <i>x</i>; graph of <i>f</i><sup>−1</sup> is the reflection of <i>f</i> in <i>y</i> = <i>x</i>', ar: '<i>f</i>(<i>f</i><sup>−1</sup>(<i>x</i>)) = <i>x</i>؛ منحنى <i>f</i><sup>−1</sup> هو صورة منحنى <i>f</i> بالانعكاس في المستقيم <i>y</i> = <i>x</i>' } },
      { name: { en: "Vertical shift", ar: "انسحاب رأسي" }, f: { en: '<i>y</i> = <i>f</i>(<i>x</i>) + <i>a</i> : up <i>a</i> units (down if <i>a</i> &lt; 0)', ar: '<i>y</i> = <i>f</i>(<i>x</i>) + <i>a</i> : لأعلى <i>a</i> وحدة (لأسفل إذا <i>a</i> &lt; 0)' } },
      { name: { en: "Horizontal shift", ar: "انسحاب أفقي" }, f: { en: '<i>y</i> = <i>f</i>(<i>x</i> + <i>a</i>) : left <i>a</i> units (right if <i>a</i> &lt; 0)', ar: '<i>y</i> = <i>f</i>(<i>x</i> + <i>a</i>) : لليسار <i>a</i> وحدة (لليمين إذا <i>a</i> &lt; 0)' } },
      { name: { en: "Reflections", ar: "الانعكاس" }, f: { en: '<i>y</i> = −<i>f</i>(<i>x</i>) : in the <i>x</i>-axis;  <i>y</i> = <i>f</i>(−<i>x</i>) : in the <i>y</i>-axis', ar: '<i>y</i> = −<i>f</i>(<i>x</i>) : في محور السينات؛  <i>y</i> = <i>f</i>(−<i>x</i>) : في محور الصادات' } },
      { name: { en: "Absolute value", ar: "القيمة المطلقة" }, f: { en: '|<i>x</i>| = <i>x</i> if <i>x</i> ≥ 0,  −<i>x</i> if <i>x</i> &lt; 0', ar: '|<i>x</i>| = <i>x</i> عندما <i>x</i> ≥ 0،  −<i>x</i> عندما <i>x</i> &lt; 0' } }
    ]
  },
  {
    id: "exp-log",
    title: { en: "Exponents & Logarithms", ar: "الأسس واللوغاريتمات" },
    summary: { en: "Laws of exponents, exponential equations, logarithmic functions and their properties.",
               ar: "قوانين الأسس، المعادلات الأسية، الدالة اللوغاريتمية وخواصها." },
    pdfs: [],
    videos: [],
    formulas: [
      { name: { en: "Product of powers", ar: "ضرب الأسس" }, f: '<i>a</i><sup><i>m</i></sup> × <i>a</i><sup><i>n</i></sup> = <i>a</i><sup><i>m</i>+<i>n</i></sup>' },
      { name: { en: "Quotient of powers", ar: "قسمة الأسس" }, f: '<i>a</i><sup><i>m</i></sup> ÷ <i>a</i><sup><i>n</i></sup> = <i>a</i><sup><i>m</i>−<i>n</i></sup>' },
      { name: { en: "Power of a power", ar: "قوة القوة" }, f: '(<i>a</i><sup><i>m</i></sup>)<sup><i>n</i></sup> = <i>a</i><sup><i>mn</i></sup>' },
      { name: { en: "Negative & fractional exponents", ar: "الأسس السالبة والكسرية" }, f: '<i>a</i><sup>−<i>n</i></sup> = 1/<i>a</i><sup><i>n</i></sup>,   <i>a</i><sup><i>m</i>/<i>n</i></sup> = <sup><i>n</i></sup>√(<i>a</i><sup><i>m</i></sup>)' },
      { name: { en: "Definition of log", ar: "تعريف اللوغاريتم" }, f: '<i>y</i> = log<sub><i>a</i></sub> <i>x</i>  ⇔  <i>x</i> = <i>a</i><sup><i>y</i></sup>   (<i>a</i> &gt; 0, <i>a</i> ≠ 1, <i>x</i> &gt; 0)' },
      { name: { en: "Product & quotient rules", ar: "قانونا الضرب والقسمة" }, f: 'log<sub><i>a</i></sub>(<i>xy</i>) = log<sub><i>a</i></sub><i>x</i> + log<sub><i>a</i></sub><i>y</i>,   log<sub><i>a</i></sub>(<i>x</i>/<i>y</i>) = log<sub><i>a</i></sub><i>x</i> − log<sub><i>a</i></sub><i>y</i>' },
      { name: { en: "Power rule", ar: "قانون القوة" }, f: 'log<sub><i>a</i></sub>(<i>x</i><sup><i>n</i></sup>) = <i>n</i> log<sub><i>a</i></sub><i>x</i>' },
      { name: { en: "Change of base", ar: "تغيير الأساس" }, f: 'log<sub><i>a</i></sub> <i>x</i> = log<sub><i>b</i></sub> <i>x</i> / log<sub><i>b</i></sub> <i>a</i>,   log<sub><i>a</i></sub> <i>b</i> × log<sub><i>b</i></sub> <i>a</i> = 1' },
      { name: { en: "Special values", ar: "قيم خاصة" }, f: 'log<sub><i>a</i></sub> 1 = 0,   log<sub><i>a</i></sub> <i>a</i> = 1,   <i>a</i><sup>log<sub><i>a</i></sub> <i>x</i></sup> = <i>x</i>' }
    ]
  },
  {
    id: "limits",
    title: { en: "Limits of Functions", ar: "نهايات الدوال" },
    summary: { en: "Direct substitution, factorisation, standard limits, limits at infinity and trigonometric limits.",
               ar: "التعويض المباشر، التحليل، النهايات القياسية، النهاية عند اللانهاية ونهايات الدوال المثلثية." },
    pdfs: [],
    videos: [],
    formulas: [
      { name: { en: "Standard limit", ar: "النهاية القياسية" }, f: 'lim<sub><i>x</i>→<i>a</i></sub> (<i>x</i><sup><i>n</i></sup> − <i>a</i><sup><i>n</i></sup>)/(<i>x</i> − <i>a</i>) = <i>n</i> <i>a</i><sup><i>n</i>−1</sup>' },
      { name: { en: "Generalised form", ar: "صورة عامة" }, f: 'lim<sub><i>x</i>→<i>a</i></sub> (<i>x</i><sup><i>m</i></sup> − <i>a</i><sup><i>m</i></sup>)/(<i>x</i><sup><i>n</i></sup> − <i>a</i><sup><i>n</i></sup>) = (<i>m</i>/<i>n</i>) <i>a</i><sup><i>m</i>−<i>n</i></sup>' },
      { name: { en: "Trigonometric limits", ar: "نهايات مثلثية" }, f: 'lim<sub><i>x</i>→0</sub> sin <i>x</i> / <i>x</i> = 1,   lim<sub><i>x</i>→0</sub> tan <i>x</i> / <i>x</i> = 1' },
      { name: { en: "Scaled trig limits", ar: "نهايات مثلثية عامة" }, f: 'lim<sub><i>x</i>→0</sub> sin <i>ax</i> / (<i>bx</i>) = <i>a</i>/<i>b</i>,   lim<sub><i>x</i>→0</sub> tan <i>ax</i> / (<i>bx</i>) = <i>a</i>/<i>b</i>' },
      { name: { en: "Limit at infinity", ar: "النهاية عند ∞" }, f: 'lim<sub><i>x</i>→∞</sub> <i>k</i>/<i>x</i><sup><i>n</i></sup> = 0   (<i>n</i> &gt; 0)' },
      { name: { en: "Rational functions at ∞", ar: "الدوال الكسرية عند ∞" }, f: { en: 'Degree of numerator &lt; denominator → 0;  equal → ratio of leading coefficients;  numerator &gt; denominator → ±∞', ar: 'درجة البسط &lt; درجة المقام → 0؛  متساويتان → النسبة بين معاملي أعلى قوة؛  البسط &gt; المقام → ±∞' } },
      { name: { en: "Existence of a limit", ar: "وجود النهاية" }, f: 'lim<sub><i>x</i>→<i>a</i></sub> <i>f</i>(<i>x</i>) exists ⇔ lim<sub><i>x</i>→<i>a</i><sup>−</sup></sub> <i>f</i>(<i>x</i>) = lim<sub><i>x</i>→<i>a</i><sup>+</sup></sub> <i>f</i>(<i>x</i>)' }
    ]
  },
  {
    id: "trig",
    title: { en: "Trigonometry: Identities, Sine & Cosine Rules", ar: "حساب المثلثات: المتطابقات وقانونا الجيب وجيب التمام" },
    summary: { en: "Trigonometric identities, compound and double angles, solving triangles and area of a triangle.",
               ar: "المتطابقات المثلثية، مجموع وفرق زاويتين وضعف الزاوية، حل المثلث ومساحته." },
    pdfs: [],
    videos: [],
    formulas: [
      { name: { en: "Pythagorean identities", ar: "متطابقات فيثاغورية" }, f: 'sin<sup>2</sup>θ + cos<sup>2</sup>θ = 1,   1 + tan<sup>2</sup>θ = sec<sup>2</sup>θ,   1 + cot<sup>2</sup>θ = csc<sup>2</sup>θ' },
      { name: { en: "Compound angles (sin)", ar: "جيب مجموع وفرق زاويتين" }, f: 'sin(A ± B) = sin A cos B ± cos A sin B' },
      { name: { en: "Compound angles (cos)", ar: "جيب تمام مجموع وفرق زاويتين" }, f: 'cos(A ± B) = cos A cos B ∓ sin A sin B' },
      { name: { en: "Compound angles (tan)", ar: "ظل مجموع وفرق زاويتين" }, f: 'tan(A ± B) = (tan A ± tan B) / (1 ∓ tan A tan B)' },
      { name: { en: "Double angle", ar: "ضعف الزاوية" }, f: 'sin 2A = 2 sin A cos A,   cos 2A = cos<sup>2</sup>A − sin<sup>2</sup>A = 2cos<sup>2</sup>A − 1 = 1 − 2sin<sup>2</sup>A' },
      { name: { en: "Sine rule", ar: "قانون الجيب" }, f: { en: '<i>a</i>/sin A = <i>b</i>/sin B = <i>c</i>/sin C = 2<i>r</i>   (<i>r</i> = circumradius)', ar: '<i>a</i>/sin A = <i>b</i>/sin B = <i>c</i>/sin C = 2<i>r</i>   (<i>r</i> = نصف قطر الدائرة المارة بالرؤوس)' } },
      { name: { en: "Cosine rule", ar: "قانون جيب التمام" }, f: '<i>a</i><sup>2</sup> = <i>b</i><sup>2</sup> + <i>c</i><sup>2</sup> − 2<i>bc</i> cos A,   cos A = (<i>b</i><sup>2</sup> + <i>c</i><sup>2</sup> − <i>a</i><sup>2</sup>)/(2<i>bc</i>)' },
      { name: { en: "Area of a triangle", ar: "مساحة المثلث" }, f: { en: 'Area = ½ <i>bc</i> sin A = ½ <i>ac</i> sin B = ½ <i>ab</i> sin C', ar: 'المساحة = ½ <i>bc</i> sin A = ½ <i>ac</i> sin B = ½ <i>ab</i> sin C' } },
      { name: { en: "Special angles", ar: "زوايا خاصة" }, f: 'sin 30° = ½,  sin 45° = √2/2,  sin 60° = √3/2,  tan 30° = 1/√3,  tan 45° = 1,  tan 60° = √3' }
    ]
  },
  {
    id: "binomial",
    title: { en: "The Binomial Theorem", ar: "نظرية ذات الحدين" },
    summary: { en: "Combinations, the general term, middle term(s), term independent of x and ratio of consecutive terms.",
               ar: "التوافيق، الحد العام، الحد (الحدان) الأوسط، الحد الخالي من س والنسبة بين حدين متتاليين." },
    pdfs: [],
    videos: [],
    formulas: [
      { name: { en: "Combinations", ar: "التوافيق" }, f: '<sup><i>n</i></sup>C<sub><i>r</i></sub> = <i>n</i>! / (<i>r</i>! (<i>n</i> − <i>r</i>)!),   <sup><i>n</i></sup>C<sub><i>r</i></sub> = <sup><i>n</i></sup>C<sub><i>n</i>−<i>r</i></sub>' },
      { name: { en: "Expansion", ar: "المفكوك" }, f: { en: '(<i>x</i> + <i>a</i>)<sup><i>n</i></sup> = Σ<sub><i>r</i>=0</sub><sup><i>n</i></sup> <sup><i>n</i></sup>C<sub><i>r</i></sub> <i>x</i><sup><i>n</i>−<i>r</i></sup> <i>a</i><sup><i>r</i></sup>   — it has <i>n</i> + 1 terms', ar: '(<i>x</i> + <i>a</i>)<sup><i>n</i></sup> = Σ<sub><i>r</i>=0</sub><sup><i>n</i></sup> <sup><i>n</i></sup>C<sub><i>r</i></sub> <i>x</i><sup><i>n</i>−<i>r</i></sup> <i>a</i><sup><i>r</i></sup>   — عدد الحدود <i>n</i> + 1' } },
      { name: { en: "General term", ar: "الحد العام" }, f: 'T<sub><i>r</i>+1</sub> = <sup><i>n</i></sup>C<sub><i>r</i></sub> <i>x</i><sup><i>n</i>−<i>r</i></sup> <i>a</i><sup><i>r</i></sup>' },
      { name: { en: "Middle term(s)", ar: "الحد الأوسط" }, f: { en: '<i>n</i> even: T<sub><i>n</i>/2 + 1</sub>;   <i>n</i> odd: T<sub>(<i>n</i>+1)/2</sub> and T<sub>(<i>n</i>+3)/2</sub>', ar: '<i>n</i> زوجي: T<sub><i>n</i>/2 + 1</sub>؛   <i>n</i> فردي: T<sub>(<i>n</i>+1)/2</sub> و T<sub>(<i>n</i>+3)/2</sub>' } },
      { name: { en: "Ratio of consecutive terms", ar: "النسبة بين حدين متتاليين" }, f: 'T<sub><i>r</i>+1</sub> / T<sub><i>r</i></sub> = ((<i>n</i> − <i>r</i> + 1)/<i>r</i>) × (<i>a</i>/<i>x</i>)' },
      { name: { en: "Equal combinations", ar: "تساوي توافيقين" }, f: { en: '<sup><i>n</i></sup>C<sub><i>r</i></sub> = <sup><i>n</i></sup>C<sub><i>s</i></sub>  ⇒  <i>r</i> = <i>s</i>  or  <i>r</i> + <i>s</i> = <i>n</i>', ar: '<sup><i>n</i></sup>C<sub><i>r</i></sub> = <sup><i>n</i></sup>C<sub><i>s</i></sub>  ⇒  <i>r</i> = <i>s</i>  أو  <i>r</i> + <i>s</i> = <i>n</i>' } },
      { name: { en: "Sum of coefficients", ar: "مجموع المعاملات" }, f: { en: 'Put <i>x</i> = 1;   <sup><i>n</i></sup>C<sub>0</sub> + <sup><i>n</i></sup>C<sub>1</sub> + … + <sup><i>n</i></sup>C<sub><i>n</i></sub> = 2<sup><i>n</i></sup>', ar: 'نضع <i>x</i> = 1؛   <sup><i>n</i></sup>C<sub>0</sub> + <sup><i>n</i></sup>C<sub>1</sub> + … + <sup><i>n</i></sup>C<sub><i>n</i></sub> = 2<sup><i>n</i></sup>' } }
    ]
  },
  {
    id: "matrices",
    title: { en: "Matrices & Determinants", ar: "المصفوفات والمحددات" },
    summary: { en: "Matrix operations, transpose, determinants of order 2 and 3, the multiplicative inverse and solving linear equations.",
               ar: "العمليات على المصفوفات، المدور، محددات الرتبة الثانية والثالثة، المعكوس الضربي وحل المعادلات الخطية." },
    pdfs: [],
    videos: [],
    formulas: [
      { name: { en: "Multiplication condition", ar: "شرط الضرب" }, f: { en: 'A<sub><i>m</i>×<i>n</i></sub> × B<sub><i>n</i>×<i>p</i></sub> = C<sub><i>m</i>×<i>p</i></sub>   (columns of A = rows of B)', ar: 'A<sub><i>m</i>×<i>n</i></sub> × B<sub><i>n</i>×<i>p</i></sub> = C<sub><i>m</i>×<i>p</i></sub>   (عدد أعمدة A = عدد صفوف B)' } },
      { name: { en: "Transpose", ar: "المدور" }, f: '(A<sup>T</sup>)<sup>T</sup> = A,   (AB)<sup>T</sup> = B<sup>T</sup>A<sup>T</sup>' },
      { name: { en: "2 × 2 determinant", ar: "محدد الرتبة الثانية" }, f: '| <i>a</i> <i>b</i> ; <i>c</i> <i>d</i> | = <i>ad</i> − <i>bc</i>' },
      { name: { en: "3 × 3 determinant", ar: "محدد الرتبة الثالثة" }, f: { en: 'Expand along a row: <i>a</i><sub>11</sub>M<sub>11</sub> − <i>a</i><sub>12</sub>M<sub>12</sub> + <i>a</i><sub>13</sub>M<sub>13</sub>  (M = minor)', ar: 'الفك باستخدام صف: <i>a</i><sub>11</sub>M<sub>11</sub> − <i>a</i><sub>12</sub>M<sub>12</sub> + <i>a</i><sub>13</sub>M<sub>13</sub>  (M = المحدد الأصغر)' } },
      { name: { en: "Inverse of 2 × 2", ar: "معكوس مصفوفة 2 × 2" }, f: { en: 'A<sup>−1</sup> = (1/|A|) [ <i>d</i>  −<i>b</i> ; −<i>c</i>  <i>a</i> ],   exists only if |A| ≠ 0', ar: 'A<sup>−1</sup> = (1/|A|) [ <i>d</i>  −<i>b</i> ; −<i>c</i>  <i>a</i> ]،   يوجد فقط إذا كان |A| ≠ 0' } },
      { name: { en: "Properties", ar: "خواص" }, f: { en: '|AB| = |A||B|,   |<i>k</i>A| = <i>k</i><sup><i>n</i></sup>|A| for an <i>n</i> × <i>n</i> matrix,   AA<sup>−1</sup> = I', ar: '|AB| = |A||B|،   |<i>k</i>A| = <i>k</i><sup><i>n</i></sup>|A| لمصفوفة مربعة من الرتبة <i>n</i>،   AA<sup>−1</sup> = I' } },
      { name: { en: "Solving AX = B", ar: "حل AX = B" }, f: { en: 'X = A<sup>−1</sup>B;   Cramer: <i>x</i> = Δ<sub><i>x</i></sub>/Δ,  <i>y</i> = Δ<sub><i>y</i></sub>/Δ', ar: 'X = A<sup>−1</sup>B؛   طريقة كرامر: <i>x</i> = Δ<sub><i>x</i></sub>/Δ،  <i>y</i> = Δ<sub><i>y</i></sub>/Δ' } }
    ]
  }
];
