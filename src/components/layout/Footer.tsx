import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {['MACMILLAN CANCER SUPPORT', 'MENTAL HEALTH UK', 'ALZHEIMER\'S SOCIETY', 'BRITISH RED CROSS', 'OXFAM', 'AGE UK', 'MACMILLAN CANCER SUPPORT', 'MENTAL HEALTH UK', 'ALZHEIMER\'S SOCIETY', 'BRITISH RED CROSS', 'OXFAM', 'AGE UK'].map((c, i) => (
            <span key={i} className={styles.tickerItem}>
              <span className={styles.tickerDot}>◆</span>{c}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logoMark}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect x="1" y="1" width="8" height="8" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="1" width="8" height="8" fill="currentColor"/>
                <rect x="1" y="11" width="8" height="8" fill="currentColor" opacity="0.4"/>
                <rect x="11" y="11" width="8" height="8" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className={styles.brandName}>PARSIDE</span>
          </div>
          <p className={styles.tagline}>Where every round makes the biggest impact.</p>
        </div>

        <div className={styles.mid}>
          <div className={styles.col}>
            <span className={styles.colHead}>PLATFORM</span>
            <Link href="/">How it works</Link>
            <Link href="/charities">Charity Directory</Link>
            <Link href="/draws">Monthly Draws</Link>
            <Link href="/signup">Subscribe</Link>
          </div>
          <div className={styles.col}>
            <span className={styles.colHead}>ACCOUNT</span>
            <Link href="/login">Log In</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin">Admin Panel</Link>
          </div>
          <div className={styles.col}>
            <span className={styles.colHead}>LEGAL</span>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 ParSide · parside.golf · All rights reserved.</p>
          <p className={styles.disclaimer}>Entertainment & charitable purposes. Prizes distributed per terms.</p>
        </div>
      </div>
    </footer>
  );
}
