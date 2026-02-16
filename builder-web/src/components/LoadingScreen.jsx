import React from 'react';
import { Home, Hammer } from 'lucide-react';

const LoadingScreen = ({ isVisible }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-orange-600/10 animate-pulse"></div>

      {/* Rotating construction ring */}
      <div className="absolute">
        <div className="w-[380px] h-[380px] md:w-[500px] md:h-[500px] rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" style={{ animationDuration: '3s' }}></div>
      </div>

      {/* Secondary ring */}
      <div className="absolute">
        <div className="w-[440px] h-[440px] md:w-[580px] md:h-[580px] rounded-full border-2 border-amber-500/10 border-b-amber-500/50 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
      </div>

      <div className="relative text-center z-10">
        {/* House icon with construction theme */}
        <div className="flex justify-center mb-8 relative">
          {/* Glow behind icon */}
          <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-orange-500/40 via-amber-500/40 to-orange-600/40 animate-pulse"></div>

          {/* Main house icon */}
          <div className="relative">
            <Home
              size={80}
              className="text-orange-500"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.5))'
              }}
            />

            {/* Hammer icon - building animation */}
            <div className="absolute -right-2 -top-2 animate-bounce" style={{ animationDuration: '1.5s' }}>
              <Hammer size={24} className="text-amber-400" style={{ filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))' }} />
            </div>
          </div>
        </div>

        {/* Company name/branding */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 mb-2 animate-pulse">
            CrystalBridge
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-medium">
            รับสร้างบ้าน ครบวงจร
          </p>
        </div>

        {/* Glow effect behind text */}
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-orange-600/30 animate-pulse pointer-events-none"></div>

        {/* Loading text - static */}
        <h1 className="relative text-5xl md:text-6xl font-black tracking-wider mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600">
          LOADING
        </h1>

        {/* Progress bar */}
        <div className="w-64 md:w-80 h-2 bg-slate-700/50 rounded-full mx-auto overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-full"
            style={{
              animation: 'progressBar 2s ease-in-out infinite',
            }}
          ></div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s',
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* CSS for progress bar animation */}
      <style>{`
        @keyframes progressBar {
          0% { width: 20%; }
          50% { width: 80%; }
          100% { width: 20%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
