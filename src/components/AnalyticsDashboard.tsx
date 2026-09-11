import { useEffect, useState } from 'react';
import { Code2, FolderGit2, FileText, Zap, TrendingUp, AlertTriangle, KeyRound, BarChart3 } from 'lucide-react';
import type { AnalysisResult } from '../types';
import { ScoreGauge } from './ScoreGauge';

interface AnalyticsDashboardProps {
  result: AnalysisResult;
}

const ICON_MAP: Record<string, typeof Code2> = {
  Code2,
  FolderGit2,
  FileText,
  Zap,
};

function MetricBar({ score, delay }: { score: number; delay: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  const color = score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-blue-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full ${color} transition-all duration-700 ease-out`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export function AnalyticsDashboard({ result }: AnalyticsDashboardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-bold text-slate-900">Industry Readiness Analytics</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 p-6">
          <p className="mb-4 text-sm font-semibold text-slate-600">Overall HR Match Score</p>
          <ScoreGauge score={result.hrMatchScore} />
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">Technical Breakdown</h3>
          <div className="space-y-5">
            {result.metrics.map((metric, i) => {
              const Icon = ICON_MAP[metric.icon] || Code2;
              return (
                <div key={metric.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-semibold text-slate-700">{metric.label}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{metric.score}%</span>
                  </div>
                  <MetricBar score={metric.score} delay={i * 150} />
                  <p className="mt-1 text-xs text-slate-400">{metric.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-emerald-800">What HR Will Value</h3>
          </div>
          <ul className="space-y-2.5">
            {result.strengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h3 className="text-sm font-bold text-amber-800">Skill Gaps to Fix</h3>
          </div>
          <ul className="space-y-2.5">
            {result.skillGaps.map((gap, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="mb-3 flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-slate-600" />
          <h3 className="text-sm font-bold text-slate-800">Missing Technical Keywords</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.missingKeywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700"
            >
              {keyword}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">
          These terms appear in the job description but were not detected in your resume.
        </p>
      </div>
    </section>
  );
}
