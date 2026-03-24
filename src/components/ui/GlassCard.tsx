'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  intensity?: 'light' | 'medium' | 'strong';
}

export default function GlassCard({ 
  children, 
  className = '', 
  hover = true, 
  glow = false,
  intensity = 'medium'
}: GlassCardProps) {
  return (
    <motion.div
      className={`${styles.glass} ${styles[intensity]} ${hover ? styles.hover : ''} ${glow ? styles.glow : ''} ${className}`}
      whileHover={hover ? { y: -5, scale: 1.01 } : {}}
      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className={styles.inner}>
        {children}
      </div>
      <div className={styles.border} />
    </motion.div>
  );
}

export function GlassMorphism({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.glassMorphism} ${className}`}>
      {children}
    </div>
  );
}
