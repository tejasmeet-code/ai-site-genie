import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { HeroScene } from "@/components/HeroScene";
import { OpeningAnimation } from "@/components/OpeningAnimation";
import { Reveal } from "@/components/Reveal";
import { SfxController } from "@/components/SfxController";
import { RolesShowcase } from "@/components/RolesShowcase";
import { Petals } from "@/components/Petals";
import { TenxikuLogo } from "@/assets/TenxikuLogo";

const divisions = [
  { id: "01", name: "TK Main Fleet", bounty: "20M+", captain: "TK_MUN", region: "AS", kanji: "壱", highlight: true },
  { id: "02", name: "TK Second Fleet", bounty: "20M+", captain: "TK_SOUL", region: "AS", kanji: "弐" },
  { id: "03", name: "TK Third Fleet", bounty: "15M+", captain: "Tk_Pengu", region: "EU", kanji: "参" },
  { id: "04", name: "TK Fourth Fleet", bounty: "10M+", captain: "TK_FAITH", region: "EU / AS", kanji: "肆" },
  { id: "05", name: "TK Fifth Fleet", bounty: "10M+", captain: "TK_Liz", region: "EU", kanji: "伍" },
  { id: "06", name: "TK Sixth Fleet", bounty: "4M+", captain: "TK_Spade", region: "EU", kanji: "陸" },
  { id: "07", name: "TK Seventh Fleet", bounty: "4M+", captain: "TK_バカ", region: "AS", kanji: "漆" },
  { id: "08", name: "TK Eighth Fleet", bounty: "10M+", captain: "PirateXPGamer", region: "AS", kanji: "捌" },
];

const credits = [
  { tag: "Syndicate", name: "TENXIKU", note: "© 2026 TENXIKU SYNDICATE. ALL RIGHTS RESERVED.", kanji: "天" },
  { tag: "Vision", name: "mun", note: "Original concept, creative direction, and syndicate vision.", kanji: "夢", featured: true },
  { tag: "Developer", name: "@demonXtejas", note: "Design, 3D motion, and front-end engineering for the TENXIKU hub.", kanji: "匠", featured: true },
  { tag: "Co-Developer", name: "Solas", note: "Co-development and engineering contributions to the TENXIKU hub.", kanji: "影", featured: true },
  { tag: "Command", name: "Head Admin & Admin", note: "Server architecture, policy, and operations across all eight fleets.", kanji: "頭" },
];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}

