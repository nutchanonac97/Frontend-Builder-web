import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const ContactPage = ({ isDark = false }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const trProjectTypes = t('contact.projectTypes') || [];
  const trBudgetOptions = t('contact.budgetOptions') || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t('contact.submitAlert'));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-900' : 'bg-linear-to-b from-slate-50 to-slate-100'}`}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 ${isDark ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-orange-100 text-orange-800'}`}>
            {t('contact.heroBadge')}
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('contact.heroTitle1')}<span className="text-orange-600">{t('contact.heroTitle2')}</span>
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('contact.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div>
              <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('contact.infoTitle')}</h2>
              
              <div className="space-y-6 mb-10">
                <div className={`flex items-start gap-4 p-4 rounded-xl transition-shadow ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white shadow-sm hover:shadow-md'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('contact.phone')}</h3>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>083-892-4659</p>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>097-248-1259</p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 p-4 rounded-xl transition-shadow ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white shadow-sm hover:shadow-md'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('contact.email')}</h3>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>crystalbridge.co.th@gmail.com</p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 p-4 rounded-xl transition-shadow ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white shadow-sm hover:shadow-md'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('contact.lineOfficial')}</h3>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>@giftshi.official</p>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>@giftzapyya</p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 p-4 rounded-xl transition-shadow ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white shadow-sm hover:shadow-md'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('contact.workingHours')}</h3>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{t('contact.monSat')}</p>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{t('contact.sunday')}</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:0838924659" className="flex-1 bg-orange-600 text-white py-4 px-6 rounded-full font-bold text-center hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                  <Phone size={20} />
                  {t('contact.callNow')}
                </a>
                <a href="https://line.me/ti/p/@giftshi.official" target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 text-white py-4 px-6 rounded-full font-bold text-center hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Line
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`rounded-3xl p-8 shadow-xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('contact.formTitle')}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t('contact.nameLabel')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-orange-500' : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'}`}
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t('contact.phoneLabel')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-orange-500' : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'}`}
                      placeholder="08x-xxx-xxxx"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t('contact.emailLabel')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-orange-500' : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'}`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t('contact.projectTypeLabel')}</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white focus:border-orange-500' : 'bg-white border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'}`}
                    >
                      <option value="">{t('contact.projectTypeDefault')}</option>
                      {trProjectTypes.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t('contact.budgetLabel')}</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-slate-700 border-slate-600 text-white focus:border-orange-500' : 'bg-white border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'}`}
                    >
                      <option value="">{t('contact.budgetDefault')}</option>
                      {trBudgetOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t('contact.detailsLabel')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-orange-500' : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'}`}
                    placeholder={t('contact.detailsPlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-orange-600 to-amber-500 text-white py-4 px-6 rounded-full font-bold hover:from-orange-700 hover:to-amber-600 transition-all transform hover:scale-[1.02] shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  {t('contact.submit')}
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
