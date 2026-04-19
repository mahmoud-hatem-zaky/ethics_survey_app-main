import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { connectToDatabase } from './config/db.js'
import surveyRoutes from './routes/surveyRoutes.js'

const app = express()
const port = Number(process.env.PORT ?? 5000)
const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
  }),
)

app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
  })
})

app.use('/api', surveyRoutes)

app.use((error, _req, res, _next) => {
  console.error(error)

  if (error?.message?.startsWith('CORS blocked')) {
    return res.status(403).json({
      message: error.message,
    })
  }

  return res.status(500).json({
    message: 'Internal server error.',
  })
})

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Survey API listening on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server.', error)
    process.exit(1)
  })
