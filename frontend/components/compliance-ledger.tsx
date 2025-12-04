"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, AlertTriangle, CheckCircle2 } from "lucide-react"

export function ComplianceLedger() {
  const [searchTerm, setSearchTerm] = useState("")

  const accessLogs = [
    {
      id: "DOC-2024-001",
      user: "admin@bank.com",
      action: "Document Upload",
      timestamp: "2024-01-15 14:23:15",
      status: "success",
    },
    {
      id: "DOC-2024-002",
      user: "auditor@bank.com",
      action: "Redaction Complete",
      timestamp: "2024-01-15 14:24:42",
      status: "success",
    },
    {
      id: "DOC-2024-003",
      user: "analyst@bank.com",
      action: "Data Extraction",
      timestamp: "2024-01-15 14:25:18",
      status: "success",
    },
    {
      id: "DOC-2024-004",
      user: "admin@bank.com",
      action: "Break Glass Access",
      timestamp: "2024-01-15 14:26:05",
      status: "alert",
    },
    {
      id: "DOC-2024-005",
      user: "system",
      action: "Auto-Deletion",
      timestamp: "2024-01-15 14:27:30",
      status: "success",
    },
  ]

  const chainOfCustody = [
    { stage: "Upload", timestamp: "2024-01-15 14:23:15", user: "admin@bank.com", status: "complete" },
    { stage: "PII Detection", timestamp: "2024-01-15 14:23:18", user: "system", status: "complete" },
    { stage: "Redaction", timestamp: "2024-01-15 14:24:42", user: "system", status: "complete" },
    { stage: "Extraction", timestamp: "2024-01-15 14:25:18", user: "system", status: "complete" },
    { stage: "Scheduled Deletion", timestamp: "2024-01-16 14:23:15", user: "system", status: "pending" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Global Compliance Ledger</h2>
        <p className="text-slate-600">Complete audit trail of all platform activities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-white border-purple-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Searchable Access Log</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by Document ID, User ID, or Date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            {accessLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-transparent border border-purple-100"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-sm font-medium text-purple-700">{log.id}</span>
                    <span className="text-sm text-slate-600">{log.action}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>{log.user}</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
                <div>
                  {log.status === "success" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white border-purple-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Violation Alerts</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-amber-900 text-sm mb-1">Break Glass Event</p>
                  <p className="text-xs text-amber-700 mb-2">Admin viewed unmasked PII</p>
                  <div className="text-xs text-amber-600">
                    <p>User: admin@bank.com</p>
                    <p>Doc: DOC-2024-004</p>
                    <p>Time: 14:26:05</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-emerald-900">No other violations</p>
              <p className="text-xs text-emerald-600">Last 30 days</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white border-purple-100 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Chain of Custody - DOC-2024-001</h3>
        <div className="relative">
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-purple-200" />
          <div className="space-y-6">
            {chainOfCustody.map((item, index) => (
              <div key={index} className="flex items-start gap-4 relative">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-4 border-white ${
                    item.status === "complete" ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  {item.status === "complete" ? (
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  ) : (
                    <div className="h-3 w-3 rounded-full bg-white" />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-slate-900">{item.stage}</h4>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.status === "complete" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p>{item.timestamp}</p>
                    <p>{item.user}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
