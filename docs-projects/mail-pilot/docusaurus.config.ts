import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    mermaid: true
  },
  title: "Mail Pilot",
  tagline: "AI-Powered Email Client — Architecture Deep Dive",
  favicon: "img/favicon.ico",

  future: {
    v4: true
  },

  url: "https://harishkumar.info",
  baseUrl: "/docs/mail-pilot/",

  organizationName: "pyt",
  projectName: "mail-pilot",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"]
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/pyt/mail-pilot/tree/main/docs-site/"
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true
          },
          editUrl: "https://github.com/pyt/mail-pilot/tree/main/docs-site/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn"
        },
        theme: {
          customCss: "./src/css/custom.css"
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    image: "img/mail-pilot-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true
    },
    navbar: {
      title: "Mail Pilot",
      logo: {
        alt: "Mail Pilot Logo",
        src: "img/logo.svg"
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Documentation"
        },
        {
          href: "https://harishkumar.info/",
          label: "Portfolio",
          position: "right"
        },
        {
          href: "https://github.com/pyt/mail-pilot",
          label: "GitHub",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Overview",
              to: "/docs/overview"
            },
            {
              label: "Architecture",
              to: "/docs/architecture/system-overview"
            },
            {
              label: "AI Agent System",
              to: "/docs/ai-agent/tool-architecture"
            }
          ]
        },
        {
          title: "Demo",
          items: [
            {
              label: "Write & Send Email",
              to: "/docs/demo/inbox-management"
            },
            {
              label: "Search & Filter",
              to: "/docs/demo/search-filter"
            },
            {
              label: "Send Replies",
              to: "/docs/demo/replies"
            },
            {
              label: "Job Workflow",
              to: "/docs/demo/job-workflow"
            }
          ]
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/pyt/mail-pilot"
            },
            {
              label: "Live App",
              href: "https://mail-pilot-psi.vercel.app"
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mail Pilot. Built with Docusaurus.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    },
    mermaid: {
      theme: {
        light: "neutral",
        dark: "dark"
      }
    }
  } satisfies Preset.ThemeConfig
};

export default config;
