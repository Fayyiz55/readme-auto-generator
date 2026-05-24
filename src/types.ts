export interface ReadmeData {
  projectName: string;
  description: string;
  features: string[];
  installation: string;
  usage: string;
  techStack: string[];
  license: string;
  author: string;
  githubUrl: string;
  badgeStyle: 'flat' | 'plastic' | 'for-the-badge';
  template: 'default' | 'simple' | 'detailed' | 'saas' | 'api';
  extras: {
    showBadges: boolean;
    showTableOfContents: boolean;
    showScreenshot: boolean;
    screenshotUrl: string;
    showContributing: boolean;
    showAcknowledgements: boolean;
  };
}

export const defaultReadmeData: ReadmeData = {
  projectName: '',
  description: '',
  features: [],
  installation: '',
  usage: '',
  techStack: [],
  license: 'MIT',
  author: '',
  githubUrl: '',
  badgeStyle: 'for-the-badge',
  template: 'default',
  extras: {
    showBadges: true,
    showTableOfContents: true,
    showScreenshot: false,
    screenshotUrl: '',
    showContributing: true,
    showAcknowledgements: false,
  },
};
