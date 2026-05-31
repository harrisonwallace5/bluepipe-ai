import { useRef, useState } from 'react';

const MAX_FILE_SIZE = 25 * 1024 * 1024;

function formatFileSize(size) {
  if (!size) {
    return 'Unknown size';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  let value = size;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function isAcceptedFile(file) {
  if (!file) {
    return false;
  }

  const name = file.name.toLowerCase();

  return file.type === 'application/pdf' || file.type.startsWith('image/') || name.endsWith('.pdf');
}

function UploadPanel({ selectedFile, onFileSelect, onAnalysisResult }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [apiError, setApiError] = useState('');
  const inputRef = useRef(null);

  const analyzeFile = async (file) => {
    setIsAnalyzing(true);
    setApiError('');
    setAnalysisResult(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setAnalysisResult(data);
      if (onAnalysisResult) onAnalysisResult(data);
    } catch (err) {
      setApiError(`Analysis failed: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updateSelection = (file) => {
    if (!file) {
      return;
    }

    if (!isAcceptedFile(file)) {
      setError('Unsupported file type. Upload a PDF, PNG, JPG, or WEBP plan file.');
      setIsDragging(false);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File is too large. Keep uploads under 25 MB for the current intake flow.');
      setIsDragging(false);
      return;
    }

    setError('');
    onFileSelect(file);
    setIsDragging(false);
    analyzeFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    updateSelection(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }

    setIsDragging(false);
  };

  const openPicker = () => {
    inputRef.current?.click();
  };

  const renderStatusCard = () => {
    if (isAnalyzing) {
      return (
        <>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Upload status</p>
          <p className="mt-3 font-medium text-electric">Analyzing…</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Sending to BluePipe AI analysis service — results will appear below.
          </p>
        </>
      );
    }

    if (apiError) {
      return (
        <>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Upload status</p>
          <p className="mt-3 font-medium text-rose-300">Connection error</p>
          <p className="mt-2 text-sm leading-7 text-rose-200">{apiError}</p>
        </>
      );
    }

    if (analysisResult) {
      const k = analysisResult.kpis;
      return (
        <>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Upload status</p>
          <p className="mt-3 font-medium text-emerald-300">✓ Analysis complete</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            {k.total_fixtures} fixtures · {k.flagged_count} flagged · {k.pipe_runs_estimated} pipe runs · {k.estimated_labor_hrs} labor hrs
          </p>
        </>
      );
    }

    if (selectedFile) {
      return (
        <>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Upload status</p>
          <p className="mt-3 font-medium text-white">Ready for backend handoff</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            The file is staged in local component state and can be posted to your API as multipart form data.
          </p>
        </>
      );
    }

    return (
      <>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Recommended next integration</p>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Send the uploaded file to an API route, return structured JSON, and replace the demo data in the
          results panel with live analysis output.
        </p>
      </>
    );
  };

  return (
    <div className="panel shadow-glow">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="eyebrow">Plan intake</span>
            <h2 className="section-title mt-4">Upload plumbing plans for analysis</h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            Accepts: PDF, PNG, JPG, WEBP
          </div>
        </div>

        <p className="muted-copy mt-4 max-w-2xl">
          Drop a plumbing drawing package, detail sheet, or marked-up field sketch. Uploads are sent to the
          BluePipe AI analysis service and results appear automatically.
        </p>

        <div
          className={`mt-8 rounded-[28px] border-2 border-dashed p-6 transition duration-200 sm:p-10 ${
            isDragging
              ? 'border-electric bg-electric/10'
              : error
                ? 'border-rose-400/60 bg-rose-500/10'
                : 'border-white/15 bg-gradient-to-br from-white/5 to-white/[0.03]'
          }`}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,image/*"
            className="hidden"
            onChange={(event) => updateSelection(event.target.files?.[0])}
          />

          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-electric/30 bg-electric/15">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-10 w-10 text-electric"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 16V4" />
                <path d="m7 9 5-5 5 5" />
                <path d="M20 16.8A4.8 4.8 0 0 1 15.2 21H8.8A4.8 4.8 0 0 1 4 16.8 4.8 4.8 0 0 1 8.8 12H9a6 6 0 0 1 11 1.5A4 4 0 0 1 20 16.8Z" />
              </svg>
            </div>

            <h3 className="mt-6 font-display text-2xl font-semibold text-white">Drag and drop your plan set</h3>
            <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">
              Upload one plan file to run the BluePipe AI intake flow. Results populate the analysis panel below
              automatically after upload.
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-400">
              Single file upload · Max 25 MB
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openPicker}
                className="inline-flex items-center justify-center rounded-full bg-electric px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Select File
              </button>
              <a
                href="#results"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-electric/50 hover:bg-white/10"
              >
                Preview Results Layout
              </a>
            </div>

            <div aria-live="polite" className="mt-5 min-h-6 text-sm">
              {error ? <p className="font-medium text-rose-200">{error}</p> : null}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-navy/70 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Selected file</p>
            {selectedFile ? (
              <div className="mt-3">
                <p className="font-medium text-white">{selectedFile.name}</p>
                <p className="mt-1 text-sm text-slate-300">
                  {formatFileSize(selectedFile.size)}
                  {selectedFile.type ? ` · ${selectedFile.type}` : ''}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-300">No file selected yet.</p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-navy/70 p-5">
            {renderStatusCard()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPanel;
