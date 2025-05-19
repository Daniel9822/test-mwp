"use client";

import { useEffect } from "react";
import Sidebar from "@/components/admin/dashboard/Sidebar";
import Navbar from "@/components/admin/dashboard/Navbar";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased dark";
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation Bar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
