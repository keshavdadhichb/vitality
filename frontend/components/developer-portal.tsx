"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Key, Play, Webhook } from "lucide-react"

export function DeveloperPortal() {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production Key", key: "sk_live_4f3g2h1j5k6l7m8n9o0p", created: "2024-01-10", requests: 8234 },
    { id: 2, name: "Development Key", key: "sk_test_9a8b7c6d5e4f3g2h1i0j", created: "2024-01-15", requests: 1523 },
  ])

  const [testInput, setTestInput] = useState("")
  const [testOutput, setTestOutput] = useState("")

  const runTest = () => {
    setTestOutput(
      JSON.stringify(
        {
          status: "success",
          document_id: "DOC-2024-001",
          redacted_fields: ["name", "ssn", "account_number"],
          extracted_data: {
            invoice_number: "INV-2024-001",
            amount: "$1,234.56",
            date: "2024-01-15",
          },
          confidence: 0.98,
        },
        null,
        2,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Developer API Portal</h2>
        <p className="text-slate-600">Integrate document intelligence into your applications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-white border-purple-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">API Key Management</h3>
            <Button className="gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <Key className="h-4 w-4" />
              Generate New Key
            </Button>
          </div>

          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-transparent border border-purple-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-slate-900">{key.name}</p>
                    <p className="text-sm text-slate-500">Created {key.created}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      Revoke
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 rounded bg-slate-900 text-emerald-400 font-mono text-sm">
                    {key.key}
                  </code>
                </div>
                <p className="text-sm text-slate-500 mt-2">{key.requests.toLocaleString()} requests this month</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white border-purple-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Usage Quotas</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-sm text-purple-700 font-medium mb-1">Daily Requests</p>
              <p className="text-2xl font-bold text-purple-900">850/1000</p>
              <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "85%" }} />
              </div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-700 font-medium mb-1">Monthly Volume</p>
              <p className="text-2xl font-bold text-blue-900">9,757</p>
              <p className="text-xs text-blue-600 mt-1">23 days remaining</p>
            </div>
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <p className="text-sm text-emerald-700 font-medium mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-emerald-900">99.8%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white border-purple-100 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Interactive API Sandbox</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Request (Base64 Document)</label>
            <Textarea
              placeholder="Paste your base64-encoded document here..."
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              className="h-64 font-mono text-sm"
            />
            <Button
              onClick={runTest}
              className="mt-4 w-full gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white"
            >
              <Play className="h-4 w-4" />
              Run Test
            </Button>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Response (JSON)</label>
            <div className="h-64 overflow-auto rounded-lg bg-slate-900 p-4">
              <pre className="text-emerald-400 font-mono text-sm">{testOutput}</pre>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white border-purple-100 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Webhook Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Callback URL</label>
            <div className="flex gap-2">
              <Input placeholder="https://your-api.com/webhook" className="flex-1" />
              <Button className="gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <Webhook className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
            <p className="text-sm text-purple-900 font-medium mb-2">Event Types</p>
            <div className="space-y-2">
              {["document.uploaded", "redaction.complete", "extraction.complete", "error.occurred"].map((event) => (
                <label key={event} className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" defaultChecked className="rounded border-purple-300" />
                  <code className="text-purple-700">{event}</code>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
