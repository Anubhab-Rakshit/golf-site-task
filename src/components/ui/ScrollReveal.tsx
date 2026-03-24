'use client';

import { useEffect, useState, ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './ScrollReveal.module.css';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  distance?: number;
  duration?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.6,
  once = true
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 };
      case 'down': return { y: -distance, opacity: 0 };
      case 'left': return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      case 'scale': return { scale: 0.8, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialTransform()}
      animate={isInView ? { x: 0, y: 0, scale: 1, opacity: 1 } : getInitialTransform()}
      transition={{
        duration,
        delay,
        ease: [0.19, 1, 0.22, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up'
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return { y: 40, opacity: 0 };
      case 'down': return { y: -40, opacity: 0 };
      case 'left': return { x: 40, opacity: 0 };
      case 'right': return { x: -40, opacity: 0 };
      case 'scale': return { scale: 0.8, opacity: 0 };
      default: return { y: 40, opacity: 0 };
    }
  };

  return (
    <div ref={ref} className={className} style={{ display: 'contents' }}>
      {Array.isArray(children) ? children.map((child, index) => (
        <motion.div
          key={index}
          initial={getInitialTransform()}
          animate={isInView ? { x: 0, y: 0, scale: 1, opacity: 1 } : getInitialTransform()}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: [0.19, 1, 0.22, 1]
          }}
        >
          {child}
        </motion.div>
      )) : children}
    </div>
  );
}
