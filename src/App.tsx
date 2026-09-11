import { useState, useCallback } from 'react';
import { ScanLine, Loader2, FileSearch, Layers, ShieldCheck } from 'lucide-react';
import type { JobRole, AnalysisResult, UploadedFile, CandidateProfile } from './types';
import { ANALYSIS_RESULTS, SAMPLE_JD, CANDIDATE_PROFILES } from './data/mockData';
import { Header } from './components/Header';
import { JobSelector } from './components/JobSelector';
import { FileUpload } from './components/FileUpload';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { CandidateProfiles } from './components/CandidateProfiles';

const ANALYSIS_STAGES = [
  'Parsing document structure...',
  'Extracting technical keywords...',
  'Matching against job description...',
  'Evaluating project portfolio...',
  'Calculating HR match score...',
];

function App() {
  const [role, setRole] = useState<JobRole>('Full-Stack Web Developer');
  const [jobDescription, setJobDescription] = useState(SAMPLE_JD['Full-Stack Web Developer']);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [activeProfile, setActiveProfile] = useState<CandidateProfile | null>(null);

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true);
    setResult(null);
    setProgress(0);
    setStageIndex(0);
    setHasAnalyzed(true);

    for (let i = 0; i < ANALYSIS_STAGES.length; i++) {
      setStageIndex(i);
      await new Promise((r) => setTimeout(r, 700));
      setProgress(((i + 1) / ANALYSIS_STAGES.length) * 100);
    }

    await new Promise((r) => setTimeout(r, 300));
    setResult(ANALYSIS_RESULTS[role]);
    setIsAnalyzing(false);
  }, [role]);

  const handleSelectProfile = useCallback((profile: CandidateProfile) => {
    setActiveProfile(profile);
    setRole(profile.targetRole);
    setJobDescription(profile.jobDescription);
    setFiles([{ name: profile.resumeFileName, size: profile.resumeSize, state: 'success' }]);
    setResult(null);
    setHasAnalyzed(false);
  }, []);

  const canAnalyze = jobDescription.trim().length > 0 && files.some((f) => f.state === 'success');

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 md:px-6 md:py-10">
        {/* Reference Candidate Profiles */}
        <CandidateProfiles onSelectProfile={handleSelectProfile} />

        {/* Active Profile Banner */}
        {activeProfile && (
          <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50/50 px-5 py-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${activeProfile.avatarColor}`}>
              {activeProfile.avatarInitials}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Loaded: {activeProfile.name} — {activeProfile.title}
              </p>
              <p className="text-xs text-slate-500">
                Resume, job role, and job description auto-filled. Click "Analyze Resume" to see results.
              </p>
            </div>
          </div>
        )}

        {/* Job & Domain Selector */}
        <JobSelector
          role={role}
          onRoleChange={(r) => {
            setRole(r);
            setActiveProfile(null);
            if (SAMPLE_JD[r] && r !== 'Custom') {
              setJobDescription(SAMPLE_JD[r]);
            }
          }}
          jobDescription={jobDescription}
          onJDChange={setJobDescription}
        />

        {/* File Upload */}
        <FileUpload files={files} onFilesChange={setFiles} />

        {/* Analyze Button */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze || isAnalyzing}
            className={`flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-200 ${
              canAnalyze && !isAnalyzing
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-700/40 active:scale-[0.98]'
                : 'cursor-not-allowed bg-slate-200 text-slate-400'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <ScanLine className="h-5 w-5" />
                Analyze Resume
              </>
            )}
          </button>
          {!canAnalyze && !isAnalyzing && (
            <p className="text-xs text-slate-400">
              Upload a resume and ensure a job description is entered to begin analysis
            </p>
          )}
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6">
            <div className="mb-4 flex items-center gap-2">
              <FileSearch className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-bold text-blue-900">Analysis Pipeline</span>
            </div>
            <div className="space-y-3">
              {ANALYSIS_STAGES.map((stage, i) => (
                <div key={stage} className="flex items-center gap-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    i < stageIndex ? 'bg-emerald-500 text-white' :
                    i === stageIndex ? 'bg-blue-500 text-white' :
                    'bg-slate-200 text-slate-400'
                  }`}>
                    {i < stageIndex ? '✓' : i === stageIndex ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : i + 1}
                  </div>
                  <span className={`text-sm ${
                    i < stageIndex ? 'text-slate-500 line-through' :
                    i === stageIndex ? 'font-medium text-blue-900' :
                    'text-slate-400'
                  }`}>
                    {stage}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Analytics Dashboard */}
        {result && !isAnalyzing && (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <AnalyticsDashboard result={result} />
          </div>
        )}

        {/* Empty State before first analysis */}
        {!result && !isAnalyzing && !hasAnalyzed && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Layers className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-600">Ready for Analysis</h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-400">
              Select a reference profile above, or choose a job role, paste the job description,
              upload a resume, and click "Analyze Resume" to see your industry readiness score.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>ResumeScan Placement Portal — Project Showcase for Academic Evaluation</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Simulated analysis engine demonstrating ATS optimization and source code mapping concepts
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
