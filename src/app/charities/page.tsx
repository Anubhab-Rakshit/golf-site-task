'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import styles from './page.module.css';

const MOCK_CHARITIES = [
  { id: '01', name: 'Macmillan Cancer Support', tag: 'HEALTH', supporters: 820, raised: 28400 },
  { id: '02', name: 'Mental Health UK', tag: 'MENTAL_HEALTH', supporters: 440, raised: 15220 },
  { id: '03', name: 'Alzheimer\'s Society', tag: 'HEALTH', supporters: 310, raised: 11800 },
  { id: '04', name: 'British Red Cross', tag: 'EMERGENCY', supporters: 290, raised: 9100 },
  { id: '05', name: 'Oxfam', tag: 'GLOBAL', supporters: 260, raised: 8200 },
  { id: '06', name: 'Age UK', tag: 'ELDERLY', supporters: 245, raised: 7500 },
  { id: '07', name: 'Save the Children', tag: 'CHILDREN', supporters: 220, raised: 6800 },
  { id: '08', name: 'Cancer Research UK', tag: 'HEALTH', supporters: 190, raised: 5800 },
];

const TAGS = ['ALL', 'HEALTH', 'MENTAL_HEALTH', 'EMERGENCY', 'GLOBAL', 'ELDERLY', 'CHILDREN'];

export default function Charities() {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('ALL');
  const [charitiesList, setCharitiesList] = useState<any[]>(MOCK_CHARITIES);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const { data, error } = await supabase.from('charities').select('*');
        if (!error && data && data.length > 0) {
          // Map DB to UI model roughly
          const mapped = data.map((c, i) => ({
            id: String(i + 1).padStart(2, '0'),
            name: c.name,
            tag: c.description?.toUpperCase() || 'GENERAL',
            supporters: 0,
            raised: 0
          }));
          setCharitiesList(mapped);
        }
      } catch (e) {
        console.log("Using mock charities fallback.");
      }
    };
    fetchCharities();
  }, []);

  const filtered = charitiesList.filter(c =>
    (tag === 'ALL' || c.tag === tag) &&
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHead}>
        <div className={styles.headInner}>
          <span className="label-tech">CHARITY_DIRECTORY — {charitiesList.length} ENTITIES</span>
          <h1 className={styles.title}>Supported<br /><span className="text-accent">Entities</span></h1>
          <p className={styles.subtitle}>Every subscription allocates 30% to your chosen charity. The impact is compounded at scale across the subscriber base.</p>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <span className="label-tech">SEARCH::</span>
          <input
            type="text"
            placeholder="FILTER_BY_NAME"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.tags}>
          {TAGS.map(t => (
            <button
              key={t}
              className={`${styles.tag} ${tag === t ? styles.tagActive : ''}`}
              onClick={() => setTag(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((c, i) => (
          <div key={c.id} className={`${styles.card} bracket`}>
            <div className={styles.cardTop}>
              <span className="label-tech">{c.id}</span>
              <span className={styles.cardTag}>{c.tag}</span>
            </div>
            <h3 className={styles.cardName}>{c.name}</h3>
            <div className={styles.cardStats}>
              <div>
                <span className="label-tech">SUPPORTERS</span>
                <div className={styles.cardValue}>{c.supporters}</div>
              </div>
              <div>
                <span className="label-tech">RAISED</span>
                <div className={styles.cardValue}>£{c.raised.toLocaleString()}</div>
              </div>
            </div>
            <button className={`btn btn-outline ${styles.selectBtn}`}>SELECT_ENTITY →</button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <span className="label-tech">NO_MATCHES_FOUND</span>
          </div>
        )}
      </div>
    </div>
  );
}
