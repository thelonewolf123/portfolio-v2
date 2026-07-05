import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroEmblem}>⚡</div>
        <Heading as="h1" className={styles.heroTitle}>
          Aegis
        </Heading>
        <p className={styles.heroNarrative}>
          An AI system for <strong>querying</strong> and <strong>debugging</strong>{' '}
          production systems via natural language.
        </p>
        <p className={styles.heroSubtext}>
          Connect your databases, logs, and infrastructure — ask questions in plain English,
          get answers with code, charts, and actionable insights.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/overview">
            Read the Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Aegis: AI-powered natural language interface for querying databases, investigating logs, and debugging production systems.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
