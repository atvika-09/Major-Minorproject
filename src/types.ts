export type JobRole =
  | 'Full-Stack Web Developer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'DevOps Engineer'
  | 'AI/Machine Learning Intern'
  | 'Data Science Associate'
  | 'Autonomous Systems Engineer'
  | 'Custom';

export interface MetricBreakdown {
  label: string;
  score: number;
  description: string;
  icon: string;
}

export interface AnalysisResult {
  hrMatchScore: number;
  metrics: MetricBreakdown[];
  strengths: string[];
  skillGaps: string[];
  missingKeywords: string[];
}

export type UploadState = 'idle' | 'analyzing' | 'success' | 'error';

export interface UploadedFile {
  name: string;
  size: number;
  state: UploadState;
}

export interface CandidateProfile {
  id: string;
  name: string;
  title: string;
  avatarInitials: string;
  avatarColor: string;
  resumeFileName: string;
  resumeSize: number;
  targetRole: JobRole;
  jobDescription: string;
  result: AnalysisResult;
}
