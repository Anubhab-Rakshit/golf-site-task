'use client';

import { useState } from 'react';
import styles from './page.module.css';

const NAV = [
  { id: 'overview', label: 'OVERVIEW', key: '01' },
  { id: 'scores', label: 'SCORES', key: '02' },
  { id: 'charity', label: 'CHARITY', key: '03' },
  { id: 'draw', label: 'DRAW_STATUS', key: '04' },
];

const SCORES = [
  { date: '11_MAR_2026', course: 'WENTWORTH', stb: 42 },
  { date: '04_MAR_2026', course: 'SUNNINGDALE', stb: 38 },
  { date: '25_FEB_2026', course: 'ST_ANDREWS', stb: 35 },
  { date: '18_FEB_2026', course: 'MUIRFIELD', stb: 41 },
  { date: '11_FEB_2026', course: 'ROYAL_BIRKDALE', stb: 29 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [score, setScore] = useState('');
  const [course, setCourse] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setScore('');
    setCourse('');
  };

  return (
    <div className={styles.layout}>
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <span className="label-tech">PARSIDE_TERMINAL</span>
          <div className={styles.userBlock}>
            <div className={styles.userAvatar}>JS</div>
            <div>
              <div className={styles.userName}>JAMES_SMITH</div>
              <div className={styles.userPlan}>PLAN: MONTHLY — ACTIVE</div>
            </div>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          {NAV.map(n => (
            <button
              key={n.id}
              className={`${styles.navItem} ${activeTab === n.id ? styles.navActive : ''}`}
              onClick={() => setActiveTab(n.id)}
            >
              <span className={styles.navKey}>{n.key}</span>
              <span className={styles.navLabel}>{n.label}</span>
            </button>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <div className="status-live">DRAW ACTIVE</div>
          <span className="label-tech">NEXT_EXEC: APR_01_2026</span>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────── */}
      <main className={styles.main}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <span className="label-tech">SYSTEM::{NAV.find(n => n.id === activeTab)?.label}</span>
            <h1 className={styles.pageTitle}>{NAV.find(n => n.id === activeTab)?.label.replace(/_/g, ' ')}</h1>
          </div>
          <div className={styles.headerMeta}>
            <span className="label-tech">CYCLE: MARCH_2026</span>
          </div>
        </div>

        {/* ── OVERVIEW ─────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className={styles.overviewGrid}>
            <div className={`${styles.dataCard} bracket`}>
              <span className="label-tech">AVG_STB_SCORE</span>
              <div className={styles.dataValue}>37.0</div>
              <span className="label-accent">+2.1 vs last month</span>
            </div>
            <div className={`${styles.dataCard} bracket`}>
              <span className="label-tech">DRAW_ENTRIES</span>
              <div className={styles.dataValue}>5</div>
              <span className="label-tech">ROUNDS_LOGGED</span>
            </div>
            <div className={`${styles.dataCard} bracket`}>
              <span className="label-tech">CHARITY_CONTRIBUTION</span>
              <div className={styles.dataValue}>£26.76</div>
              <span className="label-tech">30% OF SUBSCRIPTION</span>
            </div>
            <div className={`${styles.dataCard} bracket`}>
              <span className="label-tech">TOTAL_WINNINGS</span>
              <div className={styles.dataValue}>£0.00</div>
              <span className="label-tech">LIFETIME</span>
            </div>

            {/* Score chart */}
            <div className={`${styles.chartCard} ${styles.fullWidth}`}>
              <div className={styles.chartHeader}>
                <span className="label-tech">STABLEFORD_PERFORMANCE — LAST_5_ROUNDS</span>
              </div>
              <div className={styles.chartBars}>
                {SCORES.map((s, i) => {
                  const pct = Math.round((s.stb / 54) * 100);
                  const color = s.stb >= 40 ? 'var(--accent)' : s.stb >= 35 ? '#60a5fa' : 'var(--t-muted)';
                  return (
                    <div key={i} className={styles.chartBar}>
                      <span className={styles.chartVal} style={{ color }}>{s.stb}</span>
                      <div className={styles.barTrack}>
                        <div className={styles.barFill} style={{ height: `${pct}%`, background: color }}/>
                      </div>
                      <span className={styles.chartDate}>{s.date.split('_').slice(0,2).join(' ')}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── SCORES ───────────────────────────────────── */}
        {activeTab === 'scores' && (
          <div className={styles.scoresLayout}>
            {/* Submit form */}
            <div className={styles.submitPanel}>
              <span className="label-tech">SUBMIT_ROUND_DATA</span>
              <form onSubmit={handleSubmit} className={styles.scoreForm}>
                <div className={styles.formField}>
                  <label className="label-tech">STABLEFORD_SCORE</label>
                  <input
                    type="number" min="0" max="54"
                    placeholder="00 — 54 PTS"
                    value={score}
                    onChange={e => setScore(e.target.value)}
                    className={`${styles.input}`}
                    required
                  />
                </div>
                <div className={styles.formField}>
                  <label className="label-tech">COURSE_IDENTIFIER</label>
                  <input
                    type="text"
                    placeholder="COURSE_NAME"
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'PROCESSING...' : 'SUBMIT_ROUND →'}
                </button>
              </form>
            </div>

            {/* Score log */}
            <div className={styles.scoreLog}>
              <span className="label-tech">ROUND_LOG — LAST_5</span>
              <div className={styles.scoreTable}>
                <div className={styles.scoreTableHead}>
                  <span className="label-tech">DATE</span>
                  <span className="label-tech">COURSE</span>
                  <span className="label-tech">STB_PTS</span>
                  <span className="label-tech">STATUS</span>
                </div>
                {SCORES.map((s, i) => {
                  const status = s.stb >= 40 ? 'HIGH' : s.stb >= 35 ? 'GOOD' : 'LOW';
                  const color = s.stb >= 40 ? 'var(--accent)' : s.stb >= 35 ? '#60a5fa' : 'var(--t-muted)';
                  return (
                    <div key={i} className={styles.scoreRow}>
                      <span className="label-tech">{s.date}</span>
                      <span className={styles.scoreCourse}>{s.course}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color }}>{s.stb}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color }}>{status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── CHARITY ──────────────────────────────────── */}
        {activeTab === 'charity' && (
          <div className={styles.charityPanel}>
            <div className={`${styles.charityCard} bracket`}>
              <span className="label-tech">ASSIGNED_ENTITY</span>
              <div className={styles.charityName}>MACMILLAN CANCER SUPPORT</div>
              <div className={styles.charityBar}>
                <div className={styles.charityFill} style={{ width: '30%'}}/>
              </div>
              <div className={styles.charityStats}>
                <div>
                  <span className="label-tech">YOUR_CONTRIBUTION</span>
                  <div className={styles.dataValue}>£26.76</div>
                </div>
                <div>
                  <span className="label-tech">SPLIT</span>
                  <div className={styles.dataValue}>30%</div>
                </div>
                <div>
                  <span className="label-tech">TOTAL_RAISED</span>
                  <div className={styles.dataValue}>£84,200</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DRAW STATUS ──────────────────────────────── */}
        {activeTab === 'draw' && (
          <div className={styles.drawPanel}>
            <div className={`${styles.drawCard} bracket`}>
              <div className={styles.drawTop}>
                <span className="label-tech">YOUR_DRAW_SEQUENCE</span>
                <span className="status-live">DRAW LIVE</span>
              </div>
              <div className={styles.drawBalls}>
                {[42, 38, 35, 41, 29].map((n, i) => (
                  <div key={i} className={styles.drawBall}>
                    <span className="label-tech">N{i+1}</span>
                    <span className={styles.ballValue}>{n}</span>
                  </div>
                ))}
              </div>
              <p className={styles.drawNote}>These numbers are derived from your 5 most recent Stableford scores. The draw executes APR 01 2026.</p>
            </div>
            <div className={styles.drawStats}>
              <div className={styles.drawStat}>
                <span className="label-tech">CURRENT_POOL</span>
                <div className={styles.dataValue}>£12,500</div>
              </div>
              <div className={styles.drawStat}>
                <span className="label-tech">ROLLOVER</span>
                <div className={styles.dataValue}>£4,100</div>
              </div>
              <div className={styles.drawStat}>
                <span className="label-tech">DRAW_ALGO</span>
                <div className={styles.dataValue}>WEIGHTED_RNG</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
