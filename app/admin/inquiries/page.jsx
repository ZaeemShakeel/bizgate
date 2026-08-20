"use client";

import { useEffect, useState, useCallback } from "react";
import AdminGuard from "../../../components/admin/AdminGuard";
import AdminShell from "../../../components/admin/AdminShell";
import { api } from "../../../lib/adminApi";

const AREA_LABELS = {
  reputation: "Reputation & Brand",
  destination: "Destination Management",
  hotelGroup: "Hotel Group Strategy",
  mysteryGuest: "Mystery Guest",
  gcc: "GCC Market Entry",
  hospitalityTech: "Hospitality Technology",
  training: "Training & Workshops",
  other: "Other",
};

const LANG_LABELS = { en: "English", English: "English", ar: "Arabic", Arabic: "Arabic" };

function Badge({ children, color }) {
  const palettes = {
    blue:   { background: "rgba(59,130,246,0.12)",  color: "#2563eb", border: "1px solid rgba(59,130,246,0.25)"  },
    teal:   { background: "rgba(20,184,166,0.12)",  color: "#0d9488", border: "1px solid rgba(20,184,166,0.25)"  },
    orange: { background: "rgba(251,146,60,0.13)",  color: "#ea580c", border: "1px solid rgba(251,146,60,0.28)"  },
    purple: { background: "rgba(168,85,247,0.12)",  color: "#9333ea", border: "1px solid rgba(168,85,247,0.25)"  },
    gray:   { background: "rgba(100,116,139,0.1)",  color: "#475569", border: "1px solid rgba(100,116,139,0.2)"  },
  };
  const s = palettes[color] || palettes.gray;
  return (
    <span style={{ ...s, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function areaColor(area) {
  const map = { reputation: "blue", destination: "teal", hotelGroup: "purple", mysteryGuest: "orange", gcc: "teal", hospitalityTech: "blue", training: "orange", other: "gray" };
  return map[area] || "gray";
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10, margin: "0 0 10px" }}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14 }}>
      <span style={{ minWidth: 130, color: "#94a3b8", fontWeight: 500, flexShrink: 0 }}>{label}</span>
      <span style={{ color: "#1e293b", fontWeight: 400, flex: 1 }}>{children}</span>
    </div>
  );
}

