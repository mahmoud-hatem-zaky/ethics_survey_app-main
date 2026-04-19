function LandingPage({ clipCount, onStart, scenarioCount }) {
  return (
    <section className="glass-panel grid gap-8 rounded-[2rem] p-6 text-left sm:p-10 lg:grid-cols-[1.45fr_0.85fr] lg:gap-12">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="section-label">Welcome</p>
          <h1 className="study-heading max-w-3xl text-4xl leading-tight text-slate-900 sm:text-5xl">
            Human-Computer Interaction study on autonomous vehicle ethics.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            You will review five short driving scenarios generated in the CARLA
            simulator. Each scenario presents three possible physical outcomes.
            After watching the clips, choose the option you consider the most
            ethical. A short demographics form follows the final scenario.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
          <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2">
            Neutral academic presentation
          </span>
          <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2">
            No philosophical labels shown
          </span>
          <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2">
            Single final submission
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            className="rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            onClick={onStart}
            type="button"
          >
            Start Survey
          </button>
          <p className="text-sm text-slate-500">
            Please complete the survey in one sitting if possible.
          </p>
        </div>
      </div>

      <aside className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/78 p-5">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Scenarios
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {scenarioCount}
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/78 p-5">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Video clips
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {clipCount}
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white/78 p-5">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Estimated time
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">3-5 min</p>
        </div>
      </aside>
    </section>
  )
}

export default LandingPage
