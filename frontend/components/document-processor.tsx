"use client"
import { ProcessingStage } from "./processing-stage"
import { ResultsDashboard } from "./results-dashboard"
import { useSimulation } from "@/hooks/use-simulation"

export function DocumentProcessor() {
  const { state, progress, logs, result, uploadedFile, startSimulation } = useSimulation()

  return (
    <div className="mx-auto max-w-7xl px-8 py-16">
      {state === "COMPLETE" ? (
        <ResultsDashboard result={result} uploadedFile={uploadedFile} onReset={() => window.location.reload()} />
      ) : (
        <ProcessingStage state={state} progress={progress} logs={logs} onUpload={startSimulation} />
      )}
    </div>
  )
}
