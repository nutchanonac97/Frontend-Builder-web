import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('ขอบคุณที่ติดต่อเรา! เราจะติดต่อกลับโดยเร็วที่สุด');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
            📞 ติดต่อเรา
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            พร้อมให้<span className="text-orange-600">คำปรึกษา</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            สอบถามข้อมูล ขอใบเสนอราคา หรือนัดพบทีมงาน เราพร้อมให้บริการ
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-8">ข้อมูลติดต่อ</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">โทรศัพท์</h3>
                    <p className="text-slate-600">083-892-4659</p>
                    <p className="text-slate-600">097-248-1259</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">อีเมล</h3>
                    <p className="text-slate-600">crystalbridge.co.th@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Line Official</h3>
                    <p className="text-slate-600">@giftshi.official</p>
                    <p className="text-slate-600">@giftzapyya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">เวลาทำการ</h3>
                    <p className="text-slate-600">จันทร์ - เสาร์: 09:00 - 18:00</p>
                    <p className="text-slate-600">อาทิตย์: นัดหมายล่วงหน้า</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:0838924659" className="flex-1 bg-orange-600 text-white py-4 px-6 rounded-full font-bold text-center hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                  <Phone size={20} />
                  โทรเลย
                </a>
                <a href="https://line.me/ti/p/@giftshi.official" target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 text-white py-4 px-6 rounded-full font-bold text-center hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Line
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">ขอใบเสนอราคา</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อ-นามสกุล *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="กรุณากรอกชื่อของคุณ"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">เบอร์โทรศัพท์ *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="08x-xxx-xxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">อีเมล</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">ประเภทโครงการ</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all bg-white"
                    >
                      <option value="">เลือกประเภท</option>
                      <option value="house">บ้านพักอาศัย</option>
                      <option value="resort">รีสอร์ท/โรงแรม</option>
                      <option value="floating">บ้านลอยน้ำ</option>
                      <option value="commercial">อาคารพาณิชย์</option>
                      <option value="other">อื่นๆ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">งบประมาณ</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all bg-white"
                    >
                      <option value="">เลือกงบประมาณ</option>
                      <option value="under5">ไม่เกิน 5 ล้าน</option>
                      <option value="5-10">5 - 10 ล้าน</option>
                      <option value="10-20">10 - 20 ล้าน</option>
                      <option value="over20">มากกว่า 20 ล้าน</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">รายละเอียดเพิ่มเติม</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
                    placeholder="บอกเล่ารายละเอียดโครงการที่คุณต้องการ..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-4 px-6 rounded-full font-bold hover:from-orange-700 hover:to-amber-600 transition-all transform hover:scale-[1.02] shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  ส่งข้อมูล
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
