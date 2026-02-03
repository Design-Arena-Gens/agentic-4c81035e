"use client";

import { useMemo, useState } from "react";

const demoScript = [
  {
    role: "agent",
    message:
      "Hi there! I'm Atlas, the job application assistant. I can match you with one of our open roles. What kind of opportunity are you looking for?",
  },
  {
    role: "candidate",
    message: "I'm a front-end developer with 5 years of experience.",
  },
  {
    role: "agent",
    message:
      "Perfect! I have roles at BrightLabs (React + Next.js) and Helios Corp (Svelte + TypeScript). Do either sound interesting?",
  },
  {
    role: "candidate",
    message: "The BrightLabs role!",
  },
  {
    role: "agent",
    message:
      "Great choice. I'll collect a few details so we can submit your application. What's the best email for you?",
  },
  {
    role: "candidate",
    message: "alex@example.com",
  },
  {
    role: "agent",
    message:
      "Thanks Alex! Last question: share a quick highlight we should include for the hiring team.",
  },
  {
    role: "candidate",
    message:
      "I recently led a migration to React Server Components that improved page performance by 35%.",
  },
  {
    role: "agent",
    message:
      "Boom! I'll package that for BrightLabs and send you status updates over WhatsApp. Talk soon!",
  },
];

const highlights = [
  {
    title: "WhatsApp-native flows",
    description:
      "Handles inbound messages, manages multi-turn conversations, and responds in less than a second using Twilio's WhatsApp API.",
  },
  {
    title: "Structured application intake",
    description:
      "Captures candidate preferences, experience, and supporting details so recruiters receive complete, high-signal submissions.",
  },
  {
    title: "Operator dashboard",
    description:
      "Monitor conversations in real time, review captured applications, and trigger follow-ups directly from the web UI.",
  },
];

const onboardingSteps = [
  {
    title: "Create a Twilio WhatsApp sender",
    description:
      "Twilio Sandbox works for testing. Configure the webhook URL to point at /api/whatsapp on this deployment.",
  },
  {
    title: "Set environment secrets",
    description:
      "In Vercel, add TWILIO_AUTH_TOKEN to verify requests and WHATSAPP_OPERATOR_EMAIL to receive application alerts.",
  },
  {
    title: "Deploy to Vercel",
    description:
      "Use the included deploy script. Once live, connect your WhatsApp number and start inviting applicants.",
  },
];

const flowStages = [
  {
    stage: "Qualification",
    bullet:
      "Atlas screens the candidate with role-specific questions and surfaces matching openings from your job catalog.",
  },
  {
    stage: "Application Pack",
    bullet:
      "Collects resume links, contact info, work highlights, and salary range; saves structured payload for ATS syncing.",
  },
  {
    stage: "Handover",
    bullet:
      "Emails the operator digest, sends candidate confirmation, and schedules reminders for follow-up tasks.",
  },
];

export default function Home() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeStage = useMemo(() => flowStages[selectedIdx], [selectedIdx]);

  return (
    <main className="px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl space-y-20">
        <section className="text-center">
          <p className="inline-block rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
            WhatsApp Job Application Agent
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Automate candidate intake over WhatsApp
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Atlas greets applicants, qualifies them with role-aware prompts, and packages polished applications for your team. Operate entirely through WhatsApp while your recruiters stay focused on closing offers.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-left shadow-lg shadow-slate-950/40"
            >
              <h3 className="text-xl font-semibold text-slate-100">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-slate-300">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-12 lg:grid-cols-[3fr,2fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-slate-950/30">
            <h2 className="text-2xl font-semibold text-slate-100">Live conversation snapshot</h2>
            <p className="mt-2 text-sm text-slate-400">
              This is how Atlas collaborates with candidates on WhatsApp when matching them to open roles.
            </p>
            <div className="mt-6 space-y-3">
              {demoScript.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className={`flex ${item.role === "candidate" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg shadow-slate-950/40 ${
                      item.role === "candidate"
                        ? "bg-emerald-500/10 text-emerald-200"
                        : "bg-slate-800 text-slate-100"
                    }`}
                  >
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                      {item.role === "candidate" ? "Candidate" : "Atlas"}
                    </span>
                    {item.message}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-slate-950/30">
            <h2 className="text-2xl font-semibold text-slate-100">Flow logic</h2>
            <p className="mt-2 text-sm text-slate-400">
              Toggle through the automation stages to see how Atlas routes conversations.
            </p>
            <div className="mt-6 space-y-4">
              {flowStages.map((stage, index) => (
                <button
                  key={stage.stage}
                  onClick={() => setSelectedIdx(index)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    selectedIdx === index
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                      : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-400">
                    Stage {index + 1}
                  </div>
                  <div className="mt-1 text-base font-medium text-slate-100">
                    {stage.stage}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-4 text-sm text-emerald-100">
              {activeStage.bullet}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-10 shadow-xl shadow-slate-950/30">
          <h2 className="text-2xl font-semibold text-slate-100">Implementation overview</h2>
          <ul className="mt-6 grid gap-6 text-sm text-slate-300 sm:grid-cols-3">
            <li className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h3 className="text-base font-semibold text-slate-100">Serverless brain</h3>
              <p className="mt-2">
                Next.js route `/api/whatsapp` verifies Twilio signatures, orchestrates the conversation state machine, and replies with TwiML.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h3 className="text-base font-semibold text-slate-100">Job inventory</h3>
              <p className="mt-2">
                YAML-driven role catalog for quick updates. Extend with Airtable, Notion, or your ATS via simple adapters.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h3 className="text-base font-semibold text-slate-100">Operator alerts</h3>
              <p className="mt-2">
                Automatic email digests summarized with bullet highlights ready for recruiter review.
              </p>
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-10 shadow-xl shadow-slate-950/30">
          <h2 className="text-2xl font-semibold text-slate-100">Deployment checklist</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {onboardingSteps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <h3 className="text-base font-semibold text-slate-100">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
