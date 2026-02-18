import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

/**
 * Floating contact button (bottom-right).
 * Shows Line Official and Phone options when expanded.
 */
const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = () => setIsOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
      {/* Expanded Options */}
      {isOpen && (
        <div
          className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Line Official */}
          <a
            href="https://line.me/ti/p/@giftshi.official"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-green-500 text-white font-bold shadow-lg shadow-green-500/30 hover:bg-green-600 hover:scale-105 transition-all text-sm whitespace-nowrap"
          >
            <MessageCircle size={18} />
            Line Official
          </a>

          {/* Phone */}
          <a
            href="tel:0838924659"
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:scale-105 transition-all text-sm whitespace-nowrap"
          >
            <Phone size={18} />
            083-892-4659
          </a>
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen
            ? 'bg-slate-700 text-white shadow-slate-700/30 rotate-0'
            : 'bg-green-500 text-white shadow-green-500/40 animate-bounce-slow'
        }`}
        aria-label="Contact us"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingContact;
