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
    categories: 0,
    active: 0,
  });

  useEffect(() => {
    async function load() {
      try {
        const [casesData, categoriesData] = await Promise.all([
          api("/api/case-studies/manage/all"),
          api("/api/categories/manage/all"),
        ]);
        const cases = casesData.caseStudies || [];
        setStats({
          cases: cases.length,
          categories: (categoriesData.categories || []).length,
          active: cases.filter((item) => item.isActive !== false).length,
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
              Manage BizGate website content from one place — categories, case
              studies, and media uploads.
            </p>
          </div>
          <Link href="/admin/case-studies?tab=manage" className="admin-btn admin-btn-primary">
            Open Case Studies
          </Link>
        </section>

        <section className="admin-dash-stats">
          <article className="admin-dash-stat">
            <span>Case studies</span>
            <strong>{stats.cases}</strong>
          </article>
          <article className="admin-dash-stat accent">
            <span>Active on website</span>
            <strong>{stats.active}</strong>
          </article>
          <article className="admin-dash-stat teal">
            <span>Categories</span>
            <strong>{stats.categories}</strong>
          </article>
        </section>

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
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-dash-card soft"
          >
            <span className="admin-dash-card-tag">Website</span>
            <h3>View live site</h3>
            <p>
              Preview how case studies and categories appear on the public BizGate
              website.
            </p>
            <em>Open website →</em>
          </a>
        </section>
      </AdminShell>
    </AdminGuard>
  );
}
