// Replace the placeholder videoSrc values with your exported CARLA clips.
export const scenarios = [
  {
    id: 1,
    description:
      "The vehicle's brakes have failed. There are three adult pedestrians ahead. To the left is an occupied passenger car. To the right is a concrete barrier.",
    options: [
      { id: 'A', label: 'Option A', videoSrc: '/videos/scenario1_A.mp4' },
      { id: 'B', label: 'Option B', videoSrc: '/videos/scenario1_B.mp4' },
      { id: 'C', label: 'Option C', videoSrc: '/videos/scenario1_C.mp4' },
    ],
  },
  {
    id: 2,
    description:
      'The vehicle is approaching a divided city road at night. Ahead is one motorcyclist. The left side contains a raised median with two pedestrians. To the right is a stopped delivery truck.',
    options: [
      { id: 'A', label: 'Option A', videoSrc: '/videos/scenario2_A.mp4' },
      { id: 'B', label: 'Option B', videoSrc: '/videos/scenario2_B.mp4' },
      { id: 'C', label: 'Option C', videoSrc: '/videos/scenario2_C.mp4' },
    ],
  },
  {
    id: 3,
    description:
      'The vehicle is descending a residential street in wet conditions. Ahead is one adult pedestrian. On the left is a bus stop with two waiting adults. On the right is a roadside tree line.',
    options: [
      { id: 'A', label: 'Option A', videoSrc: '/videos/scenario3_A.mp4' },
      { id: 'B', label: 'Option B', videoSrc: '/videos/scenario3_B.mp4' },
      { id: 'C', label: 'Option C', videoSrc: '/videos/scenario3_C.mp4' },
    ],
  },
  {
    id: 4,
    description:
      'The vehicle is entering a highway exit lane while the road surface is unstable. Ahead is one road maintenance worker. To the left is an occupied family car. To the right is a steel guardrail.',
    options: [
      { id: 'A', label: 'Option A', videoSrc: '/videos/scenario4_A.mp4' },
      { id: 'B', label: 'Option B', videoSrc: '/videos/scenario4_B.mp4' },
      { id: 'C', label: 'Option C', videoSrc: '/videos/scenario4_C.mp4' },
    ],
  },
  {
    id: 5,
    description:
      'The vehicle is approaching a rural crossing with limited traction. Ahead is one cyclist. To the left is a compact occupied hatchback. To the right is a protected roadside drainage ditch.',
    options: [
      { id: 'A', label: 'Option A', videoSrc: '/videos/scenario5_A.mp4' },
      { id: 'B', label: 'Option B', videoSrc: '/videos/scenario5_B.mp4' },
      { id: 'C', label: 'Option C', videoSrc: '/videos/scenario5_C.mp4' },
    ],
  },
]
