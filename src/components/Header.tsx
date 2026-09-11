import { ScanLine, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.2) 0%, transparent 50%)',
      }} />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <ScanLine className="h-7 w-7 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight">ResumeScan</span>
            <span className="ml-2 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-medium text-blue-300">
              Placement Readiness Portal
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl md:leading-tight">
          ResumeScan Placement Portal: Project Showcase
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
          Bridging the gap between certificates and build-ready talent through real-time
          ATS optimization and source code mapping.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 backdrop-blur-sm ring-1 ring-white/10">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-slate-200">AI-Powered ATS Analysis</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 backdrop-blur-sm ring-1 ring-white/10">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-slate-200">Industry Readiness Scoring</span>
          </div>
        </div>
      </div>
    </header>
  );
}
