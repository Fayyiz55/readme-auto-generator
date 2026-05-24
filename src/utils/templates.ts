import type { ReadmeData } from '../types';

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function githubBadgeUrl(label: string, message: string, color: string, style: ReadmeData['badgeStyle']) {
  const l = encodeURIComponent(label);
  const m = encodeURIComponent(message);
  return `https://img.shields.io/badge/${l}-${m}-${color}?style=${style}&logo=${l}`;
}

export function generateMarkdown(data: ReadmeData): string {
  const { template } = data;
  switch (template) {
    case 'simple':
      return generateSimple(data);
    case 'detailed':
      return generateDetailed(data);
    case 'saas':
      return generateSaaS(data);
    case 'api':
      return generateAPI(data);
    default:
      return generateDefault(data);
  }
}

function generateDefault(data: ReadmeData): string {
  const sections: string[] = [];

  if (data.extras.showBadges) {
    const badges = [
      `![License](https://img.shields.io/badge/license-${encodeURIComponent(data.license)}-blue?style=${data.badgeStyle})`,
    ];
    if (data.githubUrl) {
      const match = data.githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (match) {
        badges.push(`![Stars](https://img.shields.io/github/stars/${match[1]}/${match[2]}?style=${data.badgeStyle})`);
      }
    }
    sections.push(badges.join(' ') + '\n');
  }

  sections.push(`# ${data.projectName || 'Project Name'}\n`);

  if (data.extras.showScreenshot && data.extras.screenshotUrl) {
    sections.push(`![Screenshot](${data.extras.screenshotUrl})\n`);
  }

  sections.push(`> ${data.description || 'A brief description of what this project does and who it\'s for.'}\n`);

  if (data.extras.showTableOfContents) {
    sections.push(`## Table of Contents\n\n- [Features](#features)\n- [Tech Stack](#tech-stack)\n- [Installation](#installation)\n- [Usage](#usage)\n${data.extras.showContributing ? '- [Contributing](#contributing)\n' : ''}${data.extras.showAcknowledgements ? '- [Acknowledgements](#acknowledgements)\n' : ''}- [License](#license)\n`);
  }

  if (data.features.length > 0) {
    sections.push(`## Features\n\n${data.features.map((f) => `- ${f}`).join('\n')}\n`);
  }

  if (data.techStack.length > 0) {
    sections.push(`## Tech Stack\n\n${data.techStack.map((t) => `- ${t}`).join('\n')}\n`);
  }

  if (data.installation.trim()) {
    sections.push(`## Installation\n\n\`\`\`bash\n${data.installation.trim()}\n\`\`\`\n`);
  }

  if (data.usage.trim()) {
    sections.push(`## Usage\n\n${data.usage.trim()}\n`);
  }

  if (data.extras.showContributing) {
    sections.push(`## Contributing\n\nContributions are always welcome!\n\nSee \`CONTRIBUTING.md\` for ways to get started.\n`);
  }

  if (data.extras.showAcknowledgements) {
    sections.push(`## Acknowledgements\n\n- [Awesome Readme Templates](https://awesomeprofile.readthedocs.io/en/latest/)\n- [Awesome README](https://github.com/matiassingers/awesome-readme)\n- [How to write a Good readme](https://bulldogjob.com/readme)\n`);
  }

  sections.push(`## License\n\nThis project is licensed under the [${data.license}](./LICENSE) License.\n`);

  if (data.author) {
    sections.push(`## Author\n\n- [@${data.author}](${data.githubUrl || '#'})\n`);
  }

  return sections.join('\n');
}

function generateSimple(data: ReadmeData): string {
  return `# ${data.projectName || 'Project Name'}\n\n${data.description || ''}\n\n${data.features.length > 0 ? `## Features\n\n${data.features.map((f) => `- ${f}`).join('\n')}\n\n` : ''}${data.installation.trim() ? `## Installation\n\n\`\`\`bash\n${data.installation.trim()}\n\`\`\`\n\n` : ''}${data.usage.trim() ? `## Usage\n\n${data.usage.trim()}\n\n` : ''}## License\n\n${data.license}\n`;
}

