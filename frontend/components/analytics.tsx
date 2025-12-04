"use client"

import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, DollarSign, FileText } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export function Analytics() {
  const throughputData = [
    { time: "00:00", pages: 245 },
    { time: "04:00", pages: 189 },
    { time: "08:00", pages: 432 },
    { time: "12:00", pages: 678 },
    { time: "16:00", pages: 523 },
    { time: "20:00", pages: 312 },
  ]

  const documentTypes = [
    { name: "Invoices", value: 50, color: "#8b5cf6" },
    { name: "IDs", value: 30, color: "#06b6d4" },
    { name: "Bank Statements", value: 20, color: "#10b981" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Executive Analytics</h2>
        <p className="text-slate-600">Performance insights and business metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white border-purple-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-8 w-8 text-purple-600" />
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">2,379</p>
          <p className="text-sm text-slate-600">Pages Processed Today</p>
          <p className="text-xs text-emerald-600 mt-1">+23% from yesterday</p>
        </Card>

        <Card className="p-6 bg-white border-blue-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">$47,580</p>
          <p className="text-sm text-slate-600">Cost Savings This Month</p>
          <p className="text-xs text-slate-500 mt-1">vs. manual processing</p>
        </Card>

        <Card className="p-6 bg-white border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <FileText className="h-8 w-8 text-emerald-600" />
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">98.5%</p>
          <p className="text-sm text-slate-600">Accuracy Rate</p>
          <p className="text-xs text-emerald-600 mt-1">+1.2% improvement</p>
        </Card>

        <Card className="p-6 bg-white border-amber-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-8 w-8 text-amber-600" />
            <span className="text-xs font-medium text-slate-600">Avg</span>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">3.2s</p>
          <p className="text-sm text-slate-600">Processing Time</p>
          <p className="text-xs text-slate-500 mt-1">per page</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border-purple-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Throughput Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={throughputData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="pages" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-white border-purple-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Document Classification</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={documentTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {documentTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 bg-white border-purple-100 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Geographic Heatmap - Request Volume by Location</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { location: "Mumbai", requests: 4523, growth: "+12%" },
            { location: "London", requests: 3891, growth: "+8%" },
            { location: "New York", requests: 5234, growth: "+15%" },
            { location: "Singapore", requests: 3456, growth: "+10%" },
            { location: "Frankfurt", requests: 2987, growth: "+5%" },
            { location: "Sydney", requests: 2134, growth: "+7%" },
            { location: "Tokyo", requests: 3765, growth: "+11%" },
            { location: "Toronto", requests: 2543, growth: "+6%" },
          ].map((loc, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-transparent border border-purple-100"
            >
              <p className="font-semibold text-slate-900 mb-1">{loc.location}</p>
              <p className="text-2xl font-bold text-purple-700">{loc.requests.toLocaleString()}</p>
              <p className="text-xs text-emerald-600 mt-1">{loc.growth}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