function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTitleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <OpeningAnimation />
      <SfxController />

      {/* NAV */}
      <header className="glass-nav sticky top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#top" className="group flex items-center gap-2.5">
            <TenxikuLogo
              className="h-7 w-auto text-foreground transition-transform duration-500 group-hover:scale-110"
            />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted sm:inline">
              天 · Syndicate
            </span>
          </a>
          <ul className="hidden gap-7 text-[12px] font-medium text-ink-muted md:flex">
            {["About", "Command", "Fleets", "HQ", "Credits"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="transition hover:text-foreground">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#hq"
            className="rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background transition hover:opacity-85"
          >
            Join Server
          </a>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section ref={heroRef} className="relative isolate overflow-hidden pt-10 md:pt-16">
          <Petals count={18} className="z-0" />
          <motion.div
            style={{ y: heroTitleY, opacity: heroOpacity }}
            className="relative z-10 mx-auto max-w-7xl px-6 text-center"
          >
            <Reveal>
              <div className="eyebrow">天 · The Ultimate PvP Empire</div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 flex justify-center">
                <TenxikuLogo
                  className="w-[min(86vw,820px)] select-none text-foreground"
                  style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.15))" } as CSSProperties}
                />
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="lede mx-auto mt-7 max-w-2xl">
                Recognized as the premier battlegrounds destination. Built by an elite crew,
                divided into strategic deployment branches, dominating worldwide brackets.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#fleets"
                  className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-85"
                >
                  View Fleets
                </a>
                <a
                  href="#command"
                  className="rounded-full border border-hair px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-muted"
                >
                  Command Structure ›
                </a>
              </div>
            </Reveal>
          </motion.div>

          <HeroScene className="mx-auto mt-4 h-[48vh] w-full max-w-6xl md:h-[58vh]" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
        </section>

        {/* STATS STRIP */}
        <section className="border-y border-hair bg-surface-muted/60">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
            {[
              { k: "Fleets Deployed", v: "08" },
              { k: "Bounty Floor", v: "4M+" },
              { k: "Theatres", v: "EU · AS" },
              { k: "Command Tiers", v: "06" },
            ].map((s, i) => (
              <Reveal key={s.k} delay={i * 0.05}>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                    {s.k}
                  </span>
                  <span className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                    {s.v}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="panel-dark relative overflow-hidden py-28">
          <Petals count={14} className="opacity-40" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            <Reveal>
              <div className="eyebrow text-white/60">道 · Doctrine</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-5 text-white">
                One syndicate.
                <br />
                <span className="text-white/55">Eight ways to dominate.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mx-auto mt-6 max-w-2xl text-white/70">
                Every fleet is engineered for a different theatre — bounty, region, tempo. The
                result is a command surface that scales from frontline raids to grand-strategy
                escalations.
              </p>
            </Reveal>
          </div>
        </section>

        {/* COMMAND */}
        <section id="command" className="mx-auto max-w-7xl px-6 py-28">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <div className="md:sticky md:top-28 md:self-start">
              <Reveal>
                <div className="eyebrow">命 · Chain of Command</div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="display-lg mt-3">The authority matrix.</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="lede mt-5 max-w-md">
                  Six tiers. Clear ownership. Tap any role to read its duties, reporting line,
                  and reach.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-hair bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--emerald)]" />
                  Tap card · view brief
                </div>
              </Reveal>
            </div>
            <div>
              <RolesShowcase />
            </div>
          </div>
        </section>

        {/* FLEETS */}
        <section id="fleets" className="border-t border-hair bg-surface-muted/40 py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Reveal>
                  <div className="eyebrow">艦 · Strategic Fleet</div>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="display-lg mt-3">Operational divisions.</h2>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <span className="pill">Total Command · 08 Branches</span>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {divisions.map((d, i) => (
                <Reveal key={d.id} delay={i * 0.04}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className={`card-app group relative h-full overflow-hidden p-6 ${
                      d.highlight ? "ring-1 ring-foreground/15" : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-2 -top-3 select-none font-display text-[6rem] leading-none opacity-[0.05] transition-all duration-500 group-hover:opacity-[0.12]"
                    >
                      {d.kanji}
                    </span>
                    <div className="relative flex items-center justify-between">
                      <span
                        className={`rounded-md px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest ${
                          d.highlight
                            ? "bg-foreground text-background"
                            : "bg-surface-muted text-ink-muted"
                        }`}
                      >
                        DIV {d.id}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                        TK
                      </span>
                    </div>
                    <h3 className="relative mt-6 font-display text-xl font-bold tracking-tight">
                      {d.name}
                    </h3>
                    <div className="relative mt-5 space-y-3 text-sm">
                      <Row label="Required Bounty" value={d.bounty} />
                      <Row label="Captain" value={`@${d.captain}`} />
                      <Row label="Region" value={d.region} />
                    </div>
                    <div className="relative mt-6 flex items-center justify-between border-t border-hair pt-4 text-[10px] font-mono uppercase tracking-widest text-ink-muted">
                      <span>Status</span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--emerald)]" />
                        Active
                      </span>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* HQ */}
        <section id="hq" className="mx-auto max-w-5xl px-6 py-28">
          <div className="text-center">
            <Reveal>
              <div className="eyebrow">門 · HQ Gateway</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-3">Live Discord infrastructure.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mx-auto mt-5 max-w-xl">
                Sync with command. Recruit into a fleet. Plug into the live operations channel.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <div className="mt-12 overflow-hidden rounded-3xl border border-hair bg-surface shadow-[0_30px_80px_-40px_oklch(0.16_0.01_250/0.35)]">
              <iframe
                title="TENXIKU Discord"
                src="https://discord.com/widget?id=1404532672415400017&theme=dark"
                width="100%"
                height="420"
                allow="autoplay"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="block w-full"
              />
            </div>
          </Reveal>
        </section>
      </main>

      {/* CREDITS */}
      <section id="credits" className="panel-dark relative overflow-hidden border-t border-white/10 py-28">
        <Petals count={10} className="opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="eyebrow text-center text-white/60">謝 · Credits</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-lg mt-3 text-center text-white">Built by the syndicate.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lede mx-auto mt-5 max-w-xl text-center text-white/65">
              Every brushstroke, every shipped feature — the hands behind the hub.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {credits.map((c, i) => (
              <Reveal key={c.tag} delay={0.1 + i * 0.06}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className={`group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:border-white/25 ${
                    c.featured ? "ring-1 ring-white/15" : ""
                  }`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[9rem] leading-none text-white opacity-[0.05] transition-all duration-500 group-hover:opacity-[0.13] group-hover:-translate-y-1"
                  >
                    {c.kanji}
                  </span>
                  <div className="relative font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
                    {c.tag}
                  </div>
                  <div className="relative mt-3 font-display text-2xl font-bold tracking-tight text-white">
                    {c.name}
                  </div>
                  <p className="relative mt-3 text-sm leading-relaxed text-white/65">{c.note}</p>
                  <div className="ink-divider mt-6 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-12 grid gap-3 text-center">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/55">
                Captains · TK_MUN · TK_SOUL · Tk_Pengu · TK_FAITH · TK_Liz · TK_Spade · TK_バカ · PirateXPGamer
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">
                Roles · Head Admin · Admin · Head Moderator · Moderator · Trial Moderator · Support Staff
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="panel-dark border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <TenxikuLogo className="h-7 w-auto text-white" />
            <span className="font-display text-sm font-bold tracking-tight text-white">
              TENXIKU SYNDICATE
            </span>
          </div>
          <div className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
            © 2026 TENXIKU SYNDICATE · ALL RIGHTS RESERVED
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
            Developed by{" "}
            <a
              href="#credits"
              className="font-bold text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
            >
              demonXtejas
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return <HomePage />;
}
