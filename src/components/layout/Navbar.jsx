import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, LogOut, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (currentUser) {
    const dashboardPath = currentUser.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
    navLinks.splice(2, 0, { name: 'Dashboard', path: dashboardPath });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-50">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg">
            <Home size={24} />
          </div>
          <span className="text-2xl font-extrabold text-text-main">
            Real<span className="text-primary">Estate</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 bg-white/50 backdrop-blur-md px-8 py-3 rounded-full border border-white/60 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-semibold text-sm transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-text-muted'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth / User Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <>
              <Link to="/user-dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity mr-2">
                <img src={currentUser.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-primary object-cover" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-main leading-tight">{currentUser.name}</span>
                  <span className="text-xs text-primary font-semibold">{currentUser.role === 'admin' ? 'Admin' : 'User'}</span>
                </div>
              </Link>
              <button onClick={() => { logout(); navigate('/'); }} className="btn btn-outline px-4 py-2 text-sm gap-2 text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-bold text-sm text-text-main hover:text-primary transition-colors">Log in</Link>
              <Link to="/signup" className="btn btn-primary px-5 py-2 text-sm">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 p-2 rounded-lg bg-bg-alt text-text-main"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white shadow-xl border-b border-border-color md:hidden"
            >
              <div className="flex flex-col px-6 py-6 gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-lg font-bold py-2 border-b border-bg-alt ${location.pathname === link.path ? 'text-primary' : 'text-text-main'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border-color">
                  {currentUser ? (
                    <>
                      <Link to="/user-dashboard" className="btn btn-outline w-full justify-center gap-2">
                        <User size={18} /> My Profile
                      </Link>
                      <button onClick={() => { logout(); navigate('/'); setIsMobileMenuOpen(false); }} className="btn w-full justify-center gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-500 hover:text-white">
                        <LogOut size={18} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="btn btn-outline w-full justify-center">Log in</Link>
                      <Link to="/signup" className="btn btn-primary w-full justify-center">Sign Up</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
