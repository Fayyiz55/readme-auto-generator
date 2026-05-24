import { useState, useCallback } from 'react';
import { ClipboardCopy, Download, Wand2, Check, Loader2 } from 'lucide-react';
import { copyToClipboard, downloadMarkdown } from '../utils/templates';

interface ToolbarProps {
  markdown: string;
  projectName: string;
  onAIClick: () => void;
  aiLoading: boolean;
}

export function Toolbar({ markdown, projectName, onAIClick, aiLoading }: ToolbarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await copyToClipboard(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [markdown]);

  const handleDownload = useCallback(() => {
    downloadMarkdown(markdown, projectName ? `${projectName.replace(/\s+/g, '-')}-README` : 'README');
  }, [markdown, projectName]);

  return (
    <div className="flex items-center gap-2 p-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur border-b border-slate-200 dark:border-slate-700">
      <button
        onClick={onAIClick}
        disabled={aiLoading}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-60 transition-colors"
      >
        {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
        AI Generate
      </button>
      <div className="flex-1" />
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <ClipboardCopy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 transition-colors"
      >
        <Download className="w-4 h-4" />
        Download .md
      </button>
    </div>
  );
}
