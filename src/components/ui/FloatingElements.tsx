'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './FloatingElements.module.css';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}

export function FloatingElement({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 5, 
  distance = 15 
}: FloatingElementProps) {
  return (
    <motion.div
      className={`${styles.floating} ${className}`}
      animate={{
        y: [-distance, distance, -distance],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxFloatProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxFloat({ children, className = '', speed = 0.5 }: ParallaxFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

interface ScrollParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function ScrollParallax({ 
  children, 
  className = '', 
  speed = 0.5,
  direction = 'up'
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const multiplier = direction === 'up' ? 1 : -1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div ref={ref} style={{ y, scale }} className={className}>
      {children}
    </motion.div>
  );
}

export function DepthParallax({ 
  children, 
  className = '', 
  depth = 1 
}: { 
  children: ReactNode; 
  className?: string;
  depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50 / depth, -50 / depth]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1 - (0.05 / depth), 1, 1 - (0.05 / depth)]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <motion.div ref={ref} style={{ y, scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

export function MorphingShape({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`${styles.morphingShape} ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "50% 60% 30% 60% / 30% 40% 70% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%"
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

export function RotatingShape({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`${styles.rotatingShape} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function GlowOrb({ 
  className = '',
  color = 'rgba(196, 167, 125, 0.1)',
  size = 400,
  blur = 80
}: { 
  className?: string;
  color?: string;
  size?: number;
  blur?: number;
}) {
  return (
    <motion.div
      className={`${styles.glowOrb} ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.6, 0.8, 0.6],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

export function PremiumCursor({ 
  className = '' 
}: { 
  className?: string 
}) {
  return (
    <div className={`${styles.cursorRing} ${className}`}>
      <div className={styles.cursorDot} />
    </div>
  );
}
