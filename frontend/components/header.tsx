"use client"

import { Shield } from "lucide-react"

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs = [
    { id: "processor", label: "Document Processor" },
    { id: "federated", label: "Federated Learning" },
    { id: "compliance", label: "Compliance Ledger" },
    { id: "developer", label: "API Portal" },
    { id: "admin", label: "Admin Panel" },
    { id: "review", label: "Review Queue" },
    { id: "analytics", label: "Analytics" },
  ]

  return (
    <header className="relative">
      {/* Top bar with logo and badge */}
      <div className="relative z-10 px-8 py-6">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-slate-900">Citadel</span>
          </div>

          {/* Pill navigation - centered like awsmd.com */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-1 rounded-full bg-white px-2 py-2 shadow-lg shadow-purple-500/10 border border-purple-100">
              {tabs.slice(0, 4).map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                      isActive ? "bg-purple-600 text-white shadow-md" : "text-slate-600 hover:text-purple-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Security badge */}
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-50 to-emerald-100 px-5 py-2.5 text-sm font-medium text-emerald-700 border border-emerald-200">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Enterprise Grade Security
          </div>
        </div>
      </div>

      {/* Secondary navigation - below header */}
      {tabs.slice(4).some((tab) => tab.id === activeTab) && (
        <div className="border-t border-purple-100 bg-white/50 px-8 py-3 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1400px] items-center gap-2">
            {tabs.slice(4).map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    isActive ? "bg-purple-100 text-purple-700" : "text-slate-600 hover:bg-purple-50"
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
