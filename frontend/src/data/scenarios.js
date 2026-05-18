// Replace the placeholder videoSrc values with your exported CARLA clips.
export const scenarios = [
  {
    id: 1,
    description:
      "A vehicle carrying 2 passengers is traveling on a road when a sudden emergency makes a collision unavoidable. Three maneuvers are possible.",
    options: [
      {
        id: 'A',
        label: 'Option A',
        description: 'Left: The vehicle swerves into a concrete barrier. Both passengers inside the vehicle are killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/LabScenarios/Scenario1A.mp4',
      },
      {
        id: 'B',
        label: 'Option B',
        description: 'Straight: The vehicle continues forward and strikes 2 adult pedestrians on the road. Both pedestrians are killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/LabScenarios/Scenario1B.mp4',
      },
      {
        id: 'C',
        label: 'Option C',
        description: 'Right: The vehicle swerves and strikes 5 dogs crossing the road. All 5 dogs are killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/LabScenarios/Scenario1C.mp4',
      },
    ],
  },
  {
    id: 2,
    description:
      'A vehicle carrying 2 passengers is approaching a pedestrian crossing. A sudden emergency has made a collision unavoidable. Three maneuvers are possible.',
    options: [
      {
        id: 'A',
        label: 'Option A',
        description: 'Left: The vehicle swerves and strikes 3 adult pedestrians on the crossing. All 3 are killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/Scenarios+Cut/scenario1_B.mp4',
      },
      {
        id: 'B',
        label: 'Option B',
        description: 'Straight: The vehicle continues forward and strikes 1 child on the crossing. The child is killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/Scenarios+Cut/scenario1_A.mp4',
      },
      {
        id: 'C',
        label: 'Option C',
        description: 'Right: The vehicle swerves into a concrete barrier. Both passengers inside the vehicle are killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/Scenarios+Cut/scenario1_C.mp4',
      },
    ],
  },
  {
    id: 3,
    description:
      'A vehicle carrying 3 passengers is traveling on a road when a sudden emergency makes a collision unavoidable. Three maneuvers are possible.',
    options: [
      {
        id: 'A',
        label: 'Option A',
        description: 'Left: The vehicle swerves into a concrete barrier. All 3 passengers inside the vehicle are killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/LabScenarios/Scenario2A.mp4',
      },
      {
        id: 'B',
        label: 'Option B',
        description: 'Straight: The vehicle continues forward and strikes 5 pedestrians who are crossing the road illegally. All 5 are killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/LabScenarios/Scenario2B.mp4',
      },
      {
        id: 'C',
        label: 'Option C',
        description: 'Right: The vehicle swerves onto the sidewalk and strikes 1 pedestrian who is walking on the pavement, away from the road. The pedestrian is killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/LabScenarios/Scenario2C.mp4',
      },
    ],
  },
  {
    id: 4,
    description:
      'A vehicle carrying 1 passenger is traveling on a road when a sudden emergency makes a collision unavoidable. Three maneuvers are possible.',
    options: [
      {
        id: 'A',
        label: 'Option A',
        description: 'Left: The vehicle collides with another car. The 3 passengers inside that car are killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/Scenarios+Cut/scenario5_B.mp4',
      },
      {
        id: 'B',
        label: 'Option B',
        description: 'Straight: The vehicle continues forward and strikes 1 adult pedestrian. The pedestrian is killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/Scenarios+Cut/scenario5_A.mp4',
      },
      {
        id: 'C',
        label: 'Option C',
        description: 'Right: The vehicle swerves into a concrete barrier. The passenger inside the vehicle is killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/Scenarios+Cut/scenario5_C.mp4',
      },
    ],
  },
  {
    id: 5,
    description:
      'A vehicle carrying 3 passengers is traveling on a road when a sudden emergency makes a collision unavoidable. Three maneuvers are possible.',
    options: [
      {
        id: 'A',
        label: 'Option A',
        description: 'Left: The vehicle collides with a van. The 4 passengers inside the van are killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/Scenarios+Cut/scenario2_B.mp4',
      },
      {
        id: 'B',
        label: 'Option B',
        description: 'Straight: The vehicle continues forward and strikes 3 adult pedestrians on the road. All 3 are killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/Scenarios+Cut/scenario2_A.mp4',
      },
      {
        id: 'C',
        label: 'Option C',
        description: 'Right: The vehicle swerves into a concrete barrier. All 3 passengers inside the vehicle are killed.',
        videoSrc:
          'https://my-survey-videos.s3.eu-west-1.amazonaws.com/Scenarios+Cut/scenario2_C.mp4',
      },
    ],
  },
]
