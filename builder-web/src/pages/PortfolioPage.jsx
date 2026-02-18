import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Building2, ArrowRight, Play, Pause, ChevronsLeftRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import usePageMeta from '../hooks/usePageMeta';

// Static project data (non-translatable parts)
const projectsStatic = [
  {
    id: 1,
    year: '2025',
    tags: ['Smart Home', 'Pool Villa', 'Eco-Friendly'],
    featured: true,
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'
    ]
  },
  {
    id: 2,
    year: '2024',
    tags: ['Mountain View', 'Boutique', 'Wellness'],
    featured: true,
    beforeImage: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80'
    ]
  },
  {
    id: 3,
    year: '2025',
    tags: ['Beachfront', 'Pool Villa', 'Tropical'],
    featured: true,
    beforeImage: 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
    ]
  },
  {
    id: 4,
    year: '2025',
    tags: ['Floating', 'Off-Grid', 'Panoramic View'],
    featured: false,
    beforeImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80'
    ]
  },
  {
    id: 5,
    year: '2024',
    tags: ['Sustainable', 'Forest Living', 'Natural'],
    featured: false,
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80'
    ]
  },
  {
    id: 6,
    year: '2024',
    tags: ['Mixed-Use', 'Commercial', 'Modern'],
    featured: false,
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'
    ]
  }
];

// Before/After Slider Component
const BeforeAfterSlider = ({ beforeImage, afterImage, title, t }) => {
  const containerRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e) => handleMove(e.clientX);
    const onTouchMove = (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };
    const stopDrag = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', stopDrag);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className="before-after-container aspect-video rounded-2xl"
      style={{ touchAction: 'none' }}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After Image (Background) */}
      <div className="before-after-after">
        <img src={afterImage} alt={`${title} - After`} />
      </div>
      
      {/* Before Image (Overlay with clip) */}
      <div 
        className="before-after-before"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt={`${title} - Before`} />
      </div>
      
      {/* Slider Handle */}
      <div 
        className="before-after-slider"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="before-after-handle">
          <ChevronsLeftRight size={20} className="text-slate-700" />
        </div>
      </div>
      
      {/* Labels */}
      <div className="before-after-label before-after-label-before">{t('portfolio.beforeLabel')}</div>
      <div className="before-after-label before-after-label-after">{t('portfolio.afterLabel')}</div>
    </div>
  );
};

