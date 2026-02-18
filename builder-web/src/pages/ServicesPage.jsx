import React, { useState, useEffect, useRef } from 'react';
import { Building2, Home, Hotel, Waves, Store, Hammer, PenTool, ArrowRight, Phone, ChevronDown, Key, Sparkles, Shield, Users, Award, Clock, Check, ArrowDown, Play, Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import usePageMeta from '../hooks/usePageMeta';

// ============ INTERSECTION OBSERVER HOOK ============

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.3, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isInView];
};

// ============ SERVICES STATIC DATA (non-translatable parts) ============

const servicesData = [
  {
    id: 'residential',
    icon: Home,
    gradient: 'from-orange-600 via-amber-500 to-yellow-400',
    bgGradient: 'from-orange-950 via-orange-900 to-slate-950',
    bgImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    stats: { projects: '200+', satisfaction: '100%' },
  },
  {
    id: 'resort',
    icon: Hotel,
    gradient: 'from-blue-600 via-cyan-500 to-teal-400',
    bgGradient: 'from-blue-950 via-slate-900 to-slate-950',
    bgImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80',
    stats: { projects: '50+', satisfaction: '100%' },
  },
  {
    id: 'floating',
    icon: Waves,
    gradient: 'from-teal-600 via-emerald-500 to-green-400',
    bgGradient: 'from-teal-950 via-emerald-950 to-slate-950',
    bgImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&q=80',
    stats: { projects: '30+', satisfaction: '100%' },
  },
  {
    id: 'commercial',
    icon: Store,
    gradient: 'from-purple-600 via-violet-500 to-fuchsia-400',
    bgGradient: 'from-purple-950 via-violet-950 to-slate-950',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    stats: { projects: '150+', satisfaction: '100%' },
  },
  {
    id: 'prefab',
    icon: Building2,
    gradient: 'from-rose-600 via-pink-500 to-red-400',
    bgGradient: 'from-rose-950 via-pink-950 to-slate-950',
    bgImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
    stats: { projects: '100+', satisfaction: '100%' },
  },
];

// ============ STATS DATA ============

const statsIcons = [Building2, Clock, Award, Shield];
const statsValues = ['500+', '15+', '100%', '10'];

// ============ HERO SECTION ============

