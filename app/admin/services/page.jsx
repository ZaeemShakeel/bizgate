"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminGuard from "../../../components/admin/AdminGuard";
import AdminShell from "../../../components/admin/AdminShell";
import { api, uploadFiles } from "../../../lib/adminApi";
import { mediaUrl, slugify } from "../../../lib/caseStudies";

const emptyService = {
  title: "",
  title_ar: "",
  eyebrow: "",
  eyebrow_ar: "",
  slug: "",
  category: "",
  category_ar: "",
  coverImage: "",
  summary: "",
  summary_ar: "",
  content: "",
  content_ar: "",
  points: "",
  points_ar: "",
  cta: "",
  cta_ar: "",
  metaTitle: "",
  metaTitle_ar: "",
  metaDescription: "",
  metaDescription_ar: "",
  metaKeywords: "",
  metaKeywords_ar: "",
  order: 0,
  isActive: true,
};

const emptyCategory = { name: "", name_ar: "", order: 0 };

export default function AdminServicesPage() {
  return (
    <Suspense
      fallback={
        <AdminGuard>
          <AdminShell title="Services">
            <div className="admin-empty">Loading…</div>
          </AdminShell>
        </AdminGuard>
      }
    >
      <AdminGuard>
        <AdminServicesContent />
      </AdminGuard>
    </Suspense>
  );
}

function AdminServicesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawTab = searchParams.get("tab") || "manage";
  const openPanel = ["categories", "manage", "add"].includes(rawTab) ? rawTab : "manage";

  useEffect(() => {
    if (!searchParams.get("tab")) router.replace("/admin/services?tab=manage");
  }, [searchParams, router]);

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyService);
  const [catForm, setCatForm] = useState(emptyCategory);
  const [editingId, setEditingId] = useState(null);
  const [editingCatId, setEditingCatId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  function setPanel(id) { router.replace(`/admin/services?tab=${id}`); }
  function flash(ok, text) { setMessage(ok ? text : ""); setError(ok ? "" : text); }

  async function loadAll() {
    try {
      const [svcData, catData] = await Promise.all([
        api("/api/services/manage/all"),
        api("/api/services/categories/manage/all"),
      ]);
      setServices(svcData.services || []);
      setCategories(catData.categories || []);
    } catch (err) {
      setError(err.message || "Could not load data.");
    }
  }

  useEffect(() => { loadAll(); }, []);

  // ── Service form handlers ─────────────────────────────────────────────────
  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function resetForm() { setEditingId(null); setForm(emptyService); }

  function startEdit(item) {
    setEditingId(item._id);
    setForm({
      title: item.title || "",
      title_ar: item.title_ar || "",
      eyebrow: item.eyebrow || "",
      eyebrow_ar: item.eyebrow_ar || "",
      slug: item.slug || "",
      category: item.category || "",
      category_ar: item.category_ar || "",
      coverImage: item.coverImage || "",
      summary: item.summary || "",
      summary_ar: item.summary_ar || "",
      content: item.content || "",
      content_ar: item.content_ar || "",
      points: Array.isArray(item.points) ? item.points.join("\n") : (item.points || ""),
      points_ar: Array.isArray(item.points_ar) ? item.points_ar.join("\n") : (item.points_ar || ""),
      cta: item.cta || "",
      cta_ar: item.cta_ar || "",
      metaTitle: item.metaTitle || "",
      metaTitle_ar: item.metaTitle_ar || "",
      metaDescription: item.metaDescription || "",
      metaDescription_ar: item.metaDescription_ar || "",
      metaKeywords: item.metaKeywords || "",
      metaKeywords_ar: item.metaKeywords_ar || "",
      order: item.order || 0,
      isActive: item.isActive !== false,
    });
    setPanel("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleUpload(e) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const data = await uploadFiles(files);
      const urls = (data.files || []).map((f) => f.url);
      setForm((prev) => ({ ...prev, coverImage: urls[0] || prev.coverImage }));
      flash(true, "Cover image uploaded successfully");
    } catch (err) {
      flash(false, err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    // Convert newline-separated points to arrays
    const pointsArray = form.points.split("\n").map((p) => p.trim()).filter(Boolean);
    const pointsArArray = form.points_ar.split("\n").map((p) => p.trim()).filter(Boolean);

    const payload = {
      ...form,
      slug: form.slug ? slugify(form.slug) : slugify(form.title),
      points: JSON.stringify(pointsArray),
      points_ar: JSON.stringify(pointsArArray),
      order: Number(form.order || 0),
    };

    try {
      if (editingId) {
        await api(`/api/services/${editingId}`, { method: "PUT", body: JSON.stringify(payload) });
        flash(true, "Service updated successfully");
      } else {
        await api("/api/services", { method: "POST", body: JSON.stringify(payload) });
        flash(true, "Service created successfully");
      }
      resetForm();
      await loadAll();
      setPanel("manage");
    } catch (err) {
      flash(false, err.message || "Could not save service");
    } finally {
      setSaving(false);
    }
  }

  async function removeService(id) {
    if (!confirm("Delete this service?")) return;
    try {
      await api(`/api/services/${id}`, { method: "DELETE" });
      flash(true, "Service deleted");
      if (editingId === id) resetForm();
      await loadAll();
    } catch (err) {
      flash(false, err.message || "Could not delete service");
    }
  }

  // ── Category form handlers ────────────────────────────────────────────────
  function onCatChange(e) {
    const { name, value } = e.target;
    setCatForm((prev) => ({ ...prev, [name]: value }));
  }

  function resetCatForm() { setEditingCatId(null); setCatForm(emptyCategory); }

  function startEditCat(cat) {
    setEditingCatId(cat._id);
    setCatForm({ name: cat.name || "", name_ar: cat.name_ar || "", order: cat.order || 0 });
  }

  async function handleCatSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCatId) {
        await api(`/api/services/categories/${editingCatId}`, { method: "PUT", body: JSON.stringify(catForm) });
        flash(true, "Category updated");
      } else {
        await api("/api/services/categories", { method: "POST", body: JSON.stringify(catForm) });
        flash(true, "Category created");
      }
      resetCatForm();
      await loadAll();
    } catch (err) {
      flash(false, err.message || "Could not save category");
    } finally {
      setSaving(false);
    }
  }

  async function removeCat(id) {
    if (!confirm("Delete this category?")) return;
    try {
      await api(`/api/services/categories/${id}`, { method: "DELETE" });
      flash(true, "Category deleted");
      await loadAll();
    } catch (err) {
      flash(false, err.message || "Could not delete category");
    }
  }

  const panelTitle =
    openPanel === "categories"
      ? "Service Categories"
      : openPanel === "add"
      ? editingId ? "Edit Service" : "Create Service"
      : "Manage Services";

  return (
    <AdminShell title="Services" activeCaseTab={openPanel === "add" ? "add" : "manage"}>
      {message ? <div className="admin-alert admin-alert-success">{message}</div> : null}
      {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}

      {/* Tab Bar */}
      <div className="admin-panel admin-tab-panel">
        <div className="admin-panel-header" style={{ borderBottom: "1px solid var(--brand-line)" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { id: "manage", label: "All Services" },
              { id: "categories", label: "Categories" },
              { id: "add", label: editingId ? "Edit Service" : "+ New Service" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => { if (id !== "add") resetForm(); setPanel(id); }}
                className={`admin-btn ${openPanel === id ? "admin-btn-primary" : "admin-btn-ghost"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-panel-header">
          <div>
            <h2>{panelTitle}</h2>
            <p className="admin-panel-sub">
              {openPanel === "categories"
                ? "Create and manage service categories for filtering"
                : openPanel === "add"
                ? "Fill in English and Arabic fields, upload a cover image, and set SEO metadata"
                : "View, edit or delete published services"}
            </p>
          </div>
        </div>

        <div className="admin-panel-body">

          {/* ── MANAGE TAB ─────────────────────────────────────────────── */}
          {openPanel === "manage" && (
            !services.length ? (
              <div className="admin-empty">No services yet. Create your first one above.</div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Category</th>
                      <th>Order</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((svc) => (
                      <tr key={svc._id}>
                        <td>
                          <strong>{svc.title}</strong>
                          {svc.title_ar && (
                            <><br /><span style={{ color: "var(--brand-muted)", fontSize: 13 }} dir="rtl">{svc.title_ar}</span></>
                          )}
                          <br />
                          <a
                            href={`/en/services/${svc.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ fontSize: 12, color: "var(--brand-blue)" }}
                          >
                            Open page ↗
                          </a>
                        </td>
                        <td>{svc.category || "—"}</td>
                        <td>{svc.order}</td>
                        <td>
                          <span className={`admin-badge ${svc.isActive ? "admin-badge-active" : "admin-badge-inactive"}`}>
                            {svc.isActive ? "active" : "draft"}
                          </span>
                        </td>
                        <td>
                          <div className="admin-actions">
                            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => startEdit(svc)}>Edit</button>
                            <button type="button" className="admin-btn admin-btn-danger" onClick={() => removeService(svc._id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* ── CATEGORIES TAB ─────────────────────────────────────────── */}
          {openPanel === "categories" && (
            <div style={{ display: "grid", gap: 24 }}>
              {/* Create / Edit form */}
              <form onSubmit={handleCatSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
                <div className="admin-form-group" style={{ flex: 1, minWidth: 200 }}>
                  <label>Category Name (English) *</label>
                  <input name="name" value={catForm.name} onChange={onCatChange} required placeholder="e.g. Digital Reputation" />
                </div>
                <div className="admin-form-group" style={{ flex: 1, minWidth: 200 }}>
                  <label>Category Name (Arabic)</label>
                  <input name="name_ar" value={catForm.name_ar} onChange={onCatChange} dir="rtl" placeholder="مثال: السمعة الرقمية" />
                </div>
                <div className="admin-form-group" style={{ width: 100 }}>
                  <label>Order</label>
                  <input type="number" name="order" value={catForm.order} onChange={onCatChange} />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                    {editingCatId ? "Update" : "Add Category"}
                  </button>
                  {editingCatId && (
                    <button type="button" className="admin-btn admin-btn-ghost" onClick={resetCatForm}>Cancel</button>
                  )}
                </div>
              </form>

              {/* Categories list */}
              {!categories.length ? (
                <div className="admin-empty">No categories yet.</div>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead><tr><th>Name (EN)</th><th>Name (AR)</th><th>Slug</th><th>Order</th><th>Actions</th></tr></thead>
                    <tbody>
                      {categories.map((cat) => (
                        <tr key={cat._id}>
                          <td><strong>{cat.name}</strong></td>
                          <td dir="rtl">{cat.name_ar || "—"}</td>
                          <td><code style={{ fontSize: 12 }}>{cat.slug}</code></td>
                          <td>{cat.order}</td>
                          <td>
                            <div className="admin-actions">
                              <button type="button" className="admin-btn admin-btn-ghost" onClick={() => startEditCat(cat)}>Edit</button>
                              <button type="button" className="admin-btn admin-btn-danger" onClick={() => removeCat(cat._id)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── CREATE / EDIT TAB ──────────────────────────────────────── */}
          {openPanel === "add" && (
            <form onSubmit={handleSubmit} className="admin-case-form">

              {/* English + Arabic columns */}
              <div className="admin-form-row">
                {/* English */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ color: "var(--brand-blue)", fontSize: 15, borderBottom: "1px solid var(--brand-line)", paddingBottom: 8 }}>English Content</h3>

                  <div className="admin-form-group">
                    <label>Title *</label>
                    <input name="title" value={form.title} onChange={onChange} required />
                  </div>
                  <div className="admin-form-group">
                    <label>Eyebrow label (e.g. "01 · Digital Reputation")</label>
                    <input name="eyebrow" value={form.eyebrow} onChange={onChange} placeholder="01 · Digital Reputation" />
                  </div>
                  <div className="admin-form-row" style={{ margin: 0, gap: 12 }}>
                    <div className="admin-form-group" style={{ flex: 1 }}>
                      <label>Slug (auto-generated)</label>
                      <input name="slug" value={form.slug} onChange={onChange} placeholder="e.g. digital-reputation" />
                    </div>
                    <div className="admin-form-group" style={{ width: 100 }}>
                      <label>Order</label>
                      <input type="number" name="order" value={form.order} onChange={onChange} />
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label>Category</label>
                    <input name="category" value={form.category} onChange={onChange} list="cat-list-en" placeholder="e.g. Digital Reputation" />
                    <datalist id="cat-list-en">
                      {categories.map((c) => <option key={c._id} value={c.name} />)}
                    </datalist>
                  </div>
                  <div className="admin-form-group">
                    <label>Summary (short description for card)</label>
                    <textarea name="summary" rows={3} value={form.summary} onChange={onChange} />
                  </div>
                  <div className="admin-form-group">
                    <label>Full Content (detail page body)</label>
                    <textarea name="content" rows={8} value={form.content} onChange={onChange} />
                  </div>
                  <div className="admin-form-group">
                    <label>Key Points (one per line)</label>
                    <textarea name="points" rows={5} value={form.points} onChange={onChange} placeholder={"Point 1\nPoint 2\nPoint 3"} />
                  </div>
                  <div className="admin-form-group">
                    <label>CTA Button Text</label>
                    <input name="cta" value={form.cta} onChange={onChange} placeholder="e.g. Request a Reputation Audit →" />
                  </div>
                </div>

                {/* Arabic */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ color: "var(--brand-blue)", fontSize: 15, borderBottom: "1px solid var(--brand-line)", paddingBottom: 8 }}>Arabic Content / المحتوى العربي</h3>

                  <div className="admin-form-group">
                    <label>Title (Arabic)</label>
                    <input name="title_ar" value={form.title_ar} onChange={onChange} dir="rtl" />
                  </div>
                  <div className="admin-form-group">
                    <label>Eyebrow (Arabic)</label>
                    <input name="eyebrow_ar" value={form.eyebrow_ar} onChange={onChange} dir="rtl" />
                  </div>
                  <div className="admin-form-group">
                    <label>Status</label>
                    <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                      {[true, false].map((val) => (
                        <label key={String(val)} className="admin-check" style={{ cursor: "pointer" }}>
                          <input type="radio" name="isActive" checked={form.isActive === val}
                            onChange={() => setForm((p) => ({ ...p, isActive: val }))} />
                          {val ? "Published" : "Draft"}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label>Category (Arabic)</label>
                    <input name="category_ar" value={form.category_ar} onChange={onChange} dir="rtl" />
                  </div>
                  <div className="admin-form-group">
                    <label>Summary (Arabic)</label>
                    <textarea name="summary_ar" rows={3} value={form.summary_ar} onChange={onChange} dir="rtl" />
                  </div>
                  <div className="admin-form-group">
                    <label>Full Content (Arabic)</label>
                    <textarea name="content_ar" rows={8} value={form.content_ar} onChange={onChange} dir="rtl" />
                  </div>
                  <div className="admin-form-group">
                    <label>Key Points — Arabic (one per line)</label>
                    <textarea name="points_ar" rows={5} value={form.points_ar} onChange={onChange} dir="rtl" />
                  </div>
                  <div className="admin-form-group">
                    <label>CTA Button Text (Arabic)</label>
                    <input name="cta_ar" value={form.cta_ar} onChange={onChange} dir="rtl" />
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="admin-form-row" style={{ marginTop: 24 }}>
                <div className="admin-form-group" style={{ flex: 1 }}>
                  <label>Cover Image</label>
                  <input type="file" accept="image/*,.svg" onChange={handleUpload} disabled={uploading} />
                  <p style={{ fontSize: 12, color: "var(--brand-muted)", marginTop: 4 }}>
                    Displayed on the service card and detail page hero
                  </p>
                  {form.coverImage && (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="relative h-20 w-32 overflow-hidden rounded-lg border border-[var(--brand-line)] bg-brand-fog">
                        <Image src={mediaUrl(form.coverImage)} alt="Preview" fill className="object-cover" />
                      </div>
                      <button type="button" className="admin-btn admin-btn-danger"
                        onClick={() => setForm((p) => ({ ...p, coverImage: "" }))}>Remove</button>
                    </div>
                  )}
                </div>
              </div>

              {/* SEO Fields */}
              <div style={{ marginTop: 32, borderTop: "2px solid var(--brand-line)", paddingTop: 24 }}>
                <h3 style={{ color: "var(--brand-teal)", fontSize: 15, marginBottom: 16 }}>
                  🔍 SEO Settings
                </h3>
                <div className="admin-form-row">
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="admin-form-group">
                      <label>Meta Title (English)</label>
                      <input name="metaTitle" value={form.metaTitle} onChange={onChange} placeholder="Recommended: 50–60 characters" />
                      <p style={{ fontSize: 11, color: "var(--brand-muted)", marginTop: 3 }}>{form.metaTitle.length} / 60 chars</p>
                    </div>
                    <div className="admin-form-group">
                      <label>Meta Description (English)</label>
                      <textarea name="metaDescription" rows={2} value={form.metaDescription} onChange={onChange} placeholder="Recommended: 120–160 characters" />
                      <p style={{ fontSize: 11, color: "var(--brand-muted)", marginTop: 3 }}>{form.metaDescription.length} / 160 chars</p>
                    </div>
                    <div className="admin-form-group">
                      <label>Meta Keywords (English, comma-separated)</label>
                      <input name="metaKeywords" value={form.metaKeywords} onChange={onChange} placeholder="hospitality, dubai, hotel reputation" />
                    </div>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="admin-form-group">
                      <label>Meta Title (Arabic)</label>
                      <input name="metaTitle_ar" value={form.metaTitle_ar} onChange={onChange} dir="rtl" />
                    </div>
                    <div className="admin-form-group">
                      <label>Meta Description (Arabic)</label>
                      <textarea name="metaDescription_ar" rows={2} value={form.metaDescription_ar} onChange={onChange} dir="rtl" />
                    </div>
                    <div className="admin-form-group">
                      <label>Meta Keywords (Arabic)</label>
                      <input name="metaKeywords_ar" value={form.metaKeywords_ar} onChange={onChange} dir="rtl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="admin-inline-actions" style={{ marginTop: 32 }}>
                <button className="admin-btn admin-btn-primary" type="submit" disabled={saving || !form.title}>
                  {saving ? "Saving..." : editingId ? "Update Service" : "Create Service"}
                </button>
                <button type="button" className="admin-btn admin-btn-ghost"
                  onClick={() => { setPanel("manage"); resetForm(); }}>
                  Cancel
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </AdminShell>
  );
}
