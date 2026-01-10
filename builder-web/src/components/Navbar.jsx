import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Home, Phone, Sun, Moon } from 'lucide-react';

const Navbar = ({ isDark, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const menuData = {
    prices: ["แบบบ้านไม่เกิน 5 ล้าน", "แบบบ้าน 5-10 ล้าน", "แบบบ้าน 10 ล้านขึ้นไป"],
    floors: ["1 ชั้น", "2 ชั้น", "3 ชั้น", "อาคารพาณิชย์"],
    sizes: ["200-300 ตรม.", "301-500 ตรม.", "501-700 ตรม.", "700 ตรม.ขึ้นไป"],
    styles: ["โมเดิร์น / คอนเทมโพรารี่", "คลาสสิค / ยูโรเปียน", "ทรอปิคอล / รีสอร์ท", "นอร์ดิก / เจแปนนิส", "ลักซ์ชัวรี่"]
  };

  const navLinks = [
    { path: '/', label: 'หน้าแรก' },
    { path: '/services', label: 'บริการ' },
    { path: '/portfolio', label: 'ผลงาน' },
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
            
            {/* Mega Menu Trigger */}
            <div 
              className="relative group h-20 flex items-center"
              onMouseEnter={() => setActiveDropdown('plans')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1 font-medium transition-colors outline-none ${
                isDark 
                  ? 'text-slate-300 group-hover:text-orange-400' 
                  : 'text-slate-600 group-hover:text-orange-600'
              }`}>
                แบบบ้าน <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Content */}
              {activeDropdown === 'plans' && (
                <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-[900px] shadow-2xl rounded-2xl border p-8 grid grid-cols-4 gap-8 animate-in fade-in slide-in-from-top-2 duration-200 ${
                  isDark 
                    ? 'bg-slate-800 border-slate-700' 
                    : 'bg-white border-gray-100'
                }`}>
                  {/* Decoration line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-t-2xl"></div>
                  
                  <div>
                    <h3 className={`font-bold mb-4 pb-2 border-b ${
                      isDark ? 'text-white border-slate-600' : 'text-slate-900 border-gray-100'
                    }`}>งบประมาณ</h3>
                    <ul className={`space-y-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {menuData.prices.map((item, i) => <li key={i} className="hover:text-orange-500 cursor-pointer transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-orange-400"></span>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className={`font-bold mb-4 pb-2 border-b ${
                      isDark ? 'text-white border-slate-600' : 'text-slate-900 border-gray-100'
                    }`}>จำนวนชั้น</h3>
                    <ul className={`space-y-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {menuData.floors.map((item, i) => <li key={i} className="hover:text-orange-500 cursor-pointer transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-orange-400"></span>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className={`font-bold mb-4 pb-2 border-b ${
                      isDark ? 'text-white border-slate-600' : 'text-slate-900 border-gray-100'
                    }`}>ขนาดพื้นที่</h3>
                    <ul className={`space-y-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {menuData.sizes.map((item, i) => <li key={i} className="hover:text-orange-500 cursor-pointer transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-orange-400"></span>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className={`font-bold mb-4 pb-2 border-b ${
                      isDark ? 'text-white border-slate-600' : 'text-slate-900 border-gray-100'
                    }`}>สไตล์บ้าน</h3>
                    <ul className={`space-y-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {menuData.styles.map((item, i) => <li key={i} className={`cursor-pointer transition-colors flex items-center gap-2 ${item.includes('ลักซ์ชัวรี่') ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}`}>
                        <span className={`w-1 h-1 rounded-full ${item.includes('ลักซ์ชัวรี่') ? 'bg-orange-600' : 'bg-orange-400'}`}></span>
                        {item}
                      </li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>
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
            <div className={`py-2 border-b ${isDark ? 'border-slate-700' : 'border-gray-50'}`}>
                <span className={`text-lg font-medium block mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>แบบบ้าน / โปรโมชั่น</span>
                <div className="pl-4 space-y-2">
                   <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>เลือกตามงบประมาณ</p>
                   <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>เลือกตามสไตล์</p>
                </div>
            </div>
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
