export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

export function getCaseSections(item) {
  if (item?.sections?.length) return item.sections;
  return [
    { title: "The challenge", body: item?.challenge },
    { title: "What BizGate did", body: item?.whatWeDid },
    { title: "Outcome / results", body: item?.outcome },
  ].filter((section) => section.body);
}

export const demoCaseStudies = [
  {
    _id: "demo-1",
    slug: "luxury-hotel-sales-lift",
    category: "Sales",
    categorySlug: "sales",
    title: "Regional hotel sales lift for a luxury brand",
    clientName: "Confidential Luxury Hotel Group",
    isAnonymous: true,
    challenge:
      "A luxury hotel brand entering deeper GCC expansion needed stronger Middle East representation. Corporate and MICE demand was inconsistent, travel-trade relationships were fragmented, and the property lacked a reliable regional commercial partner who understood both luxury positioning and local buying behavior.",
    whatWeDid:
      "BizGate stepped in as the regional sales representation partner. We mapped corporate and MICE buyers, activated travel-trade outreach across the Gulf, aligned messaging with the brand’s luxury standards, and built an ongoing commercial rhythm with key accounts, consortia, and destination partners.",
    outcome:
      "The engagement improved pipeline quality, strengthened trade relationships, and increased qualified regional inquiries. The brand gained clearer visibility with decision-makers and a more predictable path to Middle East demand growth.",
    sections: [
      {
        title: "The challenge",
        body: "A luxury hotel brand entering deeper GCC expansion needed stronger Middle East representation. Corporate and MICE demand was inconsistent, travel-trade relationships were fragmented, and the property lacked a reliable regional commercial partner who understood both luxury positioning and local buying behavior.",
      },
      {
        title: "What BizGate did",
        body: "BizGate stepped in as the regional sales representation partner. We mapped corporate and MICE buyers, activated travel-trade outreach across the Gulf, aligned messaging with the brand’s luxury standards, and built an ongoing commercial rhythm with key accounts, consortia, and destination partners.",
      },
      {
        title: "Outcome / results",
        body: "The engagement improved pipeline quality, strengthened trade relationships, and increased qualified regional inquiries. The brand gained clearer visibility with decision-makers and a more predictable path to Middle East demand growth.",
      },
    ],
    coverImage: "/service-sales.jpg",
    gallery: ["/service-lobby.jpg", "/hero-hotel.jpg", "/cta-hotel.jpg"],
    videos: [],
    icons: ["/logo-mark.svg"],
  },
  {
    _id: "demo-2",
    slug: "gcc-brand-relaunch",
    category: "Marketing",
    categorySlug: "marketing",
    title: "Omni-channel brand relaunch in the GCC",
    clientName: "Boutique Resort Partner",
    isAnonymous: false,
    challenge:
      "The resort’s brand story was diluted across channels. Trade messaging, consumer PR, and campaign creative were not aligned, so recognition among regional travel buyers stayed low and marketing spend was not converting into meaningful brand equity.",
    whatWeDid:
      "We rebuilt the brand and marketing system for the GCC: positioning, omni-channel campaign planning, Arabic and English PR direction, trade messaging, and customer-experience alignment. BizGate coordinated creative, media, and commercial touchpoints under one performance narrative.",
    outcome:
      "Brand visibility increased across Arabic and English media, campaign response rates improved, and the resort presented a clearer, more confident identity to both guests and travel partners.",
    sections: [
      {
        title: "The challenge",
        body: "The resort’s brand story was diluted across channels. Trade messaging, consumer PR, and campaign creative were not aligned, so recognition among regional travel buyers stayed low and marketing spend was not converting into meaningful brand equity.",
      },
      {
        title: "What BizGate did",
        body: "We rebuilt the brand and marketing system for the GCC: positioning, omni-channel campaign planning, Arabic and English PR direction, trade messaging, and customer-experience alignment. BizGate coordinated creative, media, and commercial touchpoints under one performance narrative.",
      },
      {
        title: "Outcome / results",
        body: "Brand visibility increased across Arabic and English media, campaign response rates improved, and the resort presented a clearer, more confident identity to both guests and travel partners.",
      },
    ],
    coverImage: "/service-marketing.jpg",
    gallery: ["/service-resort.jpg", "/cta-growth.jpg", "/hero-growth.jpg"],
    videos: [],
    icons: ["/logo-mark.svg"],
  },
  {
    _id: "demo-3",
    slug: "digital-guest-experience",
    category: "Digital",
    categorySlug: "digital",
    title: "Digital transformation for guest experience",
    clientName: "Regional Hospitality Operator",
    isAnonymous: false,
    challenge:
      "Digital guest touchpoints were inconsistent. Online visibility, inquiry handling, and relationship follow-up lived in separate tools, which limited direct demand and made it harder for teams to convert interest into bookings and loyalty.",
    whatWeDid:
      "BizGate introduced a practical digital transformation plan: SaaS-enabled visibility improvements, relationship-management workflows, and guest-journey touchpoints that connected marketing, sales, and operations around one commercial funnel.",
    outcome:
      "The operator achieved a stronger digital presence, smoother guest communication, and better commercial follow-up from digital inquiries — creating a clearer route from discovery to conversion.",
    sections: [
      {
        title: "The challenge",
        body: "Digital guest touchpoints were inconsistent. Online visibility, inquiry handling, and relationship follow-up lived in separate tools, which limited direct demand and made it harder for teams to convert interest into bookings and loyalty.",
      },
      {
        title: "What BizGate did",
        body: "BizGate introduced a practical digital transformation plan: SaaS-enabled visibility improvements, relationship-management workflows, and guest-journey touchpoints that connected marketing, sales, and operations around one commercial funnel.",
      },
      {
        title: "Outcome / results",
        body: "The operator achieved a stronger digital presence, smoother guest communication, and better commercial follow-up from digital inquiries — creating a clearer route from discovery to conversion.",
      },
    ],
    coverImage: "/service-digital.jpg",
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
