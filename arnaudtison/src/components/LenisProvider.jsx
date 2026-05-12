import { useEffect } from 'react';
import { lenis } from '../lib/lenis';

export default function LenisProvider({ children }) {
  useEffect(() => {
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return children;
}