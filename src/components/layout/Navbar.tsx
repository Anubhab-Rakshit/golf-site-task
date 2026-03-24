'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        {/* Top status ticker */}
        <div className={styles.ticker}>
          <span className={styles.tickerLive}>● LIVE</span>
          <span>APRIL 2026 DRAW_POOL: £12,500</span>
          <span className={styles.tickerSep}>—</span>
          <span>SUBSCRIBERS: 1,450</span>
          <span className={styles.tickerSep}>—</span>
          <span>CHARITIES_ACTIVE: 12</span>
        </div>

        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoMark}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="1" y="1" width="8" height="8" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="1" width="8" height="8" fill="currentColor"/>
                <rect x="1" y="11" width="8" height="8" fill="currentColor" opacity="0.4"/>
                <rect x="11" y="11" width="8" height="8" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className={styles.logoText}>PARSIDE</span>
          </Link>

          {/* Center Nav */}
          <nav className={styles.centerNav}>
            <Link href="/charities" className={styles.navLink}>Charities</Link>
            <Link href="/draws" className={styles.navLink}>Monthly Draw</Link>
            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          </nav>

          {/* Right Auth */}
          <div className={styles.authGroup}>
            <Link href="/login" className={styles.loginLink}>LOG_IN</Link>
            <Link href="/signup" className={styles.ctaBtn}>
              SUBSCRIBE →
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileHead}>
          <span className="label-accent">NAVIGATION_PROTOCOL</span>
        </div>
        <nav className={styles.mobileNav}>
          {[
            { href: '/', label: '01 — Home' },
            { href: '/charities', label: '02 — Charities' },
            { href: '/draws', label: '03 — Monthly Draw' },
            { href: '/dashboard', label: '04 — Dashboard' },
          ].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className={styles.mobileLink}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileAuth}>
          <Link href="/login" onClick={() => setMenuOpen(false)} className={`${styles.ctaBtn} ${styles.mobileAuthBtn}`}>LOG_IN</Link>
          <Link href="/signup" onClick={() => setMenuOpen(false)} className={`${styles.ctaBtn} ${styles.ctaBtnAccent}`}>SUBSCRIBE →</Link>
        </div>
      </div>
    </>
  );
}
