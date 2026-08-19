"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminGuard from "../../../components/admin/AdminGuard";
import AdminShell from "../../../components/admin/AdminShell";
import { api, uploadFiles } from "../../../lib/adminApi";
import { mediaUrl, slugify } from "../../../lib/caseStudies";

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

const PANEL_TITLES = {
  manage: {
    title: "Manage insights",
    subtitle: "View, edit, or delete published insights articles",
  },
  add: {
    title: "Create insight",
    subtitle: "Write or update an insight article with bilingual contents",
  },
};

export default function AdminInsightsPage() {
  return (
    <Suspense
      fallback={
        <AdminGuard>
          <AdminShell title="Insights">
            <div className="admin-empty">Loading…</div>
          </AdminShell>
        </AdminGuard>
      }
    >
      <AdminGuard>
        <AdminInsightsContent />
      </AdminGuard>
    </Suspense>
  );
}

function AdminInsightsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "manage";
  const openPanel = ["manage", "add"].includes(tab) ? tab : "manage";

  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.replace("/admin/insights?tab=manage");
    }
  }, [searchParams, router]);

  const [insights, setInsights] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      const data = await api("/api/insights/manage/all");
      setInsights(data.insights || []);
    } catch (err) {
      setError(err.message || "Could not load insights.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  function setPanel(id) {
    router.replace(`/admin/insights?tab=${id}`);
  }

  function flash(ok, text) {
    setMessage(ok ? text : "");
    setError(ok ? "" : text);
  }

  function onChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function startEdit(item) {
    setEditingId(item._id);
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
      order: item.order || 0,
      isActive: item.isActive !== false,
    });
    setPanel("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleUpload(event) {
    const files = event.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      const data = await uploadFiles(files);
      const urls = (data.files || []).map((f) => f.url);
      setForm((prev) => ({
        ...prev,
        coverImage: urls[0] || prev.coverImage,
      }));
      flash(true, "Cover image uploaded successfully");
    } catch (err) {
      flash(false, err.message || "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function removeCover() {
    setForm((prev) => ({ ...prev, coverImage: "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const payload = {
      ...form,
      slug: form.slug ? slugify(form.slug) : slugify(form.title),
      order: Number(form.order || 0),
    };

    try {
      if (editingId) {
        await api(`/api/insights/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        flash(true, "Insight updated successfully");
      } else {
        await api("/api/insights", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        flash(true, "Insight created successfully");
      }
      resetForm();
      await load();
      setPanel("manage");
    } catch (err) {
      flash(false, err.message || "Could not save insight");
    } finally {
      setSaving(false);
    }
  }

  async function removeInsight(id) {
    if (!confirm("Delete this insight?")) return;
    try {
      await api(`/api/insights/${id}`, { method: "DELETE" });
      flash(true, "Insight deleted successfully");
      if (editingId === id) resetForm();
      await load();
    } catch (err) {
      flash(false, err.message || "Could not delete insight");
    }
  }

  const panelMeta =
    openPanel === "add" && editingId
      ? { title: "Edit insight", subtitle: PANEL_TITLES.add.subtitle }
      : PANEL_TITLES[openPanel] || PANEL_TITLES.manage;

  return (
    <AdminShell title="Insights" activeCaseTab={openPanel === "add" ? "add" : "manage"}>
      {message ? <div className="admin-alert admin-alert-success">{message}</div> : null}
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}

      {/* Nav Tabs */}
      <div className="admin-panel admin-tab-panel">
        <div className="admin-panel-header" style={{ borderBottom: "1px solid var(--brand-line)" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => {
                setPanel("manage");
                resetForm();
              }}
              className={`admin-btn ${openPanel === "manage" ? "admin-btn-primary" : "admin-btn-ghost"}`}
            >
              All Insights
            </button>
            <button
              onClick={() => {
                resetForm();
                setPanel("add");
              }}
              className={`admin-btn ${openPanel === "add" ? "admin-btn-primary" : "admin-btn-ghost"}`}
            >
              {editingId ? "Edit Insight" : "+ New Insight"}
            </button>
          </div>
        </div>

        <div className="admin-panel-header">
          <div>
            <h2>{panelMeta.title}</h2>
            <p className="admin-panel-sub">{panelMeta.subtitle}</p>
          </div>
        </div>

        <div className="admin-panel-body">
          {openPanel === "manage" ? (
            !insights.length ? (
              <div className="admin-empty">
                No insights articles yet. Create your first one above.
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Insight Article</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insights.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <strong>{item.title}</strong>
                          <br />
                          {item.title_ar && (
                            <span style={{ color: "var(--brand-muted)", fontSize: 13 }} dir="rtl">
                              {item.title_ar}
                            </span>
                          )}
                          <br />
                          <a
                            href={`/insights/${item.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ fontSize: 12, color: "var(--brand-blue)" }}
                          >
                            Open page
                          </a>
                        </td>
                        <td>{item.category || "Insights"}</td>
                        <td>
                          <span
                            className={`admin-badge ${
                              item.isActive ? "admin-badge-active" : "admin-badge-inactive"
                            }`}
                          >
                            {item.isActive ? "active" : "inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="admin-actions">
                            <button
                              type="button"
                              className="admin-btn admin-btn-ghost"
                              onClick={() => startEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="admin-btn admin-btn-danger"
                              onClick={() => removeInsight(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : null}

          {openPanel === "add" ? (
            <form onSubmit={handleSubmit} className="admin-case-form">
              <div className="admin-form-row">
                {/* Left Side: English */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ color: "var(--brand-blue)", fontSize: 15, borderBottom: "1px solid var(--brand-line)", paddingBottom: 8 }}>
                    English Content
                  </h3>
                  
                  <div className="admin-form-group">
                    <label>Title *</label>
                    <input name="title" value={form.title} onChange={onChange} required />
                  </div>

                  <div className="admin-form-group">
                    <label>Slug (auto-generated from title)</label>
                    <input name="slug" value={form.slug} onChange={onChange} placeholder="e.g. ai-and-guest-reviews" />
                  </div>

                  <div className="admin-form-row" style={{ margin: 0, gap: 16 }}>
                    <div className="admin-form-group" style={{ flex: 1 }}>
                      <label>Category</label>
                      <input name="category" value={form.category} onChange={onChange} placeholder="e.g. Technology" />
                    </div>
                    <div className="admin-form-group" style={{ width: 120 }}>
                      <label>Order</label>
                      <input type="number" name="order" value={form.order} onChange={onChange} />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Summary (English short intro) *</label>
                    <textarea name="summary" rows={3} value={form.summary} onChange={onChange} required />
                  </div>

                  <div className="admin-form-group">
                    <label>Content (English full article) *</label>
                    <textarea name="content" rows={12} value={form.content} onChange={onChange} required />
                  </div>
                </div>

                {/* Right Side: Arabic */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ color: "var(--brand-blue)", fontSize: 15, borderBottom: "1px solid var(--brand-line)", paddingBottom: 8 }}>
                    Arabic Content / المحتوى العربي
                  </h3>

                  <div className="admin-form-group">
                    <label>Title (Arabic)</label>
                    <input name="title_ar" value={form.title_ar} onChange={onChange} dir="rtl" />
                  </div>

                  <div className="admin-form-group">
                    <label>Status</label>
                    <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                      <label className="admin-check" style={{ cursor: "pointer" }}>
                        <input
                          type="radio"
                          name="isActive"
                          checked={form.isActive === true}
                          onChange={() => setForm((prev) => ({ ...prev, isActive: true }))}
                        />
                        Published
                      </label>
                      <label className="admin-check" style={{ cursor: "pointer" }}>
                        <input
                          type="radio"
                          name="isActive"
                          checked={form.isActive === false}
                          onChange={() => setForm((prev) => ({ ...prev, isActive: false }))}
                        />
                        Draft
                      </label>
                    </div>
                  </div>

                  <div className="admin-form-group" style={{ marginTop: 24 }}>
                    {/* Empty spacer to align rows roughly */}
                    <div style={{ height: 26 }} />
                  </div>

                  <div className="admin-form-group">
                    <label>Summary (Arabic short intro)</label>
                    <textarea name="summary_ar" rows={3} value={form.summary_ar} onChange={onChange} dir="rtl" />
                  </div>

                  <div className="admin-form-group">
                    <label>Content (Arabic full article)</label>
                    <textarea name="content_ar" rows={12} value={form.content_ar} onChange={onChange} dir="rtl" />
                  </div>
                </div>
              </div>

              {/* Cover Image Upload (Unified style matching Case Studies) */}
              <div className="admin-form-row" style={{ marginTop: 24 }}>
                <div className="admin-form-group" style={{ flex: 1 }}>
                  <label>Cover Image</label>
                  <input
                    type="file"
                    accept="image/*,.svg"
                    onChange={handleUpload}
                    disabled={uploading}
                  />
                  <p style={{ fontSize: 12, color: "var(--brand-muted)", marginTop: 4 }}>
                    Choose an image to upload as the article banner
                  </p>
                  {form.coverImage ? (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="relative h-20 w-32 overflow-hidden rounded-lg border border-[var(--brand-line)] bg-brand-fog">
                        <Image src={mediaUrl(form.coverImage)} alt="Preview" fill className="object-cover" />
                      </div>
                      <button
                        type="button"
                        className="admin-btn admin-btn-danger"
                        onClick={removeCover}
                      >
                        Remove
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Actions */}
              <div className="admin-inline-actions" style={{ marginTop: 32 }}>
                <button
                  className="admin-btn admin-btn-primary"
                  type="submit"
                  disabled={saving || !form.title}
                >
                  {saving ? "Saving..." : editingId ? "Update Insight" : "Create Insight"}
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-ghost"
                  onClick={() => {
                    setPanel("manage");
                    resetForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </AdminShell>
  );
}
