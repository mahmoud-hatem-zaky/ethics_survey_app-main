function VideoOptionCard({ disabled = false, isRecommended = false, onSelect, option }) {
  console.log('Rendering VideoOptionCard with option:', option)

  const enforceMutedPlayback = (event) => {
    const video = event.currentTarget

    if (!video.muted || video.volume !== 0) {
      video.muted = true
      video.defaultMuted = true
      video.volume = 0
    }
  }

  return (
    <article
      className={[
        'glass-panel flex h-full flex-col rounded-[1.75rem] p-4 sm:p-5 transition-all duration-200',
        isRecommended ? 'ring-2 ring-slate-700 ring-offset-2' : '',
      ].join(' ')}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-slate-900">{option.label}</h3>
        <div className="flex items-center gap-2">
          {isRecommended ? (
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-emerald-700 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              Recommended option
            </span>
          ) : null}
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Video
          </span>
        </div>
      </div>

      <div className="video-surface overflow-hidden rounded-[1.25rem] border border-slate-700/30">
        <video
          className="aspect-video w-full bg-slate-950 object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          onLoadedMetadata={enforceMutedPlayback}
          onPlay={enforceMutedPlayback}
          onVolumeChange={enforceMutedPlayback}
        >
          <source src={option.videoSrc} type="video/mp4" />
          Your browser does not support embedded videos.
        </video>
      </div>

      <p className="mt-4 flex-1 text-sm leading-7 text-slate-500">
        {option.description ??
          'Review this clip, compare it with the other available outcomes, then make your selection below.'}
      </p>

      <button
        className={[
          'mt-5 rounded-full border px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
          isRecommended
            ? 'border-slate-900 bg-slate-900 text-white hover:bg-slate-800 hover:border-slate-800'
            : 'border-slate-300 bg-white text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white',
        ].join(' ')}
        disabled={disabled}
        onClick={() => onSelect(option.id)}
        type="button"
      >
        Select {option.label}
      </button>
    </article>
  )
}

export default VideoOptionCard