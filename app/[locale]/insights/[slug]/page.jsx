import { getTranslations } from "next-intl/server";
import { Link } from "../../../../i18n/routing";
import { fetchInsightBySlug, fetchInsights } from "../../../../lib/insights";
import { mediaUrl } from "../../../../lib/caseStudies";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const insight = await fetchInsightBySlug(slug);
  if (!insight) return { title: "Insight — BizGate" };
  const isAr = locale === "ar";
  const title = isAr && insight.title_ar ? insight.title_ar : insight.title;
  const summary = isAr && insight.summary_ar ? insight.summary_ar : insight.summary;
  return {
    title: `${title} — BizGate Insights`,
    description: summary,
  };
}

export default async function InsightDetailPage({ params }) {
  const { locale, slug } = await params;
  const insight = await fetchInsightBySlug(slug);
  if (!insight) notFound();

  const isAr = locale === "ar";
  const t = await getTranslations({ locale, namespace: "Insights" });

  const title = isAr && insight.title_ar ? insight.title_ar : insight.title;
  const content = isAr && insight.content_ar ? insight.content_ar : insight.content;
  const cover = mediaUrl(insight.coverImage);

  // fetch more insights for the "More Insights" section
  const allInsights = await fetchInsights();
  const moreInsights = allInsights.filter((i) => i.slug !== slug).slice(0, 3);

  return (
    <main className="insight-detail-page" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="insight-detail-hero">
        {cover && (
          <div className="insight-detail-cover">
            <img src={cover} alt={title} />
          </div>
        )}
        <div className="insight-detail-hero-inner">
          <Link href="/insights" className="insight-back-link">
            {t("backToInsights")}
          </Link>
          <span className="insight-detail-cat">{insight.category}</span>
          <h1 className="insight-detail-title">{title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="insight-detail-content">
        <div className="insight-detail-inner">
          <div className="insight-detail-body">
            {content?.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* More insights */}
      {moreInsights.length > 0 && (
        <section className="insight-more-section">
          <div className="insight-more-inner">
            <h2 className="insight-more-heading">{t("moreInsights")}</h2>
            <div className="insights-grid compact">
              {moreInsights.map((item) => {
                const mTitle = isAr && item.title_ar ? item.title_ar : item.title;
                const mSummary = isAr && item.summary_ar ? item.summary_ar : item.summary;
                const mCover = mediaUrl(item.coverImage);
                return (
                  <article key={item._id} className="insight-card">
                    {mCover && (
                      <div className="insight-card-img">
                        <img src={mCover} alt={mTitle} loading="lazy" />
                      </div>
                    )}
                    <div className="insight-card-body">
                      <span className="insight-card-cat">{item.category}</span>
                      <h3 className="insight-card-title">{mTitle}</h3>
                      {mSummary && <p className="insight-card-summary">{mSummary}</p>}
                      <Link href={`/insights/${item.slug}`} className="insight-card-link">
                        {t("readMore")} →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
