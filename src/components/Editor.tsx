import { useCallback } from 'react';
import type { ReadmeData } from '../types';

interface EditorProps {
  data: ReadmeData;
  onChange: (data: ReadmeData) => void;
}

export function Editor({ data, onChange }: EditorProps) {
  const set = useCallback(
    <K extends keyof ReadmeData>(key: K, value: ReadmeData[K]) => {
      onChange({ ...data, [key]: value });
    },
    [data, onChange]
  );

  const setExtra = useCallback(
    <K extends keyof ReadmeData['extras']>(key: K, value: ReadmeData['extras'][K]) => {
      onChange({ ...data, extras: { ...data.extras, [key]: value } });
    },
    [data, onChange]
  );

  return (
    <div className="flex flex-col gap-5 p-5 overflow-y-auto">
      <section>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
          Project Name
        </label>
        <input
          value={data.projectName}
          onChange={(e) => set('projectName', e.target.value)}
          placeholder="My Awesome Project"
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </section>

      <section>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
          Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Briefly describe your project..."
          rows={3}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />
      </section>

      <section>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
          Features (one per line)
        </label>
        <textarea
          value={data.features.join('\n')}
          onChange={(e) => set('features', e.target.value.split('\n').filter(Boolean))}
          placeholder="- Feature 1&#10;- Feature 2"
          rows={4}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />
      </section>

      <section>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
          Installation
        </label>
        <textarea
          value={data.installation}
          onChange={(e) => set('installation', e.target.value)}
          placeholder="npm install my-package"
          rows={3}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono resize-none"
        />
      </section>

      <section>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
          Usage
        </label>
        <textarea
          value={data.usage}
          onChange={(e) => set('usage', e.target.value)}
          placeholder="Explain how to use the project..."
          rows={4}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />
      </section>

      <section>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
          Tech Stack (one per line)
        </label>
        <textarea
          value={data.techStack.join('\n')}
          onChange={(e) => set('techStack', e.target.value.split('\n').filter(Boolean))}
          placeholder="React&#10;TypeScript&#10;Tailwind CSS"
          rows={3}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />
      </section>

      <section className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            Author
          </label>
          <input
            value={data.author}
            onChange={(e) => set('author', e.target.value)}
            placeholder="@yourusername"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            GitHub URL
          </label>
          <input
            value={data.githubUrl}
            onChange={(e) => set('githubUrl', e.target.value)}
            placeholder="https://github.com/user/repo"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </section>

      <section className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            License
          </label>
          <select
            value={data.license}
            onChange={(e) => set('license', e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option>MIT</option>
            <option>Apache-2.0</option>
            <option>GPL-3.0</option>
            <option>BSD-3-Clause</option>
            <option>ISC</option>
            <option>Unlicense</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            Badge Style
          </label>
          <select
            value={data.badgeStyle}
            onChange={(e) => set('badgeStyle', e.target.value as ReadmeData['badgeStyle'])}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="for-the-badge">For the Badge</option>
            <option value="flat">Flat</option>
            <option value="plastic">Plastic</option>
          </select>
        </div>
      </section>

      <section className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
            Template
          </label>
          <select
            value={data.template}
            onChange={(e) => set('template', e.target.value as ReadmeData['template'])}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="default">Default</option>
            <option value="simple">Simple</option>
            <option value="detailed">Detailed</option>
            <option value="saas">SaaS / Product</option>
            <option value="api">API Project</option>
          </select>
        </div>
      </section>

      <section>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
          Options
        </label>
        <div className="flex flex-col gap-2">
          {[
            { key: 'showBadges' as const, label: 'Show Badges' },
            { key: 'showTableOfContents' as const, label: 'Table of Contents' },
            { key: 'showScreenshot' as const, label: 'Include Screenshot' },
            { key: 'showContributing' as const, label: 'Show Contributing Section' },
            { key: 'showAcknowledgements' as const, label: 'Show Acknowledgements' },
          ].map((opt) => (
            <label key={opt.key} className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={!!data.extras[opt.key]}
                onChange={(e) => setExtra(opt.key, e.target.checked as any)}
                className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />
              {opt.label}
            </label>
          ))}
          {data.extras.showScreenshot && (
            <input
              value={data.extras.screenshotUrl}
              onChange={(e) => setExtra('screenshotUrl', e.target.value)}
              placeholder="https://your-screenshot-url.png"
              className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          )}
        </div>
      </section>
    </div>
  );
}
