'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setError('AUTH_FAILED: Invalid credentials. Please try again.');
  };

  return (
    <div className={styles.page}>
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <span className="label-tech">PARSIDE_PROTOCOL</span>
          <h2 className={styles.leftTitle}>Every round.<br />An entry.<br /><span className="text-accent">A legacy.</span></h2>
          <div className={styles.leftStats}>
            {[
              { label: 'ACTIVE_POOL', value: '£12,500' },
              { label: 'SUBSCRIBERS', value: '1,450' },
              { label: 'CHARITIES', value: '12' },
            ].map((s, i) => (
              <div key={i} className={styles.leftStat}>
                <span className="label-tech">{s.label}</span>
                <div className={styles.leftStatValue}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formWrap}>
          <div className={styles.formHead}>
            <span className="label-tech">AUTH_TERMINAL</span>
            <h1 className={styles.formTitle}>Log in</h1>
          </div>

          {error && (
            <div className={styles.error}>
              <span className="label-tech">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className="label-tech">EMAIL_ADDRESS</label>
              <input
                type="email" required
                placeholder="USER@DOMAIN.COM"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className="label-tech">PASSWORD</label>
              <input
                type="password" required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>
            <Link href="/forgot" className={styles.forgot}>FORGOT_PASSWORD →</Link>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE →'}
            </button>
          </form>

          <div className={styles.switch}>
            <span className="label-tech">NO_ACCOUNT?</span>
            <Link href="/signup" className={styles.switchLink}>SUBSCRIBE →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
