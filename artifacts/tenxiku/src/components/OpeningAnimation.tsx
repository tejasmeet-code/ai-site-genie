import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { sfx, unlockAudio } from "@/lib/sfx";
import { TenxikuLogo } from "@/assets/TenxikuLogo";

export function OpeningAnimation() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    unlockAudio();
    const a = setTimeout(() => sfx.whoosh(), 200);
    const b = setTimeout(() => sfx.boom(), 900);
    const c = setTimeout(() => sfx.chime(), 1600);
    const d = setTimeout(() => sfx.whoosh(), 3200);
    const t = setTimeout(() => setOpen(false), 3600);
    return () => [a, b, c, d, t].forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(24px)" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: "#050507" }}
        >
          {/* Moon glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute left-1/2 top-[18%] h-[55vmin] w-[55vmin] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,250,0.95) 0%, rgba(220,220,230,0.55) 22%, rgba(120,120,140,0.18) 45%, rgba(0,0,0,0) 70%)",
              filter: "blur(6px)",
            }}
          />

          {/* Ink wash background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.4 }}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 80%, rgba(20,18,30,1) 0%, rgba(5,5,7,1) 65%), radial-gradient(ellipse at 50% 20%, rgba(60,60,80,0.4) 0%, rgba(0,0,0,0) 60%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Falling ink flecks */}
          <div className="absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: "110vh", opacity: [0, 0.8, 0] }}
                transition={{
                  delay: 0.2 + Math.random() * 2.5,
                  duration: 3 + Math.random() * 3,
                  ease: "easeIn",
                  repeat: Infinity,
                }}
                className="absolute block rounded-full bg-white/70"
                style={{
                  left: `${Math.random() * 100}%`,
                  width: 1 + Math.random() * 2,
                  height: 1 + Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Brush stroke swoosh behind logo */}
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            width="min(90vw, 1100px)"
            viewBox="0 0 1100 400"
            fill="none"
            aria-hidden
          >
            <motion.path
              d="M 40 230 C 220 90, 520 80, 740 200 S 1020 360, 1060 220"
              stroke="white"
              strokeWidth="42"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.85, 0.35] }}
              transition={{ delay: 0.7, duration: 1.7, ease: [0.7, 0, 0.3, 1] }}
              style={{ filter: "url(#ink) drop-shadow(0 0 30px rgba(255,255,255,0.4))" }}
            />
            <defs>
              <filter id="ink">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
                <feDisplacementMap in="SourceGraphic" scale="6" />
              </filter>
            </defs>
          </svg>

          {/* Logo reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.4, duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 text-center"
          >
            <TenxikuLogo
              className="mx-auto w-[min(82vw,820px)] select-none text-white"
              style={{ filter: "drop-shadow(0 12px 60px rgba(255,255,255,0.25))" } as CSSProperties}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.8 }}
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.5em] text-white/60"
            >
              The Ultimate PvP Empire
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.3, duration: 1.0, ease: [0.7, 0, 0.3, 1] }}
              className="mx-auto mt-5 h-px origin-left bg-white/50"
              style={{ width: "min(220px, 50vw)" }}
            />
          </motion.div>

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