function generateDetailed(data: ReadmeData): string {
  let md = `# ${data.projectName || 'Project Name'}\n\n`;
  md += `${data.description || ''}\n\n`;
  if (data.extras.showBadges) {
    md += `![License](https://img.shields.io/badge/license-${encodeURIComponent(data.license)}-blue?style=${data.badgeStyle})\n\n`;
  }
  if (data.extras.showTableOfContents) {
    md += `## Overview\n\n`;
    md += `## Table of Contents\n\n- [Features](#features)\n- [Getting Started](#getting-started)\n- [Roadmap](#roadmap)\n- [Contributing](#contributing)\n- [License](#license)\n\n`;
  }
  if (data.features.length > 0) {
    md += `## Features\n\n${data.features.map((f) => `- ${f}`).join('\n')}\n\n`;
  }
  md += `## Getting Started\n\n### Prerequisites\n\n- Node.js 18+\n\n`;
  if (data.installation.trim()) {
    md += `### Installation\n\n\`\`\`bash\n${data.installation.trim()}\n\`\`\`\n\n`;
  }
  if (data.usage.trim()) {
    md += `## Usage\n\n${data.usage.trim()}\n\n`;
  }
  md += `## Roadmap\n\n- [ ] Feature 1\n- [ ] Feature 2\n- [ ] Feature 3\n\n`;
  if (data.extras.showContributing) {
    md += `## Contributing\n\nContributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md).\n\n`;
  }
  md += `## License\n\n[${data.license}](./LICENSE)\n\n`;
  if (data.author) {
    md += `## Contact\n\n- ${data.author} – [GitHub](${data.githubUrl || '#'})\n\n`;
  }
  return md;
}

function generateSaaS(data: ReadmeData): string {
  let md = `# ${data.projectName || 'Project Name'}\n\n`;
  md += `${data.description || ''}\n\n`;
  if (data.extras.showBadges) {
    md += `![License](https://img.shields.io/badge/license-${encodeURIComponent(data.license)}-blue?style=${data.badgeStyle}) `;
    md += `![Version](https://img.shields.io/badge/version-1.0.0-green?style=${data.badgeStyle})\n\n`;
  }
  if (data.extras.showScreenshot && data.extras.screenshotUrl) {
    md += `![App Screenshot](${data.extras.screenshotUrl})\n\n`;
  }
  if (data.features.length > 0) {
    md += `## Features\n\n${data.features.map((f) => `- ${f}`).join('\n')}\n\n`;
  }
  if (data.techStack.length > 0) {
    md += `## Tech Stack\n\n${data.techStack.map((t) => `- ${t}`).join('\n')}\n\n`;
  }
  if (data.installation.trim()) {
    md += `## Getting Started\n\n\`\`\`bash\n${data.installation.trim()}\n\`\`\`\n\n`;
  }
  if (data.usage.trim()) {
    md += `## Usage\n\n${data.usage.trim()}\n\n`;
  }
  md += `## Deployment\n\n1. Build the project\n2. Deploy to Vercel / Netlify / GitHub Pages\n\n`;
  md += `## License\n\n[${data.license}](./LICENSE)\n\n`;
  return md;
}

function generateAPI(data: ReadmeData): string {
  let md = `# ${data.projectName || 'Project Name'}\n\n`;
  md += `${data.description || ''}\n\n`;
  if (data.extras.showBadges) {
    md += `![License](https://img.shields.io/badge/license-${encodeURIComponent(data.license)}-blue?style=${data.badgeStyle}) `;
    md += `![API](https://img.shields.io/badge/API-REST-informational?style=${data.badgeStyle})\n\n`;
  }
  if (data.features.length > 0) {
    md += `## Features\n\n${data.features.map((f) => `- ${f}`).join('\n')}\n\n`;
  }
  md += `## API Reference\n\n#### Get all items\n\n\`\`\`http\n  GET /api/items\n\`\`\`\n\n| Parameter | Type     | Description                |\n| :-------- | :------- | :------------------------- |\n| \`api_key\` | \`string\` | **Required**. Your API key |\n\n`;
  md += `#### Get item\n\n\`\`\`http\n  GET /api/items/${`{id}`}\n\`\`\`\n\n| Parameter | Type     | Description                       |\n| :-------- | :------- | :-------------------------------- |\n| \`id\`      | \`string\` | **Required**. Id of item to fetch |\n\n`;
  if (data.installation.trim()) {
    md += `## Installation\n\n\`\`\`bash\n${data.installation.trim()}\n\`\`\`\n\n`;
  }
  md += `## Usage\n\n\`\`\`javascript\nconst API_KEY = 'your_api_key';\n\`\`\`\n\n`;
  md += `## License\n\n[${data.license}](./LICENSE)\n\n`;
  return md;
}

export function downloadMarkdown(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.md') ? filename : `${filename}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(content: string) {
  if (!navigator.clipboard) {
    const ta = document.createElement('textarea');
    ta.value = content;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    return;
  }
  await navigator.clipboard.writeText(content);
}

export const LICENSES = ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'ISC', 'Unlicense'];
export const TEMPLATES: { id: ReadmeData['template']; label: string }[] = [
  { id: 'default', label: 'Default' },
  { id: 'simple', label: 'Simple' },
  { id: 'detailed', label: 'Detailed' },
  { id: 'saas', label: 'SaaS/Product' },
  { id: 'api', label: 'API Project' },
];
