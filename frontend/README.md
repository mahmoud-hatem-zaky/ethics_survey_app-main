# Autonomous Vehicle Ethics Survey Frontend

This Vite + React app contains the participant-facing study interface for the thesis survey.

## Scripts

- `npm run dev` starts the frontend locally.
- `npm run build` creates the production build.
- `npm run preview` serves the production build locally.

## Environment

Create a `.env` file based on `.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

## Video Placeholders

Place your CARLA clips in `public/videos/` using the placeholder filenames already referenced in `src/data/scenarios.js`, for example:

- `scenario1_A.mp4`
- `scenario1_B.mp4`
- `scenario1_C.mp4`

Repeat that pattern through `scenario5_C.mp4`.
