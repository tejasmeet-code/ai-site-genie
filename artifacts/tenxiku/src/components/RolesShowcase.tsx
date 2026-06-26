import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Reveal } from "@/components/Reveal";
import { sfx } from "@/lib/sfx";

export type Role = {
  lvl: string;
  title: string;
  kanji: string;
  tagline: string;
  color: string;
  duties: string[];
  reports: string;
  reach: string;
};

export const ROLES: Role[] = [
  {
    lvl: "01",
    title: "Head Admin",
    kanji: "頭",
    tagline: "Final authority. The keystone of the syndicate.",
    color: "var(--foreground)",
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
    color: "var(--accent)",
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
    color: "var(--gold)",
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
    color: "var(--accent)",
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
    color: "var(--emerald)",
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
    color: "var(--ink-muted)",
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
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((r, i) => (
          <Reveal key={r.lvl} delay={i * 0.05}>
            <motion.button
              onClick={() => {
                sfx.click();
                setActive(r);
              }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="role-card group relative block h-full w-full overflow-hidden p-6 text-left"
            >
              <div
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: r.color }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-2 select-none font-display text-[7rem] leading-none opacity-[0.045] transition-all duration-500 group-hover:opacity-[0.10] group-hover:-translate-y-1"
              >
                {r.kanji}
              </span>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
                  Level {r.lvl}
                </span>
                <span
                  className="h-2 w-2 rounded-full ring-2 ring-background"
                  style={{ background: r.color }}
                />
              </div>

              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight md:text-[1.7rem]">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{r.tagline}</p>

              <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted transition-colors group-hover:text-foreground">
                View duties
                <span className="inline-block transition-transform group-hover:translate-x-1">›</span>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </ol>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl overflow-hidden border-hair bg-surface p-0">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.lvl}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: active.color }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-12 select-none font-display text-[14rem] leading-none opacity-[0.06]"
                >
                  {active.kanji}
                </span>

                <div className="relative p-8 md:p-10">
                  <DialogHeader className="space-y-2 text-left">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">
                      Tier {active.lvl} · Role Brief
                    </div>
                    <DialogTitle className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                      {active.title}
                    </DialogTitle>
                    <DialogDescription className="text-base text-ink-muted">
                      {active.tagline}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-7">
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
                      Core Duties
                    </div>
                    <ul className="mt-3 space-y-2.5">
                      {active.duties.map((d, i) => (
                        <motion.li
                          key={d}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.06 }}
                          className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: active.color }}
                          />
                          {d}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 grid gap-4 border-t border-hair pt-5 sm:grid-cols-2">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
                        Reports To
                      </div>
                      <div className="mt-1 text-sm font-medium text-foreground">{active.reports}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
                        Reach
                      </div>
                      <div className="mt-1 text-sm font-medium text-foreground">{active.reach}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
