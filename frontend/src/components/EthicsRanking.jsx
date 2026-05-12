import { useState, useRef } from 'react'
import { CONCERNS } from '../data/ethicsAlignment.js'

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