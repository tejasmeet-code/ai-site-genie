import { motion } from "framer-motion";

const RING_COUNT = 5;
const PARTICLE_COUNT = 20;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  angle: (i / PARTICLE_COUNT) * 360,
  radius: 180 + (i % 3) * 60,
  size: 1.5 + (i % 4) * 1.5,
  dur: 12 + (i % 5) * 4,
  delay: -(i * 1.2),
  opacity: 0.3 + (i % 3) * 0.25,
}));

export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      aria-hidden
      style={{ perspective: 1000 }}
    >
      <style>{`
        @keyframes tk-orbit { from { transform: rotate(var(--s,0deg)); } to { transform: rotate(calc(var(--s,0deg) + 360deg)); } }
        @keyframes tk-orbit-rev { from { transform: rotate(var(--s,0deg)); } to { transform: rotate(calc(var(--s,0deg) - 360deg)); } }
        @keyframes tk-breathe { 0%,100%{transform:scale(1) rotateX(0deg);opacity:0.85;} 50%{transform:scale(1.05) rotateX(2deg);opacity:1;} }
        @keyframes tk-glow { 0%,100%{opacity:0.18;} 50%{opacity:0.38;} }
        @keyframes tk-spin3d { from{transform:rotateX(60deg) rotateZ(0deg);} to{transform:rotateX(60deg) rotateZ(360deg);} }
        @keyframes tk-spin3d-b { from{transform:rotateX(72deg) rotateZ(20deg);} to{transform:rotateX(72deg) rotateZ(380deg);} }
        @keyframes tk-spin3d-c { from{transform:rotateX(50deg) rotateZ(40deg);} to{transform:rotateX(50deg) rotateZ(400deg);} }
        @keyframes tk-dot-glow { 0%,100%{box-shadow:0 0 8px 2px rgba(255,255,255,0.8);} 50%{box-shadow:0 0 20px 6px rgba(200,180,255,1);} }
        @keyframes tk-ink-fade { 0%{opacity:0;transform:scale(0.85) rotate(-5deg);} 100%{opacity:1;transform:scale(1) rotate(0deg);} }
        @keyframes tk-halo { 0%,100%{transform:scale(1);opacity:0.4;} 50%{transform:scale(1.08);opacity:0.7;} }
      `}</style>

      {/* Outer ambient halos */}
      {[560, 440, 340].map((s, i) => (
        <div
          key={s}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: s, height: s,
            background: `radial-gradient(circle, ${
              i === 0 ? "oklch(0.55 0.18 260 / 0.12)" :
              i === 1 ? "oklch(0.6 0.22 290 / 0.15)" :
              "oklch(0.65 0.25 280 / 0.18)"
            } 0%, transparent 70%)`,
            animation: `tk-halo ${4 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}

      {/* 3D spinning rings */}
      {[
        { w: 320, dur: "14s", anim: "tk-spin3d",   color: "rgba(255,255,255,0.5)", thick: 1.5, shadow: "0 0 8px rgba(255,255,255,0.2)" },
        { w: 280, dur: "9s",  anim: "tk-spin3d-b",  color: "oklch(0.68 0.26 285 / 0.65)", thick: 1, shadow: "0 0 12px oklch(0.68 0.26 285 / 0.3)" },
        { w: 360, dur: "20s", anim: "tk-spin3d-c",  color: "rgba(255,255,255,0.2)", thick: 0.5, shadow: "none" },
        { w: 240, dur: "7s",  anim: "tk-spin3d",    color: "oklch(0.72 0.3 300 / 0.4)", thick: 0.8, shadow: "0 0 10px oklch(0.72 0.3 300 / 0.3)" },
        { w: 400, dur: "26s", anim: "tk-orbit-rev", color: "rgba(255,255,255,0.08)", thick: 0.5, shadow: "none" },
      ].map((ring, i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: ring.w, height: ring.w,
            border: `${ring.thick}px solid ${ring.color}`,
            boxShadow: ring.shadow,
            animation: `${ring.anim} ${ring.dur} linear infinite`,
            transformStyle: "preserve-3d",
          }}
        />
      ))}

      {/* Central hexagon core */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        style={{
          width: 160, height: 160,
          clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
          background: "linear-gradient(145deg, oklch(0.22 0.03 260) 0%, oklch(0.08 0.015 250) 100%)",
          boxShadow: "0 0 60px 20px oklch(0.55 0.2 270 / 0.2), inset 0 0 30px oklch(0.4 0.12 270 / 0.3)",
          animation: "tk-breathe 5s ease-in-out infinite",
        }}
      >
        {/* Inner sheen */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%)",
          clipPath: "inherit",
        }} />
        {/* Kanji center */}
        <span style={{
          fontFamily: "serif",
          fontSize: 56,
          fontWeight: 700,
          color: "rgba(255,255,255,0.12)",
          lineHeight: 1,
          userSelect: "none",
          animation: "tk-ink-fade 1s ease-out both",
        }}>
          天
        </span>
      </motion.div>

      {/* Orbiting particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            width: p.radius * 2, height: p.radius * 2,
            animation: `${p.id % 2 === 0 ? "tk-orbit" : "tk-orbit-rev"} ${p.dur}s linear infinite`,
            animationDelay: `${p.delay}s`,
            "--s": `${p.angle}deg`,
          } as React.CSSProperties}
        >
          <div
            style={{
              position: "absolute",
              top: 0, left: "50%",
              transform: "translateX(-50%)",
              width: p.size, height: p.size,
              borderRadius: "50%",
              background: p.id % 3 === 0 ? "#fff" : p.id % 3 === 1 ? "oklch(0.75 0.28 285)" : "oklch(0.8 0.2 300)",
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.id % 3 === 0 ? "rgba(255,255,255,0.6)" : "oklch(0.7 0.25 285 / 0.5)"}`,
              animation: "tk-dot-glow 2.5s ease-in-out infinite",
              animationDelay: `${p.id * 0.15}s`,
            }}
          />
        </div>
      ))}

      {/* Radial grid lines */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
        <svg width="700" height="700" viewBox="0 0 700 700">
          {[60, 110, 160, 210, 260, 310].map((r) => (
            <circle key={r} cx="350" cy="350" r={r} fill="none" stroke="white" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * 15 * Math.PI) / 180;
            return (
              <line key={i} x1={350} y1={350} x2={350 + Math.cos(a) * 310} y2={350 + Math.sin(a) * 310}
                stroke="white" strokeWidth="0.3" />
            );
          })}
        </svg>
      </div>

      {/* Floating kanji glyphs */}
      {["艦", "命", "道", "力"].map((k, i) => (
        <motion.span
          key={k}
          className="pointer-events-none absolute select-none font-serif text-white/[0.04]"
          style={{
            fontSize: 80,
            top: `${15 + i * 20}%`,
            left: `${10 + i * 22}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 5 + i, ease: "easeInOut", repeat: Infinity, delay: i * 1.2 }}
        >
          {k}
        </motion.span>
      ))}
    </div>
  );
}
