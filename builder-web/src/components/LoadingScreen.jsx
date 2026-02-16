import React from 'react';

const LoadingScreen = ({ isVisible }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-orange-600/10 animate-pulse"></div>

      {/* Rotating ring effect */}
      <div className="absolute">
        <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" style={{ animationDuration: '3s' }}></div>
      </div>

      {/* Secondary ring */}
      <div className="absolute">
        <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border-2 border-amber-500/10 border-b-amber-500/50 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
      </div>

      <div className="relative text-center">
        {/* Glow effect behind text */}
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-orange-500/50 via-amber-500/50 to-orange-600/50 animate-pulse"></div>

        {/* Main text with letter animation */}
        <h1 className="relative text-[120px] md:text-[180px] font-black tracking-wider">
          {['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((letter, index) => (
            <span
              key={index}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 animate-bounce"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: '1s',
                animationIterationCount: 'infinite',
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s',
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

