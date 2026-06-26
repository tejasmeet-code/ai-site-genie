import { useMemo } from "react";

export function Petals({ count = 22, className = "" }: { count?: number; className?: string }) {
  const seeds = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 14,
        delay: -Math.random() * 18,
        dur: 14 + Math.random() * 18,
        drift: (Math.random() - 0.5) * 60,
        rot: Math.random() * 360,
        opacity: 0.18 + Math.random() * 0.35,
      })),
    [count]
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {seeds.map((s) => (
        <span
          key={s.i}
          className="petal absolute block"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
            opacity: s.opacity,
            ["--drift" as string]: `${s.drift}px`,
            ["--rot" as string]: `${s.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}
