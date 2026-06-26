import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { sfx, unlockAudio } from "@/lib/sfx";

/**
 * aikawakenichi.com-style loading intro:
 * – Black screen with the brand name + live percentage counter
 * – Counter animates from 0 → 100 (eased, not linear)
 * – At 100 %: brief pause, then a split-panel wipe reveals the site
 */
export function OpeningAnimation() {
  const [done, setDone] = useState(false);
  const [exit, setExit] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}%`);
  const progressW = useTransform(count, [0, 100], ["0%", "100%"]);

  // Display value via ref to avoid re-renders
  const numRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const unsub = rounded.on("change", (v) => {
      if (numRef.current) numRef.current.textContent = v;
    });
    return unsub;
  }, [rounded]);

  useEffect(() => {
    unlockAudio();
    sfx.whoosh?.();

    // Ease the counter: slow start, burst in middle, settle at end
    const ctrl = animate(count, 100, {
      duration: 2.8,
      ease: [0.22, 0.61, 0.36, 1],
      onComplete: () => {
        // Brief hold at 100%, then split exit
        setTimeout(() => {
          sfx.boom?.();
          setExit(true);
        }, 420);
        setTimeout(() => {
          sfx.whoosh?.();
          setDone(true);
        }, 1380);
      },
    });
    return () => ctrl.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[300] pointer-events-none">
      {/* ── TOP panel (slides up on exit) ── */}
      <motion.div
        className="absolute inset-x-0 top-0 bg-[#050508]"
        initial={{ height: "50%" }}
        animate={exit ? { height: "0%" } : { height: "50%" }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: exit ? 0 : 0 }}
        style={{ originY: 0 }}
      />

      {/* ── BOTTOM panel (slides down on exit) ── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-[#050508]"
        initial={{ height: "50%" }}
        animate={exit ? { height: "0%" } : { height: "50%" }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: exit ? 0 : 0 }}
        style={{ originY: 1 }}
      />

      {/* ── Content: fades out as exit begins ── */}
      <AnimatePresence>
        {!exit && (
          <motion.div
            key="content"
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeIn" }}
          >
            {/* Subtle kanji watermark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.035 }}
              transition={{ duration: 1.8, delay: 0.3 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
              style={{ fontSize: "clamp(12rem, 40vw, 28rem)", fontFamily: "serif", color: "#fff", lineHeight: 1 }}
            >
              天
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative text-center"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.38em" }}
                transition={{ duration: 1.1, delay: 0.15 }}
                className="mb-5 font-mono text-[10px] uppercase text-white/35"
              >
                天 · Syndicate · 2026
              </motion.div>

              {/* Main name — large serif / display */}
              <div
                className="select-none text-white"
                style={{
                  fontFamily: "'SF Pro Display', 'Inter Tight', -apple-system, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.8rem, 10vw, 8rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.93,
                }}
              >
                TENXIKU
              </div>

              {/* Sub-label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30"
              >
                The Ultimate PvP Empire
              </motion.div>
            </motion.div>

            {/* Percentage counter row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-[12vh] flex w-full items-end justify-between px-[8vw]"
            >
              {/* Left label */}
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
                Loading
              </span>

              {/* Counter — big, right-aligned */}
              <motion.span
                ref={numRef}
                className="font-mono text-[11px] tabular-nums text-white/50"
              >
                0%
              </motion.span>
            </motion.div>

            {/* Thin progress line at very bottom */}
            <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-white/5">
              <motion.div
                className="h-full bg-white/30"
                style={{ width: progressW }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
