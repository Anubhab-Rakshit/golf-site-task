'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import styles from './page.module.css';

export default function Signup() {
  const router = useRouter();
  const [plan, setPlan] = useState<'monthly' | 'annual'>('monthly');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Create user in Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error("Account creation failed.");

      // 2. Create Stripe Checkout Session
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan, userId }),
      });

      const session = await res.json();
      
      if (session.error) {
        throw new Error(session.error);
      }

      // 3. Redirect to Stripe Checkout
      window.location.href = session.url;
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <span className="label-tech">SUBSCRIBE_TO_PROTOCOL</span>
          <h2 className={styles.leftTitle}>
            Enter the<br /><span className="text-accent">Draw.</span><br />Back a cause.
          </h2>
          <div className={styles.bullets}>
            {[
              '5 scores → 5 draw numbers',
              '£4,100 jackpot rollover',
              '30% to your chosen charity',
              'Monthly prize draws',
            ].map((b, i) => (
              <div key={i} className={styles.bullet}>
                <span className={styles.bulletDot}>◆</span>
                <span className="label-tech">{b.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formWrap}>
          <div className={styles.formHead}>
            <span className="label-tech">SUBSCRIPTION_TERMINAL</span>
            <h1 className={styles.formTitle}>Create Account</h1>
          </div>

          {error && (
            <div style={{ padding: '1rem', background: 'rgba(255, 77, 77, 0.06)', border: '1px solid rgba(255, 77, 77, 0.2)', borderLeft: '2px solid rgba(255, 77, 77, 0.6)' }}>
              <span className="label-tech" style={{ color: '#ff4d4d' }}>{error}</span>
            </div>
          )}

          {/* Plan selector */}
          <div className={styles.planSelector}>
            <button
              className={`${styles.plan} ${plan === 'monthly' ? styles.planActive : ''}`}
              onClick={() => setPlan('monthly')}
              type="button"
            >
              <div className={styles.planLabel}>
                <span className="label-tech">MONTHLY</span>
                {plan === 'monthly' && <span className={styles.planCheck}>●</span>}
              </div>
              <div className={styles.planPrice}>£9.99<span>/mo</span></div>
              <span className="label-tech">CANCEL_ANYTIME</span>
            </button>
            <button
              className={`${styles.plan} ${plan === 'annual' ? styles.planActive : ''}`}
              onClick={() => setPlan('annual')}
              type="button"
            >
              <div className={styles.planLabel}>
                <span className="label-tech">ANNUAL</span>
                {plan === 'annual' && <span className={styles.planCheck}>●</span>}
              </div>
              <div className={styles.planPrice}>£99.99<span>/yr</span></div>
              <span className="label-accent">SAVE_16%</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className="label-tech">FULL_NAME</label>
              <input type="text" required placeholder="FIRST LAST" value={name} onChange={e => setName(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.field}>
              <label className="label-tech">EMAIL_ADDRESS</label>
              <input type="email" required placeholder="USER@DOMAIN.COM" value={email} onChange={e => setEmail(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.field}>
              <label className="label-tech">PASSWORD</label>
              <input type="password" required placeholder="MIN_8_CHARS" value={password} onChange={e => setPassword(e.target.value)} className={styles.input} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'PROCESSING_PAYMENT...' : `SUBSCRIBE — ${plan === 'monthly' ? '£9.99/MO' : '£99.99/YR'} →`}
            </button>
          </form>

          <div className={styles.switch}>
            <span className="label-tech">HAVE_ACCOUNT?</span>
            <Link href="/login" className={styles.switchLink}>LOG_IN →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
