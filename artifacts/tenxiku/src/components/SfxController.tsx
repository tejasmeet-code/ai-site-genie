import { useEffect, useState } from "react";
import { sfx, setMuted, isMuted, unlockAudio, startAmbient, stopAmbient } from "@/lib/sfx";

export function SfxController() {
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    const unlock = () => {
      unlockAudio();
      if (!isMuted()) startAmbient();
    };
    const opts = { once: true, passive: true } as AddEventListenerOptions;
    window.addEventListener("pointerdown", unlock, opts);
    window.addEventListener("touchstart", unlock, opts);
    window.addEventListener("keydown", unlock, opts);

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("a, button, [role='button']")) sfx.click();
    };
    let lastHover: Element | null = null;
    const onPointerOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement)?.closest("a, button, [role='button']");
      if (t && t !== lastHover) {
        lastHover = t;
        sfx.hover();
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", onPointerOver);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            sfx.reveal();
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    setTimeout(() => {
      document.querySelectorAll("section[id]").forEach((s) => io.observe(s));
    }, 500);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", onPointerOver);
      io.disconnect();
      stopAmbient();
    };
  }, []);

  const toggle = () => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
    if (!next) {
      unlockAudio();
      startAmbient();
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
      className="fixed bottom-5 right-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-hair bg-background/70 text-foreground shadow-lg backdrop-blur-md transition hover:scale-105"
    >
      {muted ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
      )}
    </button>
  );
}
