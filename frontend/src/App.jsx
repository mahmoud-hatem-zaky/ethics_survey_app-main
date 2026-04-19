import { useState } from 'react'
import DemographicsForm from './components/DemographicsForm.jsx'
import LandingPage from './components/LandingPage.jsx'
import ScenarioStage from './components/ScenarioStage.jsx'
import ThankYouPage from './components/ThankYouPage.jsx'
import { scenarios } from './data/scenarios.js'
import { submitSurvey } from './services/surveyApi.js'

const SURVEY_STAGES = {
  landing: 'landing',
  scenario: 'scenario',
  demographics: 'demographics',
  thankyou: 'thankyou',
}

const INITIAL_DEMOGRAPHIC_DATA = {
  age: '',
  gender: '',
  driving_experience: '',
}

function createSessionId() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `session-${Date.now()}-${Math.random().toString(16).slice(2)}`
  )
}

function App() {
  const [sessionId, setSessionId] = useState(createSessionId)
  const [responses, setResponses] = useState([])
  const [demographicData, setDemographicData] = useState({
    ...INITIAL_DEMOGRAPHIC_DATA,
  })
  const [stage, setStage] = useState(SURVEY_STAGES.landing)
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [submissionState, setSubmissionState] = useState({
    isSubmitting: false,
    errorMessage: '',
  })

  const buildPayload = (nextDemographicData = demographicData) => ({
    session_id: sessionId,
    demographic_data: nextDemographicData,
    responses: [...responses].sort(
      (left, right) => left.scenario_id - right.scenario_id,
    ),
  })

  const handleStartSurvey = () => {
    setSessionId(createSessionId())
    setResponses([])
    setDemographicData({ ...INITIAL_DEMOGRAPHIC_DATA })
    setCurrentScenarioIndex(0)
    setSubmissionState({ isSubmitting: false, errorMessage: '' })
    setStage(SURVEY_STAGES.scenario)
  }

  const handleScenarioSubmit = (response) => {
    setResponses((currentResponses) => {
      const nextResponses = [
        ...currentResponses.filter(
          (entry) => entry.scenario_id !== response.scenario_id,
        ),
        response,
      ]

      return nextResponses.sort(
        (left, right) => left.scenario_id - right.scenario_id,
      )
    })

    if (currentScenarioIndex >= scenarios.length - 1) {
      setStage(SURVEY_STAGES.demographics)
      return
    }

    setCurrentScenarioIndex((index) => index + 1)
  }

  const handleDemographicsSubmit = async (demographicData) => {
    setDemographicData({ ...demographicData })

    const payload = buildPayload(demographicData)

    if (payload.responses.length !== scenarios.length) {
      setSubmissionState({
        isSubmitting: false,
        errorMessage:
          'Please finish all five scenario selections before submitting the survey.',
      })
      setCurrentScenarioIndex(
        Math.min(payload.responses.length, scenarios.length - 1),
      )
      setStage(SURVEY_STAGES.scenario)
      return
    }

    setSubmissionState({ isSubmitting: true, errorMessage: '' })

    try {
      await submitSurvey(payload)
      setSubmissionState({ isSubmitting: false, errorMessage: '' })
      setStage(SURVEY_STAGES.thankyou)
    } catch (error) {
      setSubmissionState({
        isSubmitting: false,
        errorMessage: error.message,
      })
    }
  }

  const currentScenario = scenarios[currentScenarioIndex]

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-4 py-5 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(219,230,238,0.95),_transparent_52%),linear-gradient(180deg,_rgba(248,250,252,0.9),_rgba(233,239,244,0.95))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-80 max-w-3xl rounded-full bg-[rgba(162,184,198,0.2)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-[rgba(204,217,228,0.25)] blur-3xl" />

      <main className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-7xl flex-col justify-center">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <span className="rounded-full border border-white/70 bg-white/75 px-4 py-2 tracking-[0.22em] text-slate-500 shadow-sm backdrop-blur-sm">
            Bachelor Thesis Study
          </span>
          <span className="tracking-[0.24em] text-slate-500 uppercase">
            Autonomous Vehicle Ethics
          </span>
        </header>

        {stage === SURVEY_STAGES.landing ? (
          <LandingPage
            clipCount={scenarios.length * 3}
            onStart={handleStartSurvey}
            scenarioCount={scenarios.length}
          />
        ) : null}

        {stage === SURVEY_STAGES.scenario && currentScenario ? (
          <ScenarioStage
            onSelect={handleScenarioSubmit}
            scenario={currentScenario}
            scenarioIndex={currentScenarioIndex + 1}
            totalScenarios={scenarios.length}
          />
        ) : null}

        {stage === SURVEY_STAGES.demographics ? (
          <DemographicsForm
            errorMessage={submissionState.errorMessage}
            isSubmitting={submissionState.isSubmitting}
            onSubmit={handleDemographicsSubmit}
          />
        ) : null}

        {stage === SURVEY_STAGES.thankyou ? (
          <ThankYouPage sessionId={sessionId} />
        ) : null}
      </main>
    </div>
  )
}

export default App
