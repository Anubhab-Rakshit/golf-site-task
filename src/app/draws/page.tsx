'use client';

import Link from 'next/link';
import styles from './page.module.css';

const RESULTS = [
  {
    date: 'February 2026',
    numbers: [12, 5, 33, 28, 41],
    winners: 0,
    rollover: '£4,100',
    jackpot: '£12,500'
  },
  {
    date: 'January 2026',
    numbers: [8, 17, 22, 4, 39],
    winners: 1,
    payout: '£8,210',
    jackpot: '£9,500'
  }
];

export default function Draws() {
  return (
    <main className={styles.main}>
      {/* Background Decor */}
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.orb} />
        <div className={styles.grid} />
      </div>

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>Transparency & Mechanics</span>
          <h1 className={styles.title}>The Monthly<br /><span className="gradient-text">Draw Engine</span></h1>
          <p className={styles.subtitle}>
            Every subscription enters you into our monthly draw automatically. 
            Match numbers based on your golf scores to win cash prizes.
          </p>
        </header>

        {/* Jackpot / CTA */}
        <section className={styles.jackpotBanner}>
          <div className={styles.jackpotInner}>
            <div className={styles.jackpotInfo}>
              <span className={styles.vLabel}>Live Jackpot</span>
              <div className={styles.jackpotValue}>£12,500</div>
              <p>Next draw: **April 1, 2026**</p>
            </div>
            <div className={styles.jackpotCta}>
              <Link href="/signup" className="btn-primary">
                Subscribe to Enter
              </Link>
            </div>
          </div>
        </section>

        {/* Mechanics Grid */}
        <section className={styles.mechanics}>
          <div className={styles.sectionHeader}>
            <span className={styles.smallEyebrow}>How it Works</span>
            <h2>Fairness by design</h2>
          </div>
          
          <div className={styles.mechGrid}>
            <div className={styles.mechCard}>
              <div className={styles.mechIcon}>01</div>
              <h3>Derived from performance</h3>
              <p>We use your last 5 Stableford scores as your entry numbers. If you play more, your entry updates. If you play less, we fill the gaps with verified random numbers.</p>
            </div>
            <div className={styles.mechCard}>
              <div className={styles.mechIcon}>02</div>
              <h3>Audited Randomness</h3>
              <p>Every month, 5 numbers (1–45) are generated using an auditable, weighted algorithm that ensures total transparency and true randomness.</p>
            </div>
            <div className={styles.mechCard}>
              <div className={styles.mechIcon}>03</div>
              <h3>Automatic Payouts</h3>
              <p>Winnings are calculated instantly. Tiers 2 and 3 are paid within 48 hours. Jackpot winners undergo a 5-day verification process before payout.</p>
            </div>
          </div>
        </section>

        {/* Prize Tiers */}
        <section className={styles.tiersSection}>
          <div className={styles.tiersInner}>
            <div className={styles.tiersContent}>
              <h2>Prize Architecture</h2>
              <p>Distributed across three winning tiers based on total subscription volume.</p>
              
              <div className={styles.tiersList}>
                {[
                  { tier: 'Match 5', pct: '40%', label: 'The Jackpot', sub: 'Rolls over to next month if no winners.' },
                  { tier: 'Match 4', pct: '35%', label: 'Secondary Tier', sub: 'Split equally among all 4-number matches.' },
                  { tier: 'Match 3', pct: '25%', label: 'Entry Tier', sub: 'The most common win. Split among 3-number matches.' },
                ].map((t, i) => (
                  <div key={i} className={styles.tierItem}>
                    <div className={styles.tierHead}>
                      <span className={styles.tierName}>{t.tier}</span>
                      <span className={styles.tierPct}>{t.pct}</span>
                    </div>
                    <div className={styles.tierLabel}>{t.label}</div>
                    <p className={styles.tierSub}>{t.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.tiersVisual}>
              <div className={styles.donutPlaceholder}>
                {/* SVG Architecture Visualization */}
                <svg viewBox="0 0 100 100" className={styles.donut}>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--c-surface-3)" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--c-primary)" strokeWidth="8" strokeDasharray="100.5 150.7" transform="rotate(-90 50 50)"/>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--c-blue)" strokeWidth="8" strokeDasharray="87.9 163.3" strokeDashoffset="-100.5" transform="rotate(-90 50 50)"/>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--c-gold)" strokeWidth="8" strokeDasharray="62.8 188.4" strokeDashoffset="-188.4" transform="rotate(-90 50 50)"/>
                </svg>
                <div className={styles.donutCenter}>
                  <strong>100%</strong>
                  <span>Total Pool</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className={styles.results}>
          <div className={styles.sectionHeader}>
            <span className={styles.smallEyebrow}>History</span>
            <h2>Past Results</h2>
          </div>

          <div className={styles.resultsTable}>
            {RESULTS.map((r, i) => (
              <div key={i} className={styles.resultRow}>
                <div className={styles.resultMain}>
                  <span className={styles.resultDate}>{r.date}</span>
                  <div className={styles.resultBalls}>
                    {r.numbers.map((n, idx) => (
                      <span key={idx} className={styles.rBall}>{String(n).padStart(2,'0')}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.resultMeta}>
                  <div className={styles.resStat}>
                    <span>Winners</span>
                    <strong>{r.winners}</strong>
                  </div>
                  <div className={styles.resStat}>
                    <span>Pool</span>
                    <strong>{r.jackpot}</strong>
                  </div>
                  {r.rollover ? (
                    <div className={styles.resStat}>
                      <span>Status</span>
                      <strong style={{ color: 'var(--c-primary)' }}>Rollover</strong>
                    </div>
                  ) : (
                    <div className={styles.resStat}>
                      <span>Status</span>
                      <strong style={{ color: 'var(--c-green)' }}>Paid</strong>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
