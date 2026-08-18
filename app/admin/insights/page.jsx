"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AdminGuard from "../../../components/admin/AdminGuard";
import AdminShell from "../../../components/admin/AdminShell";
import { api } from "../../../lib/adminApi";
import { slugify } from "../../../lib/caseStudies";

const emptyForm = {
  title: "",
  title_ar: "",
  slug: "",
  category: "Insights",
  coverImage: "",
  summary: "",
  content: "",
  summary_ar: "",
  content_ar: "",
  order: 0,
  isActive: true,
};

function InsightsContent() {
  const params = useSearchParams();
  const [panel, setPanel] = useState("manage");
  const [insights, setInsights] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const p = params.get("panel");
    if (p) setPanel(p);
  }, [params]);

  const loadInsights = async () => {
    setLoading(true);
    try {
      const data = await api.get("/api/insights/manage/all");
      setInsights(data.insights || []);
    } catch {
      setError("Could not load insights.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const handleField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title || "",
      title_ar: item.title_ar || "",
      slug: item.slug || "",
      category: item.category || "Insights",
      coverImage: item.coverImage || "",
      summary: item.summary || "",
      content: item.content || "",
      summary_ar: item.summary_ar || "",
      content_ar: item.content_ar || "",
      order: item.order ?? 0,
      isActive: item.isActive !== false,
    });
    setPanel("add");
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this insight?")) return;
    try {
      await api.delete(`/api/insights/${id}`);
      setSuccess("Insight deleted.");
      loadInsights();
    } catch {
      setError("Delete failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        ...form,
        slug: form.slug ? slugify(form.slug) : slugify(form.title),
      };
      if (editId) {
        await api.put(`/api/insights/${editId}`, payload);
        setSuccess("Insight updated.");
      } else {
        await api.post("/api/insights", payload);
        setSuccess("Insight created.");
      }
      setForm(emptyForm);
      setEditId(null);
      setPanel("manage");
      loadInsights();
    } catch (err) {
      setError(err.message || "Save failed.");
    }
    setSaving(false);
  };

  const handleNew = () => {
    setForm(emptyForm);
    setEditId(null);
    setPanel("add");
    setError("");
    setSuccess("");
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    background: "#0f0f0f",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    color: "#f5f5f5",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: "#888",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 6,
    display: "block",
  };

  const fieldBlock = (label, key, multiline = false, rows = 4, dir = "ltr") => (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea
          id={`field-${key}`}
          rows={rows}
          value={form[key]}
          onChange={(e) => handleField(key, e.target.value)}
          style={{ ...inputStyle, resize: "vertical", direction: dir }}
        />
      ) : (
        <input
          id={`field-${key}`}
          type="text"
          value={form[key]}
          onChange={(e) => handleField(key, e.target.value)}
          style={{ ...inputStyle, direction: dir }}
        />
      )}
    </div>
  );

  return (
    <AdminShell>
      {/* Nav tabs */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        {["manage", "add"].map((tab) => (
          <button
            key={tab}
            id={`tab-${tab}`}
            onClick={() => { setPanel(tab); if (tab === "manage") { setEditId(null); setForm(emptyForm); } }}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              background: panel === tab ? "#c8a96e" : "#1a1a1a",
              color: panel === tab ? "#000" : "#888",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            {tab === "manage" ? "All Insights" : editId ? "Edit Insight" : "New Insight"}
          </button>
        ))}
      </div>

      {success && (
        <div style={{ background: "#1a2a1a", border: "1px solid #2d6a2d", color: "#6ddb6d", padding: "12px 16px", borderRadius: 8, marginBottom: 20, fontSize: 14 }}>
          {success}
        </div>
      )}
      {error && (
        <div style={{ background: "#2a1a1a", border: "1px solid #6a2d2d", color: "#db6d6d", padding: "12px 16px", borderRadius: 8, marginBottom: 20, fontSize: 14 }}>
          {error}
        </div>
      )}

      {/* MANAGE LIST */}
      {panel === "manage" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ color: "#f5f5f5", fontSize: 18, margin: 0 }}>Insights ({insights.length})</h2>
            <button id="btn-new-insight" onClick={handleNew} style={{ padding: "10px 20px", background: "#c8a96e", color: "#000", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>
              + New Insight
            </button>
          </div>

          {loading ? (
            <p style={{ color: "#666" }}>Loading…</p>
          ) : insights.length === 0 ? (
            <p style={{ color: "#666" }}>No insights yet. Create your first one!</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {insights.map((item) => (
                <div key={item._id} style={{ background: "#111", border: "1px solid #222", borderRadius: 10, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#c8a96e", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                      {item.category || "Insights"} · Order {item.order}
                    </div>
                    <div style={{ color: "#f5f5f5", fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                    {item.title_ar && <div style={{ color: "#999", fontSize: 13, direction: "rtl", textAlign: "right" }}>{item.title_ar}</div>}
                    <div style={{ color: "#555", fontSize: 12, marginTop: 4 }}>{item.slug}</div>
                    {!item.isActive && <span style={{ background: "#2a1a1a", color: "#db6d6d", fontSize: 11, padding: "2px 8px", borderRadius: 4, marginTop: 4, display: "inline-block" }}>Draft</span>}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button id={`btn-edit-${item._id}`} onClick={() => handleEdit(item)} style={{ padding: "8px 14px", background: "#1a1a1a", color: "#c8a96e", border: "1px solid #2a2a2a", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
                      Edit
                    </button>
                    <button id={`btn-delete-${item._id}`} onClick={() => handleDelete(item._id)} style={{ padding: "8px 14px", background: "#1a0000", color: "#db6d6d", border: "1px solid #3a1a1a", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADD / EDIT FORM */}
      {panel === "add" && (
        <form onSubmit={handleSubmit}>
          <h2 style={{ color: "#f5f5f5", fontSize: 18, marginBottom: 28 }}>
            {editId ? "Edit Insight" : "New Insight"}
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Left: English */}
            <div>
              <div style={{ color: "#c8a96e", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, borderBottom: "1px solid #222", paddingBottom: 8 }}>
                English
              </div>
              {fieldBlock("Title", "title")}
              {fieldBlock("Slug (auto-generated from title)", "slug")}
              {fieldBlock("Category", "category")}
              {fieldBlock("Cover Image URL", "coverImage")}
              {fieldBlock("Summary (short intro)", "summary", true, 3)}
              {fieldBlock("Content (full article)", "content", true, 12)}
            </div>

            {/* Right: Arabic */}
            <div>
              <div style={{ color: "#c8a96e", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, borderBottom: "1px solid #222", paddingBottom: 8 }}>
                Arabic / العربية
              </div>
              {fieldBlock("Title (Arabic)", "title_ar", false, 1, "rtl")}
              <div style={{ marginBottom: 20 }}>
                <label style={{ ...labelStyle, marginBottom: 6 }}>Status</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {[true, false].map((val) => (
                    <label key={String(val)} style={{ display: "flex", alignItems: "center", gap: 6, color: "#ccc", cursor: "pointer", fontSize: 13 }}>
                      <input
                        type="radio"
                        name="isActive"
                        checked={form.isActive === val}
                        onChange={() => handleField("isActive", val)}
                      />
                      {val ? "Published" : "Draft"}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="field-order" style={labelStyle}>Order</label>
                <input
                  id="field-order"
                  type="number"
                  value={form.order}
                  onChange={(e) => handleField("order", Number(e.target.value))}
                  style={{ ...inputStyle, width: 120 }}
                />
              </div>
              {fieldBlock("Summary (Arabic)", "summary_ar", true, 3, "rtl")}
              {fieldBlock("Content (Arabic)", "content_ar", true, 12, "rtl")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button
              id="btn-submit-insight"
              type="submit"
              disabled={saving || !form.title}
              style={{
                padding: "12px 32px",
                background: saving ? "#333" : "#c8a96e",
                color: "#000",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
                fontSize: 15,
              }}
            >
              {saving ? "Saving…" : editId ? "Update Insight" : "Create Insight"}
            </button>
            <button
              type="button"
              onClick={() => { setPanel("manage"); setEditId(null); setForm(emptyForm); }}
              style={{ padding: "12px 24px", background: "transparent", color: "#888", border: "1px solid #333", borderRadius: 8, cursor: "pointer", fontSize: 15 }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}

export default function InsightsAdminPage() {
  return (
    <AdminGuard>
      <Suspense fallback={<div>Loading…</div>}>
        <InsightsContent />
      </Suspense>
    </AdminGuard>
  );
}
