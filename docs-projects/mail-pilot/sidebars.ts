import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/system-overview',
        'architecture/data-flow',
        'architecture/component-hierarchy',
      ],
    },
    {
      type: 'category',
      label: 'AI Agent System',
      items: [
        'ai-agent/tool-architecture',
        'ai-agent/human-in-the-loop',
        'ai-agent/context-system',
      ],
    },
    {
      type: 'category',
      label: 'State Management',
      items: [
        'state-management/zustand-stores',
        'state-management/react-query',
        'state-management/ai-context-bridge',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/gmail-api',
        'integrations/authentication',
        'integrations/llm-configuration',
      ],
    },
    {
      type: 'category',
      label: 'Security & HITL',
      items: [
        'security/auth-architecture',
        'security/approval-system',
      ],
    },
    {
      type: 'category',
      label: 'Demo Videos',
      items: [
        'demo/inbox-management',
        'demo/search-filter',
        'demo/replies',
        'demo/job-workflow',
      ],
    },
    {
      type: 'category',
      label: 'Extensibility',
      items: [
        'extensibility/adding-tools',
        'extensibility/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Engineering Decisions',
      items: [
        'engineering-decisions/tool-based-architecture',
        'engineering-decisions/polling-over-pubsub',
        'engineering-decisions/state-split',
        'engineering-decisions/model-choice',
      ],
    },
    {
      type: 'category',
      label: 'Testing',
      items: ['testing/overview'],
    },
  ],
};

export default sidebars;
