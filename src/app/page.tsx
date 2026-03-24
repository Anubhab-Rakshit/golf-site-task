'use client';

import Link from 'next/link';
import styles from './page.module.css';

const CHARITIES = [
  'MACMILLAN CANCER SUPPORT', 'MENTAL HEALTH UK', 'ALZHEIMER\'S SOCIETY',
  'BRITISH RED CROSS', 'OXFAM', 'AGE UK', 'SAVE THE CHILDREN',
  'CANCER RESEARCH UK', 'MIND', 'BRITISH HEART FOUNDATION'
];

const STATS = [
  { label: 'Total_Subscribed', value: '1,450', suffix: 'MEMBERS' },
  { label: 'Active_Pool', value: '£12,500', suffix: 'LIVE' },
  { label: 'Charity_Raised', value: '£84,200', suffix: 'TO_DATE' },
  { label: 'Charities_Supported', value: '12', suffix: 'ENTITIES' },
];

const STEPS = [
  { id: '01', sys: 'SUBSCRIBE', title: 'Subscribe to Protocol', body: 'Choose Monthly or Annual. £9.99/month automatically enters you into the next draw cycle.' },
  { id: '02', sys: 'INPUT_ROUND', title: 'Log Your Performance', body: 'Enter your Stableford scores via the dashboard. Your 5 most recent become your draw numbers.' },
  { id: '03', sys: 'EXECUTE_DRAW', title: 'Automated Draw Execution', body: 'Every 1st of the month, an auditable algorithm generates the winning sequence. Prizes distributed automatically.' },
];

