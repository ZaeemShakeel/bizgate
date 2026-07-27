const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const TOKEN_KEY = "bizgate_admin_token";
const ADMIN_KEY = "bizgate_admin_user";

export function getApiUrl() {
  return API_URL;
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredAdmin() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(ADMIN_KEY) || "null");
  } catch {
    return null;
  }
}

export function setSession(token, admin) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

export async function api(path, options = {}) {
  const token = getToken();
  const headers = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || "Request failed");
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function uploadFiles(files) {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append("files", file));
  return api("/api/case-studies/upload", {
    method: "POST",
    body: formData,
  });
}
