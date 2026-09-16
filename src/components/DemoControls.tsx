import React, { useEffect, useRef, useState } from 'react';
import { AUTO_ARRIVAL_CADENCE_MS, useDemoData } from '../demo/DemoDataProvider';
import { getAgeMs, getFreshness, getFreshnessLabel, validatePriceInput } from '../demo/freshness';

export const DemoControls: React.FC = () => {
  const { now, speed, feedPaused, prices, history, setSpeed, pauseFeed, resumeFeed, pushPrice, demonstrateAging } = useDemoData();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(prices[0]?.id ?? '');
  const [inputValue, setInputValue] = useState(String(prices[0]?.value ?? ''));
  const [error, setError] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const selected = prices.find((price) => price.id === selectedId);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        window.setTimeout(() => triggerRef.current?.focus());
      } else if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), select:not([disabled]), input:not([disabled]), summary, [tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus());
  };

  const submitUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    const value = validatePriceInput(inputValue);
    if (value === null) {
      setError('Enter a finite price greater than zero.');
      return;
    }
    if (!pushPrice(selectedId, value)) {
      setError('Select a tracked price.');
      return;
    }
    setError('');
  };

  return (
    <>
      <div className="fixed right-3 bottom-20 z-[55] flex flex-col items-end gap-1" aria-live="polite">
        <div className="flex gap-1 text-[9px] font-bold uppercase tracking-wide">
          {feedPaused && <span className="rounded bg-[#f59e0b] px-2 py-1 text-[#1f1300]">Feed paused</span>}
          {speed > 1 && <span className="rounded bg-[#75ff9e] px-2 py-1 text-[#00210b]">Time {speed}×</span>}
        </div>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="min-h-11 rounded-xl border border-[#4edea3] bg-[#181d1a] px-3 text-[12px] font-bold text-[#75ff9e] shadow-xl"
        >
          <span className="material-symbols-outlined mr-1 align-middle text-[17px]">science</span>
          Demo controls
        </button>
        <span className="rounded bg-[#0a0f0d]/95 px-2 py-0.5 text-[9px] font-semibold text-[#ffcf70]">
          Demo data — Not for trading
        </span>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] bg-black/80 p-3 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-controls-title"
            className="mx-auto flex h-full max-h-[calc(100vh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#3b4a3d] bg-[#101613] shadow-2xl"
          >
            <header className="flex items-start justify-between border-b border-[#262b29] p-4">
              <div>
                <h2 id="demo-controls-title" className="text-lg font-bold text-[#dfe4e0]">Demo controls</h2>
                <p className="text-xs font-bold text-[#ffcf70]">Demo data — Not for trading</p>
              </div>
              <button ref={closeRef} type="button" onClick={close} aria-label="Close demo controls" className="min-h-11 min-w-11 rounded-xl bg-[#262b29] text-[#dfe4e0]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <div className="overflow-y-auto p-4 space-y-5">
              <section aria-labelledby="clock-title" className="rounded-xl border border-[#262b29] bg-[#181d1a] p-3 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 id="clock-title" className="text-sm font-bold text-[#dfe4e0]">Simulated clock</h3>
                    <p className="text-[11px] text-[#bacbb9]">Active multiplier: <strong className="text-[#75ff9e]">{speed}×</strong></p>
                  </div>
                  <div className="flex gap-1" role="group" aria-label="Clock speed">
                    {[1, 60, 600].map((option) => <button key={option} type="button" onClick={() => setSpeed(option)} aria-pressed={speed === option} className={`min-h-10 rounded-lg px-3 text-xs font-bold ${speed === option ? 'bg-[#00e676] text-[#00210b]' : 'bg-[#262b29] text-[#dfe4e0]'}`}>{option}×</button>)}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded px-2 py-1 text-xs font-bold ${feedPaused ? 'bg-[#f59e0b] text-[#1f1300]' : 'bg-[#00e676] text-[#00210b]'}`}>{feedPaused ? 'Automatic feed paused' : 'Automatic feed running'}</span>
                  <button type="button" onClick={feedPaused ? resumeFeed : pauseFeed} className="min-h-10 rounded-lg bg-[#313633] px-3 text-xs font-bold text-[#dfe4e0]">{feedPaused ? 'Resume and update now' : 'Pause automatic updates'}</button>
                </div>
                <p className="text-[11px] leading-relaxed text-[#bacbb9]">Automatic price arrivals occur every {AUTO_ARRIVAL_CADENCE_MS / 60_000} simulated minutes. Pausing stops arrivals, not aging. Fast-forward pauses for at least one real second at every crossed freshness boundary so no state is skipped.</p>
                <button type="button" onClick={demonstrateAging} className="min-h-11 w-full rounded-lg border border-[#00e676] bg-[#002f18] px-3 text-xs font-bold text-[#75ff9e]">Reset samples &amp; demonstrate aging</button>
              </section>

              <form onSubmit={submitUpdate} className="rounded-xl border border-[#262b29] bg-[#181d1a] p-3 space-y-3" noValidate>
                <h3 className="text-sm font-bold text-[#dfe4e0]">Push one selected price</h3>
                <label className="block text-xs text-[#bacbb9]">Tracked price
                  <select value={selectedId} onChange={(event) => { const record = prices.find((price) => price.id === event.target.value); setSelectedId(event.target.value); setInputValue(String(record?.value ?? '')); setError(''); }} className="mt-1 min-h-11 w-full rounded-lg border border-[#3b4a3d] bg-[#0a0f0d] px-3 text-[#dfe4e0]">
                    {prices.map((price) => <option key={`${price.sourceType}-${price.id}`} value={price.id}>{price.source}: {price.name} — {price.location}</option>)}
                  </select>
                </label>
                <label className="block text-xs text-[#bacbb9]">Price value ({selected?.unit})
                  <input type="number" min="0" step="any" value={inputValue} onChange={(event) => setInputValue(event.target.value)} aria-invalid={!!error} aria-describedby={error ? 'price-error' : undefined} className="mt-1 min-h-11 w-full rounded-lg border border-[#3b4a3d] bg-[#0a0f0d] px-3 font-mono text-[#dfe4e0]" />
                </label>
                {error && <p id="price-error" role="alert" className="text-xs text-[#ffb4ab]">{error}</p>}
                <button type="submit" className="min-h-11 w-full rounded-lg bg-[#00e676] px-3 text-sm font-bold text-[#00210b]">Push one update</button>
                <p className="text-[11px] text-[#859585]">Manual injection works while paused and does not resume the feed. Automatic arrivals refresh timestamps but retain manually chosen values.</p>
              </form>

              <section aria-labelledby="tracked-prices-title" className="space-y-2">
                <h3 id="tracked-prices-title" className="text-sm font-bold text-[#dfe4e0]">All tracked prices ({prices.length})</h3>
                {prices.map((price) => {
                  const freshness = getFreshness(price.sourceType, price.observedAt, now);
                  const unavailable = freshness === 'outdated' || freshness === 'unknown';
                  return <article key={`${price.sourceType}-${price.id}`} className="rounded-xl border border-[#262b29] bg-[#181d1a] p-3">
                    <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase text-[#4edea3]">{price.source}</p><h4 className="text-sm font-bold text-[#dfe4e0]">{price.name}</h4><p className="text-xs text-[#bacbb9]">{price.location}</p></div><div className="text-right"><p className="font-mono text-sm font-bold text-[#dfe4e0]">{unavailable ? '—' : `₦${price.value.toLocaleString()}`}</p><p className="text-[10px] text-[#bacbb9]">{price.unit}</p></div></div>
                    <p className="mt-2 text-xs font-semibold text-[#ffcf70]">{getFreshnessLabel(price.sourceType, price.observedAt, now)}</p>
                    {unavailable && <details className="mt-2 text-[10px] text-[#859585]"><summary>Historical/demo detail</summary><p>Last simulated numeric value: ₦{price.value.toLocaleString()}{price.unit}; raw age: {getAgeMs(now, price.observedAt) ?? 'unknown'} ms.</p></details>}
                  </article>;
                })}
              </section>

              <section className="rounded-xl border border-[#262b29] bg-[#181d1a] p-3"><h3 className="text-sm font-bold text-[#dfe4e0]">Transition history</h3>{history.length === 0 ? <p className="mt-2 text-xs text-[#859585]">No transitions yet.</p> : <ol className="mt-2 space-y-1 text-xs text-[#bacbb9]">{history.map((entry) => <li key={entry.id}><time className="font-mono text-[#4edea3]">{new Date(entry.at).toLocaleTimeString()}</time> — {entry.summary}</li>)}</ol>}</section>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
