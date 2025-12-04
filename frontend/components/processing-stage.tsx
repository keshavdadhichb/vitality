"use client"

import type React from "react"
import { Upload, Lock, Zap, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useRef } from "react"

interface ProcessingStageProps {
  state: "IDLE" | "UPLOADING" | "ANALYZING" | "COMPLETE"
  progress: number
  logs: string[]
  onUpload: (file: File) => void
}

export function ProcessingStage({ state, progress, logs, onUpload }: ProcessingStageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  if (state === "IDLE") {
    return (
      <div className="space-y-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
              <Lock className="h-4 w-4" />
              Zero-knowledge architecture
            </div>
            <h1 className="text-7xl font-bold leading-[1.1] tracking-tight text-gray-900">
              Financial docs.
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Processed safely.
              </span>
            </h1>
            <p className="text-xl leading-relaxed text-gray-600">
              Extract insights from sensitive documents without compromising privacy. Every operation happens locally —
              no data ever leaves your browser.
            </p>
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-purple-600">256-bit</div>
                <div className="text-sm text-gray-600">Encryption standard</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-purple-600">100%</div>
                <div className="text-sm text-gray-600">Client-side processing</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-purple-600">0ms</div>
                <div className="text-sm text-gray-600">Server latency</div>
              </div>
            </div>
          </div>

          <div
            className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed border-purple-200 bg-gradient-to-br from-white to-purple-50/50 p-12 shadow-2xl shadow-purple-100/50 transition-all hover:border-purple-400 hover:shadow-purple-200/70"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="relative z-10 space-y-8 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl shadow-purple-500/40 transition-transform group-hover:scale-110">
                <Upload className="h-12 w-12 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">Drop your document</h3>
                <p className="text-gray-600">PDF, TIFF, TXT, DOCX up to 50MB</p>
              </div>
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
                className="rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-8 py-6 text-lg font-semibold text-white shadow-lg shadow-purple-500/30 hover:from-purple-700 hover:to-purple-600"
              >
                Browse files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.tiff,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 blur-3xl" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="group space-y-4 rounded-2xl border border-purple-100 bg-white p-8 shadow-lg transition-all hover:border-purple-200 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 transition-colors group-hover:bg-purple-200">
              <Shield className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Bank-grade security</h3>
            <p className="leading-relaxed text-gray-600">
              AES-256 encryption with homomorphic computation ensures data remains encrypted even during analysis.
            </p>
          </div>
          <div className="group space-y-4 rounded-2xl border border-purple-100 bg-white p-8 shadow-lg transition-all hover:border-purple-200 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 transition-colors group-hover:bg-purple-200">
              <Zap className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Instant processing</h3>
            <p className="leading-relaxed text-gray-600">
              Real-time PII detection and extraction powered by advanced on-device machine learning models.
            </p>
          </div>
          <div className="group space-y-4 rounded-2xl border border-purple-100 bg-white p-8 shadow-lg transition-all hover:border-purple-200 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 transition-colors group-hover:bg-purple-200">
              <Lock className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Full compliance</h3>
            <p className="leading-relaxed text-gray-600">
              GDPR, CCPA, and HIPAA compliant with complete audit trails and cryptographic verification.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-4xl font-bold text-gray-900">Processing your document</h2>
        <p className="text-lg text-gray-600">Analyzing and redacting sensitive information in real-time</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 rounded-3xl border border-purple-100 bg-white p-8 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Document preview</h3>
            <div className="flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-600" />
              Processing
            </div>
          </div>

          <div className="space-y-3">
            {state === "UPLOADING" ? (
              <>
                <div className="h-4 animate-pulse rounded-lg bg-purple-100" />
                <div className="h-4 w-3/4 animate-pulse rounded-lg bg-purple-100" />
                <div className="h-4 w-5/6 animate-pulse rounded-lg bg-purple-100" />
                <div className="h-4 animate-pulse rounded-lg bg-purple-100" />
                <div className="h-4 w-2/3 animate-pulse rounded-lg bg-purple-100" />
              </>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
                  <p className="font-medium text-gray-700">Analyzing document structure...</p>
                </div>
              </div>
            )}
          </div>

          {state === "UPLOADING" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">Uploading</span>
                <span className="font-bold text-purple-600">{progress}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-purple-100">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-gray-800 px-6 py-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <span className="font-mono text-sm font-medium text-gray-400">terminal</span>
          </div>
          <div className="flex-1 space-y-1.5 overflow-auto p-6 font-mono text-sm">
            <AnimatePresence>
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "leading-relaxed",
                    (log && log.includes("ERROR")) || (log && log.includes("CRITICAL"))
                      ? "text-red-400"
                      : (log && log.includes("DETECTED")) || (log && log.includes("SUCCESS"))
                        ? "text-emerald-400"
                        : log && log.includes("WARNING")
                          ? "text-yellow-400"
                          : "text-gray-300",
                  )}
                >
                  <span className="text-gray-600">$ </span>
                  {log || ""}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
