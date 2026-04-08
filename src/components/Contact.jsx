import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.projectType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Add company location reference to the submission data
    const submissionData = {
      ...formData,
      locationReference: "Jobeefie Urjatech - Amity Incubator Space, New Amity University Lucknow Campus"
    };

    console.log("Form submitted with location:", submissionData);

    // Success toast
    toast({
      title: t.contact.form.success,
      description: t.contact.form.successDesc,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: t.contact.phoneLabel,
      details: t.contact.phoneText,
      action: `tel:${t.contact.phoneText.replace(/\s/g, '')}`
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t.contact.emailLabel,
      details: t.contact.emailText,
      action: `mailto:${t.contact.emailText}`
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t.contact.addressLabel,
      details: t.contact.addressText,
      action: null
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a52] mb-4">
            {t.contact.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF9500] to-[#FFC107] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#FF9500] via-[#FFC107] to-[#FF9500] rounded-2xl p-8 md:p-12 text-center mb-12 shadow-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.contact.ctaTitle}
          </h3>
          <p className="text-xl text-white/90 mb-6">
            {t.contact.ctaSubtitle}
          </p>
          <a href={`tel:${t.contact.phoneText.replace(/\s/g, '')}`}>
            <Button className="bg-white text-[#FF9500] hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <Phone className="mr-2" />
              {t.common.ctaMain}
            </Button>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-[#1a3a52] mb-8">
              {t.contact.infoTitle}
            </h3>

            {/* Contact Cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-[#FF9500] to-[#FFC107] w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">{info.title}</div>
                      {info.action ? (
                        <a
                          href={info.action}
                          className="text-[#1a3a52] font-bold text-lg hover:text-[#FF9500] transition-colors break-all"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <div className="text-[#1a3a52] font-bold text-lg">{info.details}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-[#1a3a52] to-[#2a4a62] rounded-xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#FFC107]" />
                <h4 className="text-xl font-bold text-white">{t.contact.hoursTitle}</h4>
              </div>
              <div className="space-y-2 text-white/90">
                <div className="flex justify-between">
                  <span>Monday - Saturday:</span>
                  <span className="font-semibold">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">10:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100"
          >
            <h3 className="text-3xl font-bold text-[#1a3a52] mb-6">
              {t.contact.formTitle}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.contact.form.name} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF9500] focus:border-transparent transition-all bg-white text-gray-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.contact.form.email} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF9500] focus:border-transparent transition-all bg-white text-gray-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.contact.form.phone} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF9500] focus:border-transparent transition-all bg-white text-gray-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.contact.form.projectType} *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF9500] focus:border-transparent transition-all bg-white text-gray-900"
                  required
                >
                  <option value="">{t.contact.form.selectType}</option>
                  <option value="domestic">{t.contact.types.domestic}</option>
                  <option value="commercial">{t.contact.types.commercial}</option>
                  <option value="power">{t.contact.types.power}</option>
                  <option value="agriculture">{t.contact.types.agriculture}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF9500] focus:border-transparent transition-all resize-none bg-white text-gray-900"
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FF9500] to-[#FFC107] hover:from-[#FFC107] hover:to-[#FF9500] text-white font-bold text-lg py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Send className="mr-2" />
                {t.contact.form.submit}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;