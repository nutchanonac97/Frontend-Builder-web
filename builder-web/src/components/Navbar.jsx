import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Phone, Sun, Moon, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const languages = [
  { code: 'th', label: 'ไทย' },
  { code: 'en', label: 'English' },
];

const Navbar = ({ isDark, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const lastScrollY = useRef(0);
  const langRef = useRef(null);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  // Scroll direction: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = (scrollTop) => {
      if (scrollTop < 50) {
        setHidden(false);
      } else if (scrollTop > lastScrollY.current + 5) {
        setHidden(true);
      } else if (scrollTop < lastScrollY.current - 5) {
        setHidden(false);
      }
      lastScrollY.current = scrollTop;
    };

    const onWindowScroll = () => handleScroll(window.scrollY);
    const onContainerScroll = (e) => handleScroll(e.detail?.scrollTop ?? 0);

    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('containerscroll', onContainerScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('containerscroll', onContainerScroll);
    };
  }, []);

  // Close language dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/portfolio', label: t('nav.portfolio') },
    { path: '/plans', label: t('nav.plans') },
    { path: '/about', label: t('nav.about') },
  ];

  const isActive = (path) => location.pathname === path;
  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-500 ${
      isDark 
        ? 'bg-slate-900/60' 
        : 'bg-white/60 shadow-sm'
    } ${hidden && !isMenuOpen ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer z-50 shrink-0">
             <div className={`p-2 rounded-lg shadow-lg transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-orange-500 to-amber-600 shadow-orange-500/30' 
                : 'bg-gradient-to-br from-slate-800 to-slate-900 shadow-slate-500/20'
            }`}>
              <Home className="text-white" size={16} />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-black tracking-wider leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                CRYSTAL<span className="text-orange-500">BRIDGE</span>
              </span>
            </div>
          </Link>

          {/* Center Menu */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`font-medium transition-colors ${
                  isActive(link.path) 
                    ? 'text-orange-500' 
                    : isDark 
                      ? 'text-slate-300 hover:text-orange-400' 
                      : 'text-slate-600 hover:text-orange-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link 
              to="/contact" 
              className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 shadow-lg text-sm ${
                isDark 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30' 
                  : 'bg-slate-900 text-white hover:bg-orange-600 shadow-slate-900/20 hover:shadow-orange-600/30'
              }`}
            >
              <Phone size={14} /> {t('nav.contact')}
            </Link>

            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-slate-700/60 hover:bg-slate-600/80 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Globe size={14} />
                <span>{currentLang.code.toUpperCase()}</span>
                <ChevronDown size={12} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className={`absolute right-0 top-full mt-2 w-40 rounded-xl overflow-hidden shadow-xl border animate-in fade-in slide-in-from-top-2 duration-200 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-gray-100'
                }`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        language === lang.code
                          ? isDark ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-600'
                          : isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{lang.label}</span>
                      {language === lang.code && (
                        <svg className="w-4 h-4 ml-auto text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark/Light Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className={`relative w-11 h-6 rounded-full transition-all duration-300 flex items-center ${
                isDark 
                  ? 'bg-slate-700/80 hover:bg-slate-600' 
                  : 'bg-slate-200 hover:bg-slate-300'
              }`}
              title={isDark ? t('theme.light') : t('theme.dark')}
            >
              <div className={`absolute w-4 h-4 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
                isDark 
                  ? 'left-1 bg-gradient-to-br from-indigo-500 to-purple-600' 
                  : 'left-6 bg-gradient-to-br from-amber-400 to-orange-500'
              }`}>
                {isDark ? (
                  <Moon className="text-white" size={10} />
                ) : (
                  <Sun className="text-white" size={10} />
                )}
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden z-50 flex items-center gap-1 ml-auto">
            {/* Mobile Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 text-base ${
                isDark 
                  ? 'bg-slate-700 hover:bg-slate-600' 
                  : 'bg-slate-100 hover:bg-slate-200'
              }`}
              title={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
            >
              <Globe size={18} className={isDark ? 'text-slate-300' : 'text-slate-600'} />
            </button>

            {/* Mobile Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDark 
                  ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`w-10 h-10 flex items-center justify-center rounded-full ${isDark ? 'text-white' : 'text-slate-800'}`}>
               {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={`lg:hidden absolute top-16 left-0 w-full border-t shadow-xl p-4 sm:p-6 flex flex-col gap-2 sm:gap-4 animate-in slide-in-from-top-5 max-h-[calc(100dvh-4rem)] overflow-y-auto ${
          isDark 
            ? 'bg-slate-900 border-slate-700' 
            : 'bg-white border-gray-100'
        }`}>
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-base sm:text-lg font-medium py-1.5 sm:py-2 border-b ${
                  isDark ? 'border-slate-700' : 'border-gray-50'
                } ${
                  isActive(link.path) 
                    ? 'text-orange-500' 
                    : isDark ? 'text-white' : 'text-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-base sm:text-lg font-medium py-1.5 sm:py-2 ${
                isActive('/contact') 
                  ? 'text-orange-500' 
                  : isDark ? 'text-white' : 'text-slate-800'
              }`}
            >
              {t('nav.contact')}
            </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
