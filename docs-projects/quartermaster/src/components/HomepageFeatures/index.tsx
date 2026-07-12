import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

const FeatureList: FeatureItem[] = [
  {
    icon: '🧾',
    title: 'Billing',
    description: 'Multi-turn draft bills with GST. Start, add items, adjust, and finalize in plain language.',
  },
  {
    icon: '📦',
    title: 'Inventory',
    description: 'Receive stock, search products, update prices, discontinue items. Automatic HSN/GST lookup.',
  },
  {
    icon: '📒',
    title: 'Khata',
    description: 'Customer credit ledger. Track credit sales, record payments, auto-reminders for due amounts.',
  },
  {
    icon: '📄',
    title: 'GST Invoices',
    description: 'GST-compliant PDF invoices with CGST/SGST breakout, HSN codes, and Hindi Unicode support.',
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Sales summaries, top products, payment breakdowns, and velocity-based reorder suggestions.',
  },
  {
    icon: '⏰',
    title: 'Reminders',
    description: 'One-time and recurring reminders. Auto-generated weekly reports, stock checks, follow-ups.',
  },
];

function Feature({icon, title, description}: FeatureItem) {
  return (
    <div className="col col--4">
      <div className="text--center padding-horiz--md">
        <span className={styles.featureIcon}>{icon}</span>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDesc}>{description}</p>
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
