import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useState } from "react";

const TESTIMONIALS = [
  {
    quote: "KYAA.ai helped us flag and fix 17 hallucinations before go‑live.",
    author: "CTO, FinTech AI",
  },
  {
    quote: "The expert feedback was actionable and fast.",
    author: "Head of Product, HealthTech",
  },
  {
    quote: "We improved our model's compliance thanks to KYAA.ai reviewers.",
    author: "AI Lead, LegalTech",
  },
];

const CARD_WIDTH = 320;
const CARD_GAP = 32;

export default function TestimonialsCarousel({ quoteIcon }: { quoteIcon: ReactNode }) {
  // How many placeholders at the end of the real list
  const [placeholders, setPlaceholders] = useState(2);
  useLayoutEffect(() => {
    const upd = () => setPlaceholders(window.innerWidth < 640 ? 1 : 2);
    upd();
    window.addEventListener("resize", upd, { passive: true });
    return () => window.removeEventListener("resize", upd);
  }, []);

  // Build a "base" list = real testimonials + placeholders
  const base = [...TESTIMONIALS, ...Array(placeholders).fill(null)];
  const baseLen = base.length;

  // Triple‑clone for infinite loop
  const extended = [...base, ...base, ...base];

  // Current index into `extended`. Start at the beginning of the middle copy for smooth infinite scroll
  const [index, setIndex] = useState(baseLen);

  // Control CSS transitions
  const [disableTransition, setDisableTransition] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Handlers
  const movePrev = () => {
    if (animating) return;
    setIndex((i) => i - 1);
    setAnimating(true);
  };
  const moveNext = () => {
    if (animating) return;
    setIndex((i) => i + 1);
    setAnimating(true);
  };

  // After each CSS transition, jump back into the center copy if needed
  const handleTransitionEnd = () => {
    setAnimating(false);
    if (index >= 2 * baseLen) {
      // Moved past end of middle copy
      setDisableTransition(true);
      setIndex(baseLen);
    } else if (index < baseLen) {
      // Moved before start of middle copy
      setDisableTransition(true);
      setIndex(2 * baseLen - 1);
    }
  };

  // Re‑enable transitions on next frame after a jump
  useEffect(() => {
    if (disableTransition) {
      requestAnimationFrame(() => setDisableTransition(false));
    }
  }, [disableTransition]);

  // Compute transform: card+gap times index
  const offset = -(CARD_WIDTH + CARD_GAP) * index;

  return (
    <section className="relative w-full max-w-[80vw] mx-auto overflow-hidden">
      {/* Prev button */}
      <button
        onClick={movePrev}
        aria-label="Prev"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 z-10"
      >
        ‹
      </button>

      {/* Carousel track */}
      <div className="relative w-full overflow-hidden py-4">
        <div
          className="flex gap-[32px] justify-start items-stretch"
          style={{
            transform: `translateX(${offset}px)`,
            transition: disableTransition ? "none" : "transform 0.3s ease",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((t, idx) =>
            t ? (
              <div
                key={`${idx}-${t.author}`}
                className="flex-shrink-0 min-w-[320px] max-w-[320px] border-2 border-dashed border-[#338AFF] rounded-xl p-8 flex flex-col gap-4 text-white bg-[#12162c]"
                style={{ gap: "1rem" }}
              >
                <span className="text-base md:text-xl leading-none flex items-start justify-start mb-2">
                  {quoteIcon}
                </span>
                <p className="flex-1 font-inter text-lg md:text-xl">{t.quote}"</p>
                <span className="font-inter text-sm text-white/70">{t.author}</span>
              </div>
            ) : (
              // invisible placeholder
              <div
                key={`ph-${idx}`}
                className="flex-shrink-0"
                style={{ width: CARD_WIDTH }}
              />
            )
          )}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={moveNext}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 z-10"
      >
        ›
      </button>
    </section>
  );
}
