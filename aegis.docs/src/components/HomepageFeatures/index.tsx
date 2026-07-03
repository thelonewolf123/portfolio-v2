import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Natural Language Queries',
    description: (
      <>
        Ask questions in plain English — Aegis translates to SQL, CloudWatch Insights,
        and API calls automatically. No query language needed. <strong>"Show me users who
        uninstalled last week and what domains they were watching."</strong>
      </>
    ),
  },
  {
    title: 'Multi-Source Correlation',
    description: (
      <>
        Join data across PostgreSQL, CloudWatch Logs, and IP geolocation in a single
        conversation. Trace a user from signup → room creation → error log → uninstall
        without switching tools.
      </>
    ),
  },
  {
    title: 'Production Debugging',
    description: (
      <>
        Built-in investigation patterns for incidents, churn analysis, and performance
        issues. Follow the 4-phase framework: <strong>Scope</strong> → <strong>Explore</strong> →
        <strong>Collect</strong> → <strong>Analyze</strong>. From vague reports to root cause in
        minutes.
      </>
    ),
  },
  {
    title: 'Secure by Default',
    description: (
      <>
        LLM-generated Python executes in a defense-in-depth sandbox: Docker isolation →
        iptables network lockdown → NSJail namespacing → seccomp syscall filtering →
        app-level guards. <strong>Zero network access, zero privileges.</strong>
      </>
    ),
  },
  {
    title: 'Real-Time Streaming',
    description: (
      <>
        Every tool call, query result, and chart streams live via SSE. Watch the agent
        think, explore, and analyze step by step — no black-box waiting, full transparency
        into every decision.
      </>
    ),
  },
  {
    title: 'Integrate Anywhere',
    description: (
      <>
        Deploy as a FastAPI chatbot with a built-in Alpine.js UI, or as a FastMCP server
        for Claude Desktop and any MCP client. Same engine, any interface — <strong>zero
        code changes between modes.</strong>
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
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
