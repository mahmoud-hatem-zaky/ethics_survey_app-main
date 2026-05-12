const API_BASE_URL = (
  import.meta.env.VITE_API_URL ??
  import.meta.env.VITE_API_BASE_URL ??
  ''
)

function joinUrl(baseUrl, path) {
  const normalizedBase = typeof baseUrl === 'string' ? baseUrl.trim() : ''

  if (!normalizedBase) return path

  const withoutTrailingSlash = normalizedBase.endsWith('/')
    ? normalizedBase.slice(0, -1)
    : normalizedBase

  return `${withoutTrailingSlash}${path}`
}

export async function submitSurvey(payload) {
  const endpoint = joinUrl(API_BASE_URL, '/api/submit-survey')

  let response

  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(
      `Network error: could not reach the survey API at "${endpoint}". ` +
        'Make sure the backend is running and CORS allows this frontend origin.',
    )
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message ?? 'Survey submission failed.')
  }

  return data
}
