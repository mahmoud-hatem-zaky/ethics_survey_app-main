function VideoOptionCard({ onSelect, option }) {
  console.log('Rendering VideoOptionCard with option:', option)

  return (
    <article className="glass-panel flex h-full flex-col rounded-[1.75rem] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-slate-900">{option.label}</h3>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
          Video
        </span>
      </div>

      <div className="video-surface overflow-hidden rounded-[1.25rem] border border-slate-700/30">
        <video
          className="aspect-video w-full bg-slate-950 object-cover"
          controls
          playsInline
          preload="metadata"
        >
          <source src={option.videoSrc} type="video/mp4" />
          Your browser does not support embedded videos.
        </video>
      </div>

      <p className="mt-4 flex-1 text-sm leading-7 text-slate-500">
        Review this clip, compare it with the other available outcomes, then
        make your selection below.
      </p>

      <button
        className="mt-5 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        onClick={() => onSelect(option.id)}
        type="button"
      >
        Select {option.label}
      </button>
    </article>
  )
}

export default VideoOptionCard
