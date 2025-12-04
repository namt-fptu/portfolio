import React, { useEffect, useRef, useState } from 'react';

const TRAIL_COUNT = 8;

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Use refs for mutable values to avoid re-renders during animation loop
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const trails = useRef(Array(TRAIL_COUNT).fill({ x: -100, y: -100 }));

  useEffect(() => {
    // Check for touch capability to disable cursor on mobile
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', moveCursor);

    let animationFrameId: number;

    const animate = () => {
      // 1. Update Main Dot (Instant follow)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
      }

      // 2. Update Ring (Smooth Lerp)
      const targetRingX = mouse.current.x - 16;
      const targetRingY = mouse.current.y - 16;

      ring.current.x += (targetRingX - ring.current.x) * 0.15;
      ring.current.y += (targetRingY - ring.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }

      // 3. Update Trails (Snake Effect)
      let leaderX = mouse.current.x;
      let leaderY = mouse.current.y;

      trails.current.forEach((pos, index) => {
        const trailEl = trailRefs.current[index];
        if (trailEl) {
          const newX = pos.x + (leaderX - pos.x) * 0.3;
          const newY = pos.y + (leaderY - pos.y) * 0.3;
          
          trails.current[index] = { x: newX, y: newY };
          
          trailEl.style.transform = `translate(${newX - 2}px, ${newY - 2}px)`;

          leaderX = newX;
          leaderY = newY;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Ring */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border border-neon-green rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
      ></div>
      
      {/* Inner Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-neon-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
      ></div>

      {/* Trail Elements */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div 
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 w-1 h-1 bg-neon-green rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block will-change-transform"
          style={{ 
            opacity: 0.6 * (1 - i / TRAIL_COUNT), // Fade out tail
          }}
        ></div>
      ))}
    </>
  );
};

export default CustomCursor;