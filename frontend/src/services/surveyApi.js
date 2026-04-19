const API_BASE_URL = import.meta.env.VITE_API_URL

export async function submitSurvey(payload) {
  const response = await fetch(`${API_BASE_URL}/api/submit-survey`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message ?? 'Survey submission failed.')
  }

  return data
}