function DetailDrawer({ inquiry, onClose, onDelete }) {
  if (!inquiry) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", zIndex: 1000, backdropFilter: "blur(2px)" }} />
      <aside style={{
        position: "fixed", top: 0, right: 0, height: "100dvh", width: "min(520px, 100vw)",
        background: "#fff", boxShadow: "-8px 0 40px rgba(15,23,42,0.14)",
        zIndex: 1001, display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "24px 28px 20px", borderBottom: "1px solid #e8edf5", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 4px" }}>Inquiry Detail</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>{inquiry.fullName}</h2>
            <p style={{ fontSize: 13, color: "#64748b", margin: "2px 0 0" }}>{inquiry.jobTitle} · {inquiry.organization}</p>
          </div>
          <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", display: "flex", flexDirection: "column", gap: 24 }}>
          <Section title="Contact Information">
            <Row label="Email">
              <a href={`mailto:${inquiry.email}`} style={{ color: "#2563eb", fontWeight: 500, textDecoration: "none" }}>{inquiry.email}</a>
            </Row>
            {inquiry.phone && <Row label="Phone"><a href={`tel:${inquiry.phone}`} style={{ color: "#2563eb", textDecoration: "none" }}>{inquiry.phone}</a></Row>}
            <Row label="Country / Market">{inquiry.countryOrMarket}</Row>
            {inquiry.website && (
              <Row label="Website">
                <a href={inquiry.website.startsWith("http") ? inquiry.website : `https://${inquiry.website}`} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "none" }}>{inquiry.website}</a>
              </Row>
            )}
          </Section>

          <Section title="Enquiry Details">
            <Row label="Area of Interest">
              <Badge color={areaColor(inquiry.areaOfInterest)}>{AREA_LABELS[inquiry.areaOfInterest] || inquiry.areaOfInterest}</Badge>
            </Row>
            <Row label="Preferred Language">
              <Badge color="teal">{LANG_LABELS[inquiry.preferredLanguage] || inquiry.preferredLanguage}</Badge>
            </Row>
            <Row label="Submitted">{timeAgo(inquiry.createdAt)} · {new Date(inquiry.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</Row>
          </Section>

          <Section title="Objectives">
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#334155", background: "#f8fafc", borderRadius: 10, padding: "14px 16px", margin: 0, border: "1px solid #e8edf5", whiteSpace: "pre-wrap" }}>
              {inquiry.objectives}
            </p>
          </Section>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px", borderTop: "1px solid #e8edf5", display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <a
            href={`mailto:${inquiry.email}?subject=RE: Your BizGate Enquiry`}
            style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, padding: "9px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            ✉ Reply by Email
          </a>
          <button
            onClick={() => onDelete(inquiry._id)}
            style={{ background: "rgba(239,68,68,0.08)", color: "#dc2626", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "9px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
          >
            Delete
          </button>
        </div>
      </aside>
    </>
  );
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterArea, setFilterArea] = useState("all");
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api("/api/inquiries");
      setInquiries(data.inquiries || []);
    } catch {
      setError("Failed to load inquiries. Please ensure you are logged in as an admin.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this inquiry? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await api(`/api/inquiries/${id}`, { method: "DELETE" });
      setInquiries((prev) => prev.filter((i) => i._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch {
      alert("Failed to delete inquiry.");
    } finally {
      setDeleting(null);
    }
  }

  const filtered = inquiries.filter((inq) => {
    const q = search.toLowerCase();
    const matchSearch = !q || [inq.fullName, inq.email, inq.organization, inq.countryOrMarket]
      .some((f) => f?.toLowerCase().includes(q));
    const matchArea = filterArea === "all" || inq.areaOfInterest === filterArea;
    return matchSearch && matchArea;
  });

  return (
    <AdminGuard>
      <AdminShell title="Inquiries">
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>Contact Form Submissions</h2>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
              {loading ? "Loading…" : `${inquiries.length} total · ${filtered.length} shown`}
            </p>
          </div>
          <button onClick={load} style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#475569", cursor: "pointer" }}>
            ↺ Refresh
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <input
            type="search"
            placeholder="Search by name, email, org…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: "1 1 220px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "9px 14px", fontSize: 14, color: "#1e293b", outline: "none", minWidth: 0 }}
          />
          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "9px 14px", fontSize: 14, color: "#1e293b", cursor: "pointer" }}
          >
            <option value="all">All Areas</option>
            {Object.entries(AREA_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "14px 18px", color: "#dc2626", fontSize: 14, marginBottom: 20 }}>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 240, gap: 14, color: "#94a3b8", fontSize: 15 }}>
            <div style={{ width: 32, height: 32, border: "3px solid #e2e8f0", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            Loading inquiries…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 24px", background: "#f8fafc", borderRadius: 16, border: "1px dashed #cbd5e1" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: 18, fontWeight: 600, color: "#334155", margin: "0 0 6px" }}>No inquiries found</p>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>
              {search || filterArea !== "all" ? "Try adjusting your search or filter." : "Contact form submissions will appear here once received."}
            </p>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8edf5", overflow: "hidden", boxShadow: "0 1px 4px rgba(15,23,42,0.06)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e8edf5" }}>
                    {["Name & Organisation", "Email", "Country / Market", "Area of Interest", "Language", "Received", ""].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#94a3b8", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inq, idx) => (
                    <tr
                      key={inq._id}
                      style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #f1f5f9" : "none", cursor: "pointer", transition: "background 0.12s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      onClick={() => setSelected(inq)}
                    >
                      <td style={{ padding: "14px 16px", minWidth: 180 }}>
                        <p style={{ fontWeight: 600, color: "#0f172a", margin: 0, whiteSpace: "nowrap" }}>{inq.fullName}</p>
                        <p style={{ color: "#94a3b8", fontSize: 12, margin: "2px 0 0", whiteSpace: "nowrap" }}>{inq.jobTitle} · {inq.organization}</p>
                      </td>
                      <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                        <a href={`mailto:${inq.email}`} onClick={(e) => e.stopPropagation()} style={{ color: "#2563eb", textDecoration: "none" }}>{inq.email}</a>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#475569", whiteSpace: "nowrap" }}>{inq.countryOrMarket}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <Badge color={areaColor(inq.areaOfInterest)}>{AREA_LABELS[inq.areaOfInterest] || inq.areaOfInterest}</Badge>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <Badge color="teal">{LANG_LABELS[inq.preferredLanguage] || inq.preferredLanguage}</Badge>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#94a3b8", whiteSpace: "nowrap", fontSize: 13 }}>{timeAgo(inq.createdAt)}</td>
                      <td style={{ padding: "14px 16px" }} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleDelete(inq._id)}
                          disabled={deleting === inq._id}
                          style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 16, opacity: deleting === inq._id ? 0.5 : 1, padding: "4px 6px", borderRadius: 6 }}
                          title="Delete inquiry"
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Detail drawer */}
        <DetailDrawer inquiry={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </AdminShell>
    </AdminGuard>
  );
}
