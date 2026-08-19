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
    slug: "digital-reputation-executive-priority",
    category: "Digital Reputation",
    title: "Why Digital Reputation Is Now an Executive Hospitality Priority",
    title_ar: "لماذا أصبحت السمعة الرقمية أولوية للإدارة العليا في قطاع الضيافة؟",
    coverImage: "/service-digital.jpg",
    summary:
      "Online reputation influences how travellers evaluate hotels and destinations. It also provides leadership teams with valuable evidence about service quality, guest expectations and operational performance.",
    summary_ar:
      "تؤثر السمعة الرقمية في طريقة تقييم المسافرين للفنادق والوجهات، كما توفر للقيادات معلومات قيّمة حول جودة الخدمة وتوقعات الضيوف والأداء التشغيلي.",
    content:
      "Online reputation has transitioned from a marketing metric to a core business driver in the hospitality industry. Today, an overwhelming majority of travellers consult online reviews before booking a hotel or visiting a destination. This shift has made digital reputation a key factor in occupancy rates, pricing power, and overall revenue generation.\n\nFor executive leadership teams, guest feedback contains a wealth of operational intelligence. When systematically captured and analysed, review data reveals specific strengths and weaknesses in service delivery, facility maintenance, and guest satisfaction across different properties.\n\nRather than treating reviews as isolated customer service issues, leading hotel groups and destination management organisations now integrate digital reputation metrics into their executive dashboards. By doing so, they can establish clear benchmarks, align staff incentives with guest satisfaction, and make data-driven decisions about capital investments and operational improvements.",
    content_ar:
      "تحولت السمعة الرقمية من مجرد مقياس تسويقي إلى محرك أعمال أساسي في قطاع الضيافة. واليوم، تستشير الغالبية العظمى من المسافرين التقييمات عبر الإنترنت قبل حجز فندق أو زيارة وجهة ما. وقد جعل هذا التحول السمعة الرقمية عاملاً رئيسياً في تحديد معدلات الإشغال، والقدرة على تحديد الأسعار، وتوليد الإيرادات بشكل عام.\n\nبالنسبة لفرق الإدارة العليا، تحتوي تعليقات الضيوف على ثروة من المعلومات التشغيلية. وعند رصد بيانات التقييمات وتحليلها بشكل منهجي، فإنها تكشف عن نقاط قوة وضعف محددة في تقديم الخدمات، وصيانة المرافق، ورضا الضيوف عبر مختلف المنشآت.\n\nوبدلاً من التعامل مع التقييمات كمسائل خدمة عملاء معزولة، تقوم المجموعات الفندقية الرائدة ومنظمات إدارة الوجهات الآن بدمج مقاييس السمعة الرقمية في لوحات معلوماتها التنفيذية. ومن خلال القيام بذلك، يمكنهم وضع معايير مقارنة واضحة، وتوجيه حوافز الموظفين لتتوافق مع رضا الضيوف، واتخاذ قرارات قائمة على البيانات بشأن الاستثمارات الرأسمالية والتحسينات التشغيلية.",
    order: 1,
    isActive: true,
  },
  {
    _id: "demo-2",
    slug: "made-in-uae-hospitality-benchmark",
    category: "Destination Intelligence",
    title: "Made in the UAE: How a Young Nation Became a Global Hospitality Benchmark",
    title_ar: "صُنع في الإمارات: كيف أصبحت دولة فتية معياراً عالمياً للضيافة؟",
    coverImage: "/service-advisory.jpg",
    summary:
      "A look at how long-term vision, investment, quality standards and constant innovation helped establish the UAE as one of the world's leading hospitality destinations.",
    summary_ar:
      "نظرة على دور الرؤية طويلة المدى والاستثمار ومعايير الجودة والابتكار المستمر في ترسيخ مكانة الإمارات كواحدة من أبرز وجهات الضيافة عالمياً.",
    content:
      "Over the past few decades, the United Arab Emirates has established itself as a premier global hub for tourism and hospitality. This achievement is not accidental; it is the result of a deliberate, long-term strategic vision combined with massive infrastructure investment and a relentless focus on quality.\n\nFrom the iconic luxury resorts of Dubai to the cultural landmarks of Abu Dhabi, the UAE has set new international standards for guest experience and service delivery. Tourism authorities work closely with hotel operators to implement rigorous quality programs, monitor destination-wide reputation, and ensure consistent service standards.\n\nFurthermore, the UAE's hospitality sector continues to lead in innovation, adopting new digital solutions and smart services to enhance the guest journey. By maintaining a balance between traditional Arabian hospitality and cutting-edge technology, the nation has created a resilient tourism ecosystem that serves as a model for destinations worldwide.",
    content_ar:
      "على مدى العقود القليلة الماضية، رسخت دولة الإمارات العربية المتحدة مكانتها كمركز عالمي رائد للسياحة والضيافة. هذا الإنجاز ليس وليد الصدفة؛ بل هو ثمرة رؤية استراتيجية مدروسة طويلة المدى اقترنت باستثمارات ضخمة في البنية التحتية وتركيز دؤوب على الجودة.\n\nمن المنتجعات الفاخرة الشهيرة في دبي إلى المعالم الثقافية في أبوظبي، وضعت دولة الإمارات معايير دولية جديدة لتجربة الضيوف وتقديم الخدمات. وتعمل الهيئات السياحية عن كثب مع مشغلي الفنادق لتطبيق برامج جودة صارمة، ومراقبة السمعة على مستوى الوجهة بالكامل، وضمان اتساق مستويات الخدمة.\n\nعلاوة على ذلك، يستمر قطاع الضيافة في الإمارات في قيادة مسيرة الابتكار، متبنياً حلولاً رقمية جديدة وخدمات ذكية لتعزيز رحلة الضيوف. ومن خلال الحفاظ على التوازن بين كرم الضيافة العربية الأصيلة والتكنولوجيا المتطورة، نجحت الدولة في إنشاء منظومة سياحية مرنة تشكل نموذجاً يحتذى به للوجهات السياحية في جميع أنحاء العالم.",
    order: 2,
    isActive: true,
  },
  {
    _id: "demo-3",
    slug: "hospitality-ai-human-judgment",
    category: "Hospitality Technology & AI",
    title: "Why Hospitality AI Still Needs Human Judgment",
    title_ar: "لماذا لا يزال الذكاء الاصطناعي في الضيافة بحاجة إلى الخبرة البشرية؟",
    coverImage: "/hero-growth.jpg",
    summary:
      "Artificial intelligence can accelerate analysis and automate routine tasks, but protecting brand voice, understanding cultural context and making sensitive guest-experience decisions remain human responsibilities.",
    summary_ar:
      "يمكن للذكاء الاصطناعي تسريع التحليل وتنفيذ المهام المتكررة، لكن الحفاظ على هوية العلامة التجارية والقرارات الحساسة المتعلقة بتجربة الضيف تظل مسؤوليات بشرية.",
    content:
      "Artificial intelligence is transforming how hospitality teams process guest feedback, identify operational trends, and draft communications. By automating large-scale data analysis, AI enables operators to surface issues and respond to guest inquiries faster than ever before. However, the hospitality business remains fundamentally built on human connection.\n\nWhile AI can draft a response to a review, it lacks the emotional intelligence, cultural understanding, and nuanced judgment required to handle complex guest issues. A poorly drafted, robotic response can alienate customers and damage a hotel's brand reputation, particularly in regions like the GCC where hospitality is deeply personal and relationship-driven.\n\nTo build a sustainable reputation, hotels must adopt a collaborative approach: utilizing AI to accelerate data analysis and routine tasks, while keeping experienced human professionals in control of brand voice, cultural adaptation, and final decision-making.",
    content_ar:
      "تغير تقنيات الذكاء الاصطناعي طريقة تعامل فرق الضيافة مع تعليقات الضيوف، وتحديد الاتجاهات التشغيلية، وصياغة المراسلات. ومن خلال أتمتة تحليل البيانات واسع النطاق، يتيح الذكاء الاصطناعي للمشغلين إبراز القضايا والرد على استفسارات الضيوف بشكل أسرع من أي وقت مضى. ومع ذلك، فإن قطاع الضيافة يقوم في جوهره على التواصل الإنساني.\n\nوفي حين يمكن للذكاء الاصطناعي صياغة رد على تقييم ما، فإنه يفتقر إلى الذكاء العاطفي والفهم الثقافي والحكم الدقيق اللازم للتعامل مع قضايا الضيوف المعقدة. ويمكن أن يؤدي الرد الآلي الضعيف إلى نفور العملاء وتشويه سمعة العلامة التجارية للفندق، لا سيما في مناطق مثل دول مجلس التعاون الخليجي حيث تتسم الضيافة بالطابع الشخصي والعلائقي العميق.\n\nولبناء سمعة مستدامة، يجب على الفنادق اعتماد نهج تعاوني: الاستفادة من الذكاء الاصطناعي لتسريع تحليل البيانات والمهام المتكررة، مع إبقاء المهنيين البشر ذوي الخبرة متحكمين في صوت العلامة التجارية، والتكيف الثقافي، واتخاذ القرار النهائي.",
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
