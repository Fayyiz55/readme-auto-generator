import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PreviewProps {
  markdown: string;
}

export function Preview({ markdown }: PreviewProps) {
  return (
    <div className="h-full overflow-y-auto p-6 bg-white dark:bg-slate-900">
      <article className="max-w-none prose prose-slate dark:prose-invert prose-sm md:prose-base">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </article>
    </div>
  );
}
