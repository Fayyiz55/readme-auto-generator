import { useState, useCallback, useEffect } from 'react';
import { Sun, Moon, FileText } from 'lucide-react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Toolbar } from './components/Toolbar';
import { AISettingBar } from './components/AISettingBar';
import { useTheme } from './context/ThemeContext';
import { defaultReadmeData } from './types';
import type { ReadmeData } from './types';
import { generateMarkdown } from './utils/templates';
import { loadFromStorage, saveToStorage } from './utils/storage';

function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="flex items-center justify-between px-5 py-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white">
          <FileText className="w-4 h-4" />
        </div>
        <h1 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          README Auto-Generator
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="GitHub"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.28-1.56 3.285-1.23 3.285-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-20 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
      <div className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-3">
        <span className="inline-block w-4 h-4 rounded-full border-2 border-violet-200 border-t-violet-600 animate-spin" />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Generating with AI...</span>
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState<ReadmeData>(() =>
    loadFromStorage('data', defaultReadmeData)
  );
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    saveToStorage('data', data);
  }, [data]);

  const markdown = generateMarkdown(data);

  const handleAIGenerate = useCallback(async (apiKey: string, prompt: string) => {
    if (!apiKey) return;
    setAiLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are a README helper. Return ONLY a JSON object with keys: projectName, description, features (array of strings), installation (string), usage (string), techStack (array of strings), license (string), author (string), githubUrl (string). No markdown, no extra text.',
            },
            {
              role: 'user',
              content: `Generate README metadata for: ${prompt}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1200,
        }),
      });
      if (!response.ok) throw new Error('OpenAI API error');
      const payload = await response.json();
      let raw = payload.choices?.[0]?.message?.content ?? '{}';
      raw = raw.replace(/```json\n?|```\n?/g, '').trim();
      const parsed = JSON.parse(raw);
      setData((prev) => ({
        ...prev,
        projectName: parsed.projectName || prev.projectName,
        description: parsed.description || prev.description,
        features: Array.isArray(parsed.features) ? parsed.features : prev.features,
        installation: parsed.installation || prev.installation,
        usage: parsed.usage || prev.usage,
        techStack: Array.isArray(parsed.techStack) ? parsed.techStack : prev.techStack,
        license: parsed.license || prev.license,
        author: parsed.author || prev.author,
        githubUrl: parsed.githubUrl || prev.githubUrl,
      }));
    } catch {
      // Silently fail so UI stays usable
    } finally {
      setAiLoading(false);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <Header />
      <AISettingBar onGenerate={handleAIGenerate} loading={aiLoading} />
      <Toolbar markdown={markdown} projectName={data.projectName} onAIClick={() => handleAIGenerate(
        loadFromStorage('openai_api_key', ''),
        'Generate a detailed README for a modern SaaS project with React and Node.js'
      )} aiLoading={aiLoading} />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {aiLoading && <LoadingOverlay />}
        <div className="flex-1 min-h-0 overflow-y-auto border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
          <Editor data={data} onChange={setData} />
        </div>
        <div className="flex-1 min-h-0">
          <Preview markdown={markdown} />
        </div>
      </div>
    </div>
  );
}
