import type { CSSProperties } from "react";

export function TenxikuLogo({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 820 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="TENXIKU"
    >
      <text
        x="50%"
        y="90"
        textAnchor="middle"
        fontFamily="'SF Pro Display', 'Inter', -apple-system, sans-serif"
        fontWeight="800"
        fontSize="96"
        letterSpacing="-4"
        fill="currentColor"
      >
        TENXIKU
      </text>
    </svg>
  );
}
