import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { sfx } from "@/lib/sfx";

export type Role = {
  lvl: string;
  title: string;
  kanji: string;
  tagline: string;
  color: string;
  glow: string;
  duties: string[];
  reports: string;
  reach: string;
  icon: string;
};

export const ROLES: Role[] = [
  {
    lvl: "01",
    title: "Head Admin",
    kanji: "頭",
    tagline: "Final authority. The keystone of the syndicate.",
    color: "#e8e0ff",
    glow: "oklch(0.75 0.28 285)",
    icon: "◈",
    duties: [
      "Owns core configurations, permissions, and bot architecture.",
      "Sets server-wide policy, doctrine, and disciplinary precedent.",
      "Resolves final-tier escalations and inter-fleet disputes.",
      "Approves staff promotions, demotions, and structural changes.",
    ],
    reports: "Answers to syndicate leadership only.",
    reach: "All eight fleets · global ops",
  },
  {
    lvl: "02",
    title: "Admin",
    kanji: "管",
    tagline: "Backbone of daily operations.",
    color: "#a5b8ff",
    glow: "oklch(0.65 0.25 265)",
    icon: "◆",
    duties: [
      "Runs day-to-day backend operations and bot tuning.",
      "Audits staff activity, performance metrics, and incidents.",
      "Maintains structural balance across fleets and channels.",
      "Handles complex disputes escalated from moderators.",
    ],
    reports: "Reports directly to Head Admin.",
    reach: "Cross-fleet · 24/7 coverage",
  },
  {
    lvl: "03",
    title: "Head Moderator",
    kanji: "首",
    tagline: "Front-line commander of the moderation track.",
    color: "#ffd77a",
    glow: "oklch(0.82 0.2 80)",
    icon: "◉",
    duties: [
      "Builds and rotates moderation shifts across timezones.",
      "Updates threat definitions, mute durations, and warning ladders.",
      "Onboards, coaches, and evaluates the moderation ranks.",
      "First responder for high-severity public-channel incidents.",
    ],
    reports: "Reports to Admin · coordinates with Head Admin.",
    reach: "All public channels",
  },
  {
    lvl: "04",
    title: "Moderator",
    kanji: "守",
    tagline: "Guardians of the public space.",
    color: "#80d4ff",
    glow: "oklch(0.78 0.2 220)",
    icon: "◐",
    duties: [
      "Enforces chat rules, anti-spam, and conduct policy.",
      "Issues warnings, mutes, and short-term bans per the matrix.",
      "Logs incidents and hands escalations up the chain cleanly.",
      "Protects channels from raid, exploit, and toxicity vectors.",
    ],
    reports: "Reports to Head Moderator.",
    reach: "Public channels · 1:N supervision",
  },
  {
    lvl: "05",
    title: "Trial Moderator",
    kanji: "試",
    tagline: "Sharpening the blade — onboarding under fire.",
    color: "#7affb8",
    glow: "oklch(0.82 0.22 155)",
    icon: "◑",
    duties: [
      "Performs core moderation under senior supervision.",
      "Completes performance milestones to confirm full rank.",
      "Shadows incident responses and policy interpretation.",
      "Submits weekly review logs for coaching feedback.",
    ],
    reports: "Mentored by a Moderator · evaluated by Head Moderator.",
    reach: "Limited channels · evaluation window",
  },
  {
    lvl: "06",
    title: "Support Staff",
    kanji: "援",
    tagline: "First touch for every new operative.",
    color: "#aaaaaa",
    glow: "oklch(0.6 0 0)",
    icon: "○",
    duties: [
      "Resolves tickets, verifications, and onboarding questions.",
      "Triages bug reports and routes technical issues upstream.",
      "Maintains the FAQ, role-claim, and welcome flows.",
      "Documents recurring issues for staff knowledge base.",
    ],
    reports: "Reports to Admin · escalates to Moderators.",
    reach: "Ticket system · DMs · #help",
  },
];

export function RolesShowcase() {
  const [active, setActive] = useState<Role | null>(null);

  return (
    <>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((r, i) => (
          <Reveal key={r.lvl} delay={i * 0.06}>
            <motion.button
              onClick={() => { sfx.click(); setActive(r); }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 text-left backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
            >
              {/* Color accent bar */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[2px] origin-left"
                style={{ background: r.color }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Glow on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${r.glow}18 0%, transparent 65%)`,
                }}
              />

              {/* Level + dot */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Tier {r.lvl}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl" style={{ color: r.color, textShadow: `0 0 10px ${r.glow}` }}>
                    {r.icon}
                  </span>
                </div>
              </div>

              {/* Big kanji ghost */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-1 -top-1 select-none font-serif text-[7rem] leading-none transition-all duration-500 group-hover:opacity-[0.12] group-hover:-translate-y-2"
                style={{ color: r.color, opacity: 0.05 }}
              >
                {r.kanji}
              </span>

              {/* Title */}
              <h3 className="relative mt-5 font-display text-xl font-bold tracking-tight text-white">
                {r.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">{r.tagline}</p>

              {/* Duties preview */}
              <ul className="relative mt-4 space-y-1.5">
                {r.duties.slice(0, 2).map((d) => (
                  <li key={d} className="flex items-start gap-2 text-xs text-white/40">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ background: r.color }} />
                    <span className="line-clamp-1">{d}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="relative mt-5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-300 group-hover:translate-x-1"
                style={{ color: r.color }}>
                View all duties
                <span>›</span>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </ol>

      {/* Role detail panel */}
      <AnimatePresence>
        {active && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-x-4 bottom-4 top-16 z-[101] mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a12] shadow-2xl md:inset-x-auto md:left-1/2 md:w-full md:-translate-x-1/2"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            >
              {/* Top color bar */}
              <div className="h-1 w-full" style={{ background: active.color }} />

              {/* Glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 70% 35% at 50% 0%, ${active.glow}20 0%, transparent 60%)`,
                }}
              />

              {/* Ghost kanji */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-16 select-none font-serif text-[18rem] leading-none"
                style={{ color: active.color, opacity: 0.04 }}
              >
                {active.kanji}
              </span>

              <div className="relative overflow-y-auto p-7 md:p-10" style={{ maxHeight: "calc(100% - 4px)" }}>
                {/* Close */}
                <button
                  onClick={() => setActive(null)}
                  className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>

                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Tier {active.lvl} · Role Brief
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <span className="text-4xl" style={{ color: active.color, textShadow: `0 0 30px ${active.glow}` }}>
                    {active.icon}
                  </span>
                  <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                    {active.title}
                  </h2>
                </div>
                <p className="mt-2 text-base text-white/55">{active.tagline}</p>

                <div className="mt-8 rounded-2xl border border-white/6 bg-white/[0.03] p-5">
                  <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                    Core Duties
                  </div>
                  <ul className="space-y-3">
                    {active.duties.map((d, i) => (
                      <motion.li
                        key={d}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.07 }}
                        className="flex items-start gap-3 text-sm leading-relaxed text-white/75"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: active.color }} />
                        {d}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Reports To", value: active.reports },
                    { label: "Operational Reach", value: active.reach },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="rounded-xl border border-white/6 bg-white/[0.025] p-4"
                    >
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                        {item.label}
                      </div>
                      <div className="text-sm font-medium text-white/85">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
