'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './HorizontalScroll.module.css';

interface HorizontalScrollProps {
  children: ReactNode[];
  speed?: number;
}

export default function HorizontalScroll({ children, speed = 1 }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerOffset, setContainerOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = elementHeight - viewportHeight;
      
      if (scrollableDistance > 0) {
        const scrolledIntoView = Math.max(0, scrolled - elementTop);
        const progress = Math.min(scrolledIntoView / scrollableDistance, 1);
        setContainerOffset(-progress * scrollableDistance * speed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <section ref={containerRef} className={styles.horizontalSection}>
      <div 
        className={styles.track}
        style={{ transform: `translateX(${containerOffset}px)` }}
      >
        {children}
      </div>
      
      {/* Progress indicator */}
      <div className={styles.progressTrack}>
        <motion.div 
          className={styles.progressFill}
          style={{ 
            scaleX: Math.abs(containerOffset) / ((containerRef.current?.scrollWidth || 1000) - (typeof window !== 'undefined' ? window.innerWidth : 1000))
          }}
        />
      </div>
    </section>
  );
}

export function ParallaxSection({ children, offset = 50 }: { children: ReactNode; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

export function RevealText({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <span className={styles.revealText}>
      {children.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: delay + i * 0.03,
            ease: [0.19, 1, 0.22, 1]
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function StaggerContainer({ children, delay = 0.1 }: { children: ReactNode; delay?: number }) {
  return (
    <div className={styles.staggerContainer}>
      {Array.isArray(children) 
        ? children.map((child, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.1,
                ease: [0.19, 1, 0.22, 1]
              }}
            >
              {child}
            </motion.div>
          ))
        : children
      }
    </div>
  );
}
