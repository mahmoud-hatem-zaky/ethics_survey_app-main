import { useEffect, useRef, useState } from 'react'
import VideoOptionCard from './VideoOptionCard.jsx'
import { getFrameworkRecommendation, FRAMEWORK_LABELS } from '../data/ethicsAlignment.js'

function ScenarioStage({
  assignedFramework,
  errorMessage,
  isSubmitting,
  onSelect,
  scenario,
  scenarioIndex,
  totalScenarios,
}) {
  const startedAtRef = useRef(0)

  useEffect(() => {
    startedAtRef.current = performance.now()
    // Reset per-scenario UI so we ask the reveal question every time.
    setRevealed(false)
    setAwaitingReasonFor(null)
    setFollowupText('')
  }, [scenario.id])

  const progressWidth = `${(scenarioIndex / totalScenarios) * 100}%`

  // Which option letter does the assigned framework recommend for this scenario?
  const recommendedOption = assignedFramework
    ? getFrameworkRecommendation(assignedFramework, scenario.id)
    : null

  const [revealed, setRevealed] = useState(false)
  const [awaitingReasonFor, setAwaitingReasonFor] = useState(null)
  const [followupText, setFollowupText] = useState('')

  const handleImmediateSelect = (selectedOption, sawOthers = false) => {
    if (isSubmitting) return

    const responseLatency = Math.max(
      0,
      Math.round(performance.now() - startedAtRef.current),
    )

    const changedAfterViewing = sawOthers && selectedOption !== recommendedOption

    // If the participant saw other options we want a short reason before finalizing
    if (sawOthers) {
      setAwaitingReasonFor({
        scenario_id: scenario.id,
        selected_option: selectedOption,
        response_latency_ms: responseLatency,
        matched_framework_recommendation: selectedOption === recommendedOption,
        saw_other_options: true,
        changed_after_viewing: changedAfterViewing,
      })
      setFollowupText('')
      return
    }

    // If they did not view others, submit immediately (no follow-up)
    onSelect({
      scenario_id: scenario.id,
      selected_option: selectedOption,
      response_latency_ms: responseLatency,
      matched_framework_recommendation: selectedOption === recommendedOption,
      saw_other_options: false,
      changed_after_viewing: false,
      followup_reason: '',
    })
  }

  const submitFollowupReason = () => {
    if (!awaitingReasonFor) return

    onSelect({
      ...awaitingReasonFor,
      followup_reason: followupText.trim(),
    })
    setAwaitingReasonFor(null)
    setFollowupText('')
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

          {errorMessage ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMessage}
            </div>
          ) : null}

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

          {isSubmitting ? (
            <p className="text-sm text-slate-500">Submitting your survey…</p>
          ) : null}
        </div>
      </div>

      {!revealed && recommendedOption ? (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex-1">
            <VideoOptionCard
              key={`${scenario.id}-${recommendedOption}`}
              disabled={isSubmitting}
              isRecommended={true}
              onSelect={() => handleImmediateSelect(recommendedOption, false)}
              option={scenario.options.find((o) => o.id === recommendedOption)}
            />
          </div>

          <div className="flex-1 rounded-2xl border-2 border-slate-400 bg-slate-50 p-6 h-fit sticky top-20">
            <p className="text-base font-semibold text-slate-900 mb-5">
              Other options are available. Would you like to see them?
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="rounded-full border-2 border-slate-900 bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
                onClick={() => setRevealed(true)}
              >
                ✓ Yes — show all options
              </button>
              <button
                type="button"
                className="rounded-full border-2 border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-900 transition"
                onClick={() => handleImmediateSelect(recommendedOption, false)}
              >
                ✗ No — stick with recommended
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-3">
          {scenario.options.map((option) => (
            <VideoOptionCard
              key={`${scenario.id}-${option.id}`}
              disabled={isSubmitting}
              isRecommended={option.id === recommendedOption}
              onSelect={() => handleImmediateSelect(option.id, true)}
              option={option}
            />
          ))}
        </div>
      )}

      {awaitingReasonFor ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-4">
          <p className="text-sm text-slate-700">
            {awaitingReasonFor.changed_after_viewing
              ? 'You changed your choice after viewing the other options. Briefly, why did you change it?'
              : 'You kept the recommended choice after viewing the other options. Briefly, why did you not change it?'}
          </p>

          <textarea
            className="mt-3 w-full rounded-md border p-2 text-sm"
            rows={3}
            value={followupText}
            onChange={(e) => setFollowupText(e.target.value)}
          />

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="rounded-full border bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              onClick={submitFollowupReason}
            >
              Submit reason
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default ScenarioStage