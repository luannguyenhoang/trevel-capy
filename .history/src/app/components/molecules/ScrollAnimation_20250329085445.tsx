'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
}

export const ScrollAnimation = ({ children, delay = 0.1 }: ScrollAnimationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "-100px",
    amount: "some"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}; 