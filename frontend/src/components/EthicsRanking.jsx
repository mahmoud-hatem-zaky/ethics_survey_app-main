import { useState, useRef } from 'react'
import { CONCERNS } from '../data/ethicsAlignment.js'

const concernIcons = {
  c1: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="15" cy="7" r="2.5" />
      <path d="M3.5 17c0-2.2 2.2-4 4.5-4s4.5 1.8 4.5 4" />
      <path d="M12 16c0-2 1.7-3.5 3.8-3.5S19.5 14 19.5 16" />
      <path d="M15.5 18.5c-.8-.8-.6-2 0-2.6.8-.8 2-.6 2.6 0 .6-.6 1.8-.8 2.6 0 .6.6.8 1.8 0 2.6l-2.6 2.3-2.6-2.3z" />
    </svg>
  ),
  c2: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="10" width="16" height="7" rx="2" />
      <path d="M7 10l2-3h6l2 3" />
      <circle cx="8" cy="18" r="1.5" />
      <circle cx="16" cy="18" r="1.5" />
      <path d="M12 11l3 4" />
    </svg>
  ),
  c3: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="4" width="17" height="12.5" rx="2" />
      <circle cx="12" cy="8" r="1.6" />
      <path d="M12 9.6v3.2" />
      <path d="M12 11.2l-2 1.5" />
      <path d="M12 11.2l2 1.5" />
      <path d="M12 12.8l-2 3" />
      <path d="M12 12.8l2 3" />
      <path d="M12 16.5v3" />
    </svg>
  ),
  c4: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4v14" />
      <path d="M6 7h12" />
      <path d="M6 7l-3 6h6l-3-6z" />
      <path d="M18 7l-3 6h6l-3-6z" />
      <path d="M8 20h8" />
    </svg>
  ),
  c5: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="12" width="8.5" height="5.5" rx="1.5" />
      <path d="M4.5 12l1.5-2.5h3l1.5 2.5" />
      <circle cx="4.5" cy="18.5" r="1.4" />
      <circle cx="8.5" cy="18.5" r="1.4" />
      <rect x="13" y="12" width="8.5" height="5.5" rx="1.5" />
      <path d="M15 12l1.5-2.5h3l1.5 2.5" />
      <circle cx="15" cy="18.5" r="1.4" />
      <circle cx="19" cy="18.5" r="1.4" />
    </svg>
  ),
  c6: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7" cy="8" r="2" />
      <path d="M7 10v4" />
      <path d="M7 14l-2 4" />
      <path d="M7 14l2 4" />
      <path d="M16 6l4 2v4c0 3-2.5 5-4 6-1.5-1-4-3-4-6V8l4-2z" />
    </svg>
  ),
  c7: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7" cy="8.8" r="2" />
      <circle cx="10.5" cy="7.2" r="2" />
      <circle cx="13.5" cy="7.2" r="2" />
      <circle cx="17" cy="8.8" r="2" />
      <path d="M12 12.4c-2.8 0-5 2-5 4.5s2.2 4.5 5 4.5 5-2 5-4.5-2.2-4.5-5-4.5z" />
    </svg>
  ),
  c8: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12l8-6 8 6v7a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z" />
      <path d="M12 12l-1 3 2 2-2 3" />
    </svg>
  ),
}

/**
 * EthicsRanking
 * Presents the 8 Millan-Blanquel concerns as a drag-and-drop ranking list.
 * The participant orders them from most to least important before the scenarios begin.
 * Calls onSubmit(rankedConcernIds: string[]) when confirmed.
 */
