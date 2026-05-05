import { useEffect, useRef } from 'react'
import VideoOptionCard from './VideoOptionCard.jsx'
import { getFrameworkRecommendation, FRAMEWORK_LABELS } from '../data/ethicsAlignment.js'

function ScenarioStage({
  assignedFramework,
  onSelect,
  scenario,
  scenarioIndex,
  totalScenarios,
}) {
  const startedAtRef = useRef(0)

  useEffect(() => {
    startedAtRef.current = performance.now()
  }, [scenario.id])

  const progressWidth = `${(scenarioIndex / totalScenarios) * 100}%`

  // Which option letter does the assigned framework recommend for this scenario?
  const recommendedOption = assignedFramework
    ? getFrameworkRecommendation(assignedFramework, scenario.id)
    : null

  const handleSelect = (selectedOption) => {
    const responseLatency = Math.max(
      0,
      Math.round(performance.now() - startedAtRef.current),
    )

    onSelect({
      scenario_id: scenario.id,
      selected_option: selectedOption,
      response_latency_ms: responseLatency,
      // Record whether the participant matched their framework's recommendation
      matched_framework_recommendation: selectedOption === recommendedOption,
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

          {/* Framework alignment hint — shown only when a framework is assigned */}
          {assignedFramework && recommendedOption ? (
            <div className="inline-flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm text-slate-600 shadow-sm">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-slate-400"
                aria-hidden
              />
              Based on your value ranking, your ethical profile aligns with{' '}
              <span className="font-semibold text-slate-800">
                {FRAMEWORK_LABELS[assignedFramework]}
              </span>
              . This framework recommends{' '}
              <span className="font-semibold text-slate-800">
                Option {recommendedOption}
              </span>{' '}
              for this scenario.
            </div>
          ) : null}
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
            isRecommended={option.id === recommendedOption}
            onSelect={handleSelect}
            option={option}
          />
        ))}
      </div>
    </section>
  )
}

export default ScenarioStage