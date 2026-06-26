import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { sfx, unlockAudio } from "@/lib/sfx";

/* ─── Katana SVG ─────────────────────────────────────────────── */
function KatanaSvg({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 60 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="blade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b0c8e8" />
          <stop offset="35%" stopColor="#eaf3ff" />
          <stop offset="55%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#ccd9ea" />
          <stop offset="100%" stopColor="#7090b0" />
        </linearGradient>
        <linearGradient id="bladeEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#aaccee" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="guard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#555" />
          <stop offset="50%" stopColor="#222" />
          <stop offset="100%" stopColor="#444" />
        </linearGradient>
        <linearGradient id="handle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a1008" />
          <stop offset="50%" stopColor="#3a2810" />
          <stop offset="100%" stopColor="#1a1008" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Blade tip */}
      <polygon points="30,0 25,30 35,30" fill="url(#blade)" />
      {/* Main blade */}
      <rect x="24" y="28" width="12" height="330" fill="url(#blade)" />
      {/* Blade edge highlight */}
      <rect x="24" y="28" width="2" height="330" fill="url(#bladeEdge)" />
      {/* Blade back */}
      <rect x="34" y="28" width="1.5" height="330" fill="#9ab0cc" opacity="0.6" />
      {/* Blade shine */}
      <rect x="27" y="40" width="1" height="300" fill="white" opacity="0.35" />

      {/* Habaki (blade collar) */}
      <rect x="22" y="355" width="16" height="12" rx="1" fill="#888" />
      <rect x="23" y="356" width="14" height="10" rx="1" fill="#aaa" opacity="0.4" />

      {/* Tsuba (guard) — decorative octagon */}
      <ellipse cx="30" cy="372" rx="19" ry="10" fill="url(#guard)" />
      <ellipse cx="30" cy="370" rx="17" ry="8" fill="none" stroke="#555" strokeWidth="1" />
      {/* Guard detail */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        const x = 30 + Math.cos(r) * 14;
        const y = 370 + Math.sin(r) * 6;
        return <circle key={a} cx={x} cy={y} r="1" fill="#666" />;
      })}

      {/* Tsuka (handle) */}
      <rect x="25" y="380" width="10" height="130" rx="3" fill="url(#handle)" />
      {/* Handle wrap — diamond pattern */}
      {Array.from({ length: 10 }).map((_, i) => (
        <rect
          key={i}
          x="24"
          y={385 + i * 12}
          width="12"
          height="5"
          rx="1"
          fill="#2a1a08"
          opacity="0.7"
          transform={`skewX(-8)`}
        />
      ))}
      {/* Handle cord color */}
      {Array.from({ length: 10 }).map((_, i) => (
        <rect
          key={i}
          x="25"
          y={387 + i * 12}
          width="10"
          height="3"
          rx="1"
          fill="#1a0a00"
          opacity="0.5"
        />
      ))}

      {/* Kashira (pommel) */}
      <ellipse cx="30" cy="512" rx="7" ry="5" fill="#333" />
      <ellipse cx="30" cy="510" rx="5" ry="3" fill="#555" opacity="0.5" />
    </svg>
  );
}

/* ─── Spark particles ─────────────────────────────────────────── */
const SPARKS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  angle: (i / 32) * 360 + Math.random() * 11 - 5,
  speed: 80 + Math.random() * 160,
  size: 2 + Math.random() * 4,
  dur: 0.4 + Math.random() * 0.5,
  color: i % 3 === 0 ? "#fff9c4" : i % 3 === 1 ? "#ffffff" : "#ffe082",
}));

