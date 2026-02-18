import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Building2 } from 'lucide-react';

const NotFoundPage = ({ isDark = false }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center px-6 py-24 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-orange-500' : 'bg-orange-300'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? 'bg-blue-500' : 'bg-blue-300'}`} />
      </div>

      <div className="relative text-center max-w-lg">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className={`text-[10rem] leading-none font-black tracking-tight ${isDark ? 'text-slate-800' : 'text-gray-200'}`}>
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
              <Building2 size={40} className="text-orange-500" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          ไม่พบหน้าที่คุณต้องการ
        </h2>
        <p className={`text-lg mb-10 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          หน้าเว็บนี้อาจถูกย้ายหรือไม่มีอยู่แล้ว
          <br />
          ลองกลับไปหน้าหลักหรือดูบริการของเรา
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 hover:scale-105 transition-all shadow-lg shadow-orange-500/30"
          >
            <Home size={18} />
            กลับหน้าหลัก
          </Link>
          <Link
            to="/plans"
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold hover:scale-105 transition-all ${
              isDark
                ? 'bg-slate-800 text-white border border-slate-700 hover:border-orange-500/50'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
            }`}
          >
            <Search size={18} />
            ดูแบบบ้าน
          </Link>
        </div>

        {/* Quick links */}
        <div className={`mt-10 pt-8 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
          <p className={`text-sm mb-4 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
            หรือเลือกจากหน้าเหล่านี้
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { to: '/services', label: 'บริการ' },
              { to: '/portfolio', label: 'ผลงาน' },
              { to: '/about', label: 'เกี่ยวกับเรา' },
              { to: '/contact', label: 'ติดต่อ' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? 'text-slate-400 hover:text-orange-400 hover:bg-slate-800'
                    : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
