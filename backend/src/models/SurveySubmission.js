import mongoose from 'mongoose'

const EXPECTED_RESPONSE_COUNT = 5

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
