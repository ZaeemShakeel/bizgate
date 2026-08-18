import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "../../../i18n/routing";
import { fetchInsights } from "../../../lib/insights";
import { mediaUrl } from "../../../lib/caseStudies";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Insights" });
  return {
    title: `${t("heroHeadline")} — BizGate`,
    description: t("heroIntro"),
  };
}

export default async function InsightsPage({ params }) {
  const { locale } = await params;
  const insights = await fetchInsights();
  const t = await getTranslations({ locale, namespace: "Insights" });

  const isAr = locale === "ar";

  return (
    <main className="insights-page" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="insights-hero">
        <div className="insights-hero-inner">
          <p className="insights-eyebrow">{t("heroEyebrow")}</p>
          <h1 className="insights-hero-title">{t("heroHeadline")}</h1>
          <p className="insights-hero-intro">{t("heroIntro")}</p>
        </div>
      </section>

      {/* Grid */}
      <section className="insights-grid-section">
        <div className="insights-grid-inner">
          {insights.length === 0 ? (
            <p className="insights-empty">{t("noInsights")}</p>
          ) : (
            <div className="insights-grid">
              {insights.map((item) => {
                const title = isAr && item.title_ar ? item.title_ar : item.title;
                const summary = isAr && item.summary_ar ? item.summary_ar : item.summary;
                const cover = mediaUrl(item.coverImage);

                return (
                  <article key={item._id} className="insight-card">
                    {cover && (
                      <div className="insight-card-img">
                        <img src={cover} alt={title} loading="lazy" />
                      </div>
                    )}
                    <div className="insight-card-body">
                      <span className="insight-card-cat">{item.category}</span>
                      <h2 className="insight-card-title">{title}</h2>
                      {summary && <p className="insight-card-summary">{summary}</p>}
                      <Link href={`/insights/${item.slug}`} className="insight-card-link">
                        {t("readMore")} →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
