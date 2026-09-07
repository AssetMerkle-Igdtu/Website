import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Define navigation items in one place for consistency
const navItems = [
  { path: "/", label: "About" },
  { path: "/events", label: "Events" },
  { path: "/team", label: "Team" },
  { path: "/faq", label: "FAQ" },
  { path: "/docs", label: "Docs" },
  { path: "/web3community", label: "Web3 Community" },
  { path: "/vibeathon", label: "SheVibes" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div
        className={`mx-auto max-w-5xl w-full rounded-full border flex items-center justify-between px-3 py-2.5 transition-all duration-500 pointer-events-auto relative ${isScrolled
            ? 'bg-white/[0.03] backdrop-blur-xl border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_16px_36px_rgba(0,0,0,0.5)]'
            : 'bg-white/[0.01] backdrop-blur-md border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_8px_20px_rgba(0,0,0,0.3)]'
          }`}
      >
        {/* Left: Logo Badge (White Circle) */}
        <Link to="/" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-md hover:scale-105 transition-transform duration-300 flex-shrink-0 cursor-pointer">
          <img
            src="/logo.png"
            alt="Assetmerkle Logo"
            className='h-6 w-6 object-contain'
          />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.filter(item => item.label !== "SheVibes").map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative font-sans text-[12px] font-bold tracking-widest px-4 py-2.5 uppercase transition-all duration-300 rounded-full ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full border border-white/20 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: Action Button (White Pill) */}
        {/* Desktop SheVibes button — vintage cream palette */}
<div className="hidden lg:block">
  <Link
    to="/vibeathon"
    className="relative group inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#CF547A] to-[#CE4777] text-[#FBF4F7] font-extrabold text-[12px] tracking-widest uppercase shadow-md shadow-[#CE4777]/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#CE4777]/50 active:scale-95"
  >
    <span className="relative z-10">SheVibes</span>
    {/* Subtle shine effect */}
    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
  </Link>
</div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center pr-2">
          <button
            className="text-slate-300 hover:text-white p-2 transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu inside capsule parent */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-[120%] left-0 right-0 bg-[#09090b]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl p-6 flex flex-col items-center space-y-4"
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="flex flex-col items-center space-y-4 w-full">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={`font-sans text-[10px] font-bold tracking-widest uppercase transition-colors py-1 ${isActive ? 'text-amber-400 font-extrabold' : 'text-slate-300 hover:text-white'
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;