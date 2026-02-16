import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Bed, Bath, Layers, Maximize2, ArrowRight, SlidersHorizontal, Phone, Sparkles } from 'lucide-react';
import housePlans, { budgetCategories } from '../data/housePlansData';

// Plan Card Component
const PlanCard = ({ plan, isDark, index }) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.1 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return (
    <div
      ref={setRef}
      className={`group cursor-pointer transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
        isDark 
          ? 'bg-slate-800/50 border border-slate-700/50 hover:border-orange-500/30 hover:shadow-orange-500/10' 
          : 'bg-white border border-gray-100 hover:border-orange-300 hover:shadow-orange-100'
      }`}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={plan.image}
            alt={plan.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-orange-500/30">
              {plan.priceLabel}
            </span>
          </div>
          
          {/* Style Badge */}
          <div className="absolute top-4 left-4">
            <span className="glass text-white px-3 py-1.5 rounded-full text-xs font-medium">
              {plan.style}
            </span>
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
              <div className="bg-white/90 backdrop-blur-sm text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-xl">
                ดูรายละเอียด <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className={`font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {plan.title}
          </h3>
          
          <p className={`text-sm mb-4 line-clamp-2 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {plan.description}
          </p>

          {/* Specs Grid */}
          <div className={`grid grid-cols-4 gap-2 pt-4 border-t ${
            isDark ? 'border-slate-700' : 'border-gray-100'
          }`}>
            <div className="text-center">
              <Bed size={16} className="mx-auto mb-1 text-orange-500" />
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {plan.bedrooms} นอน
              </span>
            </div>
            <div className="text-center">
              <Bath size={16} className="mx-auto mb-1 text-orange-500" />
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {plan.bathrooms} น้ำ
              </span>
            </div>
            <div className="text-center">
              <Layers size={16} className="mx-auto mb-1 text-orange-500" />
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {plan.floors} ชั้น
              </span>
            </div>
            <div className="text-center">
              <Maximize2 size={16} className="mx-auto mb-1 text-orange-500" />
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {plan.sizeLabel}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {plan.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isDark 
                    ? 'bg-slate-700/50 text-slate-400' 
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PlansPage = ({ isDark = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeBudget = searchParams.get('budget') || 'all';

  const filteredPlans = activeBudget === 'all'
    ? housePlans
    : housePlans.filter(p => p.budgetCategory === activeBudget);

  const activeLabel = budgetCategories.find(c => c.slug === activeBudget)?.label || 'ทั้งหมด';

  const handleFilterChange = (slug) => {
    if (slug === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ budget: slug });
    }
  };

  // Scroll to top when filter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeBudget]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950/20' 
              : 'bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100'
          }`} />
          {/* Decorative elements */}
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-orange-500/5 blur-3xl" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              isDark 
                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' 
                : 'bg-orange-100 text-orange-600 border border-orange-200'
            }`}>
              <Sparkles size={16} />
              แบบบ้านกว่า 200+ แบบ
            </span>
          </div>

          {/* Title */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up ${
            isDark ? 'text-white' : 'text-slate-900'
          }`} style={{ animationDelay: '0.1s' }}>
            แบบบ้าน
            <span className="text-gradient"> {activeLabel !== 'ทั้งหมด' ? activeLabel : 'ทุกงบประมาณ'}</span>
          </h1>
          
          <p className={`text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`} style={{ animationDelay: '0.2s' }}>
            เลือกแบบบ้านสวยที่ตรงใจ ราคาตรงงบ พร้อมปรับแต่งได้ตามต้องการ
          </p>

          {/* Budget Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {budgetCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleFilterChange(cat.slug)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeBudget === cat.slug
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105'
                    : isDark
                      ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                      : 'bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className={`mt-6 text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            <SlidersHorizontal size={14} className="inline mr-2" />
            พบ {filteredPlans.length} แบบบ้าน
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlans.map((plan, index) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isDark={isDark}
                  index={index}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className={`text-6xl mb-4`}>🏠</div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                ไม่พบแบบบ้านในหมวดนี้
              </h3>
              <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                ลองเลือกช่วงงบประมาณอื่น หรือดูแบบบ้านทั้งหมด
              </p>
              <button
                onClick={() => handleFilterChange('all')}
                className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                ดูทั้งหมด
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-r from-orange-600/90 to-orange-500/90' 
            : 'bg-gradient-to-r from-orange-600 to-orange-500'
        }`} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            สนใจแบบบ้านไหน? ปรึกษาฟรี!
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            ทีมสถาปนิกของเรายินดีให้คำปรึกษา ปรับแบบ และประเมินงบให้ฟรี ไม่มีค่าใช้จ่าย
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl"
            >
              <Phone size={18} />
              นัดหมายปรึกษาฟรี
            </Link>
            <Link 
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-white/10"
            >
              ดูผลงานจริง <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlansPage;
