import { useState } from 'react'

const ageOptions = [
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+',
  'Prefer not to say',
]

const genderOptions = [
  'Woman',
  'Man',
  'Non-binary',
  'Prefer to self-describe',
  'Prefer not to say',
]

const drivingExperienceOptions = [
  'No driving experience',
  'Less than 1 year',
  '1-3 years',
  '4-7 years',
  '8-15 years',
  '16+ years',
]

function DemographicsForm({ errorMessage, isSubmitting, onSubmit }) {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    driving_experience: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <section className="glass-panel rounded-[2rem] p-6 text-left sm:p-10">
      <div className="max-w-3xl space-y-4">
        <p className="section-label">Demographics</p>
        <h1 className="study-heading text-3xl leading-tight text-slate-900 sm:text-4xl">
          Final participant details
        </h1>
        <p className="text-base leading-8 text-slate-600 sm:text-lg">
          These fields help contextualize the study results. No personally
          identifying information is requested in this starter form.
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Age</span>
            <select
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              name="age"
              onChange={handleChange}
              required
              value={formData.age}
            >
              <option value="">Select an age range</option>
              {ageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Gender</span>
            <select
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              name="gender"
              onChange={handleChange}
              required
              value={formData.gender}
            >
              <option value="">Select an option</option>
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Driving experience
            </span>
            <select
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              name="driving_experience"
              onChange={handleChange}
              required
              value={formData.driving_experience}
            >
              <option value="">Select a range</option>
              {drivingExperienceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : null}

        <button
          className="rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Survey'}
        </button>
      </form>
    </section>
  )
}

export default DemographicsForm