const HeroSection = ({ onScrollDown, t }) => {
  const [heroRef, heroInView] = useInView();
  const statsKeys = ['projects', 'experience', 'satisfaction', 'warranty'];

  return (
    <section ref={heroRef} className="relative min-h-dvh flex items-center justify-center overflow-hidden snap-start">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-home-with-pool-at-sunset-aerial-view-40019-large.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90" />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${
        heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold mb-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80">
          <Sparkles className="w-4 h-4 text-orange-400" />
          {t('services.hero.badge')}
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 md:mb-8 leading-tight">
          {t('services.hero.title1')}<br/>
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            {t('services.hero.title2')}
          </span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
          {t('services.hero.subtitle')}<br/>
          {t('services.hero.subtitle2')}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto mb-10 md:mb-16">
          {statsValues.map((value, index) => {
            const Icon = statsIcons[index];
            return (
              <div key={index} className="text-center p-3 sm:p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">{value}</div>
                <div className="text-xs sm:text-sm text-white/50">{t(`services.stats.${statsKeys[index]}`)}</div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator - CENTERED */}
        <div className="flex justify-center">
          <button 
            onClick={onScrollDown}
            className="group flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <span className="text-sm font-medium">{t('services.hero.scrollDown')}</span>
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

// ============ SERVICE SECTION ============

const ServiceSection = ({ service, serviceText, index, t }) => {
  const [sectionRef, isInView] = useInView();
  const Icon = service.icon;
  const isEven = index % 2 === 0;

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-dvh flex items-center overflow-hidden snap-start py-20 md:py-0"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={service.bgImage} 
          alt={serviceText.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${
          isEven 
            ? 'from-slate-950/95 via-slate-950/80 to-transparent' 
            : 'from-transparent via-slate-950/80 to-slate-950/95'
        }`} />
        <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-60`} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className={`grid md:grid-cols-2 gap-12 items-center`}>
          
          {/* Text Content - Animate from Left or Right */}
          <div className={`${isEven ? 'md:order-1' : 'md:order-2'} transition-all duration-1000 delay-300 ${
            isInView 
              ? 'opacity-100 translate-x-0' 
              : isEven 
                ? 'opacity-0 -translate-x-20' 
                : 'opacity-0 translate-x-20'
          }`}>
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 bg-gradient-to-r ${service.gradient} text-white shadow-lg`}>
              <Icon className="w-4 h-4" />
              {serviceText.subtitle}
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              {serviceText.title}
            </h2>

            {/* Tagline */}
            <p className={`text-base sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
              {serviceText.tagline}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-lg text-white/70 mb-6 sm:mb-8 leading-relaxed max-w-lg">
              {serviceText.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 mb-8">
              {serviceText.features.map((feature, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm"
                >
                  <Check className="w-4 h-4 text-green-400" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="flex gap-8 mb-8">
              <div>
                <div className="text-3xl font-black text-white">{service.stats.projects}</div>
                <div className="text-sm text-white/50">{t('services.section.projectsCompleted')}</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">{service.stats.satisfaction}</div>
                <div className="text-sm text-white/50">{t('services.section.satisfactionLabel')}</div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className={`group px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r ${service.gradient} text-white font-bold text-sm sm:text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 sm:gap-3`}>
                {t('services.section.viewWork')}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold text-sm sm:text-lg hover:bg-white/20 transition-all flex items-center gap-2 sm:gap-3">
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                {t('services.section.watchVideo')}
              </button>
            </div>
          </div>

          {/* Image Card - Animate from opposite side */}
          <div className={`hidden md:flex ${isEven ? 'md:order-2' : 'md:order-1'} justify-center transition-all duration-1000 delay-500 ${
            isInView 
              ? 'opacity-100 translate-x-0 scale-100' 
              : isEven 
                ? 'opacity-0 translate-x-20 scale-95' 
                : 'opacity-0 -translate-x-20 scale-95'
          }`}>
            <div className="relative">
              {/* Main Image Card */}
              <div className={`w-72 h-96 lg:w-96 lg:h-128 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10`}>
                <img 
                  src={service.bgImage} 
                  alt={serviceText.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent`} />
                
                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3 bg-gradient-to-r ${service.gradient} text-white`}>
                    {t('services.section.latestProject')}
                  </div>
                  <div className="text-white font-bold text-lg">{t('services.section.projectLabel')} {serviceText.title}</div>
                  <div className="text-white/60 text-sm">{t('services.section.location')}</div>
                </div>
              </div>

              {/* Floating Card - Always on outer edge (away from text) */}
              <div className={`absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl bg-white shadow-2xl`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{service.stats.projects}</div>
                    <div className="text-sm text-slate-500">{t('services.section.projectsCompleted')}</div>
                  </div>
                </div>
              </div>

              {/* Play Button Overlay */}
              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all group">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Number */}
      <div className={`absolute bottom-8 ${isEven ? 'left-8' : 'right-8'} text-[5rem] md:text-[10rem] font-black text-white/5 leading-none`}>
        0{index + 1}
      </div>
    </section>
  );
};

// ============ CTA SECTION ============

const CTASection = ({ t }) => {
  const [ctaRef, isInView] = useInView();

  return (
    <section ref={ctaRef} className="relative min-h-dvh flex items-center justify-center overflow-hidden snap-start py-20 md:py-0">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt="CTA Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-amber-500/85 to-orange-600/90" />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold mb-8 bg-white/20 backdrop-blur-sm text-white">
          <Phone className="w-4 h-4" />
          {t('services.cta.badge')}
        </div>
        
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          {t('services.cta.title1')}<br/>{t('services.cta.title2')}
        </h2>

        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          {t('services.cta.subtitle1')}<br/>
          {t('services.cta.subtitle2')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group bg-white text-orange-600 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-orange-50 transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-3">
            {t('services.cta.startProject')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
            <Phone className="w-5 h-5" />
            {t('services.cta.phone')}
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            { icon: Shield, labelKey: 'services.cta.trustWarranty' },
            { icon: Award, labelKey: 'services.cta.trustISO' },
            { icon: Users, labelKey: 'services.cta.trustClients' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-white">
              <badge.icon className="w-6 h-6" />
              <span className="font-medium">{t(badge.labelKey)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ MAIN COMPONENT ============

const ServicesPage = () => {
  const containerRef = useRef(null);
  const { t } = useLanguage();
  usePageMeta(t('services.heroTitle'), t('services.heroSubtitle'));

  // Get translated service items
  const serviceItems = t('services.items');
  const translatedItems = Array.isArray(serviceItems) ? serviceItems : [];

  const scrollToSection = (index) => {
    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll('section');
      if (sections[index]) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-dvh overflow-auto snap-y snap-proximity md:snap-mandatory scrollbar-hide"
      style={{ scrollBehavior: 'smooth' }}
      onScroll={(e) => {
        window.dispatchEvent(new CustomEvent('containerscroll', { detail: { scrollTop: e.target.scrollTop } }));
      }}
    >
      {/* Hero */}
      <HeroSection onScrollDown={() => scrollToSection(1)} t={t} />

      {/* Service Sections */}
      {servicesData.map((service, index) => (
        <ServiceSection 
          key={service.id}
          service={service}
          serviceText={translatedItems[index] || {}}
          index={index}
          t={t}
        />
      ))}

      {/* CTA */}
      <CTASection t={t} />

      {/* Footer Section - Inside snap container */}
      <section className="snap-start bg-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-black text-white">CRYSTAL</span>
                  <span className="font-black text-orange-500">BRIDGE</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t('services.footer.companyDesc')}<br/>
                {t('services.footer.companyDesc2')}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-4">{t('services.footer.contactTitle')}</h4>
              <div className="space-y-2 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>083-892-4659</span>
                </div>
                <div>097-248-1259</div>
                <div>crystalbridge.co.th@gmail.com</div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold text-white mb-4">{t('services.footer.socialTitle')}</h4>
              <div className="space-y-2 text-slate-400 text-sm">
                <div>Facebook: ช่างก้อง ก่อสร้าง</div>
                <div>TikTok: TikTok Official</div>
                <div>Line: @crystalbridge</div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-white mb-4">{t('services.footer.linksTitle')}</h4>
              <div className="space-y-2 text-slate-400 text-sm">
                <div>{t('services.footer.licenseNo')}</div>
                <div>{t('services.footer.regNo')}</div>
              </div>
              <button className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm hover:shadow-lg transition-all">
                {t('services.footer.requestQuote')}
              </button>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-500 text-sm">
            {t('services.footer.copyright')}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
