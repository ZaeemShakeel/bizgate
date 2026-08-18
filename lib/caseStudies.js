export const API_URL = typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000");

/** Resolve media paths for Hostinger frontend + API uploads host */
export function mediaUrl(src) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src) || src.startsWith("data:")) return src;

  const base = API_URL.replace(/\/$/, "");
  let path = src.startsWith("/") ? src : `/${src}`;

  // Normalize /api/uploads → /uploads (live server serves /uploads)
  if (path.startsWith("/api/uploads/")) {
    path = path.replace(/^\/api/, "");
  }

  if (path.startsWith("/uploads/")) {
    return `${base}${path}`;
  }

  return path;
}

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function caseStudyHref(item) {
  if (!item?.slug) return "/case-studies";
  const category = item.categorySlug || slugify(item.category) || "general";
  return `/case-studies/${category}/${item.slug}`;
}

export function getCaseSections(item, locale = "en") {
  if (locale === "ar") {
    if (item?.sections_ar?.length) return item.sections_ar;
    return [
      { title: "التحدي", body: item?.challenge_ar },
      { title: "منهجية العمل", body: item?.whatWeDid_ar },
      { title: "الأثر", body: item?.outcome_ar },
    ].filter((section) => section.body);
  }

  if (item?.sections?.length) return item.sections;
  return [
    { title: "The Challenge", body: item?.challenge },
    { title: "Our Approach", body: item?.whatWeDid },
    { title: "The Impact", body: item?.outcome },
  ].filter((section) => section.body);
}

