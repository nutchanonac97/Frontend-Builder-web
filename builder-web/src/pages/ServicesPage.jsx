import React from 'react';
import { Building2, Home, Hotel, Waves, Store, Award, Users, Clock } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'บ้านพักอาศัย',
    description: 'ออกแบบและสร้างบ้านในฝัน ตอบโจทย์ทุกไลฟ์สไตล์ ตั้งแต่บ้านชั้นเดียวไปจนถึงคฤหาสน์หรู',
    features: ['บ้านชั้นเดียว', 'บ้าน 2-3 ชั้น', 'บ้านโมเดิร์น', 'บ้านสไตล์นอร์ดิก'],
    color: 'from-orange-500 to-amber-500'
  },
  {
    icon: Hotel,
    title: 'รีสอร์ท & โรงแรม',
    description: 'สร้างที่พักระดับพรีเมียม ดีไซน์โดดเด่น ตอบโจทย์นักท่องเที่ยวและนักลงทุน',
    features: ['รีสอร์ทภูเขา', 'รีสอร์ทติดทะเล', 'บูติคโฮเทล', 'พูลวิลล่า'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Waves,
    title: 'บ้านลอยน้ำ',
    description: 'นวัตกรรมบ้านลอยน้ำ แข็งแรง ทนทาน ดีไซน์ล้ำสมัย เหมาะกับทุกสภาพน้ำ',
    features: ['บ้านลอยน้ำถาวร', 'แพลอยน้ำ', 'ร้านอาหารลอยน้ำ', 'ท่าเรือส่วนตัว'],
    color: 'from-teal-500 to-emerald-500'
  },
  {
    icon: Store,
    title: 'อาคารพาณิชย์',
    description: 'ออกแบบและก่อสร้างอาคารพาณิชย์ ตึกแถว ออฟฟิศ และโชว์รูม',
    features: ['ตึกแถว', 'อาคารสำนักงาน', 'โชว์รูม', 'โกดังสินค้า'],
    color: 'from-purple-500 to-pink-500'
  }
];

const stats = [
  { icon: Award, value: '50+', label: 'โครงการที่สำเร็จ' },
  { icon: Users, value: '100+', label: 'ลูกค้าที่ไว้วางใจ' },
  { icon: Clock, value: '10+', label: 'ปีประสบการณ์' },
  { icon: Building2, value: '20+', label: 'ทีมช่างมืออาชีพ' }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
            🏠 บริการครบวงจร
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            บริการ<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">ของเรา</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Crystal Bridge พร้อมให้บริการรับสร้างบ้านและอาคารทุกประเภท 
            ด้วยทีมงานมืออาชีพและมาตรฐานคุณภาพระดับพรีเมียม
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-600 to-amber-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            พร้อมเริ่มโปรเจ็คของคุณหรือยัง?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี และใบเสนอราคาเบื้องต้น
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition shadow-xl">
              ขอใบเสนอราคา
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition">
              โทร 083-892-4659
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
