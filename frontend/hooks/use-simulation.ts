"use client"

import { useState, useCallback } from "react"

type SimulationState = "IDLE" | "UPLOADING" | "ANALYZING" | "COMPLETE"

interface UploadedFile {
  name: string
  size: number
  type: string
  content: string
  lastModified: number
}

const ANALYZING_LOGS = [
  "Initializing secure processing environment...",
  "Loading Llama-3-8b model (On-Device Inference)...",
  "Model loaded successfully in 234ms",
  "Parsing document structure...",
  "Detected document type: BANK_STATEMENT",
  "Vectorizing document chunks...",
  "Processing page 1 of 3...",
  "Processing page 2 of 3...",
  "Processing page 3 of 3...",
  "Running PII detection pipeline...",
  "DETECTED: Personal Name at confidence 0.98",
  "DETECTED: PAN Number at confidence 0.99",
  "DETECTED: Address at confidence 0.96",
  "DETECTED: Date of Birth at confidence 0.97",
  "Applying homomorphic encryption mask...",
  "Encrypting PII field 1/4 with AES-256...",
  "Encrypting PII field 2/4 with AES-256...",
  "Encrypting PII field 3/4 with AES-256...",
  "Encrypting PII field 4/4 with AES-256...",
  "Extracting structured data fields...",
  "Calculating risk score using ensemble model...",
  "Risk assessment: LOW (confidence: 0.94)",
  "Generating audit trail...",
  "Computing SHA-256 hash for original document...",
  "Computing SHA-256 hash for redacted document...",
  "SUCCESS: Document processed securely",
  "Total processing time: 2.4 seconds",
  "Zero network requests made - 100% local processing",
]

export function useSimulation() {
  const [state, setState] = useState<SimulationState>("IDLE")
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [result, setResult] = useState<any>(null)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)

  const startSimulation = useCallback((file: File) => {
    setState("UPLOADING")
    setProgress(0)
    setLogs([])

    // Read file content using FileReader
    const reader = new FileReader()

    reader.onload = (e) => {
      const content = e.target?.result as string

      // Store uploaded file information
      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type,
        content: content,
        lastModified: file.lastModified,
      })

      // Start upload progress simulation
      const uploadInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(uploadInterval)
            setTimeout(() => {
              setState("ANALYZING")
              startAnalyzing()
            }, 500)
            return 100
          }
          return prev + 10
        })
      }, 100)
    }

    reader.onerror = () => {
      console.error("[v0] Error reading file:", reader.error)
      setState("IDLE")
    }

    // Read file as text
    reader.readAsText(file)
  }, [])

  const startAnalyzing = () => {
    let logIndex = 0
    const logInterval = setInterval(() => {
      if (logIndex < ANALYZING_LOGS.length) {
        setLogs((prev) => [...prev, ANALYZING_LOGS[logIndex]])
        logIndex++
      } else {
        clearInterval(logInterval)
        setTimeout(() => {
          setState("COMPLETE")
          setResult({
            document_type: "bank_statement",
            loan_amount: 50000,
            risk_score: "LOW",
            confidence: 0.98,
          })
        }, 500)
      }
    }, 120)
  }

  return {
    state,
    progress,
    logs,
    result,
    uploadedFile,
    startSimulation,
  }
}
