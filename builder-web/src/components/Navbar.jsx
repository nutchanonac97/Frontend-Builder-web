import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Phone, Sun, Moon } from 'lucide-react';

const Navbar = ({ isDark, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'หน้าแรก' },
    { path: '/services', label: 'บริการ' },
    { path: '/portfolio', label: 'ผลงาน' },
    { path: '/plans', label: 'แบบบ้าน' },
    { path: '/about', label: 'เกี่ยวกับเรา' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-500 ${
      isDark 
        ? 'bg-slate-900/60' 
        : 'bg-white/60 shadow-sm'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer z-50 flex-shrink-0">
             <div className={`p-2 rounded-lg shadow-lg transition-all duration-300 ${
               isDark 
                 ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/30' 
                 : 'bg-orange-600 shadow-orange-600/20'
             }`}>
                <Home className="text-white w-5 h-5" />
             </div>
             <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${
               isDark ? 'text-white' : 'text-slate-900'
             }`}>
               CRYSTAL<span className="text-orange-500">BRIDGE</span>
             </span>
          </Link>

          {/* Desktop Menu - Centered */}
          <div className="hidden lg:flex flex-1 justify-center gap-6 items-center">
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
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link 
              to="/contact" 
              className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 shadow-lg text-sm ${
                isDark 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30' 
                  : 'bg-slate-900 text-white hover:bg-orange-600 shadow-slate-900/20 hover:shadow-orange-600/30'
              }`}
            >
              <Phone size={14} /> ติดต่อเรา
            </Link>

            {/* Dark/Light Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className={`relative w-11 h-6 rounded-full transition-all duration-300 flex items-center ${
                isDark 
                  ? 'bg-slate-700/80 hover:bg-slate-600' 
                  : 'bg-slate-200 hover:bg-slate-300'
              }`}
              title={isDark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'}
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
          <div className="lg:hidden z-50 flex items-center gap-3">
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
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
               {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={`lg:hidden absolute top-20 left-0 w-full border-t shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 ${
          isDark 
            ? 'bg-slate-900 border-slate-700' 
            : 'bg-white border-gray-100'
        }`}>
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium py-2 border-b ${
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
              className="text-lg font-medium text-orange-500 py-2"
            >
              ติดต่อเรา
            </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
