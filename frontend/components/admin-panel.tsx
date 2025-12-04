"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Save, Shield } from "lucide-react"

export function AdminPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Admin Configuration Panel</h2>
        <p className="text-slate-600">Configure system settings and security policies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border-purple-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-900">Sensitivity Controls</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Confidence Threshold: 85%</label>
              <Slider defaultValue={[85]} max={100} step={1} className="mb-2" />
              <p className="text-xs text-slate-500">Documents below this confidence trigger manual review</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">PII Detection Sensitivity: High</label>
              <Slider defaultValue={[80]} max={100} step={1} className="mb-2" />
              <p className="text-xs text-slate-500">
                Higher values catch more potential PII but may flag false positives
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Redaction Strength: Maximum</label>
              <Slider defaultValue={[100]} max={100} step={1} className="mb-2" />
              <p className="text-xs text-slate-500">Controls encryption strength of redacted fields</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-purple-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Redaction Rules Engine</h3>
          <div className="space-y-3">
            {[
              "Social Security Numbers",
              "Credit Card Numbers",
              "Bank Account Numbers",
              "Email Addresses",
              "Phone Numbers",
              "Physical Addresses",
              "Driver's License Numbers",
              "Dates of Birth",
              "Medical Record Numbers",
              "IP Addresses",
            ].map((rule) => (
              <label
                key={rule}
                className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-transparent border border-purple-100 cursor-pointer hover:border-purple-200 transition-colors"
              >
                <span className="text-sm font-medium text-slate-700">{rule}</span>
                <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-purple-300 text-purple-600" />
              </label>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white border-purple-100 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Data Retention Policy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Original Documents</label>
            <Input type="number" defaultValue={24} className="mb-1" />
            <p className="text-xs text-slate-500">Hours until auto-deletion</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Processing Logs</label>
            <Input type="number" defaultValue={90} className="mb-1" />
            <p className="text-xs text-slate-500">Days to retain logs</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Audit Trail</label>
            <Input type="number" defaultValue={365} className="mb-1" />
            <p className="text-xs text-slate-500">Days for compliance records</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white border-purple-100 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">User Role Management</h3>
        <div className="space-y-2">
          {[
            { name: "admin@bank.com", role: "Admin", lastActive: "5 mins ago" },
            { name: "auditor@bank.com", role: "Auditor", lastActive: "1 hour ago" },
            { name: "analyst@bank.com", role: "Editor", lastActive: "2 hours ago" },
            { name: "viewer@bank.com", role: "Viewer", lastActive: "1 day ago" },
          ].map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-transparent border border-purple-100"
            >
              <div className="flex-1">
                <p className="font-medium text-slate-900">{user.name}</p>
                <p className="text-sm text-slate-500">Last active: {user.lastActive}</p>
              </div>
              <div className="flex items-center gap-3">
                <select className="px-3 py-2 rounded-lg border border-purple-200 text-sm font-medium text-slate-700 bg-white">
                  <option>{user.role}</option>
                  <option>Admin</option>
                  <option>Auditor</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
                <Button variant="ghost" size="sm" className="text-red-600">
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button className="gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <Save className="h-4 w-4" />
          Save All Changes
        </Button>
      </div>
    </div>
  )
}
