import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Briefcase, FileText, Check } from 'lucide-react';
import type { JobRole } from '../types';
import { JOB_ROLES, SAMPLE_JD } from '../data/mockData';

interface JobSelectorProps {
  role: JobRole;
  onRoleChange: (role: JobRole) => void;
  jobDescription: string;
  onJDChange: (jd: string) => void;
}

export function JobSelector({ role, onRoleChange, jobDescription, onJDChange }: JobSelectorProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSelect = (selected: JobRole) => {
    onRoleChange(selected);
    setOpen(false);
    if (SAMPLE_JD[selected] && selected !== 'Custom') {
      onJDChange(SAMPLE_JD[selected]);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-bold text-slate-900">Target Job & Domain</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Select Target Job Role
          </label>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-800 transition-colors hover:border-blue-400 hover:bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <span>{role}</span>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                {JOB_ROLES.map((jobRole) => (
                  <button
                    key={jobRole}
                    onClick={() => handleRoleSelect(jobRole)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-blue-50"
                  >
                    <span>{jobRole}</span>
                    {role === jobRole && <Check className="h-4 w-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Based on industry training programs
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Job Description
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <textarea
              value={jobDescription}
              onChange={(e) => onJDChange(e.target.value)}
              placeholder="Paste the complete target job description here..."
              className="h-24 w-full resize-none rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 transition-colors hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">
            {jobDescription.length} characters detected
          </p>
        </div>
      </div>
    </section>
  );
}
