export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden>
      <style>{`
        @keyframes tk-spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes tk-spin-rev  { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes tk-spin-tilt { from { transform: rotateX(65deg) rotate(0deg); } to { transform: rotateX(65deg) rotate(360deg); } }
        @keyframes tk-orb-orbit {
          0%   { transform: translate(-50%, -50%) rotate(0deg) translateX(140px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg); }
        }
        @keyframes tk-breathe {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.06); opacity: 1; }
        }
        @keyframes tk-flicker {
          0%, 100% { opacity: 0.8; box-shadow: 0 0 12px 4px rgba(255,255,255,0.9); }
          50% { opacity: 1; box-shadow: 0 0 20px 8px rgba(255,255,255,1); }
        }
        @keyframes tk-glow-pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.30; }
        }
      `}</style>

      {/* Ambient glow layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{
          width: 520, height: 520, borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.62 0.21 265 / 0.18) 0%, transparent 70%)",
          animation: "tk-glow-pulse 4s ease-in-out infinite",
        }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.7 0.25 280 / 0.12) 0%, transparent 70%)",
          animation: "tk-glow-pulse 4s ease-in-out infinite 1.5s",
        }} />
      </div>

      {/* Central icosahedron (stylized with CSS polygon) */}
      <div className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>
        <div style={{
          width: 180, height: 180,
          background: "linear-gradient(135deg, oklch(0.2 0.015 250) 0%, oklch(0.08 0.01 250) 100%)",
          clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
          boxShadow: "0 0 80px 20px oklch(0.62 0.21 265 / 0.15), inset 0 0 40px oklch(0.4 0.1 265 / 0.2)",
          animation: "tk-breathe 5s ease-in-out infinite",
          position: "relative",
          zIndex: 2,
        }}>
          {/* Inner facet sheen */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)",
            clipPath: "inherit",
          }} />
        </div>

        {/* Ring 1 — white */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          perspective: 800,
        }}>
          <div style={{
            width: 260, height: 260, borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.55)",
            boxShadow: "0 0 8px rgba(255,255,255,0.2)",
            transformStyle: "preserve-3d",
            animation: "tk-spin-tilt 12s linear infinite",
          }} />
        </div>

        {/* Ring 2 — purple, different tilt */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          perspective: 800,
        }}>
          <div style={{
            width: 300, height: 300, borderRadius: "50%",
            border: "1px solid oklch(0.65 0.22 280 / 0.7)",
            boxShadow: "0 0 12px oklch(0.65 0.22 280 / 0.3)",
            transformStyle: "preserve-3d",
            animation: "tk-spin-tilt 18s linear infinite reverse",
            transform: "rotateX(55deg) rotateZ(30deg)",
          }} />
        </div>

        {/* Ring 3 — thin outer */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 340, height: 340, borderRadius: "50%",
            border: "0.5px solid rgba(255,255,255,0.15)",
            animation: "tk-spin-slow 30s linear infinite",
          }} />
        </div>

        {/* Orbiting white spec */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          animation: "tk-orb-orbit 6s linear infinite",
          zIndex: 10,
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 0 12px 4px rgba(255,255,255,0.9)",
            animation: "tk-flicker 2s ease-in-out infinite",
          }} />
        </div>

        {/* Second orbiting spec — slower, opposite */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          animation: "tk-orb-orbit 9s linear infinite reverse",
          zIndex: 10,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "oklch(0.7 0.25 280)",
            boxShadow: "0 0 10px 3px oklch(0.7 0.25 280 / 0.8)",
          }} />
        </div>
      </div>

      {/* Subtle radial grid lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
        <svg width="600" height="600" viewBox="0 0 600 600">
          {[80, 130, 180, 230, 280].map((r) => (
            <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="white" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={300} y1={300}
                x2={300 + Math.cos(a) * 280}
                y2={300 + Math.sin(a) * 280}
                stroke="white" strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
