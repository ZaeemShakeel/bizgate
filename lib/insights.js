export const API_URL =
  typeof window !== "undefined"
    ? ""
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const demoInsights = [
  {
    _id: "demo-1",
    slug: "ai-and-guest-reviews",
    category: "Technology",
    title: "AI and Guest Reviews: Where Human Judgment Still Matters Most",
    title_ar: "الذكاء الاصطناعي وتقييمات الضيوف: أين لا يزال الحكم البشري الأهم",
    coverImage: "/service-digital.jpg",
    summary:
      "AI can process guest feedback at scale — but brand voice, cultural sensitivity and guest relationships still need experienced human oversight.",
    summary_ar:
      "يستطيع الذكاء الاصطناعي معالجة آراء الضيوف على نطاق واسع، لكن صوت العلامة التجارية والحساسية الثقافية وعلاقات الضيوف لا تزال تحتاج إلى إشراف بشري متمرس.",
    content:
      "Artificial intelligence is changing the speed at which hospitality teams can analyse and respond to guest feedback. Where a manager once spent hours reviewing hundreds of reviews, AI tools can now surface themes, flag urgent issues and even draft responses in minutes.\n\nBut speed is not the same as quality. And in hospitality, quality of communication matters more than almost any other industry.\n\nGuest reviews are often emotional. A response to a negative review that feels generic, defensive or culturally tone-deaf can cause more damage than the original complaint. This is especially true in the Middle East, where relationship, respect and cultural context are central to how guests experience hospitality.\n\nBizGate's view is that AI creates genuine value when it is used to support experienced human judgment — not replace it. The right framework combines AI-assisted analysis with clear review-response governance, brand-voice guidelines and senior oversight of sensitive or complex cases.",
    content_ar:
      "يغير الذكاء الاصطناعي سرعة تحليل فرق الضيافة لآراء الضيوف والرد عليها. فحيث كان المدير في السابق يقضي ساعات في مراجعة المئات من التعليقات، يمكن لأدوات الذكاء الاصطناعي الآن استخلاص الأنماط، وتحديد المشكلات العاجلة، وصياغة الردود في دقائق.\n\nلكن السرعة ليست جودة. وفي الضيافة، تحمل جودة التواصل أهمية تفوق معظم القطاعات الأخرى.\n\nكثيراً ما تكون تقييمات الضيوف عاطفية. والرد على تقييم سلبي بطريقة تبدو آلية أو دفاعية أو مجحفة ثقافياً قد يتسبب في ضرر أكبر من الشكوى الأصلية. وهذا ينطبق بشكل خاص على منطقة الشرق الأوسط، حيث تُشكّل العلاقة والاحترام والسياق الثقافي جوهر تجربة الضيف في قطاع الضيافة.\n\nمن منظور بيزجيت، يُحدث الذكاء الاصطناعي قيمة حقيقية حين يُستخدم لدعم الحكم البشري المتمرس لا استبداله. والإطار الأمثل يجمع بين التحليل المدعوم بالذكاء الاصطناعي وحوكمة واضحة للرد على التقييمات، وإرشادات لصوت العلامة التجارية، وإشراف رفيع المستوى على الحالات الحساسة أو المعقدة.",
    order: 1,
    isActive: true,
  },
  {
    _id: "demo-2",
    slug: "destination-reputation-management",
    category: "Destination",
    title: "Why Destination-Wide Reputation Management Is Now a Strategic Priority",
    title_ar: "لماذا أصبحت إدارة سمعة الوجهة على المستوى الشامل أولوية استراتيجية",
    coverImage: "/service-advisory.jpg",
    summary:
      "As travellers rely more heavily on online reviews to choose destinations, tourism authorities cannot afford to leave hotel reputation to chance.",
    summary_ar:
      "مع اعتماد المسافرين بشكل متزايد على التقييمات الإلكترونية لاختيار الوجهات، لا تستطيع الجهات السياحية أن تترك سمعة فنادق الوجهة للصدفة.",
    content:
      "Travellers today do not choose hotels in isolation. They choose destinations — and then they select hotels within those destinations based largely on what other guests have said.\n\nThis means that the collective reputation of a destination's hotels has become a strategic asset for tourism authorities. A destination where guests consistently report high-quality experiences attracts more visitors, generates better media coverage and supports premium pricing across the market.\n\nBizGate has worked with tourism authorities in the UAE to establish destination-wide reputation monitoring programs. These programs do three things: they provide authorities with a consistent, comparable view of how guests are experiencing hotels across the destination; they identify recurring quality themes that require attention; and they create a structured framework for engaging hotel management teams with practical improvement priorities.\n\nThe key insight from this work is that reputation management at destination level is fundamentally different from reputation management at property level. It requires aggregated data, comparative analysis and stakeholder engagement skills that go beyond what individual hotels typically have the capacity to deliver.",
    content_ar:
      "لا يختار المسافرون اليوم الفنادق بمعزل عن السياق. فهم يختارون الوجهات أولاً، ثم يختارون الفنادق ضمن هذه الوجهات استناداً إلى آراء الضيوف الآخرين.\n\nهذا يعني أن السمعة الجماعية لفنادق الوجهة باتت أصلاً استراتيجياً للجهات السياحية. فالوجهة التي يُبلّغ فيها الضيوف باستمرار عن تجارب عالية الجودة تستقطب مزيداً من الزوار، وتحظى بتغطية إعلامية أفضل، وتدعم التسعير المتميز عبر السوق.\n\nعملت بيزجيت مع جهات سياحية في الإمارات لإرساء برامج متابعة السمعة على مستوى الوجهة. وتؤدي هذه البرامج ثلاثة أدوار: توفير رؤية موحدة وقابلة للمقارنة للجهات حول تجربة الضيوف في فنادق الوجهة؛ وتحديد موضوعات الجودة المتكررة التي تحتاج إلى معالجة؛ وإنشاء إطار منظم للتفاعل مع فرق إدارة الفنادق وتزويدها بأولويات تحسين عملية.\n\nالمعرفة الجوهرية التي تولّدت من هذا العمل هي أن إدارة السمعة على مستوى الوجهة تختلف جوهرياً عن إدارتها على مستوى المنشأة الفندقية الواحدة. إذ تتطلب بيانات مجمّعة وتحليلاً مقارناً ومهارات في إشراك أصحاب المصلحة تتخطى القدرات التي تمتلكها الفنادق الفردية عادةً.",
    order: 2,
    isActive: true,
  },
  {
    _id: "demo-3",
    slug: "middle-east-hotel-technology",
    category: "Technology",
    title: "Middle East Hospitality Technology: What International Vendors Need to Know",
    title_ar: "تقنيات الضيافة في الشرق الأوسط: ما يحتاج الموردون الدوليون معرفته",
    coverImage: "/hero-growth.jpg",
    summary:
      "International hospitality technology companies entering the Middle East face a market with distinct decision-making processes, relationship expectations and commercial realities.",
    summary_ar:
      "تواجه شركات تقنيات الضيافة الدولية الراغبة في دخول الشرق الأوسط سوقاً يتميز بعمليات اتخاذ قرار مختلفة، وتوقعات علائقية خاصة، وحقائق تجارية فريدة.",
    content:
      "The Middle East is one of the fastest-growing hospitality markets in the world. For international technology companies, this represents a significant commercial opportunity. But entering the market without regional knowledge can be expensive and slow.\n\nDecision-making in GCC hotel groups and tourism authorities operates differently to most Western markets. Relationships matter enormously. Trust is built through sustained engagement, not through product features alone. Procurement cycles are longer and often dependent on senior sponsorship.\n\nLanguage also matters more than many technology vendors expect. Having Arabic-language capability for client communication, product documentation and support is not optional in many institutional procurement processes.\n\nBizGate has supported several international hospitality technology companies to enter and grow in the region. The most effective approach has been to lead with market understanding — taking time to adapt positioning to local priorities before beginning commercial introductions. This means understanding which hotel owner groups and decision-makers are most relevant, how they evaluate technology partnerships, and what objections typically arise in the sales process.\n\nCompanies that invest in this regional groundwork consistently achieve faster commercial traction than those that attempt to replicate their Western go-to-market approach without adaptation.",
    content_ar:
      "يُعدّ الشرق الأوسط أحد أسرع أسواق الضيافة نمواً في العالم. ويمثل هذا فرصة تجارية كبيرة لشركات التقنيات الدولية. لكن دخول السوق دون معرفة إقليمية عميقة قد يكون مكلفاً وبطيئاً.\n\nتسير عمليات اتخاذ القرار في المجموعات الفندقية الخليجية والجهات السياحية بطريقة مختلفة عن معظم الأسواق الغربية. إذ تحتل العلاقات مكانة بالغة الأهمية، ويُبنى الثقة من خلال التفاعل المستمر والمتواصل، لا من خلال الميزات التقنية وحدها. كما أن دورات الشراء أطول وغالباً ما تعتمد على رعاية قيادية رفيعة المستوى.\n\nكذلك تحمل اللغة أهمية أكبر مما يتوقعه كثير من موردي التقنيات. فامتلاك قدرات باللغة العربية للتواصل مع العملاء وتوثيق المنتجات والدعم ليس أمراً اختيارياً في كثير من عمليات المشتريات المؤسسية.\n\nدعمت بيزجيت عدداً من شركات تقنيات الضيافة الدولية لدخول المنطقة والنمو فيها. وكان أكثر الأساليب فاعلية هو الانطلاق من فهم السوق — أي تخصيص الوقت لتكييف التموضع مع الأولويات المحلية قبل البدء في التعريف التجاري. ويعني ذلك فهم أي مجموعات ملاك الفنادق وصناع القرار الأكثر ملاءمة، وكيف يقيّمون شراكات التكنولوجيا، وما الاعتراضات التي تظهر عادةً في مسار المبيعات.\n\nالشركات التي تستثمر في هذه الأعمال التأسيسية الإقليمية تحقق باستمرار زخماً تجارياً أسرع من تلك التي تحاول تكرار نهجها الغربي في السوق دون تكييف.",
    order: 3,
    isActive: true,
  },
];

export async function fetchInsights() {
  try {
    const res = await fetch(`${API_URL}/api/insights`, { cache: "no-store" });
    if (!res.ok) return demoInsights;
    const data = await res.json();
    if (Array.isArray(data.insights) && data.insights.length) return data.insights;
  } catch {
    // offline fallback
  }
  return demoInsights;
}

export async function fetchInsightBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/api/insights/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.insight) return data.insight;
    }
  } catch {
    // offline fallback
  }
  return demoInsights.find((i) => i.slug === slug) || null;
}
