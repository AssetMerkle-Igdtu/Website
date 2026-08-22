import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// Define navigation items in one place for consistency
const navItems = [
  { path: "/", label: "About" },
  { path: "/events", label: "Events" },
  { path: "/team", label: "Team" },
  { path: "/faq", label: "FAQ" },
  { path: "/docs", label: "Docs" },
  { path: "/vibeathon", label: "vibeathon" },
  { path: "/", label: "Profile" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: {
      opacity: 0,
      y: "-10%",
      transition: { duration: 0.2 }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-black/50 backdrop-blur-lg' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <img src="/logo.png" alt="Assetmerkle Logo" className='h-12 w-12' />
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500 text-2xl">Assetmerkle</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) => {
              if (item.label === "vibeathon") {
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="bg-yellow-400 text-black uppercase text-sm font-semibold tracking-wider px-4 py-2 rounded-lg 
                     hover:scale-105 hover:shadow-lg transition-transform duration-200"
                  >
                    {item.label}
                  </Link>
                );
              } else if (item.label === "Profile") {
                return (
                  <Link key={item.label} to={item.path} className="p-2 hover:text-yellow-400">
                    <FontAwesomeIcon icon={faUser} className="h-8 w-8 text-white border-2 border-white rounded-full p-1 hover:text-yellow-400" />
                  </Link>
                );
              } else {
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="text-white hover:text-yellow-400 transition-colors duration-200 uppercase text-sm font-semibold tracking-wider px-4 py-2"
                  >
                    {item.label}
                  </Link>
                );
              }
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col items-center space-y-4 py-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-gray-200 hover:text-yellow-400 transition-colors duration-200 text-lg uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;