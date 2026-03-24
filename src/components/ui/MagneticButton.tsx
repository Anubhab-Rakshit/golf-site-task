'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './MagneticButton.module.css';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = ''
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    buttonRef.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleLeave = () => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = 'translate(0, 0)';
  };

  const content = (
    <motion.div
      ref={buttonRef}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <span className={styles.content}>{children}</span>
      <span className={styles.glow} />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className={styles.link}>
        {content}
      </a>
    );
  }

  return content;
}

export function TextScramble({ 
  text, 
  className = '',
  delay = 0,
  duration = 1.5
}: { 
  text: string; 
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let timeout: NodeJS.Timeout;
    
    const startScramble = () => {
      setIsScrambling(true);
      let iterations = 0;
      const totalIterations = Math.floor(duration * 30);
      
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iterations / 2) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        iterations += 1;
        
        if (iterations >= totalIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsScrambling(false);
        }
      }, 1000 / 30);
      
      return () => clearInterval(interval);
    };
    
    timeout = setTimeout(startScramble, delay * 1000);
    
    return () => clearTimeout(timeout);
  }, [text, delay, duration]);
  
  return (
    <span className={className}>
      {displayText}
    </span>
  );
}
