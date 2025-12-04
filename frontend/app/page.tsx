"use client"

import { useState } from "react"
import { DocumentProcessor } from "@/components/document-processor"
import { FederatedLearning } from "@/components/federated-learning"
import { ComplianceLedger } from "@/components/compliance-ledger"
import { DeveloperPortal } from "@/components/developer-portal"
import { AdminPanel } from "@/components/admin-panel"
import { ReviewQueue } from "@/components/review-queue"
import { Analytics } from "@/components/analytics"
import { Shield } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("processor")

  const navItems = [
    { id: "processor", label: "Process" },
    { id: "federated", label: "Learning" },
    { id: "compliance", label: "Ledger" },
    { id: "developer", label: "API" },
    { id: "admin", label: "Settings" },
    { id: "review", label: "Review" },
    { id: "analytics", label: "Insights" },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[20%] -top-[10%] h-[800px] w-[800px] rounded-full bg-gradient-to-br from-purple-100/60 via-purple-200/40 to-transparent blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-blue-100/50 via-purple-100/30 to-transparent blur-3xl" />
        <div className="absolute right-[10%] top-[40%] h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-pink-100/40 to-transparent blur-2xl" />
      </div>

      <nav className="relative z-10 border-b border-purple-100/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/20">
              <Shield className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">Citadel</h1>
              <p className="text-xs text-gray-500">Privacy-First Intelligence</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-gray-700">Secure</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {activeTab === "processor" && <DocumentProcessor />}
        {activeTab === "federated" && <FederatedLearning />}
        {activeTab === "compliance" && <ComplianceLedger />}
        {activeTab === "developer" && <DeveloperPortal />}
        {activeTab === "admin" && <AdminPanel />}
        {activeTab === "review" && <ReviewQueue />}
        {activeTab === "analytics" && <Analytics />}
      </main>
    </div>
  )
}
