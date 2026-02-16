import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bed, Bath, Layers, Maximize2, ArrowRight, Phone, Sparkles,
  X, Search, ChevronDown, SlidersHorizontal
} from 'lucide-react';
import housePlans, { budgetCategories, floorOptions, sizeRanges, styleOptions } from '../data/housePlansData';

// ─── Plan Card ───
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
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={`rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        isDark 
          ? 'bg-slate-800/60 border border-slate-700/50 hover:border-orange-500/30 hover:shadow-orange-500/10' 
          : 'bg-white border border-gray-100 hover:border-orange-300 hover:shadow-orange-200/50'
      }`}>
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden">
          <img
            src={plan.image}
            alt={plan.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-orange-500/30">
              {plan.priceLabel}
            </span>
          </div>
          
          {/* Style Badge */}
          <div className="absolute top-4 left-4">
            <span className="glass text-white px-3 py-1.5 rounded-full text-xs font-medium">
              {plan.style}
            </span>
          </div>
          
          {/* Bottom info on image */}
          <div className="absolute bottom-3 left-4 right-4 flex gap-3 text-white/90 text-xs">
            <span className="flex items-center gap-1"><Bed size={12} /> {plan.bedrooms}</span>
            <span className="flex items-center gap-1"><Bath size={12} /> {plan.bathrooms}</span>
            <span className="flex items-center gap-1"><Layers size={12} /> {plan.floors} ชั้น</span>
            <span className="flex items-center gap-1"><Maximize2 size={12} /> {plan.sizeLabel}</span>
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
          <h3 className={`font-bold text-lg mb-1.5 group-hover:text-orange-500 transition-colors ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {plan.title}
          </h3>
          
          <p className={`text-sm mb-3 line-clamp-2 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {plan.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
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

// ─── Filter Section Component ───
const FilterSection = ({ title, icon, children, isDark, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className={`border-b ${isDark ? 'border-slate-700/50' : 'border-gray-100'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between py-4 px-1 text-sm font-semibold transition-colors ${
          isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
        }`}
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 pb-4' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
};

// ─── Checkbox Filter Item ───
const FilterCheckbox = ({ label, checked, onToggle, count, isDark }) => (
  <label onClick={onToggle} className={`flex items-center justify-between py-1.5 px-1 cursor-pointer group transition-colors rounded-lg ${
    isDark ? 'hover:bg-slate-700/30' : 'hover:bg-orange-50/50'
  }`}>
    <span className="flex items-center gap-2.5">
      <span className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
        checked 
          ? 'bg-orange-500 border-orange-500 shadow-sm shadow-orange-500/30' 
          : isDark 
            ? 'border-slate-600 group-hover:border-slate-500' 
            : 'border-gray-300 group-hover:border-orange-400'
      }`}>
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className={`text-sm ${checked ? 'text-orange-500 font-medium' : isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {label}
      </span>
    </span>
    {count !== undefined && (
      <span className={`text-xs px-2 py-0.5 rounded-full ${
        isDark ? 'bg-slate-700 text-slate-500' : 'bg-gray-100 text-gray-400'
      }`}>
        {count}
      </span>
    )}
  </label>
);

// ─── Active Filter Pill ───
const FilterPill = ({ label, onRemove, isDark }) => (
  <span className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
    isDark 
      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20' 
      : 'bg-orange-50 text-orange-600 border border-orange-200'
  }`}>
    {label}
    <button onClick={onRemove} className="hover:text-orange-300 transition-colors">
      <X size={12} />
    </button>
  </span>
);

// ─── Main Page ───
const PlansPage = ({ isDark = false }) => {
  // Filter state
  const [selectedBudgets, setSelectedBudgets] = useState([]);
  const [selectedFloors, setSelectedFloors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Toggle filter helpers
  const toggleFilter = (arr, setArr, value) => {
    setArr(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  // Filter logic
  const filteredPlans = useMemo(() => {
    let result = housePlans;
    
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    
    // Budget
    if (selectedBudgets.length > 0) {
      result = result.filter(p => selectedBudgets.includes(p.budgetCategory));
    }
    
    // Floors
    if (selectedFloors.length > 0) {
      result = result.filter(p => selectedFloors.includes(p.floors));
    }
    
    // Size ranges
    if (selectedSizes.length > 0) {
      result = result.filter(p => {
        return selectedSizes.some(slug => {
          const range = sizeRanges.find(r => r.slug === slug);
          return range && p.size >= range.min && p.size < range.max;
        });
      });
    }
    
    // Style
    if (selectedStyles.length > 0) {
      result = result.filter(p => selectedStyles.includes(p.style));
    }
    
    // Sort
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'size-desc') result = [...result].sort((a, b) => b.size - a.size);
    
    return result;
  }, [searchQuery, selectedBudgets, selectedFloors, selectedSizes, selectedStyles, sortBy]);

  // Count plans per filter option
  const countForBudget = (slug) => housePlans.filter(p => p.budgetCategory === slug).length;
  const countForFloor = (val) => housePlans.filter(p => p.floors === val).length;
  const countForSize = (slug) => {
    const range = sizeRanges.find(r => r.slug === slug);
    return housePlans.filter(p => range && p.size >= range.min && p.size < range.max).length;
  };
  const countForStyle = (slug) => housePlans.filter(p => p.style === slug).length;

  const hasActiveFilters = selectedBudgets.length + selectedFloors.length + selectedSizes.length + selectedStyles.length > 0 || searchQuery.trim();

  const clearAllFilters = () => {
    setSelectedBudgets([]);
    setSelectedFloors([]);
    setSelectedSizes([]);
    setSelectedStyles([]);
    setSearchQuery('');
  };

  // Active filter labels for pills
  const activeFilterPills = [
    ...selectedBudgets.map(s => ({ key: `b-${s}`, label: budgetCategories.find(c => c.slug === s)?.label, remove: () => toggleFilter(selectedBudgets, setSelectedBudgets, s) })),
    ...selectedFloors.map(f => ({ key: `f-${f}`, label: floorOptions.find(o => o.value === f)?.label, remove: () => toggleFilter(selectedFloors, setSelectedFloors, f) })),
    ...selectedSizes.map(s => ({ key: `s-${s}`, label: sizeRanges.find(r => r.slug === s)?.label, remove: () => toggleFilter(selectedSizes, setSelectedSizes, s) })),
    ...selectedStyles.map(s => ({ key: `st-${s}`, label: styleOptions.find(o => o.slug === s)?.label, remove: () => toggleFilter(selectedStyles, setSelectedStyles, s) })),
  ];

  // Scroll to top on filter change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedBudgets, selectedFloors, selectedSizes, selectedStyles]);

  // ─── Sidebar content (shared for desktop & mobile) ───
  const renderSidebar = () => (
    <>
      {/* Search */}
      <div className="mb-4">
        <div className={`relative rounded-xl overflow-hidden ${
          isDark ? 'bg-slate-700/40' : 'bg-gray-50'
        }`}>
          <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="ค้นหาแบบบ้าน..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 text-sm bg-transparent outline-none ${
              isDark ? 'text-white placeholder-slate-500' : 'text-slate-800 placeholder-gray-400'
            }`}
          />
        </div>
      </div>

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="text-xs text-orange-500 hover:text-orange-400 font-medium mb-3 flex items-center gap-1"
        >
          <X size={12} /> ล้าง filter ทั้งหมด
        </button>
      )}

      {/* Budget */}
      <FilterSection title="งบประมาณ" icon={<span className="text-orange-500">฿</span>} isDark={isDark} defaultOpen={true}>
        <div className="space-y-0.5">
          {budgetCategories.filter(c => c.slug !== 'all').map(cat => (
            <FilterCheckbox
              key={cat.slug}
              label={cat.label}
              checked={selectedBudgets.includes(cat.slug)}
              onToggle={() => toggleFilter(selectedBudgets, setSelectedBudgets, cat.slug)}
              count={countForBudget(cat.slug)}
              isDark={isDark}
            />
          ))}
        </div>
      </FilterSection>

      {/* Floors */}
      <FilterSection title="จำนวนชั้น" icon={<Layers size={14} className="text-orange-500" />} isDark={isDark} defaultOpen={true}>
        <div className="space-y-0.5">
          {floorOptions.map(opt => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={selectedFloors.includes(opt.value)}
              onToggle={() => toggleFilter(selectedFloors, setSelectedFloors, opt.value)}
              count={countForFloor(opt.value)}
              isDark={isDark}
            />
          ))}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="ขนาดพื้นที่" icon={<Maximize2 size={14} className="text-orange-500" />} isDark={isDark} defaultOpen={true}>
        <div className="space-y-0.5">
          {sizeRanges.map(range => (
            <FilterCheckbox
              key={range.slug}
              label={range.label}
              checked={selectedSizes.includes(range.slug)}
              onToggle={() => toggleFilter(selectedSizes, setSelectedSizes, range.slug)}
              count={countForSize(range.slug)}
              isDark={isDark}
            />
          ))}
        </div>
      </FilterSection>

      {/* Style */}
      <FilterSection title="สไตล์บ้าน" icon={<Sparkles size={14} className="text-orange-500" />} isDark={isDark} defaultOpen={false}>
        <div className="space-y-0.5">
          {styleOptions.map(opt => (
            <FilterCheckbox
              key={opt.slug}
              label={opt.label}
              checked={selectedStyles.includes(opt.slug)}
              onToggle={() => toggleFilter(selectedStyles, setSelectedStyles, opt.slug)}
              count={countForStyle(opt.slug)}
              isDark={isDark}
            />
          ))}
        </div>
      </FilterSection>
    </>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {/* ─── Quick Category Cards ─── */}
      <section className="pt-24 pb-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Page Header */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                แบบบ้าน<span className="text-orange-500">ทั้งหมด</span>
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                เลือกหมวดหมู่เพื่อค้นหาแบบบ้านที่ใช่
              </p>
            </div>
            <div className={`hidden sm:flex items-center gap-4 text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>🏠 <strong className={isDark ? 'text-white' : 'text-slate-700'}>{housePlans.length}</strong> แบบ</span>
              <span>·</span>
              <span>⭐ สร้างแล้ว <strong className={isDark ? 'text-white' : 'text-slate-700'}>500+</strong> หลัง</span>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { 
                slug: 'under5m', 
                title: 'ไม่เกิน 5 ล้าน', 
                subtitle: 'เริ่มต้นชีวิตใหม่',
                image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
                count: countForBudget('under5m'),
                gradient: 'from-emerald-600/80 to-emerald-900/90'
              },
              { 
                slug: '5to10m', 
                title: '5-10 ล้าน', 
                subtitle: 'คุณภาพระดับพรีเมียม',
                image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
                count: countForBudget('5to10m'),
                gradient: 'from-orange-600/80 to-orange-900/90'
              },
              { 
                slug: 'over10m', 
                title: '10 ล้านขึ้นไป', 
                subtitle: 'ลักซ์ชัวรี่ ไม่จำกัด',
                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
                count: countForBudget('over10m'),
                gradient: 'from-violet-600/80 to-violet-900/90'
              },
            ].map((cat) => {
              const isSelected = selectedBudgets.includes(cat.slug);
              return (
                <button
                  key={cat.slug}
                  onClick={() => toggleFilter(selectedBudgets, setSelectedBudgets, cat.slug)}
                  className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 
                    ${isSelected 
                      ? 'ring-2 ring-orange-500 ring-offset-2 shadow-lg shadow-orange-500/20 scale-[1.02]' 
                      : 'hover:shadow-xl hover:-translate-y-1'
                    } ${isDark ? 'ring-offset-slate-950' : 'ring-offset-slate-50'}`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-linear-to-r ${cat.gradient}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-5 sm:p-6 flex flex-col justify-end min-h-[130px] sm:min-h-[150px]">
                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    
                    <span className="text-white/70 text-xs font-medium tracking-wide uppercase mb-1">
                      {cat.subtitle}
                    </span>
                    <span className="text-white text-xl sm:text-2xl font-bold">
                      {cat.title}
                    </span>
                    <span className="text-white/60 text-xs mt-1.5">
                      {cat.count} แบบบ้าน
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Main Content: Sidebar + Grid ─── */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                isDark 
                  ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                  : 'bg-white text-slate-600 border border-gray-200 shadow-sm'
              }`}
            >
              <SlidersHorizontal size={16} />
              ตัวกรอง {hasActiveFilters ? `(${activeFilterPills.length})` : ''}
            </button>
          </div>

          <div className="flex gap-8">
            {/* ─── Desktop Sidebar ─── */}
            <aside className={`hidden lg:block w-72 shrink-0 sticky top-20 self-start rounded-2xl p-5 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin ${
              isDark 
                ? 'bg-slate-900/60 border border-slate-800' 
                : 'bg-white border border-gray-100 shadow-sm'
            }`}>
              <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <SlidersHorizontal size={14} />
                ตัวกรอง
              </h3>
              {renderSidebar()}
            </aside>

            {/* ─── Grid Area ─── */}
            <div className="flex-1 min-w-0">
              
              {/* Toolbar: Active Filters + Sort */}
              <div className={`flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b ${
                isDark ? 'border-slate-800' : 'border-gray-100'
              }`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    พบ <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{filteredPlans.length}</span> แบบบ้าน
                  </span>
                  {activeFilterPills.map(pill => (
                    <FilterPill key={pill.key} label={pill.label} onRemove={pill.remove} isDark={isDark} />
                  ))}
                </div>
                
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`text-sm px-3 py-2 rounded-lg outline-none cursor-pointer transition-colors ${
                    isDark 
                      ? 'bg-slate-800 text-slate-300 border border-slate-700 focus:border-orange-500' 
                      : 'bg-gray-50 text-slate-600 border border-gray-200 focus:border-orange-400'
                  }`}
                >
                  <option value="default">เรียงตาม: แนะนำ</option>
                  <option value="price-asc">ราคา: ต่ำ → สูง</option>
                  <option value="price-desc">ราคา: สูง → ต่ำ</option>
                  <option value="size-desc">ขนาด: ใหญ่ → เล็ก</option>
                </select>
              </div>

              {/* ─── Cards Grid ─── */}
              {filteredPlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPlans.map((plan, index) => (
                    <PlanCard key={plan.id} plan={plan} isDark={isDark} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    ไม่พบแบบบ้านที่ตรงกับตัวกรอง
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    ลองปรับเงื่อนไขการค้นหา หรือล้าง filter ทั้งหมด
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-medium"
                  >
                    ล้าง filter ทั้งหมด
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mobile Filter Drawer ─── */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsMobileFilterOpen(false)} 
          />
          {/* Drawer */}
          <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto p-6 shadow-2xl animate-in slide-in-from-right duration-300 ${
            isDark ? 'bg-slate-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>ตัวกรอง</h3>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-slate-500'}`}
              >
                <X size={20} />
              </button>
            </div>
            {renderSidebar()}
            <div className="mt-6 pt-4 border-t border-slate-700/50">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
              >
                ดูผลลัพธ์ ({filteredPlans.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── CTA Section ─── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-linear-to-r from-orange-600/90 to-orange-500/90' 
            : 'bg-linear-to-r from-orange-600 to-orange-500'
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
