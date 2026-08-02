import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Users, Building2, Info, Star, GraduationCap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const aboutSubLinks = [
  { name: "About Us", href: "/about", icon: Info, desc: "Learn more about our trust and vision" },
  { name: "Meet Our Trustees", href: "/about/trustees", icon: Users, desc: "Get to know the people behind the mission" },
  // { name: "Governing Body", href: "/about/governing-body", icon: Building2, desc: "Structure, roles and responsibilities" },
  { name: "Encouragement Scope", href: "/encouragement", icon: Star, desc: "Awards and recognition programs" },
  { name: "Scholarship Program", href: "/scholarship-info", icon: GraduationCap, desc: "Financial assistance for education" },
];

const navLinks = [
  { name: "Mission", href: "/mission" },
  { name: "Media", href: "/media" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileAboutOpen(false);
  }, [location]);

  const isAboutActive = location.pathname.startsWith("/about");

  const [authUser, setAuthUser] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bnpAuthUser");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("bnpAuthUser");
      setAuthUser(saved ? JSON.parse(saved) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const profileHref = authUser?.role === "admin" ? "/admin/scholarships" : "/profile";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#F8FBFF]/97 to-[#EFF6FF]/97 backdrop-blur-xl border-b border-[#E2E8F0] shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
          <Link to="/" className="flex items-center gap-3">
            <img src="/bnplogo1.png" alt="BNP Logo" className="h-14 w-auto drop-shadow-sm" />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-[#0F72CE] tracking-wide">BNP Charitable Trust</span>
              <span className="text-[10px] font-medium text-[#4A90C4] tracking-widest uppercase" style={{ letterSpacing: "0.08em" }}>
                Brajabandhu Nityananda Padmanabha
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          {/* About: text → /about, chevron + hover → dropdown */}
          <div
            className="relative flex items-center gap-0.5"
            ref={aboutRef}
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <Link
              to="/about"
              className={`font-medium text-sm tracking-wide transition-colors pr-0.5 ${isAboutActive ? "text-[#0A4C8B]" : "text-[#4A5568] hover:text-[#0A4C8B]"}`}
            >
              About
            </Link>

            <button
              onClick={(e) => { e.preventDefault(); setAboutOpen((v) => !v); }}
              className={`p-0.5 rounded transition-colors ${isAboutActive ? "text-[#0A4C8B]" : "text-[#4A5568] hover:text-[#0A4C8B]"}`}
              aria-label="Open About submenu"
            >
              <motion.span animate={{ rotate: aboutOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="block">
                <ChevronDown size={14} />
              </motion.span>
            </button>

            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-[#0F72CE] to-[#38B2F0]" />
                  <div className="p-2">
                    {aboutSubLinks.map((sub) => {
                      const Icon = sub.icon;
                      return (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          onClick={() => setAboutOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F0F8FF] transition-colors group"
                        >
                          <div className="p-2 bg-[#E8F4FF] rounded-xl group-hover:bg-[#0F72CE] transition-colors mt-0.5 shrink-0">
                            <Icon size={17} className="text-[#0F72CE] group-hover:text-white transition-colors" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#0A4C8B] text-sm">{sub.name}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{sub.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <motion.div key={link.name} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link
                to={link.href}
                className={`font-medium text-sm tracking-wide transition-colors ${location.pathname === link.href ? "text-[#0A4C8B]" : "text-[#4A5568] hover:text-[#0A4C8B]"}`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}

          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link to="/scholarship/apply" className="inline-flex items-center rounded-full bg-white border border-[#0F72CE] px-4 py-2 text-sm font-semibold text-[#0F72CE] shadow-sm transition hover:bg-blue-50">
              Apply for Scholarship
            </Link>
          </motion.div>

          {authUser ? (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to={profileHref} className="flex items-center gap-2 bg-[#0F72CE] text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#0A4C8B] transition">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xs uppercase">{authUser.name?.charAt(0) || 'U'}</span>
                </div>
                Profile
              </Link>
            </motion.div>
          ) : (
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link to="/admin/login" className="inline-flex items-center rounded-full bg-[#0F72CE] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0A4C8B]">
                Login
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#0F72CE]" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/97 backdrop-blur-xl border-t border-gray-200 shadow-sm"
          >
            <div className="flex flex-col p-4 space-y-1">

              {/* About: text → /about, chevron → expand sub-links (no Overview) */}
              <div>
                <div className="flex items-center">
                  <Link to="/about" className="flex-1 py-3 px-2 text-[#4A5568] hover:text-[#0F72CE] text-base font-medium">
                    About
                  </Link>
                  <button
                    onClick={() => setMobileAboutOpen((v) => !v)}
                    className="p-2 text-[#4A5568] hover:text-[#0F72CE] transition"
                    aria-label="Toggle About submenu"
                  >
                    <motion.span animate={{ rotate: mobileAboutOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="block">
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>
                </div>

                <AnimatePresence>
                  {mobileAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-2 space-y-1 border-l-2 border-[#0F72CE]/20 ml-2">
                        {aboutSubLinks.map((sub) => {
                          const Icon = sub.icon;
                          return (
                            <Link
                              key={sub.href}
                              to={sub.href}
                              className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-gray-600 hover:text-[#0F72CE] hover:bg-blue-50 transition"
                            >
                              <Icon size={15} className="shrink-0 text-[#0F72CE]" />
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="py-3 px-2 text-[#4A5568] hover:text-[#0F72CE] text-base font-medium hover:bg-gray-50 rounded-xl transition"
                >
                  {link.name}
                </Link>
              ))}

              <Link to="/scholarship/apply" className="py-3 px-2 text-[#0F72CE] text-base font-bold hover:bg-gray-50 rounded-xl transition">
                Apply for Scholarship
              </Link>

              {authUser ? (
                <Link to={profileHref} className="flex items-center gap-3 py-3 px-2 text-[#0F72CE] font-semibold hover:bg-gray-50 rounded-xl transition">
                  <div className="w-8 h-8 rounded-full bg-[#0F72CE]/10 flex items-center justify-center">
                    <span className="text-sm uppercase">{authUser.name?.charAt(0) || 'U'}</span>
                  </div>
                  Go to Profile
                </Link>
              ) : (
                <Link to="/admin/login" className="inline-flex items-center justify-center rounded-full bg-[#0F72CE] px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#0A4C8B] mt-2">
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
