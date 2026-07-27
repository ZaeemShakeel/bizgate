"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api, getToken, setSession } from "../../../lib/adminApi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) {
      router.replace("/admin");
    }
  }, [router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setSession(data.token, data.admin);
      router.replace("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg" aria-hidden="true">
        <Image
          src="/hero-growth.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="admin-login-overlay" />
        <div className="admin-login-glow" />
      </div>

      <div className="admin-login-shell">
        <motion.aside
          className="admin-login-aside"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/" className="admin-login-home">
            ← Back to website
          </Link>
          <p className="admin-login-eyebrow">Admin Portal</p>
          <h1 className="admin-login-headline">
            Secure access to your BizGate admin panel
          </h1>
          <p className="admin-login-lead">
            Sign in to manage case studies, categories, and website content
            with confidence.
          </p>
        </motion.aside>

        <motion.div
          className="admin-login-card"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="admin-login-brand">
            <Image
              src="/logo-transparent.png"
              alt="BizGate"
              width={168}
              height={46}
              priority
            />
            <h2>Welcome back</h2>
            <p>Secure access to your BizGate admin panel</p>
          </div>

          {error ? <div className="admin-alert admin-alert-error">{error}</div> : null}

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="password">Password</label>
              <div className="admin-login-password">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="admin-login-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              className="admin-btn admin-btn-primary admin-btn-block admin-login-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in to Admin"}
            </button>
          </form>

          <p className="admin-login-footnote">
            Protected area · Authorized BizGate team only
          </p>
        </motion.div>
      </div>
    </div>
  );
}