function EthicsRanking({ onSubmit }) {
  const [items, setItems] = useState([...CONCERNS])
  const [draggingIndex, setDraggingIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const dragNodeRef = useRef(null)

  /* ── Drag handlers ─────────────────────────────────────────────────── */

  const handleDragStart = (e, index) => {
    setDraggingIndex(index)
    dragNodeRef.current = e.currentTarget
    // Slight delay so the ghost image renders before we hide the source
    setTimeout(() => {
      if (dragNodeRef.current) {
        dragNodeRef.current.style.opacity = '0.4'
      }
    }, 0)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnter = (e, index) => {
    e.preventDefault()
    if (index === draggingIndex) return
    setDragOverIndex(index)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggingIndex === null || draggingIndex === dropIndex) return

    setItems((prev) => {
      const next = [...prev]
      const [moved] = next.splice(draggingIndex, 1)
      next.splice(dropIndex, 0, moved)
      return next
    })

    setDraggingIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    if (dragNodeRef.current) {
      dragNodeRef.current.style.opacity = '1'
    }
    dragNodeRef.current = null
    setDraggingIndex(null)
    setDragOverIndex(null)
  }

  /* ── Keyboard / button fallback: move item up/down ─────────────────── */

  const moveItem = (index, direction) => {
    const next = [...items]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setItems(next)
  }

  /* ── Submit ─────────────────────────────────────────────────────────── */

  const handleConfirm = () => {
    onSubmit(items.map((c) => c.id))
  }

  return (
    <section className="glass-panel rounded-[2rem] p-6 text-left sm:p-10">
      <div className="max-w-3xl space-y-3">
        <p className="section-label">Step 2 of 3</p>
        <h1 className="study-heading text-3xl leading-tight text-slate-900 sm:text-4xl">
          What matters most to you?
        </h1>
        <p className="text-base leading-7 text-slate-600 sm:text-lg">
          Below are eight ethical considerations an autonomous vehicle must
          weigh during an emergency. Drag them — or use the arrows — to rank
          them from{' '}
          <span className="font-semibold text-slate-800">
            most important (top)
          </span>{' '}
          to{' '}
          <span className="font-semibold text-slate-800">
            least important (bottom)
          </span>
          . Your ranking will determine which ethical framework best matches
          your values.
        </p>
      </div>

      <div className="mt-8 space-y-2">
        {items.map((concern, index) => {
          const isDragging = draggingIndex === index
          const isTarget = dragOverIndex === index && draggingIndex !== index

          return (
            <div
              key={concern.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={[
                'group flex cursor-grab items-center gap-4 rounded-2xl border px-4 py-3.5 transition-all duration-150 active:cursor-grabbing select-none',
                isDragging
                  ? 'scale-[1.02] border-slate-400 bg-white shadow-lg'
                  : isTarget
                    ? 'border-slate-900 bg-slate-50 shadow-md'
                    : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:bg-white hover:shadow-sm',
              ].join(' ')}
              style={{
                borderTopWidth: isTarget && dragOverIndex < draggingIndex ? '2px' : undefined,
                borderBottomWidth: isTarget && dragOverIndex > draggingIndex ? '2px' : undefined,
              }}
            >
              {/* Rank badge */}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 transition group-hover:bg-slate-200">
                {index + 1}
              </span>

              {/* Drag handle dots */}
              <span className="shrink-0 text-slate-300 transition group-hover:text-slate-400" aria-hidden>
                <svg width="12" height="20" viewBox="0 0 12 20" fill="currentColor">
                  <circle cx="3" cy="4" r="1.5" />
                  <circle cx="9" cy="4" r="1.5" />
                  <circle cx="3" cy="10" r="1.5" />
                  <circle cx="9" cy="10" r="1.5" />
                  <circle cx="3" cy="16" r="1.5" />
                  <circle cx="9" cy="16" r="1.5" />
                </svg>
              </span>

              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-slate-200 group-hover:text-slate-700"
                aria-hidden
              >
                {concernIcons[concern.id] ?? null}
              </span>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {concern.label}
                </p>
                <p className="text-xs text-slate-500">{concern.description}</p>
              </div>

              {/* Up / down buttons (keyboard / touch fallback) */}
              <div className="flex shrink-0 gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
                <button
                  type="button"
                  aria-label={`Move "${concern.label}" up`}
                  disabled={index === 0}
                  onClick={() => moveItem(index, -1)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2 9 7 4 12 9" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label={`Move "${concern.label}" down`}
                  disabled={index === items.length - 1}
                  onClick={() => moveItem(index, 1)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2 5 7 10 12 5" />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleConfirm}
          className="rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          Confirm ranking &amp; begin scenarios →
        </button>
        <p className="text-sm text-slate-500">
          You can adjust the order at any time before confirming.
        </p>
      </div>
    </section>
  )
}

export default EthicsRanking