import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, type CSSProperties, useEffect } from "react";
import { HeroScene } from "@/components/HeroScene";
import { OpeningAnimation } from "@/components/OpeningAnimation";
import { Reveal } from "@/components/Reveal";
import { SfxController } from "@/components/SfxController";
import { RolesShowcase } from "@/components/RolesShowcase";
import { Petals } from "@/components/Petals";

const divisions = [
  { id: "01", name: "TK Main Fleet",    bounty: "20M+", captain: "TK_MUN",        region: "AS",      kanji: "壱", tier: "FLAGSHIP" },
  { id: "02", name: "TK Second Fleet",  bounty: "20M+", captain: "TK_SOUL",       region: "AS",      kanji: "弐", tier: "ELITE" },
  { id: "03", name: "TK Third Fleet",   bounty: "15M+", captain: "Tk_Pengu",      region: "EU",      kanji: "参", tier: "ELITE" },
  { id: "04", name: "TK Fourth Fleet",  bounty: "10M+", captain: "TK_FAITH",      region: "EU / AS", kanji: "肆", tier: "VANGUARD" },
  { id: "05", name: "TK Fifth Fleet",   bounty: "10M+", captain: "TK_Liz",        region: "EU",      kanji: "伍", tier: "VANGUARD" },
  { id: "06", name: "TK Sixth Fleet",   bounty: "4M+",  captain: "TK_Spade",      region: "EU",      kanji: "陸", tier: "FRONTIER" },
  { id: "07", name: "TK Seventh Fleet", bounty: "4M+",  captain: "TK_バカ",       region: "AS",      kanji: "漆", tier: "FRONTIER" },
  { id: "08", name: "TK Eighth Fleet",  bounty: "10M+", captain: "PirateXPGamer", region: "AS",      kanji: "捌", tier: "VANGUARD" },
];

const TIER_COLORS: Record<string, string> = {
  FLAGSHIP: "#e0d4ff",
  ELITE:    "#a5b8ff",
  VANGUARD: "#ffd77a",
  FRONTIER: "#80d4ff",
};

const credits = [
  {
    tag: "Visionary",
    name: "mun",
    note: "Original concept, creative direction, and syndicate vision.",
    kanji: "夢",
    color: "#e0d4ff",
    glow: "oklch(0.72 0.28 290)",
    featured: true,
  },
  {
    tag: "Developer",
    name: "@demonXtejas",
    note: "Design, motion, and front-end engineering for the TENXIKU hub.",
    kanji: "匠",
    color: "#a5b8ff",
    glow: "oklch(0.68 0.24 268)",
    featured: true,
  },
  {
    tag: "Co-Developer",
    name: "Solas",
    note: "Co-development and engineering contributions to the TENXIKU hub.",
    kanji: "影",
    color: "#80d4ff",
    glow: "oklch(0.78 0.2 222)",
    featured: true,
  },
  {
    tag: "Command",
    name: "Head Admin & Admin",
    note: "Server architecture, policy, and operations across all eight fleets.",
    kanji: "頭",
    color: "#ffd77a",
    glow: "oklch(0.82 0.2 80)",
  },
  {
    tag: "Syndicate",
    name: "TENXIKU",
    note: "© 2026 TENXIKU SYNDICATE. ALL RIGHTS RESERVED.",
    kanji: "天",
    color: "#aaaaaa",
    glow: "oklch(0.6 0 0)",
  },
];

function FleetRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/5 pt-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">{label}</span>
      <span className="text-xs font-semibold text-white/80">{value}</span>
    </div>
  );
}

