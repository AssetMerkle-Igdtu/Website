import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlassCursor from "../components/GlassCursor";
import DotField from "../components/DotField";
import { motion } from "framer-motion";

const Layout = () => {
  const location = useLocation();
  const isVibeathon = location.pathname === "/vibeathon";

  return (
    <div className="relative min-h-screen bg-[#050507] text-white overflow-hidden flex flex-col justify-between">
      {/* Ambient background glow blobs (hidden on SheVibes) */}
      {!isVibeathon && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            className="absolute -top-[10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent blur-[100px]"
            animate={{
              x: [0, 20, 0],
              y: [0, 30, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-[30%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-pink-500/8 via-purple-600/3 to-transparent blur-[120px]"
            animate={{
              x: [0, -30, 0],
              y: [0, 40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[5%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent blur-[100px]"
            animate={{
              x: [0, 40, 0],
              y: [0, -20, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      {/* Interactive global DotField background (hidden on SheVibes) */}
      {!isVibeathon && (
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none opacity-75">
          <DotField
            dotRadius={3}
            dotSpacing={14}
            cursorRadius={500}
            cursorForce={0.13}
            bulgeOnly
            bulgeStrength={61}
            glowRadius={160}
            sparkle
            waveAmplitude={0}
            gradientFrom="rgba(168, 85, 247, 0.8)"
            gradientTo="#0a54fc"
            glowColor="#00090b"
          />
        </div>
      )}

      <GlassCursor />

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
