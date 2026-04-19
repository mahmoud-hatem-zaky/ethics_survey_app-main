import { validate as isUuid, v4 as uuidv4 } from 'uuid'
import SurveySubmission from '../models/SurveySubmission.js'

const EXPECTED_RESPONSE_COUNT = 5
const VALID_OPTIONS = new Set(['A', 'B', 'C'])

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizePayload(body) {
  const normalizedSessionId = normalizeText(body?.session_id)

  return {
    session_id: isUuid(normalizedSessionId) ? normalizedSessionId : uuidv4(),
    demographic_data: {
      age: normalizeText(body?.demographic_data?.age),
      gender: normalizeText(body?.demographic_data?.gender),
      driving_experience: normalizeText(
        body?.demographic_data?.driving_experience,
      ),
    },
    responses: Array.isArray(body?.responses)
      ? body.responses
          .map((response) => ({
            scenario_id: Number(response?.scenario_id),
            selected_option: normalizeText(response?.selected_option).toUpperCase(),
            response_latency_ms: Number(response?.response_latency_ms),
          }))
          .sort((left, right) => left.scenario_id - right.scenario_id)
      : [],
  }
}

function hasCompleteDemographics(demographicData) {
  return (
    demographicData.age &&
    demographicData.gender &&
    demographicData.driving_experience
  )
}

function hasInvalidResponse(responses) {
  return responses.some(
    (response) =>
      !Number.isInteger(response.scenario_id) ||
      response.scenario_id < 1 ||
      response.scenario_id > EXPECTED_RESPONSE_COUNT ||
      !VALID_OPTIONS.has(response.selected_option) ||
      !Number.isFinite(response.response_latency_ms) ||
      response.response_latency_ms < 0,
  )
}

function hasDuplicateScenarioIds(responses) {
  const seenScenarioIds = new Set()

  return responses.some((response) => {
    if (seenScenarioIds.has(response.scenario_id)) {
      return true
    }

    seenScenarioIds.add(response.scenario_id)
    return false
  })
}

export async function submitSurvey(req, res, next) {
  try {
    const payload = normalizePayload(req.body)

    if (!hasCompleteDemographics(payload.demographic_data)) {
      return res.status(400).json({
        message: 'Incomplete demographic data.',
      })
    }

    if (payload.responses.length !== EXPECTED_RESPONSE_COUNT) {
      return res.status(400).json({
        message: 'Exactly five scenario responses are required.',
      })
    }

    if (hasDuplicateScenarioIds(payload.responses)) {
      return res.status(400).json({
        message: 'Each scenario may only be submitted once.',
      })
    }

    if (hasInvalidResponse(payload.responses)) {
      return res.status(400).json({
        message: 'One or more scenario responses are invalid.',
      })
    }

    const submission = await SurveySubmission.create(payload)

    return res.status(201).json({
      message: 'Survey submitted successfully.',
      session_id: submission.session_id,
      timestamp: submission.timestamp,
    })
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        message: 'A submission for this session has already been recorded.',
      })
    }

    return next(error)
  }
}
