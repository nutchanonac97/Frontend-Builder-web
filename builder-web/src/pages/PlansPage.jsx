import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bed, Bath, Layers, Maximize2, ArrowRight, Phone, Sparkles,
  X, Search, ChevronDown, SlidersHorizontal
} from 'lucide-react';
import housePlans, { sizeRanges } from '../data/housePlansData';
import { useLanguage } from '../i18n/LanguageContext';
import usePageMeta from '../hooks/usePageMeta';

// ─── Plan Card ───
const PlanCard = ({ plan, isDark, index, t }) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

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
          {/* Skeleton placeholder */}
          {!imgLoaded && (
            <div className={`absolute inset-0 animate-pulse ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
              <div className="w-full h-full flex items-center justify-center">
                <svg className={`w-10 h-10 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>
            </div>
          )}
          <img
            src={plan.image}
            alt={plan.title}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
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
            <span className="flex items-center gap-1"><Layers size={12} /> {plan.floors} {t('plans.floor')}</span>
            <span className="flex items-center gap-1"><Maximize2 size={12} /> {plan.sizeLabel}</span>
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
              <div className="bg-white/90 backdrop-blur-sm text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-xl">
                {t('plans.viewDetails')} <ArrowRight size={16} />
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
  const { t } = useLanguage();
  usePageMeta(t('plans.pageTitle'), t('plans.pageSubtitle'));

  // Filter state
  const [selectedBudgets, setSelectedBudgets] = useState([]);
  const [selectedFloors, setSelectedFloors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const ITEMS_PER_PAGE = 12;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Scroll state for floating filter button
  const [showFilterFAB, setShowFilterFAB] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFilterFAB(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get translated filter options & plan data
  const trBudgetCats = t('plans.budgetCategories') || [];
  const trFloorOpts = t('plans.floorOptions') || [];
  const trSizeRanges = t('plans.sizeRanges') || [];
  const trStyleOpts = t('plans.styleOptions') || [];
  const trCategoryCards = t('plans.categoryCards') || [];

  // Merge static data from housePlansData with translated text
  const translatedPlans = useMemo(() => {
    const plans = t('plans.housePlans') || [];
    return housePlans.map((plan, i) => {
      const tr = plans[i] || {};
      return {
        ...plan,
        title: tr.title || plan.title,
        priceLabel: tr.priceLabel || plan.priceLabel,
        sizeLabel: tr.sizeLabel || plan.sizeLabel,
        style: tr.style || plan.style,
        description: tr.description || plan.description,
        tags: tr.tags || plan.tags,
      };
    });
  }, [t]);

  // Toggle filter helpers
  const toggleFilter = (arr, setArr, value) => {
    setArr(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  // Filter logic
  const filteredPlans = useMemo(() => {
    let result = translatedPlans;
    
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q) ||
        p.tags.some(tg => tg.toLowerCase().includes(q))
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
    
    // Style (filter by slug from the original data)
    if (selectedStyles.length > 0) {
      result = result.filter(p => {
        // match against the original (Thai) style from housePlansData
        const origPlan = housePlans.find(hp => hp.id === p.id);
        return origPlan && selectedStyles.includes(origPlan.style);
      });
    }
    
    // Sort
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'size-desc') result = [...result].sort((a, b) => b.size - a.size);
    
    return result;
  }, [searchQuery, selectedBudgets, selectedFloors, selectedSizes, selectedStyles, sortBy, translatedPlans]);

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
    setVisibleCount(ITEMS_PER_PAGE);
  };

  // Active filter labels for pills
  const activeFilterPills = [
    ...selectedBudgets.map(s => ({ key: `b-${s}`, label: trBudgetCats.find(c => c.slug === s)?.label, remove: () => toggleFilter(selectedBudgets, setSelectedBudgets, s) })),
    ...selectedFloors.map(f => ({ key: `f-${f}`, label: trFloorOpts.find(o => o.value === f)?.label, remove: () => toggleFilter(selectedFloors, setSelectedFloors, f) })),
    ...selectedSizes.map(s => ({ key: `s-${s}`, label: trSizeRanges.find(r => r.slug === s)?.label, remove: () => toggleFilter(selectedSizes, setSelectedSizes, s) })),
    ...selectedStyles.map(s => ({ key: `st-${s}`, label: trStyleOpts.find(o => o.slug === s)?.label, remove: () => toggleFilter(selectedStyles, setSelectedStyles, s) })),
  ];

  // Scroll to top on filter change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedBudgets, selectedFloors, selectedSizes, selectedStyles]);

  // Category card configs (budget slug + gradient + image)
  const categoryCardConfigs = [
    { slug: 'under5m', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80', gradient: 'from-emerald-600/80 to-emerald-900/90' },
    { slug: '5to10m', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', gradient: 'from-orange-600/80 to-orange-900/90' },
    { slug: 'over10m', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', gradient: 'from-violet-600/80 to-violet-900/90' },
  ];

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
            placeholder={t('plans.searchPlaceholder')}
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
          <X size={12} /> {t('plans.clearAll')}
        </button>
      )}

      {/* Budget */}
      <FilterSection title={t('plans.filterSections.budget')} icon={<span className="text-orange-500">฿</span>} isDark={isDark} defaultOpen={true}>
        <div className="space-y-0.5">
          {trBudgetCats.map(cat => (
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
      <FilterSection title={t('plans.filterSections.floors')} icon={<Layers size={14} className="text-orange-500" />} isDark={isDark} defaultOpen={true}>
        <div className="space-y-0.5">
          {trFloorOpts.map(opt => (
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
      <FilterSection title={t('plans.filterSections.size')} icon={<Maximize2 size={14} className="text-orange-500" />} isDark={isDark} defaultOpen={true}>
        <div className="space-y-0.5">
          {trSizeRanges.map(range => (
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
      <FilterSection title={t('plans.filterSections.style')} icon={<Sparkles size={14} className="text-orange-500" />} isDark={isDark} defaultOpen={false}>
        <div className="space-y-0.5">
          {trStyleOpts.map(opt => (
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
                {t('plans.pageTitle1')}<span className="text-orange-500">{t('plans.pageTitle2')}</span>
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                {t('plans.pageSubtitle')}
              </p>
            </div>
            <div className={`hidden sm:flex items-center gap-4 text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>🏠 <strong className={isDark ? 'text-white' : 'text-slate-700'}>{housePlans.length}</strong> {t('plans.plansUnit')}</span>
              <span>·</span>
              <span>⭐ {t('plans.builtCount')} <strong className={isDark ? 'text-white' : 'text-slate-700'}>500+</strong> {t('plans.builtUnit')}</span>
            </div>
          </div>

          {/* Category Cards */}
          <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
            {categoryCardConfigs.map((catConfig, idx) => {
              const trCard = trCategoryCards[idx] || {};
              const isSelected = selectedBudgets.includes(catConfig.slug);
              return (
                <button
                  key={catConfig.slug}
                  onClick={() => toggleFilter(selectedBudgets, setSelectedBudgets, catConfig.slug)}
                  className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 
                    min-w-[75%] sm:min-w-0 snap-start
                    ${isSelected 
                      ? 'ring-2 ring-orange-500 ring-offset-2 shadow-lg shadow-orange-500/20 scale-[1.02]' 
                      : 'hover:shadow-xl hover:-translate-y-1'
                    } ${isDark ? 'ring-offset-slate-950' : 'ring-offset-slate-50'}`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img src={catConfig.image} alt={trCard.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-linear-to-r ${catConfig.gradient}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-5 sm:p-6 flex flex-col justify-end min-h-[120px] sm:min-h-[150px]">
                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    
                    <span className="text-white/70 text-xs font-medium tracking-wide uppercase mb-1">
                      {trCard.subtitle}
                    </span>
                    <span className="text-white text-lg sm:text-2xl font-bold">
                      {trCard.title}
                    </span>
                    <span className="text-white/60 text-xs mt-1.5">
                      {countForBudget(catConfig.slug)} {trCard.countLabel}
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
              {t('plans.filterMobile')} {hasActiveFilters ? `(${activeFilterPills.length})` : ''}
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
                {t('plans.filterTitle')}
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
                    {t('plans.found')} <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{filteredPlans.length}</span> {t('plans.plansCount')}
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
                  <option value="default">{t('plans.sort.default')}</option>
                  <option value="price-asc">{t('plans.sort.priceAsc')}</option>
                  <option value="price-desc">{t('plans.sort.priceDesc')}</option>
                  <option value="size-desc">{t('plans.sort.sizeDesc')}</option>
                </select>
              </div>

              {/* ─── Cards Grid ─── */}
              {filteredPlans.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPlans.slice(0, visibleCount).map((plan, index) => (
                      <PlanCard key={plan.id} plan={plan} isDark={isDark} index={index % ITEMS_PER_PAGE} t={t} />
                    ))}
                  </div>

                  {/* Load More */}
                  {visibleCount < filteredPlans.length && (
                    <div className="flex flex-col items-center mt-10 gap-3">
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        {t('plans.showing') || 'แสดง'} {Math.min(visibleCount, filteredPlans.length)} {t('plans.of') || 'จาก'} {filteredPlans.length} {t('plans.items') || 'แบบ'}
                      </p>
                      <button
                        onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                        className="px-8 py-3 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 hover:scale-105 transition-all shadow-lg shadow-orange-500/20"
                      >
                        {t('plans.loadMore') || 'โหลดเพิ่มเติม'} ({filteredPlans.length - visibleCount} {t('plans.remaining') || 'แบบที่เหลือ'})
                      </button>
                    </div>
                  )}

                  {/* All loaded indicator */}
                  {visibleCount >= filteredPlans.length && filteredPlans.length > ITEMS_PER_PAGE && (
                    <p className={`text-center mt-8 text-sm ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                      {t('plans.allLoaded') || `แสดงทั้งหมด ${filteredPlans.length} แบบแล้ว`}
                    </p>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {t('plans.emptyTitle')}
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t('plans.emptySubtitle')}
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-medium"
                  >
                    {t('plans.emptyClear')}
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
              <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('plans.filterTitle')}</h3>
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
                {t('plans.showResults')} ({filteredPlans.length})
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
            {t('plans.cta.title')}
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            {t('plans.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl"
            >
              <Phone size={18} />
              {t('plans.cta.consult')}
            </Link>
            <Link 
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-white/10"
            >
              {t('plans.cta.viewPortfolio')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Floating Filter Button (Mobile) ─── */}
      {showFilterFAB && (
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="fixed bottom-22 right-5 lg:hidden z-40 w-12 h-12 rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:scale-110 transition-all flex items-center justify-center"
          aria-label="Open filters"
        >
          <SlidersHorizontal size={20} />
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
              {activeFilterPills.length}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default PlansPage;
