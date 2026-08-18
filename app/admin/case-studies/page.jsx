"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminGuard from "../../../components/admin/AdminGuard";
import AdminShell from "../../../components/admin/AdminShell";
import { api, uploadFiles } from "../../../lib/adminApi";
import { caseStudyHref, mediaUrl, slugify } from "../../../lib/caseStudies";

const defaultSections = [
  { title: "The challenge", body: "" },
  { title: "What BizGate did", body: "" },
  { title: "Outcome / results", body: "" },
];

const emptyForm = {
  title: "",
  title_ar: "",
  category: "",
  clientName: "",
  isAnonymous: false,
  sections: defaultSections.map((section) => ({ ...section })),
  sections_ar: [
    { title: "التحدي", body: "" },
    { title: "منهجية العمل", body: "" },
    { title: "الأثر", body: "" },
  ],
  coverImage: "",
  gallery: [],
  videos: [],
  icons: [],
  order: 0,
  isActive: true,
};

const PANEL_TITLES = {
  categories: {
    title: "Categories",
    subtitle: "Add a category, then manage the list below",
  },
  manage: {
    title: "Manage case studies",
    subtitle: "View, edit, or delete published cases",
  },
  add: {
    title: "Create case study",
    subtitle: "Create or update a case with description sections",
  },
};

export default function AdminCaseStudiesPage() {
  return (
    <Suspense
      fallback={
        <AdminGuard>
          <AdminShell title="Case Studies">
            <div className="admin-empty">Loading…</div>
          </AdminShell>
        </AdminGuard>
      }
    >
      <AdminCaseStudiesContent />
    </Suspense>
  );
}

function AdminCaseStudiesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "categories";
  const openPanel = ["categories", "manage", "add"].includes(tab) ? tab : "categories";

  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.replace("/admin/case-studies?tab=categories");
    }
  }, [searchParams, router]);

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);

  async function load() {
    const [casesData, categoriesData] = await Promise.all([
      api("/api/case-studies/manage/all"),
      api("/api/categories/manage/all"),
    ]);
    setItems(casesData.caseStudies || []);
    setCategories(categoriesData.categories || []);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, []);

  function setPanel(id) {
    router.replace(`/admin/case-studies?tab=${id}`);
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

  function onSectionChange(index, field, value) {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  }

  function addSection() {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, { title: "", body: "" }],
      sections_ar: [...prev.sections_ar, { title: "", body: "" }],
    }));
  }

  function removeSection(index) {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
      sections_ar: prev.sections_ar.filter((_, i) => i !== index),
    }));
  }

  function onSectionArChange(index, field, value) {
    setForm((prev) => ({
      ...prev,
      sections_ar: prev.sections_ar.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  }

  function resetCaseForm() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      sections: defaultSections.map((section) => ({ ...section })),
      sections_ar: emptyForm.sections_ar.map((section) => ({ ...section })),
    });
  }

  function startEdit(item) {
    const sections =
      item.sections?.length > 0
        ? item.sections.map((section) => ({
            title: section.title || "",
            body: section.body || "",
          }))
        : [
            { title: "The challenge", body: item.challenge || "" },
            { title: "What BizGate did", body: item.whatWeDid || "" },
            { title: "Outcome / results", body: item.outcome || "" },
          ];

    const sections_ar =
      item.sections_ar?.length > 0
        ? item.sections_ar.map((section) => ({
            title: section.title || "",
            body: section.body || "",
          }))
        : [
            { title: "التحدي", body: item.challenge_ar || "" },
            { title: "منهجية العمل", body: item.whatWeDid_ar || "" },
            { title: "الأثر", body: item.outcome_ar || "" },
          ];

    setEditingId(item._id);
    setForm({
      title: item.title || "",
      title_ar: item.title_ar || "",
      category: item.category || "",
      clientName: item.clientName || "",
      isAnonymous: !!item.isAnonymous,
      sections,
      sections_ar,
      coverImage: item.coverImage || "",
      gallery: item.gallery || [],
      videos: item.videos || [],
      icons: item.icons || [],
      order: item.order || 0,
      isActive: item.isActive !== false,
    });
    setPanel("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCategorySubmit(event) {
    event.preventDefault();
    const name = categoryName.trim();
    if (!name) {
      flash(false, "Category name is required.");
      return;
    }

    setSavingCategory(true);
    try {
      if (editingCategoryId) {
        await api(`/api/categories/${editingCategoryId}`, {
          method: "PUT",
          body: JSON.stringify({ name, slug: slugify(name) }),
        });
        flash(true, "Category updated");
      } else {
        await api("/api/categories", {
          method: "POST",
          body: JSON.stringify({ name, slug: slugify(name) }),
        });
        flash(true, "Category added");
      }
      setCategoryName("");
      setEditingCategoryId(null);
      await load();
    } catch (err) {
      flash(false, err.message || "Could not save category");
    } finally {
      setSavingCategory(false);
    }
  }

  function startEditCategory(category) {
    setEditingCategoryId(category._id);
    setCategoryName(category.name);
  }

  async function removeCategory(id) {
    if (!confirm("Delete this category?")) return;
    try {
      await api(`/api/categories/${id}`, { method: "DELETE" });
      flash(true, "Category deleted");
      if (editingCategoryId === id) {
        setEditingCategoryId(null);
        setCategoryName("");
      }
      await load();
    } catch (err) {
      flash(false, err.message || "Could not delete category");
    }
  }

  async function handleUpload(event, field) {
    const files = event.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      const data = await uploadFiles(files);
      const urls = (data.files || []).map((f) => f.url);
      setForm((prev) => {
        if (field === "coverImage") {
          return { ...prev, coverImage: urls[0] || prev.coverImage };
        }
        return { ...prev, [field]: [...(prev[field] || []), ...urls] };
      });
      flash(true, "File uploaded");
    } catch (err) {
      flash(false, err.message || "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function removeMedia(field, url) {
    if (field === "coverImage") {
      setForm((prev) => ({ ...prev, coverImage: "" }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((item) => item !== url),
    }));
  }

  async function handleCaseSubmit(event) {
    event.preventDefault();
    setSaving(true);

    const sections = (form.sections || [])
      .map((section) => ({
        title: section.title.trim(),
        body: section.body.trim(),
      }));
      
    const sections_ar = (form.sections_ar || [])
      .map((section) => ({
        title: section.title.trim(),
        body: section.body.trim(),
      }));

    if (!form.category) {
      flash(false, "Please select a category.");
      setSaving(false);
      return;
    }

    if (!sections.length) {
      flash(false, "Add at least one description section.");
      setSaving(false);
      return;
    }

    const selected = categories.find((c) => c.name === form.category);
    const payload = {
      ...form,
      category: form.category,
      categorySlug: selected?.slug || slugify(form.category),
      sections,
      sections_ar,
      order: Number(form.order || 0),
    };

    try {
      if (editingId) {
        await api(`/api/case-studies/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        flash(true, "Case study updated");
      } else {
        await api("/api/case-studies", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        flash(true, "Case study created");
      }
      resetCaseForm();
      await load();
      setPanel("manage");
    } catch (err) {
      flash(false, err.message || "Could not save case study");
    } finally {
      setSaving(false);
    }
  }

  async function removeCase(id) {
    if (!confirm("Delete this case study?")) return;
    try {
      await api(`/api/case-studies/${id}`, { method: "DELETE" });
      flash(true, "Case study deleted");
      if (editingId === id) resetCaseForm();
      await load();
    } catch (err) {
      flash(false, err.message);
    }
  }

  const panelMeta =
    openPanel === "add" && editingId
      ? { title: "Edit case study", subtitle: PANEL_TITLES.add.subtitle }
      : PANEL_TITLES[openPanel] || PANEL_TITLES.categories;

  return (
    <AdminGuard>
      <AdminShell title="Case Studies" activeCaseTab={openPanel}>
        {message ? <div className="admin-alert admin-alert-success">{message}</div> : null}
        {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}

        <div className="admin-panel admin-tab-panel">
          <div className="admin-panel-header">
            <div>
              <h2>{panelMeta.title}</h2>
              <p className="admin-panel-sub">{panelMeta.subtitle}</p>
            </div>
          </div>
          <div className="admin-panel-body">
            {openPanel === "categories" ? (
              <>
                <form className="admin-inline-form" onSubmit={handleCategorySubmit}>
                  <div className="admin-form-group" style={{ marginBottom: 0, flex: 1 }}>
                    <label>{editingCategoryId ? "Edit category" : "Add category"}</label>
                    <input
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="e.g. Sales, Marketing, Digital"
                      required
                    />
                  </div>
                  <div className="admin-inline-actions">
                    <button
                      className="admin-btn admin-btn-primary"
                      type="submit"
                      disabled={savingCategory}
                    >
                      {savingCategory
                        ? "Saving..."
                        : editingCategoryId
                          ? "Update category"
                          : "Add category"}
                    </button>
                    {editingCategoryId ? (
                      <button
                        type="button"
                        className="admin-btn admin-btn-ghost"
                        onClick={() => {
                          setEditingCategoryId(null);
                          setCategoryName("");
                        }}
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </form>

                <div className="admin-soft-list">
                  <h3>Your categories</h3>
                  {!categories.length ? (
                    <p className="admin-empty-inline">No categories yet. Add one above.</p>
                  ) : (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Slug</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <tr key={category._id}>
                            <td>
                              <strong>{category.name}</strong>
                            </td>
                            <td>
                              <code>/case-studies/{category.slug}</code>
                            </td>
                            <td>
                              <div className="admin-actions">
                                <button
                                  type="button"
                                  className="admin-btn admin-btn-ghost"
                                  onClick={() => startEditCategory(category)}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="admin-btn admin-btn-danger"
                                  onClick={() => removeCategory(category._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
            ) : null}

            {openPanel === "manage" ? (
              !items.length ? (
                <div className="admin-empty">
                  No case studies yet. Use Create case study in the sidebar.
                </div>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Case</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <strong>{item.title}</strong>
                            <br />
                            <span style={{ color: "var(--brand-muted)" }}>
                              {item.isAnonymous ? "Anonymous" : item.clientName || "—"}
                            </span>
                            <br />
                            <a
                              href={caseStudyHref(item)}
                              target="_blank"
                              rel="noreferrer"
                              style={{ fontSize: 12, color: "var(--brand-blue)" }}
                            >
                              Open page
                            </a>
                          </td>
                          <td>{item.category || "—"}</td>
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
                                onClick={() => removeCase(item._id)}
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
              !categories.length ? (
                <div className="admin-empty">
                  Add at least one category first, then create a case study.
                </div>
              ) : (
                <form onSubmit={handleCaseSubmit} className="admin-case-form">
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Title (English) *</label>
                      <input name="title" value={form.title} onChange={onChange} required />
                    </div>
                    <div className="admin-form-group">
                      <label>Title (Arabic)</label>
                      <input name="title_ar" value={form.title_ar} onChange={onChange} dir="rtl" />
                    </div>
                  </div>
                  
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Category *</label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={onChange}
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Client name</label>
                      <input
                        name="clientName"
                        value={form.clientName}
                        onChange={onChange}
                        placeholder="Or leave blank if anonymous"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Order</label>
                      <input
                        type="number"
                        name="order"
                        value={form.order}
                        onChange={onChange}
                      />
                    </div>
                  </div>

                  <label className="admin-check">
                    <input
                      type="checkbox"
                      name="isAnonymous"
                      checked={form.isAnonymous}
                      onChange={onChange}
                    />
                    Keep client anonymous
                  </label>

                  <div className="admin-sections">
                    <div className="admin-sections-header">
                      <div>
                        <h3>Description sections *</h3>
                        <p>Add as many story sections as you need.</p>
                      </div>
                      <button
                        type="button"
                        className="admin-btn admin-btn-ghost"
                        onClick={addSection}
                      >
                        + Add section
                      </button>
                    </div>

                    {form.sections.map((section, index) => (
                      <div key={index} className="admin-section-card">
                        <div className="admin-section-card-top">
                          <strong>Section {index + 1}</strong>
                          {form.sections.length > 1 ? (
                            <button
                              type="button"
                              className="admin-btn admin-btn-danger"
                              onClick={() => removeSection(index)}
                            >
                              Remove
                            </button>
                          ) : null}
                        </div>
                        <div className="admin-form-row">
                          <div className="admin-form-group">
                            <label>Section title (English)</label>
                            <input
                              value={section.title}
                              onChange={(e) => onSectionChange(index, "title", e.target.value)}
                              required
                            />
                          </div>
                          <div className="admin-form-group">
                            <label>Section title (Arabic)</label>
                            <input
                              value={form.sections_ar?.[index]?.title || ""}
                              onChange={(e) => onSectionArChange(index, "title", e.target.value)}
                              dir="rtl"
                            />
                          </div>
                        </div>
                        <div className="admin-form-row" style={{ marginBottom: 0 }}>
                          <div className="admin-form-group">
                            <label>Section body (English)</label>
                            <textarea
                              rows={5}
                              value={section.body}
                              onChange={(e) => onSectionChange(index, "body", e.target.value)}
                              required
                            />
                          </div>
                          <div className="admin-form-group">
                            <label>Section body (Arabic)</label>
                            <textarea
                              rows={5}
                              value={form.sections_ar?.[index]?.body || ""}
                              onChange={(e) => onSectionArChange(index, "body", e.target.value)}
                              dir="rtl"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Cover image</label>
                      <input
                        type="file"
                        accept="image/*,.svg"
                        onChange={(e) => handleUpload(e, "coverImage")}
                        disabled={uploading}
                      />
                      {form.coverImage ? (
                        <div className="mt-3 flex items-center gap-3">
                          <div className="relative h-16 w-24 overflow-hidden border border-[var(--brand-line)]">
                            <Image src={mediaUrl(form.coverImage)} alt="" fill className="object-cover" />
                          </div>
                          <button
                            type="button"
                            className="admin-btn admin-btn-danger"
                            onClick={() => removeMedia("coverImage")}
                          >
                            Remove
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <div className="admin-form-group">
                      <label>Gallery</label>
                      <input
                        type="file"
                        accept="image/*,.pdf,.svg"
                        multiple
                        onChange={(e) => handleUpload(e, "gallery")}
                        disabled={uploading}
                      />
                      <div className="mt-3 flex flex-wrap gap-2">
                        {form.gallery.map((src) => (
                          <div key={src} className="relative">
                            <div className="relative h-14 w-20 overflow-hidden border border-[var(--brand-line)]">
                              <Image src={mediaUrl(src)} alt="" fill className="object-cover" />
                            </div>
                            <button
                              type="button"
                              className="admin-btn admin-btn-danger"
                              style={{ marginTop: 6, padding: "4px 10px", fontSize: 12 }}
                              onClick={() => removeMedia("gallery", src)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Videos</label>
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={(e) => handleUpload(e, "videos")}
                        disabled={uploading}
                      />
                      <div className="mt-2 space-y-2">
                        {form.videos.map((src) => (
                          <div key={src} className="admin-actions">
                            <code style={{ fontSize: 12 }}>{src}</code>
                            <button
                              type="button"
                              className="admin-btn admin-btn-danger"
                              onClick={() => removeMedia("videos", src)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label>Icons</label>
                      <input
                        type="file"
                        accept="image/*,.svg"
                        multiple
                        onChange={(e) => handleUpload(e, "icons")}
                        disabled={uploading}
                      />
                      <div className="mt-3 flex flex-wrap gap-2">
                        {form.icons.map((src) => (
                          <div
                            key={src}
                            className="relative h-12 w-12 overflow-hidden border border-[var(--brand-line)] bg-white p-1"
                          >
                            <Image src={mediaUrl(src)} alt="" fill className="object-contain" />
                            <button
                              type="button"
                              className="admin-btn admin-btn-danger"
                              style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                padding: "2px 6px",
                                fontSize: 10,
                              }}
                              onClick={() => removeMedia("icons", src)}
                            >
                              x
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <label className="admin-check">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={form.isActive}
                      onChange={onChange}
                    />
                    Active on website
                  </label>

                  <div className="admin-inline-actions" style={{ marginTop: "0.5rem" }}>
                    <button
                      className="admin-btn admin-btn-primary"
                      type="submit"
                      disabled={saving || uploading}
                    >
                      {saving
                        ? "Saving..."
                        : editingId
                          ? "Update case study"
                          : "Create case study"}
                    </button>
                    {editingId ? (
                      <button
                        type="button"
                        className="admin-btn admin-btn-ghost"
                        onClick={resetCaseForm}
                      >
                        Cancel edit
                      </button>
                    ) : null}
                  </div>
                </form>
              )
            ) : null}
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
