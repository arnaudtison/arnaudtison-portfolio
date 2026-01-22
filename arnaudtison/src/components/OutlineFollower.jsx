import { useEffect, useRef } from "react";

export default function OutlineFollower({ size = 0, speed = 0 }) {
  const ref = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const started = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * speed;
      pos.current.y += (mouse.current.y - pos.current.y) * speed;

      if (ref.current) {
        ref.current.style.transform =
          `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const start = (e) => {
      // Initialize both target and current position to the first real mouse point
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      if (ref.current) ref.current.style.opacity = "1";

      if (!started.current) {
        started.current = true;
        window.addEventListener("mousemove", onMove, { passive: true });
        raf.current = requestAnimationFrame(animate);
        console.log(AnimationTimeline.length.valueOf(raf));
      }
    };

    // Wait for first mouse move, then start everything
    window.addEventListener("mousemove", start, { passive: true, once: true });

    return () => {
      window.removeEventListener("mousemove", start);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: size,
        height: size,
        border: "1px solid #000",
        borderRadius: 999,
        pointerEvents: "none",
        willChange: "transform",
        zIndex: 110,
        opacity: 0, // stays hidden until first move
      }}
    />
  );
}
