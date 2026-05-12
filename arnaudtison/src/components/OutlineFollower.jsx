import { useEffect, useRef } from 'react';

const CLICKABLE = 'a, button, [role="button"], [style*="cursor: pointer"], input, textarea, select, label';

export default function OutlineFollower({ size = 0, speed = 0 }) {
  const ringRef = useRef(null);
  const invertRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const started = useRef(false);
  const isActive = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * speed;
      pos.current.y += (mouse.current.y - pos.current.y) * speed;
      const { x, y } = pos.current;
      const t = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      if (ringRef.current) ringRef.current.style.transform = t;
      if (invertRef.current) invertRef.current.style.transform = t;

      raf.current = requestAnimationFrame(animate);
    };

    const applyActive = (active) => {
      if (isActive.current === active) return;
      isActive.current = active;
      const s = active ? `${size * 0.65}px` : `${size}px`;
      if (ringRef.current) {
        ringRef.current.style.borderColor = active ? '#fff' : '#000';
        ringRef.current.style.width = s;
        ringRef.current.style.height = s;
      }
      if (invertRef.current) {
        invertRef.current.style.opacity = active ? '1' : '0';
        invertRef.current.style.width = s;
        invertRef.current.style.height = s;
      }
    };

    const onPointerOver = (e) => {
      applyActive(!!e.target.closest?.(CLICKABLE));
    };

    const start = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      if (ringRef.current) ringRef.current.style.opacity = '1';

      if (!started.current) {
        started.current = true;
        window.addEventListener('mousemove', onMove, { passive: true });
        raf.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('mousemove', start, { passive: true, once: true });
    document.addEventListener('pointerover', onPointerOver);

    return () => {
      window.removeEventListener('mousemove', start);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('pointerover', onPointerOver);
      cancelAnimationFrame(raf.current);
    };
  }, [speed]);

  const base = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: size,
    height: size,
    borderRadius: 999,
    pointerEvents: 'none',
    willChange: 'transform',
  };

  return (
    <>
      {/* Outline ring — always visible, border flips white when active */}
      <div
        ref={ringRef}
        style={{
          ...base,
          border: '1px solid #000',
          zIndex: 999999,
          opacity: 0,
          transition: 'border-color 0.15s ease, width 0.2s ease, height 0.2s ease',
        }}
      />
      {/* Invert circle — backdrop-filter: invert(1) in the same spot as the ring */}
      <div
        ref={invertRef}
        style={{
          ...base,
          backdropFilter: 'invert(1)',
          WebkitBackdropFilter: 'invert(1)',
          zIndex: 999998,
          opacity: 0,
          transition: 'opacity 0.15s ease, width 0.2s ease, height 0.2s ease',
        }}
      />
    </>
  );
}
