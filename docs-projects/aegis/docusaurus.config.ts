import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Aegis Agent Architecture",
  tagline: "Query and debug production systems via natural language",
  favicon: "img/favicon.ico",

  future: {
    v4: true
  },

  url: "https://harishkumar.info",
  baseUrl: "/docs/aegis/",

  organizationName: "watchwithme",
  projectName: "aegis-agent",

  onBrokenLinks: "throw",

  markdown: {
    mermaid: true
  },

  themes: ["@docusaurus/theme-mermaid"],

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
          editUrl: undefined
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css"
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    image: "img/aegis-social-card.jpg",
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: false
    },
    navbar: {
      title: "Aegis Docs",
      logo: {
        alt: "Aegis Logo",
        src: "img/logo.svg"
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation"
        },
        {
          href: "https://harishkumar.info/",
          label: "Portfolio",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            { label: "Overview", to: "/docs/overview" },
            { label: "Architecture", to: "/docs/architecture" },
            { label: "Project Structure", to: "/docs/project-structure" },
            { label: "Data Flow", to: "/docs/data-flow" }
          ]
        },
        {
          title: "Components",
          items: [
            { label: "Agent System", to: "/docs/agent-system" },
            { label: "Tools", to: "/docs/tools" },
            { label: "Code Sandbox", to: "/docs/sandbox" },
            { label: "MCP Server", to: "/docs/mcp-server" },
            { label: "Chat API", to: "/docs/chat-api" }
          ]
        },
        {
          title: "More",
          items: [
            { label: "Frontend", to: "/docs/frontend" },
            { label: "Security", to: "/docs/security" },
            { label: "Design Patterns", to: "/docs/design-patterns" },
            { label: "Deployment", to: "/docs/deployment" }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} WatchWithMe.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    }
  } satisfies Preset.ThemeConfig
};

export default config;