// Full-Screen Hero Component
const FullScreenHero = ({ projects, onViewProject, t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  const currentProject = projects[currentIndex];

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 500);
  }, [currentIndex, isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % projects.length);
  }, [currentIndex, projects.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + projects.length) % projects.length);
  }, [currentIndex, projects.length, goToSlide]);

  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(nextSlide, 6000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isPlaying, nextSlide]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Ken Burns */}
      <div className="absolute inset-0">
        <img
          key={currentIndex}
          src={currentProject.afterImage}
          alt={currentProject.title}
          className={`absolute inset-0 w-full h-full object-cover animate-ken-burns-pan ${isAnimating ? 'animate-hero-out' : 'animate-hero-in'}`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Category Badge */}
            <div 
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-white text-sm font-medium mb-6 animate-text-reveal"
              style={{ animationDelay: '0.2s' }}
            >
              <Building2 size={16} />
              {currentProject.category}
            </div>

            {/* Title */}
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-text-reveal"
              style={{ animationDelay: '0.4s' }}
            >
              {currentProject.title}
            </h1>

            {/* Location & Year */}
            <div 
              className="flex items-center gap-4 text-white/70 mb-6 animate-text-reveal"
              style={{ animationDelay: '0.6s' }}
            >
              <span className="flex items-center gap-2">
                <MapPin size={18} />
                {currentProject.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {currentProject.year}
              </span>
            </div>

            {/* Description */}
            <p 
              className="text-lg text-white/80 mb-8 max-w-xl animate-text-reveal"
              style={{ animationDelay: '0.8s' }}
            >
              {currentProject.description}
            </p>

            {/* Tags */}
            <div 
              className="flex flex-wrap gap-2 mb-8 animate-text-reveal"
              style={{ animationDelay: '1s' }}
            >
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onViewProject(currentProject)}
              className="group flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-orange-500/30 animate-text-reveal"
              style={{ animationDelay: '1.2s' }}
            >
              {t('portfolio.viewDetails')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-3">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'w-10 h-3 bg-orange-500 rounded-full' 
                    : 'w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

// Parallax Section Component
const ParallaxSection = ({ children, backgroundImage }) => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setOffset(scrollProgress * 100 - 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="parallax-container py-32 relative">
      <div 
        className="parallax-bg"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${offset * 0.3}px)`
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

// Project Detail Modal
const ProjectDetailModal = ({ project, onClose, isDark, t }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex items-start justify-center animate-lightbox-bg p-4 pt-8 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl my-auto animate-lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 sm:(-top-2 -right-2) w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition-colors z-20"
        >
          <X size={20} />
        </button>

        {/* Modal Content with max height */}
        <div className="max-h-[85vh] overflow-y-auto rounded-2xl">
          {/* Before/After Slider - smaller */}
          <div className="aspect-[2/1] rounded-t-2xl overflow-hidden">
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              title={project.title}
              t={t}
            />
          </div>

          {/* Project Info */}
          <div className={`p-6 ${isDark ? 'bg-slate-900' : 'bg-slate-800'}`}>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 text-orange-400 text-sm mb-1">
                  <Building2 size={16} />
                  {project.category}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-white/70 text-sm">{project.description}</p>
              </div>
            </div>

            {/* Stats Grid - Compact */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-white/50 text-xs mb-1">{t('portfolio.area')}</div>
                <div className="text-white font-bold text-sm">{project.size}</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-white/50 text-xs mb-1">{t('portfolio.budget')}</div>
                <div className="text-white font-bold text-sm">{project.budget}</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-white/50 text-xs mb-1">{t('portfolio.duration')}</div>
                <div className="text-white font-bold text-sm">{project.duration}</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-white/50 text-xs mb-1">{t('portfolio.completed')}</div>
                <div className="text-white font-bold text-sm">{project.year}</div>
              </div>
            </div>

            {/* Testimonial - Compact */}
            {project.testimonial && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 mb-4">
                <p className="text-white/90 text-sm italic mb-3">"{project.testimonial.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                    {project.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{project.testimonial.author}</div>
                    <div className="text-white/50 text-xs">{project.testimonial.role}</div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-full font-bold transition-all transform hover:scale-[1.02] shadow-lg shadow-orange-500/30">
              {t('portfolio.interestedBtn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, onClick, index }) => {
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
      onClick={() => onClick(project)}
      className={`group cursor-pointer transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
        <img
          src={project.afterImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="glass px-3 py-1.5 rounded-full text-white text-sm font-medium">
            {project.category}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
            <MapPin size={14} />
            <span>{project.location}</span>
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-300" />
      </div>
    </div>
  );
};

const PortfolioPage = ({ isDark = false }) => {
  const { t } = useLanguage();
  usePageMeta(t('portfolio.heroTitle'), t('portfolio.heroSubtitle'));
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  // Get translated data
  const categories = t('portfolio.categories');
  const translatedCategories = Array.isArray(categories) ? categories : [];
  const translatedProjects = t('portfolio.projects');
  const projectsList = Array.isArray(translatedProjects) ? translatedProjects : [];

  // Merge static + translated data
  const projects = projectsStatic.map((p, i) => ({
    ...p,
    ...projectsList[i],
  }));

  const featuredProjects = projects.filter(p => p.featured);

  // Filter: index 0 = "All"
  const filteredProjects = selectedCategoryIndex === 0
    ? projects
    : projects.filter(p => p.category === translatedCategories[selectedCategoryIndex]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-900'}`}>
      
      {/* Full-Screen Hero */}
      <FullScreenHero 
        projects={featuredProjects}
        onViewProject={setSelectedProject}
        t={t}
      />

      {/* Stats Parallax Section */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold text-orange-500 mb-2">100+</div>
              <div className="text-white/70">{t('portfolio.stats.projects')}</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-orange-500 mb-2">98%</div>
              <div className="text-white/70">{t('portfolio.stats.satisfaction')}</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-orange-500 mb-2">15+</div>
              <div className="text-white/70">{t('portfolio.stats.experience')}</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-white/70">{t('portfolio.stats.team')}</div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Projects Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('portfolio.section.title')}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {t('portfolio.section.subtitle')}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {translatedCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategoryIndex(idx)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                  selectedCategoryIndex === idx
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                    : 'glass text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('portfolio.cta.title')}
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            {t('portfolio.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl">
              {t('portfolio.cta.consult')}
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-white/10">
              {t('portfolio.cta.catalog')}
            </button>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isDark={isDark}
          t={t}
        />
      )}
    </div>
  );
};

export default PortfolioPage;
