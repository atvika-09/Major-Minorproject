import { useState, useCallback, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, XCircle, Loader2, X } from 'lucide-react';
import type { UploadedFile, UploadState } from '../types';

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

const ACCEPTED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
const ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.txt'];

export function FileUpload({ files, onFilesChange }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidFile = (file: File): boolean => {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    return ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.includes(ext);
  };

  const processFile = useCallback((file: File) => {
    if (!isValidFile(file)) {
      onFilesChange([...files, { name: file.name, size: file.size, state: 'error' as UploadState }]);
      return;
    }
    const newFile: UploadedFile = { name: file.name, size: file.size, state: 'analyzing' };
    const updatedFiles = [...files, newFile];
    onFilesChange(updatedFiles);
    setTimeout(() => {
      onFilesChange(
        updatedFiles.map((f) =>
          f.name === file.name && f.size === file.size ? { ...f, state: 'success' as UploadState } : f
        )
      );
    }, 1800);
  }, [files, onFilesChange]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(processFile);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(processFile);
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-2">
        <UploadCloud className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-bold text-slate-900">Upload Your Resume</h2>
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-blue-500 bg-blue-50 scale-[1.01]'
            : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40'
        }`}
      >
        <div className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
          dragActive ? 'bg-blue-100' : 'bg-slate-100'
        }`}>
          <UploadCloud className={`h-7 w-7 transition-colors ${dragActive ? 'text-blue-600' : 'text-slate-400'}`} />
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-700">
          Drag & drop your resume here, or click to browse
        </p>
        <p className="mt-1 text-xs text-slate-400">Supports PDF, DOCX, TXT — up to 10 MB</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt"
          onChange={handleSelect}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                <FileText className="h-5 w-5 text-slate-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{file.name}</p>
                <p className="text-xs text-slate-400">{formatSize(file.size)}</p>
              </div>
              <div className="flex items-center gap-2">
                {file.state === 'analyzing' && (
                  <div className="flex items-center gap-1.5 text-blue-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-xs font-medium">Analyzing...</span>
                  </div>
                )}
                {file.state === 'success' && (
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs font-medium">Success</span>
                  </div>
                )}
                {file.state === 'error' && (
                  <div className="flex items-center gap-1.5 text-red-500">
                    <XCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">Unsupported format</span>
                  </div>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                  className="ml-1 rounded p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
