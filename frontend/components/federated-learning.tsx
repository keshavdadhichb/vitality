"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Network, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FederatedLearning() {
  const [logs, setLogs] = useState<string[]>([])

  const nodes = [
    { id: 1, name: "Node Mumbai", status: "online", lastSync: "2 mins ago", version: "v1.4" },
    { id: 2, name: "Node London", status: "online", lastSync: "5 mins ago", version: "v1.4" },
    { id: 3, name: "Node New York", status: "offline", lastSync: "2 hours ago", version: "v1.3" },
    { id: 4, name: "Node Singapore", status: "online", lastSync: "1 min ago", version: "v1.4" },
    { id: 5, name: "Node Frankfurt", status: "online", lastSync: "3 mins ago", version: "v1.4" },
  ]

  const models = [
    { version: "v1.4", date: "2024-01-15 14:23", accuracy: "98.5%", current: true },
    { version: "v1.3", date: "2024-01-14 09:15", accuracy: "97.8%", current: false },
    { version: "v1.2", date: "2024-01-13 16:42", accuracy: "97.1%", current: false },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = [
        "Received gradients from Node Mumbai",
        "Aggregating model weights from Node London",
        "Updated Global Model to v1.4",
        "Received gradients from Node Singapore",
        "Privacy budget check: ε = 2.4/10.0",
      ][Math.floor(Math.random() * 5)]

      setLogs((prev) => [...prev.slice(-9), `[${new Date().toLocaleTimeString()}] ${newLog}`])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Federated Learning Node Status</h2>
        <p className="text-slate-600">Monitor distributed model training across branch servers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-white border-purple-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Active Node List</h3>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
          <div className="space-y-3">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-transparent border border-purple-100"
              >
                <div className="flex items-center gap-3">
                  <Network className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-slate-900">{node.name}</p>
                    <p className="text-sm text-slate-500">Model {node.version}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Last Sync</p>
                    <p className="text-sm font-medium text-slate-700">{node.lastSync}</p>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      node.status === "online" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${node.status === "online" ? "bg-emerald-500" : "bg-slate-400"}`}
                    />
                    {node.status === "online" ? "Online" : "Offline"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white border-purple-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Privacy Metrics</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <p className="text-sm text-emerald-700 font-medium mb-1">Differential Privacy</p>
              <p className="text-2xl font-bold text-emerald-900">ε = 2.4/10.0</p>
              <p className="text-xs text-emerald-600 mt-1">Budget remaining: 76%</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-sm text-purple-700 font-medium mb-1">Model Accuracy</p>
              <p className="text-2xl font-bold text-purple-900">98.5%</p>
              <p className="text-xs text-purple-600 mt-1">Current global model</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-700 font-medium mb-1">Active Nodes</p>
              <p className="text-2xl font-bold text-blue-900">4/5</p>
              <p className="text-xs text-blue-600 mt-1">80% availability</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border-purple-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Model Aggregation Log</h3>
          <div className="h-64 overflow-y-auto rounded-lg bg-slate-900 p-4 font-mono text-sm">
            {logs.map((log, i) => (
              <div key={i} className="text-emerald-400 mb-1">
                {log}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white border-purple-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Version Control</h3>
          <div className="space-y-3">
            {models.map((model) => (
              <div
                key={model.version}
                className={`p-4 rounded-lg border ${
                  model.current ? "bg-purple-50 border-purple-200" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{model.version}</span>
                    {model.current && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-purple-200 text-purple-700 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-emerald-600">{model.accuracy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{model.date}</span>
                  {!model.current && (
                    <Button variant="ghost" size="sm" className="text-purple-600 h-8">
                      Rollback
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
