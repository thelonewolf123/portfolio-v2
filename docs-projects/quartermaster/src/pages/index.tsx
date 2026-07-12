import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroEmblem}>⛩️</div>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroNarrative}>
          An AI agent for running your <strong>kirana store</strong> via{' '}
          <strong>Telegram</strong>
        </p>
        <p className={styles.heroSubtext}>
          No web app, no admin panel — the chat is the product. Billing, inventory,
          khata, invoices, analytics, and reminders — all through plain language.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/overview">
            Read the Docs
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://t.me/artemis_py_bot">
            Try the Bot → @artemis_py_bot
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
      description="Conversational kirana-store agent — run your shop through Telegram in plain language">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
