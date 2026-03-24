'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (isComplete) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          className={styles.loader}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className={styles.content}>
            {/* Golf Ball Animation */}
            <div className={styles.golfBallContainer}>
              <motion.div 
                className={styles.golfBall}
                animate={{ 
                  y: [0, -30, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg viewBox="0 0 60 60" className={styles.golfBallSvg}>
                  <circle cx="30" cy="30" r="28" fill="white" />
                  <g fill="#1a1a1a" opacity="0.15">
                    <circle cx="18" cy="18" r="2" />
                    <circle cx="30" cy="14" r="2" />
                    <circle cx="42" cy="18" r="2" />
                    <circle cx="14" cy="30" r="2" />
                    <circle cx="46" cy="30" r="2" />
                    <circle cx="18" cy="42" r="2" />
                    <circle cx="30" cy="46" r="2" />
                    <circle cx="42" cy="42" r="2" />
                    <circle cx="24" cy="24" r="1.5" />
                    <circle cx="36" cy="24" r="1.5" />
                    <circle cx="24" cy="36" r="1.5" />
                    <circle cx="36" cy="36" r="1.5" />
                  </g>
                </svg>
              </motion.div>
              
              {/* Trail effect */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.trail}
                  animate={{
                    y: [0, 60 + i * 20],
                    opacity: [0.6 - i * 0.2, 0],
                    scale: [1 - i * 0.2, 0.5 - i * 0.1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.15
                  }}
                />
              ))}
            </div>

            {/* Logo */}
            <motion.div 
              className={styles.logo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className={styles.logoMark}>DH</span>
              <span className={styles.logoText}>Digital Heroes</span>
            </motion.div>

            {/* Progress Bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressTrack}>
                <motion.div 
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className={styles.progressText}>
                {Math.round(Math.min(progress, 100))}%
              </span>
            </div>

            {/* Loading dots */}
            <div className={styles.dots}>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className={styles.dot}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>

          {/* Background particles */}
          <div className={styles.particles}>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{
                  y: [null, Math.random() * -200 - 100],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