/* Cursor glow (desktop only) */
function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[150] hidden md:block"
      style={{
        left: sx, top: sy,
        width: 320, height: 320,
        x: "-50%", y: "-50%",
        background: "radial-gradient(circle, oklch(0.65 0.22 275 / 0.06) 0%, transparent 65%)",
        borderRadius: "50%",
      }}
    />
  );
}

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <>
      <OpeningAnimation />
      <SfxController />
      <CursorGlow />

      {/* ── NAV ── */}
      <header className="glass-nav sticky top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#top" className="group flex items-center gap-2.5">
            <img
              src="/tenxiku-logo.png"
              alt="TENXIKU"
              className="h-8 w-auto object-contain transition-all duration-500 group-hover:scale-105"
              style={{ filter: "brightness(1.1) contrast(1.1)" }}
            />
          </a>
          <ul className="hidden gap-7 text-[11px] font-medium text-white/50 md:flex">
            {["About", "Command", "Fleets", "HQ", "Credits"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="relative transition-colors hover:text-white after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#hq"
            className="group relative overflow-hidden rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10"
          >
            <span className="relative z-10">Join Server</span>
          </a>
        </nav>
      </header>

      <main id="top">
        {/* ── HERO ── */}
        <section ref={heroRef} className="relative isolate min-h-screen overflow-hidden">
          {/* Full-screen logo image with parallax */}
          <motion.div
            style={{ y: heroImgY }}
            className="absolute inset-0 z-0"
          >
            <img
              src="/tenxiku-logo.png"
              alt=""
              aria-hidden
              className="h-full w-full object-cover object-center"
              style={{ filter: "brightness(0.35) saturate(0.8)" } as CSSProperties}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[oklch(0.07_0.012_258)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.07_0.012_258)] via-transparent" style={{ height: "30%" }} />
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse at center, transparent 40%, oklch(0.07 0.012 258 / 0.7) 100%)"
            }} />
          </motion.div>

          {/* Petals */}
          <Petals count={14} className="z-0 opacity-60" />

          {/* Hero content */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
          >
            <Reveal>
              <div className="eyebrow text-white/50">天 · The Ultimate PvP Empire</div>
            </Reveal>

            <Reveal delay={0.12}>
              <h1 className="mt-5 select-none" style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(3.5rem, 14vw, 11rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
                color: "#fff",
                textShadow: "0 0 80px rgba(255,255,255,0.15), 0 20px 60px rgba(0,0,0,0.5)",
              }}>
                TENXIKU
              </h1>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/50 md:text-lg">
                Recognized as the premier battlegrounds destination. Built by an elite crew,
                divided into strategic deployment branches, dominating worldwide brackets.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href="#fleets"
                  className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-all hover:bg-white/85 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  View Fleets
                </a>
                <a href="#command"
                  className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white/80 transition-all hover:border-white/35 hover:bg-white/6 hover:text-white">
                  Command Structure ›
                </a>
              </div>
            </Reveal>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/30">Scroll</span>
                <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="relative border-y border-white/6 bg-white/[0.02] backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
            {[
              { k: "Fleets Deployed", v: "08", sub: "Active divisions" },
              { k: "Bounty Floor",    v: "4M+", sub: "Min. requirement" },
              { k: "Theatres",        v: "EU · AS", sub: "Active regions" },
              { k: "Command Tiers",   v: "06", sub: "Staff hierarchy" },
            ].map((s, i) => (
              <Reveal key={s.k} delay={i * 0.06}>
                <div className="group flex flex-col gap-1 px-8 py-10 transition-colors hover:bg-white/[0.03]">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">{s.k}</span>
                  <span className="font-display text-4xl font-bold text-white">{s.v}</span>
                  <span className="font-mono text-[9px] text-white/25">{s.sub}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── ABOUT / DOCTRINE ── */}
        <section id="about" className="relative overflow-hidden py-32">
          <Petals count={10} className="opacity-30" />

          {/* Background: hero image very dark */}
          <div className="pointer-events-none absolute inset-0">
            <img src="/tenxiku-logo.png" alt="" aria-hidden
              className="h-full w-full object-cover opacity-[0.05]"
              style={{ filter: "blur(4px)" } as CSSProperties}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            <Reveal>
              <div className="eyebrow text-white/40">道 · Doctrine</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-4 text-white">
                One syndicate.
                <br />
                <span className="text-white/35">Eight ways to dominate.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mx-auto mt-6 max-w-2xl text-white/45">
                Every fleet is engineered for a different theatre — bounty, region, tempo. The
                result is a command surface that scales from frontline raids to grand-strategy
                escalations with unmatched precision.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: "⚔", label: "PvP Mastery", desc: "Elite combat coordination across all theaters" },
                  { icon: "🏯", label: "Strategic Depth", desc: "Multi-fleet doctrine refined over years of operation" },
                  { icon: "天", label: "Syndicate Unity", desc: "One banner, one purpose — forged in battle" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="rounded-2xl border border-white/6 bg-white/[0.03] p-6 text-center"
                  >
                    <div className="mb-3 text-3xl">{item.icon}</div>
                    <div className="mb-1 font-display text-sm font-bold text-white">{item.label}</div>
                    <div className="text-xs text-white/40 leading-relaxed">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── COMMAND ── */}
        <section id="command" className="border-t border-white/5 py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
              <div className="md:sticky md:top-28 md:self-start">
                <Reveal>
                  <div className="eyebrow text-white/40">命 · Chain of Command</div>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="display-lg mt-3 text-white">The authority matrix.</h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="lede mt-5 max-w-md text-white/45">
                    Six tiers. Clear ownership. Tap any card to read its duties, reporting line, and reach.
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Tap card · view brief
                  </div>
                </Reveal>
              </div>
              <div>
                <RolesShowcase />
              </div>
            </div>
          </div>
        </section>

        {/* ── FLEETS ── */}
        <section id="fleets" className="border-t border-white/5 py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Reveal>
                  <div className="eyebrow text-white/40">艦 · Strategic Fleet</div>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="display-lg mt-3 text-white">Operational divisions.</h2>
                </Reveal>
              </div>
              <Reveal delay={0.15}>
                <span className="pill">Total Command · 08 Branches</span>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {divisions.map((d, i) => {
                const color = TIER_COLORS[d.tier] ?? "#aaa";
                return (
                  <Reveal key={d.id} delay={i * 0.04}>
                    <motion.article
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                      className="card-app group relative h-full overflow-hidden p-5"
                    >
                      {/* Top color line */}
                      <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: color }} />

                      {/* Glow */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[22px]"
                        style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 70%)` }} />

                      {/* Kanji ghost */}
                      <span aria-hidden
                        className="pointer-events-none absolute -right-2 -top-3 select-none font-serif text-[6rem] leading-none transition-all duration-500 group-hover:opacity-[0.14] group-hover:-translate-y-1"
                        style={{ color, opacity: 0.05 }}
                      >
                        {d.kanji}
                      </span>

                      <div className="relative flex items-center justify-between">
                        <span className="rounded-md border border-white/8 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-white/50">
                          DIV {d.id}
                        </span>
                        <span className="rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider"
                          style={{ background: `${color}18`, color }}>
                          {d.tier}
                        </span>
                      </div>

                      <h3 className="relative mt-5 font-display text-lg font-bold tracking-tight text-white">
                        {d.name}
                      </h3>

                      <div className="relative mt-4 space-y-2">
                        <FleetRow label="Required Bounty" value={d.bounty} />
                        <FleetRow label="Captain" value={`@${d.captain}`} />
                        <FleetRow label="Region" value={d.region} />
                      </div>

                      <div className="relative mt-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-white/30">
                        <span>Status</span>
                        <span className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                          Active
                        </span>
                      </div>
                    </motion.article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── HQ / DISCORD ── */}
        <section id="hq" className="border-t border-white/5 py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <Reveal>
                <div className="eyebrow text-white/40">門 · HQ Gateway</div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="display-lg mt-3 text-white">Live Discord infrastructure.</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="lede mx-auto mt-5 max-w-xl text-white/45">
                  Sync with command. Recruit into a fleet. Plug into the live operations channel.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.3}>
              <div className="mt-12 overflow-hidden rounded-3xl border border-white/8 bg-white/[0.025] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.5)]">
                <iframe
                  title="TENXIKU Discord"
                  src="https://discord.com/widget?id=1404532672415400017&theme=dark"
                  width="100%"
                  height="440"
                  allow="autoplay"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  className="block w-full"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── CREDITS ── */}
      <section id="credits" className="relative overflow-hidden border-t border-white/5 py-32">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <img src="/tenxiku-logo.png" alt="" aria-hidden
            className="h-full w-full object-cover opacity-[0.06]"
            style={{ filter: "blur(2px) saturate(0)" } as CSSProperties}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.07_0.012_258)] via-transparent to-[oklch(0.05_0.01_255)]" />
        </div>
        <Petals count={8} className="opacity-20" />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="eyebrow text-center text-white/40">謝 · Credits</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-lg mt-3 text-center text-white">Built by the syndicate.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lede mx-auto mt-4 max-w-xl text-center text-white/40">
              Every brushstroke, every shipped feature — the hands behind the hub.
            </p>
          </Reveal>

          {/* Featured 3 */}
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {credits.filter(c => c.featured).map((c, i) => (
              <Reveal key={c.tag} delay={0.1 + i * 0.08}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] p-8 backdrop-blur-sm"
                >
                  {/* Color bar */}
                  <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: c.color }} />

                  {/* Glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-3xl"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${c.glow}20 0%, transparent 65%)` }}
                  />

                  {/* Kanji ghost */}
                  <span aria-hidden
                    className="pointer-events-none absolute -right-4 -top-10 select-none font-serif text-[10rem] leading-none transition-all duration-700 group-hover:opacity-[0.16] group-hover:-translate-y-2"
                    style={{ color: c.color, opacity: 0.06 }}
                  >
                    {c.kanji}
                  </span>

                  <div className="relative font-mono text-[9px] uppercase tracking-[0.35em]" style={{ color: c.color }}>
                    {c.tag}
                  </div>
                  <div className="relative mt-3 font-display text-3xl font-bold tracking-tight text-white">
                    {c.name}
                  </div>
                  <p className="relative mt-3 text-sm leading-relaxed text-white/45">{c.note}</p>

                  <div className="relative mt-6 h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                    style={{ background: `linear-gradient(90deg, ${c.color}60, transparent)` }}
                  />
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Supporting 2 */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {credits.filter(c => !c.featured).map((c, i) => (
              <Reveal key={c.tag} delay={0.3 + i * 0.06}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/6 bg-white/[0.02] p-6 backdrop-blur-sm"
                >
                  <div className="absolute inset-x-0 top-0 h-[1.5px]" style={{ background: c.color }} />
                  <span aria-hidden
                    className="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[7rem] leading-none transition-all duration-500 group-hover:opacity-[0.12]"
                    style={{ color: c.color, opacity: 0.04 }}
                  >
                    {c.kanji}
                  </span>
                  <div className="relative font-mono text-[9px] uppercase tracking-[0.35em]" style={{ color: c.color }}>
                    {c.tag}
                  </div>
                  <div className="relative mt-2 font-display text-xl font-bold text-white">{c.name}</div>
                  <p className="relative mt-2 text-sm text-white/40 leading-relaxed">{c.note}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Captains & roles list */}
          <Reveal delay={0.45}>
            <div className="mt-14 rounded-2xl border border-white/6 bg-white/[0.02] p-6 text-center">
              <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.35em] text-white/30">Captains</div>
              <div className="font-mono text-[11px] tracking-[0.15em] text-white/50">
                TK_MUN · TK_SOUL · Tk_Pengu · TK_FAITH · TK_Liz · TK_Spade · TK_バカ · PirateXPGamer
              </div>
              <div className="mt-4 mb-2 font-mono text-[9px] uppercase tracking-[0.35em] text-white/25">Staff Roles</div>
              <div className="font-mono text-[10px] tracking-[0.12em] text-white/35">
                Head Admin · Admin · Head Moderator · Moderator · Trial Moderator · Support Staff
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 bg-[oklch(0.05_0.01_255)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/tenxiku-logo.png" alt="TENXIKU" className="h-7 w-auto object-contain"
              style={{ filter: "brightness(0.8) contrast(1.1)" }} />
            <span className="font-display text-sm font-bold tracking-tight text-white/70">TENXIKU SYNDICATE</span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
            © 2026 TENXIKU SYNDICATE · ALL RIGHTS RESERVED
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
            Dev{" "}
            <a href="#credits"
              className="font-bold text-white/60 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white">
              demonXtejas
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
