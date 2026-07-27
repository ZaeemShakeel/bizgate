"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, clearSession, getToken } from "../../lib/adminApi";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function check() {
      const token = getToken();
      if (!token) {
        router.replace("/admin/login");
        return;
      }

      try {
        await api("/api/auth/me");
        if (active) setReady(true);
      } catch {
        clearSession();
        router.replace("/admin/login");
      }
    }

    check();
    return () => {
      active = false;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-card">Checking admin session…</div>
      </div>
    );
  }

  return children;
}
