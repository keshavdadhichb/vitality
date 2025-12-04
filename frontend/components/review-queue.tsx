"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardList, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

export function ReviewQueue() {
  const queue = [
    { id: "DOC-2024-006", type: "Invoice", confidence: 78, issue: "Name spelling uncertain", status: "pending" },
    { id: "DOC-2024-007", type: "Bank Statement", confidence: 82, issue: "Account number format", status: "pending" },
    { id: "DOC-2024-008", type: "ID Card", confidence: 76, issue: "Low image quality", status: "pending" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Manual Review Queue</h2>
        <p className="text-slate-600">Documents requiring human verification</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white border-purple-100 shadow-sm text-center">
          <ClipboardList className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-slate-900 mb-1">3</p>
          <p className="text-sm text-slate-600">Pending Review</p>
        </Card>
        <Card className="p-6 bg-white border-emerald-100 shadow-sm text-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-slate-900 mb-1">127</p>
          <p className="text-sm text-slate-600">Approved Today</p>
        </Card>
        <Card className="p-6 bg-white border-red-100 shadow-sm text-center">
          <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-slate-900 mb-1">8</p>
          <p className="text-sm text-slate-600">Rejected Today</p>
        </Card>
        <Card className="p-6 bg-white border-amber-100 shadow-sm text-center">
          <AlertTriangle className="h-8 w-8 text-amber-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-slate-900 mb-1">2</p>
          <p className="text-sm text-slate-600">Escalated</p>
        </Card>
      </div>

      <div className="space-y-4">
        {queue.map((item) => (
          <Card key={item.id} className="p-6 bg-white border-purple-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-lg font-semibold text-purple-700">{item.id}</span>
                  <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full">
                    {item.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>Confidence: {item.confidence}%</span>
                  <span>•</span>
                  <span>Issue: {item.issue}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="gap-2 text-emerald-600 border-emerald-200 hover:bg-emerald-50 bg-transparent"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve
                </Button>
                <Button variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 text-amber-600 border-amber-200 hover:bg-amber-50 bg-transparent"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Escalate
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <p className="text-sm font-medium text-slate-700 mb-2">AI Extraction</p>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-slate-500">Name:</span>{" "}
                    <span className="font-medium text-slate-900">John Deo</span>{" "}
                    <span className="text-amber-600">(uncertain)</span>
                  </p>
                  <p>
                    <span className="text-slate-500">Account:</span>{" "}
                    <span className="font-medium text-slate-900">****6789</span>
                  </p>
                  <p>
                    <span className="text-slate-500">Amount:</span>{" "}
                    <span className="font-medium text-slate-900">$1,234.56</span>
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <p className="text-sm font-medium text-slate-700 mb-2">Correction Interface</p>
                <div className="space-y-2">
                  <input
                    type="text"
                    defaultValue="John Deo"
                    className="w-full px-3 py-2 rounded border border-purple-300 text-sm"
                    placeholder="Correct name..."
                  />
                  <p className="text-xs text-slate-500">Type to correct the AI's output</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
