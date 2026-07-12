import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  mainSidebar: [
    "overview",
    {
      type: "category",
      label: "Architecture",
      link: { type: "generated-index" },
      items: [
        "architecture/system-overview",
        "architecture/module-architecture",
      ],
    },
    {
      type: "category",
      label: "Modules",
      link: { type: "generated-index" },
      items: [
        "modules/inventory",
        "modules/preferences",
        "modules/customers",
        "modules/billing",
        "modules/khata",
        "modules/documents",
        "modules/analytics",
        "modules/reminders",
      ],
    },
    {
      type: "category",
      label: "Core Patterns",
      link: { type: "generated-index" },
      items: [
        "core-patterns/middleware-pipeline",
        "core-patterns/multi-chat-isolation",
        "core-patterns/pricing-gst",
        "core-patterns/subagent-delegation",
      ],
    },
    {
      type: "category",
      label: "Infrastructure",
      link: { type: "generated-index" },
      items: [
        "infrastructure/telegram-integration",
        "infrastructure/data-model",
        "infrastructure/testing-strategy",
        "infrastructure/deployment",
      ],
    },
  ],
};

export default sidebars;
