'use client';

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.orb} />
      </div>
      
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Round not found.</h1>
        <p className={styles.text}>The page you're looking for has moved out of bounds. Let's get you back to the clubhouse.</p>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
      </div>
    </main>
  );
}
