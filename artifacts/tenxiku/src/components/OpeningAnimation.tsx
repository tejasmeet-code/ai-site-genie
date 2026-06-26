import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { sfx, unlockAudio } from "@/lib/sfx";

const PETALS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  delay: Math.random() * 3.2,
  dur: 3.5 + Math.random() * 4,
  size: 4 + Math.random() * 8,
  rot: Math.random() * 720 - 360,
  drift: (Math.random() - 0.5) * 120,
}));

const DUST = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 3,
  dur: 4 + Math.random() * 6,
  size: 0.8 + Math.random() * 1.6,
}));

export function OpeningAnimation() {
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "done">("in");

  useEffect(() => {
    unlockAudio();
    const t1 = setTimeout(() => sfx.whoosh(), 300);
    const t2 = setTimeout(() => sfx.boom(), 1100);
    const t3 = setTimeout(() => sfx.chime(), 2000);
    const t4 = setTimeout(() => setPhase("hold"), 1800);
    const t5 = setTimeout(() => sfx.whoosh(), 4000);
    const t6 = setTimeout(() => setPhase("out"), 4200);
    const t7 = setTimeout(() => setPhase("done"), 5200);
    return () => [t1, t2, t3, t4, t5, t6, t7].forEach(clearTimeout);
  }, []);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[200] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "out" ? 0 : 1 }}
        transition={{
          duration: phase === "out" ? 0.9 : 0,
          ease: [0.7, 0, 0.3, 1],
        }}
        style={{ background: "#04040a" }}
      >
        {/* Letter-box bars — cinematic */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-50 bg-black"
          initial={{ height: "14vh" }}
          animate={{ height: phase === "hold" ? "8vh" : "14vh" }}
          transition={{ duration: 1.4, ease: [0.7, 0, 0.3, 1] }}
        />
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-50 bg-black"
          initial={{ height: "14vh" }}
          animate={{ height: phase === "hold" ? "8vh" : "14vh" }}
          transition={{ duration: 1.4, ease: [0.7, 0, 0.3, 1] }}
        />

        {/* Full-screen logo image */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 2.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <img
            src="/tenxiku-logo.png"
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-center"
            style={{ filter: "brightness(0.55) contrast(1.15)" }}
          />
        </motion.div>

        {/* Moon glow overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4, duration: 2.2 }}
          style={{
            background:
              "radial-gradient(ellipse 40% 30% at 50% 12%, rgba(255,253,240,0.22) 0%, rgba(200,200,220,0.08) 50%, transparent 80%)",
          }}
        />

        {/* Dark vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Ink wash gradient bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, rgba(4,4,10,0.95) 0%, transparent 100%)",
          }}
        />

        {/* Falling dust particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {DUST.map((p) => (
            <motion.span
              key={p.id}
              className="absolute block rounded-full bg-white"
              style={{ left: p.left, width: p.size, height: p.size, top: -10 }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: "110vh", opacity: [0, 0.6, 0] }}
              transition={{
                delay: p.delay,
                duration: p.dur,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* Falling cherry blossom petals */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {PETALS.map((p) => (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: p.left,
                top: -20,
                width: p.size,
                height: p.size * 0.7,
              }}
              initial={{ y: 0, opacity: 0, rotate: 0, x: 0 }}
              animate={{
                y: "110vh",
                opacity: [0, 0.7, 0.5, 0],
                rotate: p.rot,
                x: p.drift,
              }}
              transition={{
                delay: p.delay,
                duration: p.dur,
                ease: "easeIn",
                repeat: Infinity,
              }}
            >
              <svg viewBox="0 0 20 14" fill="none" className="w-full h-full">
                <ellipse
                  cx="10"
                  cy="7"
                  rx="9"
                  ry="5.5"
                  fill="rgba(255,220,230,0.75)"
                />
                <line
                  x1="10"
                  y1="1"
                  x2="10"
                  y2="13"
                  stroke="rgba(255,180,200,0.4)"
                  strokeWidth="0.5"
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Central content — tagline & line */}
        <motion.div
          className="absolute inset-x-0 bottom-[14vh] flex flex-col items-center gap-4 pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: phase !== "in" ? 1 : 0,
            y: phase !== "in" ? 0 : 20,
          }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase !== "in" ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
            className="h-px origin-center bg-white/40"
            style={{ width: "min(300px,60vw)" }}
          />
          <p className="font-mono text-[10px] uppercase tracking-[0.55em] text-white/60">
            天 · The Ultimate PvP Empire
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase !== "in" ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.7, 0, 0.3, 1] }}
            className="h-px origin-center bg-white/20"
            style={{ width: "min(180px,40vw)" }}
          />
        </motion.div>

        {/* Scan line effect */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-px bg-white/8"
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 2.5, ease: "linear", delay: 0.5, repeat: 1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
