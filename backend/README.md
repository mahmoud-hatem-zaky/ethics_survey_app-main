# Autonomous Vehicle Ethics Survey Backend

This Express backend receives one final survey payload and stores it in MongoDB through Mongoose.

## Scripts

- `npm run dev` starts the API with Node's watch mode.
- `npm run start` starts the API once.
- `npm run check` runs a syntax check on the entry server file.

## Environment

Create a `.env` file based on `.env.example`:

```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/av_ethics_survey
FRONTEND_URL=http://localhost:5173
```

The frontend submits to `POST /api/submit-survey`.
