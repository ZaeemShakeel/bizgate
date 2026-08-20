"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminGuard from "../../components/admin/AdminGuard";
import AdminShell from "../../components/admin/AdminShell";
import { api, getStoredAdmin } from "../../lib/adminApi";

export default function AdminDashboardPage() {
  const admin = getStoredAdmin();
  const [stats, setStats] = useState({
    cases: 0,
    activeCases: 0,
    categories: 0,
    insights: 0,
    activeInsights: 0,
    services: 0,
    activeServices: 0,
    inquiries: 0,
  });

  useEffect(() => {
    async function load() {
      try {
        const [casesData, categoriesData, insightsData, servicesData, inquiriesData] = await Promise.all([
          api("/api/case-studies/manage/all"),
          api("/api/categories/manage/all"),
          api("/api/insights/manage/all"),
          api("/api/services/manage/all"),
          api("/api/inquiries"),
        ]);
        const cases = casesData.caseStudies || [];
        const insights = insightsData.insights || [];
        const services = servicesData.services || [];
        setStats({
          cases: cases.length,
          activeCases: cases.filter((item) => item.isActive !== false).length,
          categories: (categoriesData.categories || []).length,
          insights: insights.length,
          activeInsights: insights.filter((item) => item.isActive !== false).length,
          services: services.length,
          activeServices: services.filter((item) => item.isActive !== false).length,
          inquiries: (inquiriesData.inquiries || []).length,
        });
      } catch {
        // keep zeros
      }
    }
    load();
  }, []);

  return (
    <AdminGuard>
      <AdminShell title="Dashboard">
        <section className="admin-dash-hero">
          <div>
            <p className="admin-dash-eyebrow">Welcome back</p>
            <h2>Hello{admin?.name ? `, ${admin.name}` : ""}</h2>
            <p>
              Manage BizGate website content from one place — case studies,
              insights, blog articles, and media uploads.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link href="/admin/case-studies?tab=manage" className="admin-btn admin-btn-primary">
              Case Studies
            </Link>
            <Link href="/admin/insights?tab=manage" className="admin-btn admin-btn-primary" style={{ background: "rgba(255,255,255,0.18)", color: "white", border: "1.5px solid rgba(255,255,255,0.4)" }}>
              Insights / Blog
            </Link>
            <Link href="/admin/services?tab=manage" className="admin-btn admin-btn-primary" style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1.5px solid rgba(255,255,255,0.3)" }}>
              Services
            </Link>
          </div>
        </section>

        {/* Stats Row */}
        <section className="admin-dash-stats" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
          <article className="admin-dash-stat">
            <span>Case Studies</span>
            <strong>{stats.cases}</strong>
          </article>
          <article className="admin-dash-stat accent">
            <span>Active Cases</span>
            <strong>{stats.activeCases}</strong>
          </article>
          <article className="admin-dash-stat teal">
            <span>Categories</span>
            <strong>{stats.categories}</strong>
          </article>
          <article className="admin-dash-stat" style={{ borderLeft: "3px solid var(--brand-orange)" }}>
            <span>Insights / Blog</span>
            <strong>{stats.insights}</strong>
          </article>
          <article className="admin-dash-stat" style={{ borderLeft: "3px solid var(--brand-sky)" }}>
            <span>Published Insights</span>
            <strong>{stats.activeInsights}</strong>
          </article>
          <article className="admin-dash-stat" style={{ borderLeft: "3px solid var(--brand-teal)" }}>
            <span>Services</span>
            <strong>{stats.services}</strong>
          </article>
          <article className="admin-dash-stat" style={{ borderLeft: "3px solid var(--brand-teal)" }}>
            <span>Active Services</span>
            <strong>{stats.activeServices}</strong>
          </article>
          <article className="admin-dash-stat" style={{ borderLeft: "3px solid #2563eb" }}>
            <span>Inquiries</span>
            <strong>{stats.inquiries}</strong>
          </article>
        </section>

        {/* Quick Access Cards */}
        <section className="admin-dash-grid">
          <Link href="/admin/case-studies?tab=manage" className="admin-dash-card">
            <span className="admin-dash-card-tag">Content</span>
            <h3>Case Studies</h3>
            <p>
              Add categories, manage published cases, and create new stories with
              multiple description sections.
            </p>
            <em>Go to workspace →</em>
          </Link>
          <Link href="/admin/insights?tab=manage" className="admin-dash-card">
            <span className="admin-dash-card-tag">Content</span>
            <h3>Insights / Blog</h3>
            <p>
              Publish and manage bilingual insight and blog articles in English
              and Arabic. Add cover images and full content.
            </p>
            <em>Go to workspace →</em>
          </Link>
          <Link href="/admin/services?tab=manage" className="admin-dash-card">
            <span className="admin-dash-card-tag">Content</span>
            <h3>Services</h3>
            <p>
              Publish, filter, and manage bilingual services and categories for the main site with key points and custom CTA buttons.
            </p>
            <em>Go to workspace →</em>
          </Link>
          <Link href="/admin/services?tab=add" className="admin-dash-card soft">
            <span className="admin-dash-card-tag">Create</span>
            <h3>New Service</h3>
            <p>
              Create a new bilingual service with key areas, descriptions, and custom SEO tags.
            </p>
            <em>Create service →</em>
          </Link>
          <Link href="/admin/insights?tab=add" className="admin-dash-card soft">
            <span className="admin-dash-card-tag">Create</span>
            <h3>New Insight / Blog Post</h3>
            <p>
              Write a new bilingual article, add a cover image, and publish it
              to the insights and blog sections.
            </p>
            <em>Create article →</em>
          </Link>
          <Link href="/admin/inquiries" className="admin-dash-card">
            <span className="admin-dash-card-tag">CRM</span>
            <h3>Inquiries</h3>
            <p>
              View and manage all contact form submissions — search, filter by area, reply by email, or delete.
            </p>
            <em>View inquiries →</em>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-dash-card soft"
          >
            <span className="admin-dash-card-tag">Website</span>
            <h3>View live site</h3>
            <p>
              Preview how case studies, insights, services, and categories appear on the
              public BizGate website.
            </p>
            <em>Open website →</em>
          </a>
        </section>
      </AdminShell>
    </AdminGuard>
  );
}
