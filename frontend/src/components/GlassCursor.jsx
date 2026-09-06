import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom";

const GlassCursor = () => {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Responsive spring config for a single organic tracking dot/bead
  const springConfig = { stiffness: 180, damping: 24 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    const moveCursor = (e) => {
      // Offset by half of cursor width/height (18px) to center it on the mouse pointer
      cursorX.set(e.clientX - 18);
      cursorY.set(e.clientY - 18);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  // Hide cursor on the SheVibes (/vibeathon) page
  if (location.pathname === "/vibeathon") {
    return null;
  }

  if (!mounted) return null;

  // Disable on screens smaller than 1024px to prevent issues on touch devices
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return null;
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-50 rounded-full border border-white/25 backdrop-blur-[4px] bg-white/[0.04] shadow-[0_0_15px_rgba(246,180,51,0.18),inset_0_1px_2px_rgba(255,255,255,0.4)]"
      style={{
        width: "36px",
        height: "36px",
        x: cursorXSpring,
        y: cursorYSpring,
        left: 0,
        top: 0,
      }}
    >
      {/* Tiny solid gold dot in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_4px_#fbbf24]"></div>
    </motion.div>
  );
};

export default GlassCursor;
