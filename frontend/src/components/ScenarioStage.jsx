import { useEffect, useRef } from 'react'
import VideoOptionCard from './VideoOptionCard.jsx'

function ScenarioStage({ onSelect, scenario, scenarioIndex, totalScenarios }) {
  const startedAtRef = useRef(0)

  useEffect(() => {
    startedAtRef.current = performance.now()
  }, [scenario.id])

  const progressWidth = `${(scenarioIndex / totalScenarios) * 100}%`

  const handleSelect = (selectedOption) => {
    const responseLatency = Math.max(
      0,
      Math.round(performance.now() - startedAtRef.current),
    )

    onSelect({
      scenario_id: scenario.id,
      selected_option: selectedOption,
      response_latency_ms: responseLatency,
    })
  }

  return (
    <section className="glass-panel rounded-[2rem] p-5 text-left sm:p-8 lg:p-10">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <p className="section-label">
            Scenario {scenarioIndex} of {totalScenarios}
          </p>
          <h1 className="study-heading text-3xl leading-tight text-slate-900 sm:text-4xl">
            Ethical outcome selection
          </h1>
          <p className="text-base leading-8 text-slate-600 sm:text-lg">
            {scenario.description}
          </p>
        </div>

        <div className="w-full max-w-xs space-y-3">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Progress</span>
            <span>
              {scenarioIndex}/{totalScenarios}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200/80">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
              style={{ width: progressWidth }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {scenario.options.map((option) => (
          <VideoOptionCard
            key={`${scenario.id}-${option.id}`}
            onSelect={handleSelect}
            option={option}
          />
        ))}
      </div>
    </section>
  )
}

export default ScenarioStage