export default function Home() {
  const charityRow = [...CHARITIES, ...CHARITIES]; // duplicate for looping

  return (
    <div className={styles.page}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <span className="label-accent">SYSTEM_STATUS: LIVE — APRIL 2026</span>
            <h1 className={styles.heroTitle}>
              <span>PAR</span>
              <span className={styles.heroAccent}>SIDE</span>
            </h1>
            <p className={styles.heroSub}>
              The precision-engineered golf subscription protocol. Where your Stableford score becomes the key to a monthly prize draw — and every subscription compounds charitable impact at scale.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/signup" className="btn btn-primary">
                SUBSCRIBE → &nbsp;£9.99/mo
              </Link>
              <Link href="/draws" className="btn btn-outline">VIEW DRAW MECHANICS</Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.terminalCard}>
              <div className={styles.terminalHeader}>
                <span className="label-tech">DRAW_STATE::LIVE</span>
                <span className="status-live">ACTIVE</span>
              </div>
              <div className={styles.terminalBody}>
                <div className={styles.terminalRow}>
                  <span className="label-tech">POOL_TOTAL</span>
                  <span className={styles.terminalValue}>£12,500</span>
                </div>
                <div className={styles.terminalRow}>
                  <span className="label-tech">SUBSCRIBERS</span>
                  <span className={styles.terminalValue}>1,450</span>
                </div>
                <div className={styles.terminalRow}>
                  <span className="label-tech">NEXT_EXEC</span>
                  <span className={styles.terminalValue}>APR_01_2026</span>
                </div>
                <div className={styles.terminalRow}>
                  <span className="label-tech">ALGO_TYPE</span>
                  <span className={styles.terminalValue}>WEIGHTED_RNG</span>
                </div>
                <div className={styles.terminalDivider} />
                <span className="label-tech">WINNING_SEQUENCE::PENDING</span>
                <div className={styles.pendingBalls}>
                  {['??', '??', '??', '??', '??'].map((n, i) => (
                    <div key={i} className={styles.pendingBall}>{n}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────────── */}
      <div className={styles.tickerBelt}>
        <div className={styles.tickerTrack}>
          {charityRow.map((c, i) => (
            <span key={i} className={styles.tickerItem}>
              <span className={styles.tickerDot}>◆</span>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ── METRICS ───────────────────────────────────────── */}
      <section className={`${styles.metrics} section`}>
        <div className="container-md">
          <div className={styles.metricsGrid}>
            {STATS.map((s, i) => (
              <div key={i} className={`${styles.metricCard} bracket`}>
                <span className="label-tech">{s.label}</span>
                <div className={styles.metricValue}>{s.value}</div>
                <span className="label-accent">{s.suffix}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION LABEL ─────────────────────────────────── */}
      <div className={styles.sectionMarker}>
        <div className={styles.markerLine}/>
        <span className="label-tech">PROTOCOL_MECHANICS</span>
        <div className={styles.markerLine}/>
      </div>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section className={`${styles.mechanics} section`}>
        <div className="container">
          <div className={styles.mechanicsInner}>
            <div className={styles.mechanicsLeft}>
              <h2 className={`heading-xl ${styles.mechanicsTitle}`}>
                The<br />
                <span className="text-accent">Architecture</span>
              </h2>
              <p className={styles.mechanicsDesc}>
                Three auditable protocol layers convert your golf round into a verifiable draw entry with automatic prize distribution.
              </p>
            </div>
            <div className={styles.stepsCol}>
              {STEPS.map((s, i) => (
                <div key={i} className={styles.step}>
                  <div className={styles.stepId}>
                    <span className="label-accent">{s.id}</span>
                    <span className="label-tech">{s.sys}</span>
                  </div>
                  <div className={styles.stepContent}>
                    <h3 className={`heading-md ${styles.stepTitle}`}>{s.title}</h3>
                    <p className={styles.stepBody}>{s.body}</p>
                  </div>
                  {i < STEPS.length - 1 && <div className={styles.stepConnector}/>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRIZE ARCHITECTURE ────────────────────────────── */}
      <section className={`${styles.prizes} section`}>
        <div className="container-md">
          <div className={styles.prizesHeader}>
            <span className="label-tech">PRIZE_DISTRIBUTION_SCHEMA</span>
            <h2 className="heading-xl">Prize Architecture</h2>
          </div>
          <div className={styles.prizeTiers}>
            {[
              { match: '5-MATCH', pct: '40%', tier: 'TIER_01 — JACKPOT', desc: 'Full 40% pool. Rolls over if no match.' },
              { match: '4-MATCH', pct: '35%', tier: 'TIER_02', desc: 'Split between all 4-number matches.' },
              { match: '3-MATCH', pct: '25%', tier: 'TIER_03', desc: 'Split between all 3-number matches.' },
            ].map((t, i) => (
              <div key={i} className={styles.prizeRow}>
                <div className={styles.prizeLeft}>
                  <span className="label-tech">{t.tier}</span>
                  <span className={`data-xl text-accent`}>{t.pct}</span>
                </div>
                <div className={styles.prizeRight}>
                  <span className={styles.prizeMatch}>{t.match}</span>
                  <p>{t.desc}</p>
                </div>
                <div className={styles.prizeBar}>
                  <div className={styles.prizeBarFill} style={{ width: t.pct }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHARITY ROLL ──────────────────────────────────── */}
      <section className={`${styles.charitySection} section`}>
        <div className="container-md">
          <div className={styles.charityHeader}>
            <span className="label-tech">SUPPORTED_ENTITIES — 12 ACTIVE</span>
            <h2 className="heading-xl">Impact<br /><span className="text-accent">Compounded</span></h2>
          </div>
          <div className={styles.charityGrid}>
            {CHARITIES.slice(0, 6).map((c, i) => (
              <div key={i} className={styles.charityCard}>
                <div className={styles.charityIndex}>{String(i + 1).padStart(2, '0')}</div>
                <span className={styles.charityName}>{c}</span>
              </div>
            ))}
          </div>
          <Link href="/charities" className={`btn btn-outline ${styles.charityViewAll}`}>
            VIEW_ALL_ENTITIES →
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className={styles.finalCta}>
        <div className={styles.ctaInner}>
          <span className="label-tech">READY_TO_SUBSCRIBE</span>
          <h2 className={`display-lg ${styles.ctaTitle}`}>
            Every round.<br/>A chance to win.<br/>
            <span className="text-accent">A cause to back.</span>
          </h2>
          <div className={styles.ctaActions}>
            <Link href="/signup" className="btn btn-primary">
              START YOUR SUBSCRIPTION →
            </Link>
            <Link href="/login" className="btn btn-outline">LOG IN</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
