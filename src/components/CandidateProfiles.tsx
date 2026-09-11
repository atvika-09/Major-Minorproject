import { Users, FileText, ArrowRight } from 'lucide-react';
import type { CandidateProfile } from '../types';
import { CANDIDATE_PROFILES } from '../data/mockData';

interface CandidateProfilesProps {
  onSelectProfile: (profile: CandidateProfile) => void;
}

function MiniGauge({ score }: { score: number }) {
  const size = 56;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score >= 80 ? '#10b981' : score >= 60 ? '#3b82f6' : score >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-slate-800">{score}</span>
      </div>
    </div>
  );
}

function MiniMetricBar({ label, score }: { label: string; score: number }) {
  const color = score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-blue-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div>
      <div className="mb-0.5 flex items-center justify-between">
        <span className="text-[10px] font-medium text-slate-500">{label}</span>
        <span className="text-[10px] font-bold text-slate-700">{score}%</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export function CandidateProfiles({ onSelectProfile }: CandidateProfilesProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-bold text-slate-900">Reference Candidate Profiles</h2>
        <span className="ml-2 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
          Pre-loaded with analysis
        </span>
      </div>

      <p className="mb-5 text-sm text-slate-500">
        Each profile includes a pre-computed readiness analysis. Click a profile to load it
        into the full analyzer above and re-run the analysis.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CANDIDATE_PROFILES.map((profile) => (
          <button
            key={profile.id}
            onClick={() => onSelectProfile(profile)}
            className="group flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-5 text-left transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/40 hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${profile.avatarColor}`}>
                {profile.avatarInitials}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-slate-800">{profile.name}</h3>
                <p className="truncate text-xs text-slate-500">{profile.title}</p>
              </div>
              <MiniGauge score={profile.result.hrMatchScore} />
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <FileText className="h-3.5 w-3.5" />
              <span className="truncate">{profile.resumeFileName}</span>
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-200 pt-3">
              {profile.result.metrics.map((metric) => (
                <MiniMetricBar key={metric.label} label={metric.label} score={metric.score} />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
              <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                {profile.targetRole}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                Load profile
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
