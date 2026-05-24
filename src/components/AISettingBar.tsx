import { useState, useCallback } from 'react';
import { Search, ArrowRight, AlertCircle } from 'lucide-react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface AISettingsProps {
  onGenerate: (apiKey: string, prompt: string) => void;
  loading: boolean;
}

export function AISettingBar({ onGenerate, loading }: AISettingsProps) {
  const [apiKey, setApiKey] = useState(() => loadFromStorage('openai_api_key', ''));
  const [showKey, setShowKey] = useState(false);
  const [prompt, setPrompt] = useState('Generate a detailed README for a modern SaaS project with React and Node.js');

  const saveKey = useCallback((val: string) => {
    setApiKey(val);
    saveToStorage('openai_api_key', val);
  }, []);

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-violet-50 dark:bg-slate-800/80 border-b border-violet-100 dark:border-slate-700">
      <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
        <Search className="w-4 h-4" />
        <span className="text-xs font-semibold uppercase tracking-wide">AI Assist</span>
      </div>

      <div className="flex-1 flex items-center gap-2">
        <input
          type={showKey ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => saveKey(e.target.value)}
          placeholder="OpenAI API key"
          className="w-40 sm:w-56 rounded-md border border-violet-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          onClick={() => setShowKey((s) => !s)}
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-300 transition-colors"
        >
          {showKey ? 'Hide' : 'Show'}
        </button>

        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your project..."
          className="hidden sm:block flex-1 rounded-md border border-violet-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <button
          disabled={loading || !apiKey.trim()}
          onClick={() => onGenerate(apiKey.trim(), prompt)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-50 transition-colors"
        >
          {loading ? 'Thinking…' : <><span className="hidden sm:inline">Generate</span><ArrowRight className="w-3.5 h-3.5" /></>}
        </button>
      </div>

      {!apiKey.trim() && (
        <div className="hidden md:flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs">
          <AlertCircle className="w-3.5 h-3.5" />
          Add your key to enable AI
        </div>
      )}
    </div>
  );
}
