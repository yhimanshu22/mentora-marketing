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

          {/* Visual Showcase Panel - Actual App Chat UI */}
          <div className="lg:col-span-6 rounded-2xl border border-[#344b69]/60 bg-[#0d1016] shadow-xl overflow-hidden font-sans text-left">
            {/* Titlebar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#101622] border-b border-[#1f2b3e]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                <span className="ml-2 text-[11px] font-medium text-[#8ca0ba] tracking-wide">Mentora Live Co-Pilot</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#162235] border border-[#2b4160] text-[10.5px] font-medium text-[#00b9e8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00b9e8] animate-pulse" />
                <span>{activeRole.badge}</span>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 flex flex-col gap-2.5 text-xs leading-relaxed max-h-[350px] overflow-y-auto">
              {/* User question / Context */}
              <div className="flex justify-end w-full">
                <div className="bg-gradient-to-r from-[#08b6d9] to-[#3184f6] rounded-[16px_16px_5px_16px] px-3.5 py-1.5 text-white font-medium shadow-[0_4px_15px_rgba(0,174,230,0.18)] text-[11px]">
                  Extract decisions and immediate action items from this {activeRole.title.toLowerCase()}
                </div>
              </div>

              {/* Assistant Response with App Theme */}
              <div className="flex justify-start w-full">
                <div className="bg-gradient-to-br from-[#1a273a] to-[#1c2a40] border border-[#344b69] rounded-[16px_16px_16px_5px] p-3 text-[#e5ebf5] shadow-sm w-full">
                  <div className="text-[12px] font-semibold text-white mb-1.5 flex items-center justify-between">
                    <span className="text-[#38bdf8]">Live Session Insights</span>
                    <span className="text-[10px] text-[#8ca0ba] font-mono">1.2s response</span>
                  </div>

                  <p className="text-[11px] text-[#cbd5e1] italic mb-2 border-l-2 border-[#00b9e8] pl-2">
                    {activeRole.sampleQuote}
                  </p>

                  <div className="space-y-1 text-[11px]">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[#38bdf8] font-bold">✓</span>
                      <div>
                        <strong className="text-white">Deliverable:</strong> {activeRole.deliverable}
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-[#38bdf8] font-bold">•</span>
                      <div>
                        <strong className="text-white">Status:</strong> {activeRole.stat} ({activeRole.statLabel})
                      </div>
                    </div>
                  </div>

                  <span className="block text-right text-[#8ca0ba] text-[10px] mt-1.5">Ready to sync</span>
                </div>
              </div>

              {/* Quick Action Chips */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <span className="border border-[#00b9e8]/70 bg-[#101c2a] text-[#dcecff] rounded-full px-2.5 py-0.5 text-[10.5px] font-medium">
                  ⚡ Copy to Clipboard
                </span>
                <span className="border border-[#00b9e8]/70 bg-[#101c2a] text-[#dcecff] rounded-full px-2.5 py-0.5 text-[10.5px] font-medium">
                  📁 Push to Notion
                </span>
                <span className="border border-[#00b9e8]/70 bg-[#101c2a] text-[#dcecff] rounded-full px-2.5 py-0.5 text-[10.5px] font-medium">
                  💬 Send to Slack
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
