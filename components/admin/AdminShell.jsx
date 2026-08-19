"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { api, clearSession, getStoredAdmin } from "../../lib/adminApi";

const caseStudyTabs = [
  {
    href: "/admin/case-studies?tab=categories",
    tab: "categories",
    label: "Categories",
  },
  {
    href: "/admin/case-studies?tab=manage",
    tab: "manage",
    label: "Manage case studies",
  },
  {
    href: "/admin/case-studies?tab=add",
    tab: "add",
    label: "Create case study",
  },
];

export default function AdminShell({ title, children, activeCaseTab = "categories" }) {
  const router = useRouter();
  const pathname = usePathname();
  const admin = getStoredAdmin();
  const [collapsed, setCollapsed] = useState(false);
  const [casesOpen, setCasesOpen] = useState(pathname.startsWith("/admin/case-studies"));

  useEffect(() => {
    const saved = localStorage.getItem("bizgate_admin_sidebar");
    if (saved === "collapsed") setCollapsed(true);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/admin/case-studies")) {
      setCasesOpen(true);
    }
  }, [pathname]);

  function toggleSidebar() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("bizgate_admin_sidebar", next ? "collapsed" : "expanded");
      return next;
    });
  }

  function toggleCasesMenu() {
    if (collapsed) {
      setCollapsed(false);
      localStorage.setItem("bizgate_admin_sidebar", "expanded");
      setCasesOpen(true);
      return;
    }
    setCasesOpen((prev) => !prev);
  }

  async function logout() {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } catch {
      // clear local session anyway
    }
    clearSession();
    router.replace("/admin/login");
  }

  const onCases = pathname.startsWith("/admin/case-studies");

  return (
    <div className={`admin-shell ${collapsed ? "is-collapsed" : ""}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          {!collapsed ? (
            <Image
              src="/logo-transparent.png"
              alt="BizGate"
              width={132}
              height={38}
              className="admin-brand-logo"
              priority
            />
          ) : (
            <Image
              src="/logo-mark.svg"
              alt="BizGate"
              width={34}
              height={34}
              className="admin-brand-mark"
              priority
            />
          )}
        </div>

        <nav className="admin-nav">
          <Link
            href="/admin"
            className={`admin-nav-link ${pathname === "/admin" ? "active" : ""}`}
            title="Dashboard"
          >
            <span className="admin-nav-icon" aria-hidden="true">
              ◆
            </span>
            {!collapsed ? <span>Dashboard</span> : null}
          </Link>

          <div className={`admin-nav-group ${casesOpen || onCases ? "open" : ""}`}>
            <button
              type="button"
              className={`admin-nav-link admin-nav-parent ${onCases ? "active" : ""}`}
              onClick={toggleCasesMenu}
              title="Case Studies"
            >
              <span className="admin-nav-icon" aria-hidden="true">
                ▣
              </span>
              {!collapsed ? (
                <>
                  <span className="admin-nav-label">Case Studies</span>
                  <span className="admin-nav-caret">{casesOpen ? "▾" : "▸"}</span>
                </>
              ) : null}
            </button>

            {!collapsed && casesOpen ? (
              <div className="admin-nav-sub">
                {caseStudyTabs.map((item) => (
                  <Link
                    key={item.tab}
                    href={item.href}
                    className={`admin-nav-sublink ${
                      onCases && activeCaseTab === item.tab ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <Link
            href="/admin/insights"
            className={`admin-nav-link ${
              pathname?.startsWith("/admin/insights") ||
              pathname?.startsWith("/admin/blogs") ||
              pathname?.startsWith("/admin/blog")
                ? "active"
                : ""
            }`}
            title="Insights / Blog"
          >
            <span className="admin-nav-icon" aria-hidden="true">✦</span>
            {!collapsed ? <span>Insights / Blog</span> : null}
          </Link>
        </nav>

        <button type="button" className="admin-logout" onClick={logout} title="Logout">
          <svg viewBox="0 0 24 24" className="admin-logout-icon" aria-hidden="true">
            <path
              fill="currentColor"
              d="M16 13v-2H7V8l-5 4 5 4v-3h9zm1-10H6c-1.1 0-2 .9-2 2v3h2V5h11v14H6v-3H4v3c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
            />
          </svg>
          {!collapsed ? <span>Logout</span> : null}
        </button>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-collapse-btn header"
              onClick={toggleSidebar}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? "»" : "«"}
            </button>
            <div>
              <p className="admin-topbar-brand">BizGate Admin Panel</p>
              <h1>{title}</h1>
            </div>
          </div>
          <div className="admin-user-chip">
            <span className="admin-user-avatar">
              <Image
                src="/founder.jpg"
                alt={admin?.name || "Admin"}
                fill
                className="object-cover"
                sizes="40px"
              />
            </span>
            <div>
              <strong>{admin?.name || "Admin"}</strong>
              <span>{admin?.email || "Signed in"}</span>
            </div>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
