import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },
  title: 'Quartermaster',
  tagline: 'Conversational kirana-store agent — Telegram → LLM → SQLite',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://harishkumar.info',
  baseUrl: '/docs/quartermaster/',

  organizationName: 'pyt',
  projectName: 'Quartermaster',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Quartermaster',
      logo: {
        src: 'img/logo.svg',
        alt: 'Quartermaster',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://harishkumar.info/',
          label: 'Portfolio',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Architecture',
          items: [
            {
              label: 'System Overview',
              to: '/docs/architecture/system-overview',
            },
            {
              label: 'Module Architecture',
              to: '/docs/architecture/module-architecture',
            },
          ],
        },
        {
          title: 'Modules',
          items: [
            {
              label: 'Inventory',
              to: '/docs/modules/inventory',
            },
            {
              label: 'Billing',
              to: '/docs/modules/billing',
            },
            {
              label: 'Khata (Credit)',
              to: '/docs/modules/khata',
            },
            {
              label: 'Documents',
              to: '/docs/modules/documents',
            },
            {
              label: 'Reminders',
              to: '/docs/modules/reminders',
            },
            {
              label: 'Analytics',
              to: '/docs/modules/analytics',
            },
          ],
        },
        {
          title: 'Core Patterns',
          items: [
            {
              label: 'Middleware Pipeline',
              to: '/docs/core-patterns/middleware-pipeline',
            },
            {
              label: 'Multi-Chat Isolation',
              to: '/docs/core-patterns/multi-chat-isolation',
            },
            {
              label: 'Pricing & GST',
              to: '/docs/core-patterns/pricing-gst',
            },
            {
              label: 'Subagent Delegation',
              to: '/docs/core-patterns/subagent-delegation',
            },
          ],
        },
        {
          title: 'Infrastructure',
          items: [
            {
              label: 'Telegram Integration',
              to: '/docs/infrastructure/telegram-integration',
            },
            {
              label: 'Data Model',
              to: '/docs/infrastructure/data-model',
            },
            {
              label: 'Testing Strategy',
              to: '/docs/infrastructure/testing-strategy',
            },
            {
              label: 'Deployment',
              to: '/docs/infrastructure/deployment',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Quartermaster.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
