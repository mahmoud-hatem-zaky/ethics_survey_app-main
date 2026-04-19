function ThankYouPage({ sessionId }) {
  return (
    <section className="glass-panel rounded-[2rem] p-8 text-left sm:p-12">
      <div className="max-w-3xl space-y-5">
        <p className="section-label">Submission complete</p>
        <h1 className="study-heading text-4xl leading-tight text-slate-900 sm:text-5xl">
          Thank you for participating.
        </h1>
        <p className="text-base leading-8 text-slate-600 sm:text-lg">
          Your survey response has been recorded successfully. You may now close
          this window or tab.
        </p>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Session reference
          </p>
          <p className="mt-3 break-all text-base font-semibold text-slate-800">
            {sessionId}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ThankYouPage
