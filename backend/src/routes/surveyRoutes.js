import { Router } from 'express'
import { submitSurvey } from '../controllers/surveyController.js'

const router = Router()

router.post('/submit-survey', submitSurvey)

export default router
