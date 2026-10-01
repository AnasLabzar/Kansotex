"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// The Intro Loading Screen
export function IntroScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading/intro duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1c1b19]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5 } }}
            className="flex flex-col items-center"
          >
            <Image 
              src="/KANSOTEX-marque-1-white.png"
              alt="KANSOTEX"
              width={400}
              height={100}
              className="h-auto w-[250px] md:w-[400px]"
              priority
            />
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%", transition: { duration: 1.2, delay: 0.5, ease: "circInOut" } }}
              className="mt-8 h-[1px] bg-[#f3eee6]/40"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Fade/Slide Up Wrapper for elements when scrolling
export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.8,
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger Container for lists (Cards)
export function StaggerContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Item for Stagger Container
export function StaggerItem({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
