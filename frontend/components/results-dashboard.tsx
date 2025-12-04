"use client"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Shield, FileText, Clock, RotateCcw, CheckCircle, Download, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UploadedFile {
  name: string
  size: number
  type: string
  content: string
  lastModified: number
}

interface ResultsDashboardProps {
  result: any
  uploadedFile: UploadedFile | null
  onReset: () => void
}

export function ResultsDashboard({ result, uploadedFile, onReset }: ResultsDashboardProps) {
  const { toast } = useToast()

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  const handleExport = () => {
    const exportData = {
      metadata: {
        fileName: uploadedFile?.name || "unknown",
        fileSize: uploadedFile?.size || 0,
        fileType: uploadedFile?.type || "unknown",
        processedAt: new Date().toISOString(),
        sessionId: "ses_a7f9x2k1",
        userId: "admin_2024",
      },
      extractedData: {
        type: "bank_statement",
        loan_amount: 50000,
        account_type: "savings",
        risk: "LOW",
        rating: "AA",
        confidence: 0.98,
        date: "2024-12-04",
      },
      redactedFields: [
        { field: "name", status: "REDACTED-AES256" },
        { field: "pan", status: "REDACTED-AES256" },
        { field: "address", status: "REDACTED-AES256" },
      ],
      auditTrail: {
        originalHash: "a7f9d2c8e1b4...c3a5f8",
        redactedHash: "b8e3c4d9f2a5...d4b6g9",
        steps: [
          { step: "Document uploaded", status: "complete" },
          { step: "PII detected", status: "complete" },
          { step: "Data extracted", status: "complete" },
          { step: "Audit created", status: "complete" },
        ],
      },
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `citadel-report-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Report exported",
      description: "Processing report downloaded successfully",
    })
  }

  const handleShare = async () => {
    const shareData = {
      title: "Citadel Processing Report",
      text: `Document processed: ${uploadedFile?.name || "Unknown"} - Risk: LOW, Confidence: 98%`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        toast({
          title: "Shared successfully",
          description: "Report shared via system dialog",
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
        toast({
          title: "Link copied",
          description: "Report details copied to clipboard",
        })
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        toast({
          title: "Share failed",
          description: "Unable to share report",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-xl shadow-emerald-500/30">
              <CheckCircle className="h-8 w-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-5xl font-bold text-gray-900">All done</h2>
              <p className="text-lg text-gray-600">
                {uploadedFile ? `${uploadedFile.name} processed` : "Document processed successfully"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleExport}
            className="rounded-full border-2 border-purple-200 bg-white px-6 py-6 text-purple-700 shadow-sm hover:bg-purple-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={handleShare}
            className="rounded-full border-2 border-purple-200 bg-white px-6 py-6 text-purple-700 shadow-sm hover:bg-purple-50"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            onClick={onReset}
            className="rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-6 text-white shadow-lg shadow-purple-500/30 hover:from-purple-700 hover:to-purple-600"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Process another
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Redacted preview */}
        <div className="group space-y-6 rounded-3xl border border-purple-100 bg-white p-8 shadow-xl transition-all hover:border-purple-200 hover:shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Redacted version</h3>
          </div>

          {uploadedFile && (
            <div className="space-y-2 rounded-2xl border border-purple-100 bg-purple-50 p-4 text-xs text-gray-600">
              <div>
                <span className="font-semibold">File:</span> {uploadedFile.name}
              </div>
              <div>
                <span className="font-semibold">Size:</span> {formatFileSize(uploadedFile.size)}
              </div>
            </div>
          )}

          <div className="space-y-4 rounded-2xl border border-purple-100 bg-gradient-to-br from-gray-50 to-purple-50 p-6">
            <div className="flex justify-between text-sm font-medium text-gray-600">
              <span>Bank Statement</span>
              <span>Q4 2024</span>
            </div>
            <div className="h-px bg-purple-200" />
            <div className="space-y-3">
              <div>
                <div className="mb-2 text-xs font-medium text-gray-500">Account holder</div>
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-mono text-xs text-red-700">
                  [REDACTED-AES256]
                </div>
              </div>
              <div>
                <div className="mb-2 text-xs font-medium text-gray-500">PAN number</div>
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-mono text-xs text-red-700">
                  [REDACTED-AES256]
                </div>
              </div>
              <div>
                <div className="mb-2 text-xs font-medium text-gray-500">Address</div>
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-mono text-xs text-red-700">
                  [REDACTED-AES256]
                </div>
              </div>
            </div>
            <div className="h-px bg-purple-200" />
            <div className="flex justify-between font-semibold text-emerald-700">
              <span>Loan amount</span>
              <span>$50,000</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span>3 PII fields encrypted</span>
          </div>
        </div>

        {/* Extracted data */}
        <div className="group space-y-6 rounded-3xl border border-purple-100 bg-white p-8 shadow-xl transition-all hover:border-purple-200 hover:shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Structured data</h3>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 font-mono text-xs shadow-inner">
            <pre className="leading-relaxed text-gray-300">
              {`{
  "type": "bank_statement",
  "loan_amount": 50000,
  "account_type": "savings",
  "risk": "LOW",
  "rating": "AA",
  "name": "***MASKED***",
  "pan": "***MASKED***",
  "address": "***MASKED***",
  "date": "2024-12-04",
  "confidence": 0.98
}`}
            </pre>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              98% confident
            </Badge>
            <Badge className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
              Low risk
            </Badge>
          </div>
        </div>

        {/* Audit trail */}
        <div className="group space-y-6 rounded-3xl border border-purple-100 bg-white p-8 shadow-xl transition-all hover:border-purple-200 hover:shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Audit log</h3>
          </div>

          <div className="space-y-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Timestamp</span>
                <span className="font-mono text-xs text-gray-900">{new Date().toISOString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">User</span>
                <span className="font-mono text-gray-900">admin_2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Session</span>
                <span className="font-mono text-gray-900">ses_a7f9x2k1</span>
              </div>
            </div>

            <div className="h-px bg-purple-200" />

            <div className="space-y-3">
              <div>
                <div className="mb-2 text-xs font-medium text-gray-500">Original hash</div>
                <div className="break-all rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-[10px] text-gray-700">
                  a7f9d2c8e1b4...c3a5f8
                </div>
              </div>
              <div>
                <div className="mb-2 text-xs font-medium text-gray-500">Redacted hash</div>
                <div className="break-all rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-[10px] text-gray-700">
                  b8e3c4d9f2a5...d4b6g9
                </div>
              </div>
            </div>

            <div className="h-px bg-purple-200" />

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle className="h-4 w-4" />
                <span>Document uploaded</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle className="h-4 w-4" />
                <span>PII detected</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle className="h-4 w-4" />
                <span>Data extracted</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle className="h-4 w-4" />
                <span>Audit created</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