function Sparks({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {SPARKS.map((s) => {
            const rad = (s.angle * Math.PI) / 180;
            return (
              <motion.div
                key={s.id}
                className="absolute rounded-full"
                style={{
                  width: s.size,
                  height: s.size,
                  background: s.color,
                  boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
                  left: "50%",
                  top: "50%",
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(rad) * s.speed,
                  y: Math.sin(rad) * s.speed,
                  opacity: 0,
                  scale: 0.2,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: s.dur, ease: "easeOut" }}
              />
            );
          })}
          {/* Central flash */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 120,
              height: 120,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(255,255,240,1) 0%, rgba(255,230,100,0.6) 30%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─── Percentage counter (runs during drag phase) ──────────────── */
function PercentageLoader({ progress }: { progress: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
      {/* 天 kanji watermark */}
      <div
        className="absolute select-none font-serif text-white"
        style={{
          fontSize: "clamp(12rem, 40vw, 28rem)",
          opacity: 0.03,
          lineHeight: 1,
        }}
      >
        天
      </div>
      <div className="relative text-center">
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.38em] text-white/35">
          天 · Syndicate · 2026
        </div>
        <div
          className="select-none text-white"
          style={{
            fontFamily:
              "'SF Pro Display', 'Inter Tight', -apple-system, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.8rem, 10vw, 8rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.93,
          }}
        >
          TENXIKU
        </div>
        <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
          The Ultimate PvP Empire
        </div>
      </div>
      {/* Progress bar */}
      <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-white/5">
        <motion.div
          className="h-full bg-white/30"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="absolute bottom-[12vh] flex w-full items-end justify-between px-[8vw]">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
          Loading
        </span>
        <span className="font-mono text-[11px] tabular-nums text-white/50">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────── */
type Phase =
  | "clash-in"      // katanas fly in
  | "clash-impact"  // sparks + flash at impact
  | "clash-out"     // katanas retract
  | "center-drop"   // center katana drops in
  | "drag"          // user can drag katana up
  | "reveal"        // site revealing
  | "done";

export function OpeningAnimation() {
  const [phase, setPhase] = useState<Phase>("clash-in");
  const [sparksActive, setSparksActive] = useState(false);
  const [dragProgress, setDragProgress] = useState(0); // 0–1
  const [screenShake, setScreenShake] = useState(false);
  const dragY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredReveal = useRef(false);

  // How much the curtain has pulled back (0 = closed, 1 = fully open)
  const revealProgress = useTransform(dragY, [0, -400], [0, 1]);

  // Map drag to percent display
  useEffect(() => {
    return revealProgress.on("change", (v) => {
      setDragProgress(Math.min(1, Math.max(0, v)));
      if (v >= 0.9 && !hasTriggeredReveal.current) {
        hasTriggeredReveal.current = true;
        triggerReveal();
      }
    });
  });

  const triggerReveal = useCallback(() => {
    setPhase("reveal");
    // Animate the rest of the drag to completion
    animate(dragY, -520, { duration: 0.4, ease: [0.76, 0, 0.24, 1] });
    sfx.boom?.();
    setTimeout(() => setPhase("done"), 900);
  }, [dragY]);

  // Sequence timings
  useEffect(() => {
    unlockAudio();

    // Phase: clash-in (0–1.2s): katanas fly in from sides
    const t1 = setTimeout(() => {
      setPhase("clash-impact");
      setSparksActive(true);
      setScreenShake(true);
      sfx.boom?.();
      setTimeout(() => setScreenShake(false), 300);
      setTimeout(() => setSparksActive(false), 700);
    }, 1200);

    // Phase: clash-out (1.9s): katanas retract
    const t2 = setTimeout(() => {
      setPhase("clash-out");
    }, 1900);

    // Phase: center-drop (2.7s): vertical katana drops in
    const t3 = setTimeout(() => {
      setPhase("center-drop");
      sfx.whoosh?.();
    }, 2700);

    // Phase: drag (3.5s)
    const t4 = setTimeout(() => {
      setPhase("drag");
      sfx.chime?.();
    }, 3500);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  if (phase === "done") return null;

  /* ── Curtain clip: split top/bottom as katana is dragged ── */
  const topH = useTransform(dragY, [0, -520], ["50%", "0%"]);
  const botH = useTransform(dragY, [0, -520], ["50%", "0%"]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[300] overflow-hidden"
    >
      {/* ── Curtain panels (reveal from center as dragged) ── */}
      {(phase === "drag" || phase === "reveal") && (
        <>
          {/* Content below curtain: loader */}
          <div className="absolute inset-0 bg-[#050508]">
            <PercentageLoader progress={dragProgress} />
          </div>
          {/* Top curtain */}
          <motion.div
            className="absolute inset-x-0 top-0 bg-[#050508] z-10"
            style={{ height: topH }}
          />
          {/* Bottom curtain */}
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-[#050508] z-10"
            style={{ height: botH }}
          />
        </>
      )}

      {/* ── Background for clash phases ── */}
      {phase !== "drag" && phase !== "reveal" && (
        <motion.div
          className="absolute inset-0 bg-[#050508]"
          animate={screenShake ? { x: [-4, 4, -6, 6, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      )}

      {/* ── Clash phase content ── */}
      <AnimatePresence>
        {(phase === "clash-in" ||
          phase === "clash-impact" ||
          phase === "clash-out") && (
          <motion.div
            key="clash"
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Background radial glow */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={
                phase === "clash-impact"
                  ? { opacity: [0, 1, 0.3] }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.6 }}
            >
              <div
                style={{
                  width: 600,
                  height: 600,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,240,180,0.25) 0%, rgba(255,200,50,0.08) 40%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* ── LEFT KATANA (comes from bottom-left, rotated) ── */}
            <motion.div
              className="absolute"
              style={{
                width: 60,
                height: 520,
                left: "50%",
                top: "50%",
                originX: "50%",
                originY: "100%",
              }}
              initial={{
                x: "-200vw",
                y: "30vh",
                rotate: 45,
                opacity: 0,
              }}
              animate={
                phase === "clash-in"
                  ? {
                      x: "-140px",
                      y: "-260px",
                      rotate: 45,
                      opacity: 1,
                    }
                  : phase === "clash-impact"
                  ? {
                      x: "-130px",
                      y: "-260px",
                      rotate: 45,
                      opacity: 1,
                    }
                  : {
                      x: "-250vw",
                      y: "50vh",
                      rotate: 45,
                      opacity: 0,
                    }
              }
              transition={
                phase === "clash-in"
                  ? { duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }
                  : phase === "clash-impact"
                  ? { duration: 0.05 }
                  : { duration: 0.45, ease: [0.55, 0, 1, 0.45] }
              }
            >
              <KatanaSvg
                style={{ filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))" }}
              />
            </motion.div>

            {/* ── RIGHT KATANA (comes from bottom-right, rotated) ── */}
            <motion.div
              className="absolute"
              style={{
                width: 60,
                height: 520,
                left: "50%",
                top: "50%",
                originX: "50%",
                originY: "100%",
              }}
              initial={{
                x: "200vw",
                y: "30vh",
                rotate: -45,
                opacity: 0,
                scaleX: -1,
              }}
              animate={
                phase === "clash-in"
                  ? {
                      x: "80px",
                      y: "-260px",
                      rotate: -45,
                      opacity: 1,
                      scaleX: -1,
                    }
                  : phase === "clash-impact"
                  ? {
                      x: "70px",
                      y: "-260px",
                      rotate: -45,
                      opacity: 1,
                      scaleX: -1,
                    }
                  : {
                      x: "250vw",
                      y: "50vh",
                      rotate: -45,
                      opacity: 0,
                      scaleX: -1,
                    }
              }
              transition={
                phase === "clash-in"
                  ? { duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }
                  : phase === "clash-impact"
                  ? { duration: 0.05 }
                  : { duration: 0.45, ease: [0.55, 0, 1, 0.45] }
              }
            >
              <KatanaSvg
                style={{ filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))" }}
              />
            </motion.div>

            {/* Sparks at center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparks active={sparksActive} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CENTER KATANA — drops in, then becomes draggable ── */}
      <AnimatePresence>
        {(phase === "center-drop" || phase === "drag" || phase === "reveal") && (
          <motion.div
            key="center-katana"
            className="absolute z-20"
            style={{
              width: 60,
              left: "50%",
              x: "-50%",
              height: 520,
            }}
            initial={{ y: "-130vh", opacity: 0, rotate: 0 }}
            animate={
              phase === "center-drop"
                ? { y: "calc(50vh - 420px)", opacity: 1, rotate: 0 }
                : { y: "calc(50vh - 420px)", opacity: 1, rotate: 0 }
            }
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={
              phase === "center-drop"
                ? { duration: 0.55, ease: [0.2, 1.2, 0.4, 1] }
                : { duration: 0 }
            }
          >
            {/* The draggable wrapper — only active in drag phase */}
            <motion.div
              drag={phase === "drag" ? "y" : false}
              dragConstraints={{ top: -520, bottom: 0 }}
              dragElastic={0.08}
              style={{ y: dragY, cursor: phase === "drag" ? "grab" : "default" }}
              whileDrag={{ cursor: "grabbing" }}
              onDragEnd={(_, info) => {
                if (info.offset.y < -160 || info.velocity.y < -400) {
                  triggerReveal();
                } else if (!hasTriggeredReveal.current) {
                  // Snap back
                  animate(dragY, 0, {
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                  });
                  setDragProgress(0);
                }
              }}
            >
              <KatanaSvg
                style={{
                  filter:
                    "drop-shadow(0 0 20px rgba(255,255,255,0.5)) drop-shadow(0 4px 30px rgba(100,160,255,0.3))",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Swipe hint (drag phase only) ── */}
      <AnimatePresence>
        {phase === "drag" && (
          <motion.div
            key="hint"
            className="pointer-events-none absolute bottom-[14vh] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Chevrons */}
            <motion.div
              className="flex flex-col items-center gap-1"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                >
                  <svg width="20" height="12" viewBox="0 0 20 12">
                    <polyline
                      points="2,10 10,2 18,10"
                      fill="none"
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
            <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/40">
              Drag to Enter
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Screen-edge vignette ── */}
      <div
        className="pointer-events-none absolute inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />
    </div>
  );
}
