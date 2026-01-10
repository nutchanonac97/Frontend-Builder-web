import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';

function App() {
  const location = useLocation();
  
  // Dark mode state - lifted to App level for sharing
  const [isDark, setIsDark] = useState(true); // Default to dark mode
  
  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);
  
  // หน้าแรกมี Footer อยู่ใน component แล้ว และใช้ ScrollControls
  const isHomePage = location.pathname === '/';

  // ซ่อน browser scrollbar เมื่ออยู่หน้าแรก (ScrollControls จัดการ scroll เอง)
  useEffect(() => {
    if (isHomePage) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [isHomePage]);

  return (
    <div className="relative w-full min-h-screen">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      <Routes>
        {/* หน้าแรก - 3D Scrollytelling Experience */}
        <Route path="/" element={<HomePage isDark={isDark} />} />
        
        {/* หน้าอื่นๆ */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      
      {/* แสดง Footer เฉพาะหน้าที่ไม่ใช่หน้าแรก (หน้าแรกมี Footer อยู่ใน ScrollControls แล้ว) */}
      {!isHomePage && <Footer />}
    </div>
  );
}

export default App;