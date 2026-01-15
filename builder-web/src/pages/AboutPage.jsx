import React, { useState, useEffect, useRef } from 'react';
import { Users, Award, Target, Heart, ChevronDown, Linkedin, Mail, Phone, Calendar, Building, TrendingUp, CheckCircle } from 'lucide-react';

// ===== DATA =====
const stats = [
  { value: 10, suffix: '+', label: 'ปีประสบการณ์', icon: Calendar },
  { value: 50, suffix: '+', label: 'โครงการสำเร็จ', icon: Building },
  { value: 100, suffix: '+', label: 'ลูกค้าที่ไว้วางใจ', icon: Heart },
  { value: 20, suffix: '+', label: 'ทีมงานมืออาชีพ', icon: Users },
];

const timeline = [
  {
    year: '2015',
    title: 'ก่อตั้งบริษัท',
    description: 'เริ่มต้นด้วยทีมงาน 5 คน ด้วยความมุ่งมั่นสร้างบ้านคุณภาพ',
    icon: Building,
  },
  {
    year: '2018',
    title: 'ขยายธุรกิจ',
    description: 'เพิ่มทีมงานและขยายบริการครอบคลุมรีสอร์ทและโรงแรม',
    icon: TrendingUp,
  },
  {
    year: '2020',
    title: 'รางวัลคุณภาพ',
    description: 'ได้รับรางวัลผู้รับเหมาดีเด่นจากสมาคมรับสร้างบ้าน',
    icon: Award,
  },
  {
    year: '2023',
    title: 'ครบ 50 โครงการ',
    description: 'ส่งมอบความสุขให้กับลูกค้ากว่า 50 ครอบครัว',
    icon: CheckCircle,
  },
  {
    year: '2025',
    title: 'ก้าวสู่อนาคต',
    description: 'พัฒนาเทคโนโลยีการก่อสร้างและขยายสู่บ้านสำเร็จรูป',
    icon: Target,
  },
];

const values = [
  { 
    icon: Award, 
    title: 'คุณภาพ', 
    description: 'เราใส่ใจทุกรายละเอียด ใช้วัสดุคุณภาพสูงจากแบรนด์ชั้นนำ มาตรฐานการก่อสร้างระดับสากล',
    size: 'large',
    gradient: 'from-amber-500 to-orange-600',
  },
  { 
    icon: Target, 
    title: 'ความแม่นยำ', 
    description: 'ส่งมอบงานตรงเวลา ตามแผนที่กำหนด ควบคุมงบประมาณอย่างมีประสิทธิภาพ',
    size: 'normal',
    gradient: 'from-blue-500 to-cyan-600',
  },
  { 
    icon: Heart, 
    title: 'ความใส่ใจ', 
    description: 'ดูแลลูกค้าอย่างจริงใจ ทั้งก่อนและหลังส่งมอบ',
    size: 'normal',
    gradient: 'from-pink-500 to-rose-600',
  },
  { 
    icon: Users, 
    title: 'ทีมงานมืออาชีพ', 
    description: 'วิศวกรและช่างผู้เชี่ยวชาญกว่า 20 คน พร้อมให้คำปรึกษาและดูแลทุกขั้นตอน',
    size: 'wide',
    gradient: 'from-purple-500 to-violet-600',
  },
];

const team = [
  { 
    name: 'คุณสมชาย ใจดี', 
    role: 'ผู้ก่อตั้ง & CEO', 
    bio: 'ประสบการณ์กว่า 15 ปีในวงการก่อสร้าง บริหารโครงการมากกว่า 100 โครงการ',
    gradient: 'from-orange-500 to-amber-500',
  },
  { 
    name: 'คุณวิศวกร สร้างสรรค์', 
    role: 'หัวหน้าฝ่ายวิศวกรรม', 
    bio: 'วิศวกรโยธา ป.โท จากจุฬาฯ ผู้เชี่ยวชาญด้านโครงสร้างอาคาร',
    gradient: 'from-blue-500 to-cyan-500',
  },
  { 
    name: 'คุณสถาปนิก ดีไซน์', 
    role: 'หัวหน้าฝ่ายออกแบบ', 
    bio: 'สถาปนิกผู้เชี่ยวชาญการออกแบบบ้านสไตล์โมเดิร์นและทรอปิคอล',
    gradient: 'from-purple-500 to-pink-500',
  },
  { 
    name: 'คุณโฟร์แมน มั่นคง', 
    role: 'หัวหน้าฝ่ายก่อสร้าง', 
    bio: 'ประสบการณ์คุมงานก่อสร้างกว่า 20 ปี ดูแลทุกขั้นตอนอย่างละเอียด',
    gradient: 'from-green-500 to-emerald-500',
  },
];

