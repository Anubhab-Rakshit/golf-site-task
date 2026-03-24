'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import styles from './AnimatedCounter.module.css';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000
  });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (v) => {
      setDisplayValue(v.toFixed(decimals));
    });
    return () => unsubscribe();
  }, [springValue, decimals]);

  return (
    <span ref={ref} className={`${styles.counter} ${className}`}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  children?: (value: number) => React.ReactNode;
}

export function CountUp({ end, duration = 2, className = '', children }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  if (children) {
    return <span ref={ref} className={className}>{children(count)}</span>;
  }

  return <span ref={ref} className={className}>{count}</span>;
}