export const demoCaseStudies = [
  {
    _id: "demo-1",
    slug: "uae-tourism-authority",
    category: "Destination",
    categorySlug: "destination",
    title: "Destination-wide Reputation & Quality Program",
    title_ar: "دراسة حالة 01 — جهة سياحية إماراتية",
    clientName: "Confidential UAE Tourism Authority",
    isAnonymous: true,
    challenge:
      "The tourism authority lacked visibility into individual hotel performance across the destination. Online reputation data was fragmented, and there was no unified system to benchmark quality, track guest sentiment, or ensure hotels met the destination’s service standards.",
    challenge_ar:
      "التحدي — احتاجت الجهة إلى رؤية موحّدة وقابلة للمقارنة لسمعة الفنادق على مستوى الوجهة. وكانت آراء الضيوف موزعة عبر منصات متعددة، كما تفاوت أداء الفنادق في الرد على التقييمات، بينما احتاجت الإدارة إلى معلومات أكثر اتساقاً حول جودة قطاع الضيافة.",
    whatWeDid:
      "BizGate implemented a destination-wide reputation and quality monitoring program. We centralized guest feedback data, established comparative benchmarking across all hotels in the emirate, and provided regular executive reporting to the authority.",
    whatWeDid_ar:
      "منهجية العمل — دعمت بيزجيت تطبيق برنامج متابعة السمعة على مستوى الوجهة، ووضعت إطاراً موحّداً لمقارنة أداء الفنادق المشاركة. شملت أعمالنا: متابعة أداء السمعة الرقمية للفنادق؛ تحليل انطباعات الضيوف وموضوعات الجودة المتكررة؛ إعداد التقارير للقيادات والجهات المعنية؛ الاجتماع مباشرة مع إدارات الفنادق؛ تقديم التدريب الميداني وورش عمل الأداء؛ عرض النتائج والاستماع إلى ملاحظات الفنادق؛ دعم تحسين ممارسات الرد على التقييمات.",
    outcome:
      "The authority gained real-time visibility into destination quality, enabling data-driven policy decisions and targeted interventions. Hotels improved their review-response rates, and overall guest satisfaction scores across the destination saw measurable improvement.",
    outcome_ar:
      "الأثر — حصلت الجهة على رؤية أوضح لسمعة الفنادق وانطباعات الضيوف على مستوى الوجهة. كما تلقت الفنادق ملاحظات وتوجيهات عملية، بينما حصلت الإدارة على معلومات أكثر اتساقاً لدعم التواصل مع الشركاء وتحسين الجودة.",
    sections: [
      {
        title: "The challenge",
        body: "The tourism authority lacked visibility into individual hotel performance across the destination. Online reputation data was fragmented, and there was no unified system to benchmark quality, track guest sentiment, or ensure hotels met the destination’s service standards.",
      },
      {
        title: "What BizGate did",
        body: "BizGate implemented a destination-wide reputation and quality monitoring program. We centralized guest feedback data, established comparative benchmarking across all hotels in the emirate, and provided regular executive reporting to the authority.",
      },
      {
        title: "Outcome / results",
        body: "The authority gained real-time visibility into destination quality, enabling data-driven policy decisions and targeted interventions. Hotels improved their review-response rates, and overall guest satisfaction scores across the destination saw measurable improvement.",
      },
    ],
    sections_ar: [
      {
        title: "التحدي",
        body: "احتاجت الجهة إلى رؤية موحّدة وقابلة للمقارنة لسمعة الفنادق على مستوى الوجهة. وكانت آراء الضيوف موزعة عبر منصات متعددة، كما تفاوت أداء الفنادق في الرد على التقييمات، بينما احتاجت الإدارة إلى معلومات أكثر اتساقاً حول جودة قطاع الضيافة.",
      },
      {
        title: "منهجية العمل",
        body: "دعمت بيزجيت تطبيق برنامج متابعة السمعة على مستوى الوجهة، ووضعت إطاراً موحّداً لمقارنة أداء الفنادق المشاركة. شملت أعمالنا: متابعة أداء السمعة الرقمية للفنادق؛ تحليل انطباعات الضيوف وموضوعات الجودة المتكررة؛ إعداد التقارير للقيادات والجهات المعنية؛ الاجتماع مباشرة مع إدارات الفنادق؛ تقديم التدريب الميداني وورش عمل الأداء؛ عرض النتائج والاستماع إلى ملاحظات الفنادق؛ دعم تحسين ممارسات الرد على التقييمات.",
      },
      {
        title: "الأثر",
        body: "حصلت الجهة على رؤية أوضح لسمعة الفنادق وانطباعات الضيوف على مستوى الوجهة. كما تلقت الفنادق ملاحظات وتوجيهات عملية، بينما حصلت الإدارة على معلومات أكثر اتساقاً لدعم التواصل مع الشركاء وتحسين الجودة.",
      },
    ],
    coverImage: "/service-advisory.jpg",
    gallery: ["/service-lobby.jpg", "/hero-hotel.jpg", "/cta-hotel.jpg"],
    videos: [],
    icons: ["/logo-mark.svg"],
  },
  {
    _id: "demo-2",
    slug: "regional-hotel-group-relaunch",
    category: "Marketing",
    categorySlug: "marketing",
    title: "Omni-channel Brand Relaunch",
    title_ar: "دراسة حالة 02 — مجموعة فندقية إقليمية",
    clientName: "Confidential Regional Hotel Group",
    isAnonymous: true,
    challenge:
      "A prominent regional hotel group struggled with inconsistent brand messaging across its portfolio. Marketing efforts were siloed, digital presence was disjointed, and the group was losing market share to international operators with stronger brand equity.",
    challenge_ar:
      "التحدي — كانت آراء ضيوف المجموعة موزعة عبر عدد كبير من منصات التقييم، ولم تتوفر للإدارة وسيلة موحّدة لمقارنة المنشآت، وتحديد مشكلات الخدمة المتكررة، ووضع أولويات مشتركة على مستوى المجموعة.",
    whatWeDid:
      "BizGate led a comprehensive omni-channel brand relaunch. We unified the brand narrative across all properties, synchronized PR and trade messaging, and implemented a centralized digital marketing strategy targeting key GCC source markets.",
    whatWeDid_ar:
      "منهجية العمل — جمعت بيزجيت معلومات الأداء ضمن رؤية إدارية موحّدة، وحلّلت انطباعات الضيوف لتحديد الموضوعات ذات التأثير الأكبر في العمليات. شملت أعمالنا: مقارنة أداء السمعة وتجربة الضيف بين المنشآت؛ تحديد نقاط القوة وفجوات الخدمة المتكررة؛ إعداد تقارير للإدارة على مستوى المجموعة وكل منشأة؛ عقد اجتماعات ميدانية مع الإدارات والِفرق التشغيلية؛ تقديم رؤى وملاحظات خاصة بكل منشأة؛ تدريب الِفرق على استراتيجية الرد على التقييمات؛ توحيد رؤية القيادات حول أولويات التحسين المشتركة.",
    outcome:
      "The group achieved a cohesive brand identity, significantly increased media visibility in both Arabic and English publications, and improved campaign conversion rates, successfully reclaiming market share.",
    outcome_ar:
      "الأثر — انتقلت المجموعة من درجات معلومات ومتفرقة إلى رؤية أوضح لتجربة الضيف عبر محفظتها الفندقية. وحصلت الإدارات على أولويات عملية ورؤية أقوى للأداء ومنهجية أكثر اتساقاً في التعامل مع آراء الضيوف.",
    sections: [
      {
        title: "The challenge",
        body: "A prominent regional hotel group struggled with inconsistent brand messaging across its portfolio. Marketing efforts were siloed, digital presence was disjointed, and the group was losing market share to international operators with stronger brand equity.",
      },
      {
        title: "What BizGate did",
        body: "BizGate led a comprehensive omni-channel brand relaunch. We unified the brand narrative across all properties, synchronized PR and trade messaging, and implemented a centralized digital marketing strategy targeting key GCC source markets.",
      },
      {
        title: "Outcome / results",
        body: "The group achieved a cohesive brand identity, significantly increased media visibility in both Arabic and English publications, and improved campaign conversion rates, successfully reclaiming market share.",
      },
    ],
    sections_ar: [
      {
        title: "التحدي",
        body: "كانت آراء ضيوف المجموعة موزعة عبر عدد كبير من منصات التقييم، ولم تتوفر للإدارة وسيلة موحّدة لمقارنة المنشآت، وتحديد مشكلات الخدمة المتكررة، ووضع أولويات مشتركة على مستوى المجموعة.",
      },
      {
        title: "منهجية العمل",
        body: "جمعت بيزجيت معلومات الأداء ضمن رؤية إدارية موحّدة، وحلّلت انطباعات الضيوف لتحديد الموضوعات ذات التأثير الأكبر في العمليات. شملت أعمالنا: مقارنة أداء السمعة وتجربة الضيف بين المنشآت؛ تحديد نقاط القوة وفجوات الخدمة المتكررة؛ إعداد تقارير للإدارة على مستوى المجموعة وكل منشأة؛ عقد اجتماعات ميدانية مع الإدارات والِفرق التشغيلية؛ تقديم رؤى وملاحظات خاصة بكل منشأة؛ تدريب الِفرق على استراتيجية الرد على التقييمات؛ توحيد رؤية القيادات حول أولويات التحسين المشتركة.",
      },
      {
        title: "الأثر",
        body: "انتقلت المجموعة من درجات معلومات ومتفرقة إلى رؤية أوضح لتجربة الضيف عبر محفظتها الفندقية. وحصلت الإدارات على أولويات عملية ورؤية أقوى للأداء ومنهجية أكثر اتساقاً في التعامل مع آراء الضيوف.",
      },
    ],
    coverImage: "/service-marketing.jpg",
    gallery: ["/service-resort.jpg", "/cta-growth.jpg", "/hero-growth.jpg"],
    videos: [],
    icons: ["/logo-mark.svg"],
  },
  {
    _id: "demo-3",
    slug: "canary-technologies-market-entry",
    category: "Technology",
    categorySlug: "technology",
    title: "Middle East Market Entry & Growth",
    title_ar: "دراسة حالة 03 — شركة Canary Technologies",
    clientName: "Canary Technologies (Technology Partner)",
    isAnonymous: false,
    challenge:
      "Canary Technologies, a leading provider of hospitality technology solutions, sought to enter and expand its footprint in the Middle East. They needed local market expertise, strategic introductions to key decision-makers, and a culturally nuanced approach to regional business development.",
    challenge_ar:
      "التحدي — شركة Canary Technologies، وهي شركة أمريكية متخصصة في تقنيات تجربة الضيف لقطاع الضيافة، كانت تمتلك حلاً تقنياً ناجحاً عالمياً، لكنها كانت محدودة الحضور والوصول إلى السوق في الشرق الأوسط. وتطلّب نموها الإقليمي علاقات موثوقة، وتموضعاً مناسباً، وفهماً لثقافة السوق، ودعماً محلياً للعملاء.",
    whatWeDid:
      "BizGate acted as their regional growth partner, facilitating market entry through targeted B2B introductions, trade event representation, and strategic positioning tailored to the specific needs of Middle Eastern hotel operators.",
    whatWeDid_ar:
      "منهجية العمل — بصفتها الشريك الإقليمي المعتمد، طوّرت بيزجيت مسار دخول Canary إلى المنطقة ودعمته لتنفيذه. شملت أعمالنا: دراسة فرص السوق ومتطلباته الإقليمية؛ تكييف تموضع الشركة مع أولويات السوق المحلي؛ تعريف مالكي الفنادق والمجموعات وصنّاع القرار بالحلول؛ دعم مناقشات المبيعات والمتابعة التجارية؛ المساعدة في تأهيل العملاء وإدارة العلاقات؛ تقديم الدعم باللغة العربية وفهم ثقافة السوق؛ نقل رؤى السوق وملاحظات الشركاء إلى الشركة التقنية.",
    outcome:
      "Canary Technologies successfully established a strong presence in the region, securing partnerships with major hotel groups. (See Canary Technologies Press Release: https://www.canarytechnologies.com/press/canary-technologies-partners-with-bizgate)",
    outcome_ar:
      "الأثر — عزّزت Canary حضورها في السعودية والإمارات ومصر وقطر، وحصلت على وصول أفضل إلى صنّاع القرار في قطاع الضيافة، وتموضع أكثر ملاءمة للمنطقة، وعلاقات مدعومة محلياً. ولا تزال بيزجيت الشريك الإقليمي المعتمد لشركة Canary.",
    sections: [
      {
        title: "The challenge",
        body: "Canary Technologies, a leading provider of hospitality technology solutions, sought to enter and expand its footprint in the Middle East. They needed local market expertise, strategic introductions to key decision-makers, and a culturally nuanced approach to regional business development.",
      },
      {
        title: "What BizGate did",
        body: "BizGate acted as their regional growth partner, facilitating market entry through targeted B2B introductions, trade event representation, and strategic positioning tailored to the specific needs of Middle Eastern hotel operators.",
      },
      {
        title: "Outcome / results",
        body: "Canary Technologies successfully established a strong presence in the region, securing partnerships with major hotel groups. (See Canary Technologies Press Release: https://www.canarytechnologies.com/press/canary-technologies-partners-with-bizgate)",
      },
    ],
    sections_ar: [
      {
        title: "التحدي",
        body: "شركة Canary Technologies، وهي شركة أمريكية متخصصة في تقنيات تجربة الضيف لقطاع الضيافة، كانت تمتلك حلاً تقنياً ناجحاً عالمياً، لكنها كانت محدودة الحضور والوصول إلى السوق في الشرق الأوسط. وتطلّب نموها الإقليمي علاقات موثوقة، وتموضعاً مناسباً، وفهماً لثقافة السوق، ودعماً محلياً للعملاء.",
      },
      {
        title: "منهجية العمل",
        body: "بصفتها الشريك الإقليمي المعتمد، طوّرت بيزجيت مسار دخول Canary إلى المنطقة ودعمته لتنفيذه. شملت أعمالنا: دراسة فرص السوق ومتطلباته الإقليمية؛ تكييف تموضع الشركة مع أولويات السوق المحلي؛ تعريف مالكي الفنادق والمجموعات وصنّاع القرار بالحلول؛ دعم مناقشات المبيعات والمتابعة التجارية؛ المساعدة في تأهيل العملاء وإدارة العلاقات؛ تقديم الدعم باللغة العربية وفهم ثقافة السوق؛ نقل رؤى السوق وملاحظات الشركاء إلى الشركة التقنية.",
      },
      {
        title: "الأثر",
        body: "عزّزت Canary حضورها في السعودية والإمارات ومصر وقطر، وحصلت على وصول أفضل إلى صنّاع القرار في قطاع الضيافة، وتموضع أكثر ملاءمة للمنطقة، وعلاقات مدعومة محلياً. ولا تزال بيزجيت الشريك الإقليمي المعتمد لشركة Canary.",
      },
    ],
    coverImage: "/hero-growth.jpg",
    gallery: ["/cta-hotel.jpg", "/hero-growth.jpg", "/service-advisory.jpg"],
    videos: [],
    icons: ["/logo-mark.svg"],
  },
];

export function clientLabel(item) {
  if (!item) return "BizGate client";
  if (item.isAnonymous) return "Anonymous client";
  return item.clientName || "BizGate client";
}

export async function fetchCaseStudies(category) {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    const res = await fetch(`${API_URL}/api/case-studies${query}`, { cache: "no-store" });
    if (!res.ok) return demoCaseStudies;
    const data = await res.json();
    if (Array.isArray(data.caseStudies) && data.caseStudies.length) {
      return data.caseStudies;
    }
  } catch {
    // offline fallback
  }
  if (category) {
    return demoCaseStudies.filter(
      (item) => item.categorySlug === slugify(category)
    );
  }
  return demoCaseStudies;
}

export async function fetchCaseStudyBySlug(slug, category) {
  try {
    const path = category
      ? `/api/case-studies/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`
      : `/api/case-studies/${encodeURIComponent(slug)}`;
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.caseStudy) return data.caseStudy;
    }
  } catch {
    // offline fallback
  }
  return (
    demoCaseStudies.find((item) => {
      if (item.slug !== slug) return false;
      if (!category) return true;
      return item.categorySlug === slugify(category);
    }) || null
  );
}