// ===== ANIMATED COUNTER HOOK =====
const useCountUp = (end, duration = 2000, startCounting = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!startCounting) return;
    
    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);
  
  return count;
};

// ===== INTERSECTION OBSERVER HOOK =====
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.3, ...options });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return [ref, isInView];
};

// ===== STAT CARD COMPONENT =====
const StatCard = ({ stat, index, isVisible }) => {
  const count = useCountUp(stat.value, 2000, isVisible);
  const Icon = stat.icon;
  
  return (
    <div 
      className="text-center group"
      style={{ 
        animationDelay: `${index * 0.15}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`
      }}
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-orange-400" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-1">
        {count}{stat.suffix}
      </div>
      <div className="text-white/70 text-sm">{stat.label}</div>
    </div>
  );
};

// ===== TIMELINE ITEM COMPONENT =====
const TimelineItem = ({ item, index, isVisible }) => {
  const isLeft = index % 2 === 0;
  const Icon = item.icon;
  
  return (
    <div 
      className={`flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translateX(0)' 
          : `translateX(${isLeft ? '-50px' : '50px'})`,
        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`
      }}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <div className={`glass-dark p-6 rounded-2xl hover:scale-105 transition-transform duration-300 ${isLeft ? 'md:mr-4' : 'md:ml-4'}`}>
          <div className="text-orange-400 font-bold text-lg mb-2">{item.year}</div>
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-slate-400 text-sm">{item.description}</p>
        </div>
      </div>
      
      {/* Center Icon */}
      <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 items-center justify-center z-10 shadow-lg shadow-orange-500/30 flex-shrink-0">
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      {/* Empty space for other side */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
};

// ===== VALUE CARD COMPONENT =====
const ValueCard = ({ value, index, isVisible, isDark }) => {
  const Icon = value.icon;
  const sizeClasses = {
    large: 'md:col-span-2 md:row-span-2',
    wide: 'md:col-span-2',
    normal: '',
  };
  
  return (
    <div 
      className={`group relative overflow-hidden rounded-3xl p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] ${sizeClasses[value.size]}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
        background: isDark 
          ? 'rgba(15, 23, 42, 0.6)' 
          : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      }}
    >
      {/* Gradient border on hover */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} 
           style={{ padding: '2px', margin: '-2px' }} />
      
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      {/* Content */}
      <h3 className={`text-xl md:text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {value.title}
      </h3>
      <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {value.description}
      </p>
      
      {/* Decorative element */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${value.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
    </div>
  );
};

// ===== TEAM CARD COMPONENT (3D FLIP) =====
const TeamCard = ({ member, index, isVisible, isDark }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="perspective-1000 h-80"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className="relative w-full h-full transition-transform duration-700"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${member.gradient} p-1`}>
            <div className={`w-full h-full rounded-3xl flex flex-col items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
              {/* Avatar placeholder */}
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-4`}>
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {member.name}
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {member.role}
              </p>
              <div className="mt-4 text-xs text-orange-500 font-medium">
                Hover เพื่อดูรายละเอียด →
              </div>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div 
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${member.gradient} p-6 flex flex-col justify-between`}>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-white/80 text-sm mb-4">{member.role}</p>
              <p className="text-white/90 text-sm leading-relaxed">{member.bio}</p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <Mail className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <Phone className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== MAIN COMPONENT =====
const AboutPage = ({ isDark = false }) => {
  const [heroRef, heroInView] = useInView();
  const [timelineRef, timelineInView] = useInView();
  const [valuesRef, valuesInView] = useInView();
  const [teamRef, teamInView] = useInView();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-b from-slate-50 to-slate-100'}`}>
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Ken Burns */}
        <div 
          className="absolute inset-0 animate-ken-burns-pan"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${parallaxOffset * 0.5}px)`,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/90" />
        
        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        
        {/* Content */}
        <div ref={heroRef} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <div 
            className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-8 bg-orange-500/20 text-orange-400 border border-orange-500/30 backdrop-blur-sm"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out'
            }}
          >
            🏢 เกี่ยวกับเรา
          </div>
          
          {/* Title */}
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.2s'
            }}
          >
            บริษัท <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">คริสตัล บริดจ์</span> จำกัด
          </h1>
          
          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.4s'
            }}
          >
            ผู้เชี่ยวชาญด้านการรับสร้างบ้านและอาคารมากว่า 10 ปี ด้วยทีมงานวิศวกรและสถาปนิกที่มีประสบการณ์ 
            พร้อมช่างฝีมือระดับมืออาชีพ มุ่งมั่นสร้างสรรค์ที่อยู่อาศัยที่ตอบโจทย์ทุกความต้องการ
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} isVisible={heroInView} />
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">เลื่อนลง</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* ===== TIMELINE SECTION ===== */}
      <section ref={timelineRef} className={`py-24 px-6 relative overflow-hidden ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-0 left-1/2 w-px h-full ${isDark ? 'bg-gradient-to-b from-transparent via-orange-500/50 to-transparent' : 'bg-gradient-to-b from-transparent via-orange-300 to-transparent'}`} />
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 
              className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{
                opacity: timelineInView ? 1 : 0,
                transform: timelineInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out'
              }}
            >
              เส้นทางของเรา
            </h2>
            <p 
              className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
              style={{
                opacity: timelineInView ? 1 : 0,
                transform: timelineInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.1s'
              }}
            >
              การเดินทางกว่า 10 ปีที่เราสั่งสมประสบการณ์และสร้างความไว้วางใจ
            </p>
          </div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <TimelineItem 
                key={index} 
                item={item} 
                index={index} 
                isVisible={timelineInView} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES SECTION (BENTO GRID) ===== */}
      <section ref={valuesRef} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{
                opacity: valuesInView ? 1 : 0,
                transform: valuesInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out'
              }}
            >
              ค่านิยมของเรา
            </h2>
            <p 
              className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
              style={{
                opacity: valuesInView ? 1 : 0,
                transform: valuesInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.1s'
              }}
            >
              สิ่งที่เรายึดถือและปฏิบัติในการทำงานทุกโครงการ
            </p>
          </div>
          
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ValueCard 
                key={index} 
                value={value} 
                index={index} 
                isVisible={valuesInView}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION (3D FLIP CARDS) ===== */}
      <section ref={teamRef} className={`py-24 px-6 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{
                opacity: teamInView ? 1 : 0,
                transform: teamInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out'
              }}
            >
              ทีมงานของเรา
            </h2>
            <p 
              className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
              style={{
                opacity: teamInView ? 1 : 0,
                transform: teamInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.1s'
              }}
            >
              ผู้เชี่ยวชาญที่พร้อมดูแลโครงการของคุณ
            </p>
          </div>
          
          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <TeamCard 
                key={index} 
                member={member} 
                index={index} 
                isVisible={teamInView}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION (PARALLAX) ===== */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${(parallaxOffset - 2000) * 0.2}px)`,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/80" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-orange-500/30 rounded-full animate-float" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border border-amber-500/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            พร้อมที่จะร่วมงานกับเราหรือยัง?
          </h2>
          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            ติดต่อเราเพื่อรับคำปรึกษาฟรี ไม่มีค่าใช้จ่าย เราพร้อมสร้างบ้านในฝันของคุณให้เป็นจริง
          </p>
          <button className="group relative bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-12 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl shadow-orange-500/40 animate-pulse-glow">
            <span className="relative z-10 flex items-center gap-2">
              ติดต่อเรา
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
