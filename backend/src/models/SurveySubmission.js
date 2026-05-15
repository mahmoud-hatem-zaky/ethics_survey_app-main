import mongoose from 'mongoose'

const EXPECTED_RESPONSE_COUNT = 5
const VALID_CONCERN_IDS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8']
const VALID_FRAMEWORKS = [
  'Utilitarianism',
  'DistributiveJustice',
  'Deontological',
  'Kantian',
  'Altruism',
  'EthicalEgoism',
]

const responseSchema = new mongoose.Schema(
  {
    scenario_id: {
      type: Number,
      required: true,
      min: 1,
      max: EXPECTED_RESPONSE_COUNT,
    },
    selected_option: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C'],
    },
    response_latency_ms: {
      type: Number,
      required: true,
      min: 0,
    },
    // Whether the participant's choice matched their assigned framework's recommendation
    matched_framework_recommendation: {
      type: Boolean,
      default: null,
    },
      // Whether the participant viewed other available options before finalizing
      saw_other_options: {
        type: Boolean,
        required: true,
      },
      // Whether the participant changed their selection after viewing other options
      changed_after_viewing: {
        type: Boolean,
        required: true,
      },
      // Short free-text reason provided after viewing other options
      followup_reason: {
        type: String,
        trim: true,
        default: '',
        maxlength: 2000,
      },
  },
  {
    _id: false,
  },
)

const demographicSchema = new mongoose.Schema(
  {
    age: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    driving_experience: {
      type: String,
      required: true,
      trim: true,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
    },
    profession: {
      type: String,
      required: true,
      trim: true,
    },
    driving_skill_rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
      validate: {
        validator: Number.isInteger,
        message: 'driving_skill_rating must be an integer between 0 and 10.',
      },
    },
  },
  {
    _id: false,
  },
)

const surveySubmissionSchema = new mongoose.Schema(
  {
    session_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match:
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    },
    demographic_data: {
      type: demographicSchema,
      required: true,
    },
    // The participant's ranked concern IDs, index 0 = most important
    ranked_concerns: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) =>
          arr.length === VALID_CONCERN_IDS.length &&
          [...arr].sort().join(',') === [...VALID_CONCERN_IDS].sort().join(','),
        message:
          'ranked_concerns must contain all 8 concern IDs exactly once.',
      },
      enum: VALID_CONCERN_IDS,
    },
    // The framework assigned based on the ranking
    assigned_framework: {
      type: String,
      required: true,
      enum: VALID_FRAMEWORKS,
    },
    responses: {
      type: [responseSchema],
      required: true,
      validate: {
        validator: (responses) => responses.length === EXPECTED_RESPONSE_COUNT,
        message: 'Exactly five scenario responses are required.',
      },
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
)

const SurveySubmission = mongoose.model(
  'SurveySubmission',
  surveySubmissionSchema,
)

export default SurveySubmission