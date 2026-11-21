"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const revealIfVisible = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight + 100) {
        setVisible(true);
        return true;
      }
      return false;
    };

    const rafId = window.requestAnimationFrame(() => {
      revealIfVisible();
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px 0px" }
    );

    observer.observe(el);

    const onScroll = () => {
      if (revealIfVisible()) {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 16 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
