import { useState } from 'react';
import {
  container,
  sectionHead,
  sectionLead,
  sectionTitle,
} from '../lib/classes';

const MEETING_ROLES = [
  {
    id: 'engineering',
    title: 'Sprint & Architecture Review',
    role: 'Technical Lead & Engineering',
    tag: 'Technical Focus',
    badge: 'Code & Architecture Aware',
    scenario: 'Mentora captures system audio during microservices planning, transcribing architectural changes and mapping out technical debt action items.',
    sampleQuote: '"We agreed to decouple the checkout worker queue using SQS, reducing database locking before BFCM."',
    deliverable: 'Key Architecture Decisions · PR Review Action Checklist',
    stat: '100% Bot-Free',
    statLabel: 'Direct OS Audio Capture',
  },
  {
    id: 'executive',
    title: 'Executive & Strategy Sync',
    role: 'Chief of Staff & Leadership',
    tag: 'Executive Recap',
    badge: 'Decision Logging',
    scenario: 'Generate high-level strategic takeaways, resource allocation changes, and owner commitments immediately as the call closes.',
    sampleQuote: '"Q4 hiring approved for 3 senior engineers and 1 design lead. Budget revisions finalized by Friday."',
    deliverable: 'Executive Bulleted Summary · Slack & Notion Ready',
    stat: '< 1 sec',
    statLabel: 'Real-Time Summarisation',
  },
  {
    id: 'client',
    title: 'Client & Customer Presentations',
    role: 'Account Executive & Solutions',
    tag: 'Screen Privacy Mode',
    badge: 'Content-Protected HUD',
    scenario: 'While sharing your slide deck or live product demo, your private talking points and past contract notes remain visible only to you.',
    sampleQuote: '"Client requested custom SSO support and SOC 2 Type II audit logs before signing the 3-year enterprise contract."',
    deliverable: 'Client Requirements Log · Follow-Up Email Draft',
    stat: 'Private HUD',
    statLabel: 'Protected from Screen Shares',
  },
  {
    id: 'interview',
    title: 'Interviews & Panel Screenings',
    role: 'Hiring Manager & Candidate',
    tag: 'Domain Intelligence',
    badge: 'Context-Aware Notes',
    scenario: 'Upload your notes, company rubric, or candidate portfolio. Mentora highlights key competencies and suggests precise follow-up questions.',
    sampleQuote: '"Evaluated candidate system design trade-offs regarding eventual consistency and caching strategies."',
    deliverable: 'Structured Evaluation Notes · Scorecard Breakdown',
    stat: 'Zero Friction',
    statLabel: 'No External Bot Required',
  },
] as const;

export function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const activeRole = MEETING_ROLES[activeTab];

  return (
    <section id="features" className="py-28 max-sm:py-20 border-t border-[#262626] bg-[#0d0d0d]">
      <div className={container}>
        <div className={sectionHead}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#171717] border border-[#2e2e2e] text-[#fafafa] mb-4">
            Purpose-Built For Real Work
          </div>
          <h2 className={sectionTitle}>The right intelligence for every meeting</h2>
          <p className={sectionLead}>
            Tailored meeting transcription, instant structured summaries, action items, and screen-share privacy—built for high-stakes conversations.
          </p>
        </div>

        {/* Interactive Scenario Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {MEETING_ROLES.map((role, idx) => (
            <button
              key={role.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-[#fafafa] text-[#0a0a0a] shadow-sm'
                  : 'bg-[#171717] text-[#a1a1aa] hover:text-[#fafafa] border border-[#262626] hover:border-[#383838]'
              }`}
            >
              {role.title}
            </button>
          ))}
        </div>

        {/* Interactive Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141414] border border-[#262626] rounded-2xl p-8 sm:p-10 shadow-2xl">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#1f1f1f] border border-[#2e2e2e] text-[#fafafa]">
                  {activeRole.tag}
                </span>
                <span className="text-xs text-[#71717a] font-medium">{activeRole.role}</span>
              </div>
              <h3 className="text-2xl font-bold text-[#fafafa] mb-3 leading-snug tracking-tight">
                {activeRole.title}
              </h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6 font-normal">
                {activeRole.scenario}
              </p>

              <div className="bg-[#1a1a1a] border-l-2 border-white p-4 rounded-r-xl mb-6">
                <p className="text-[11px] font-mono text-[#71717a] uppercase mb-1">Live Captured Note</p>
                <p className="text-xs text-[#d4d4d8] italic">{activeRole.sampleQuote}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono text-[#71717a] uppercase">Automated Deliverable</p>
                <p className="text-xs font-semibold text-white">{activeRole.deliverable}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-white">{activeRole.stat}</p>
                <p className="text-[10px] text-[#71717a]">{activeRole.statLabel}</p>
              </div>
            </div>
          </div>

          {/* Visual Showcase Panel */}
          <div className="lg:col-span-6 bg-[#0a0a0a] border border-[#262626] rounded-xl p-6 shadow-inner font-sans">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#262626] text-xs">
              <span className="font-mono text-[11px] text-[#71717a]">Live Session · Active</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium">
                Protected HUD Active
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#141414] border border-[#262626] rounded-lg text-xs">
                <span className="text-[10px] text-[#71717a] block mb-1">Whisper Speech-To-Text</span>
                <p className="text-[#fafafa] font-medium leading-relaxed">
                  "Let's confirm the milestone schedule and assign ownership for deliverables before our Thursday executive briefing."
                </p>
              </div>

              <div className="p-3.5 bg-[#171717] border border-[#333333] rounded-lg text-xs">
                <div className="flex items-center justify-between text-[10px] text-white font-semibold mb-2">
                  <span>Structured Decision &amp; Summary</span>
                  <span className="font-mono text-[#71717a]">Updated 0.8s ago</span>
                </div>
                <ul className="space-y-2 text-[11px] text-[#a1a1aa]">
                  <li className="flex items-start gap-2">
                    <span className="text-white font-bold">•</span>
                    <span><strong>Key Goal:</strong> Finalize migration dry-runs by end of week.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white font-bold">•</span>
                    <span><strong>Action:</strong> Automated notifications routed directly to Slack and calendar.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1f1f1f] flex items-center justify-between text-[11px] text-[#71717a]">
              <span>Works across Zoom, Teams, Meet</span>
              <span className="text-white font-mono">No bot invites</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
