import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'AI-Native Email Client',
    icon: '🤖',
    description: (
      <>
        The AI assistant has full control of the UI — navigating, filtering,
        composing, replying, and managing your inbox through natural language.
        Every action goes through typed, validated tools.
      </>
    ),
  },
  {
    title: 'Human-in-the-Loop',
    icon: '🛡️',
    description: (
      <>
        Every destructive or communication action (send, delete) requires
        explicit user approval. The approval dialog supports approve, reject,
        pause-and-edit, and cancel workflows.
      </>
    ),
  },
  {
    title: 'Tool-Based Architecture',
    icon: '🔧',
    description: (
      <>
        The AI never manipulates the DOM directly. All capabilities are exposed
        as typed, Zod-validated tools that mutate Zustand stores or invoke
        server actions — deterministic, testable, auditable.
      </>
    ),
  },
  {
    title: 'Rich Email Management',
    icon: '📧',
    description: (
      <>
        Virtualized thread lists with infinite scroll, TipTap rich-text compose,
        Gmail label-based views (inbox, sent, drafts, spam), and real-time sync
        via 15-second polling.
      </>
    ),
  },
  {
    title: 'File Reasoning',
    icon: '📄',
    description: (
      <>
        Upload PDFs, text files, and CSVs. The AI extracts text server-side and
        reasons about the content — enabling workflows like resume-to-job
        matching.
      </>
    ),
  },
  {
    title: 'State Duality',
    icon: '⚛️',
    description: (
      <>
        Zustand for transient UI state (filters, selection, compose draft,
        approval); React Query for server state (threads, messages) with
        automatic cache invalidation and pagination.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <span style={{fontSize: '3rem', display: 'block', marginBottom: '0.5rem'}}>{icon}</span>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
