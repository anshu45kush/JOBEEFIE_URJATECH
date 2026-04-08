import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import CompanyLogo from '@/components/CompanyLogo';

const Footer = () => {
  const { t } = useLanguage();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: t.header.home, href: '#home' },
    { name: t.header.about, href: '#about' },
    { name: t.header.services, href: '#services' },
    { name: t.header.products, href: '#products' },
    { name: t.header.subsidy, href: '#subsidy' },
    { name: t.header.warranty, href: '#warranty' },
    { name: t.header.contact, href: '#contact' }
  ];

  const services = [
    t.contact.types.domestic,
    t.contact.types.commercial,
    t.contact.types.power,
    t.contact.types.agriculture
  ];

  return (
    <footer className="bg-gradient-to-br from-[#1a3a52] to-[#0d1f2f] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 bg-white/90 p-3 rounded-lg inline-block">
              <CompanyLogo size="small" />
            </div>
            <p className="text-white/80 mb-4 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF9500] transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-[#FFC107] transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">{t.footer.services}</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-white/80">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">{t.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FFC107] flex-shrink-0 mt-0.5" />
                <span className="text-white/80">
                  {t.contact.addressText}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#FFC107]" />
                <a href={`tel:${t.contact.phoneText.replace(/\s/g, '')}`} className="text-white/80 hover:text-[#FFC107] transition-colors">
                  {t.contact.phoneText}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FFC107]" />
                <a href={`mailto:${t.contact.emailText}`} className="text-white/80 hover:text-[#FFC107] transition-colors break-all">
                  {t.contact.emailText}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Jobeefie Urjatech. {t.footer.rights}
            </p>
            <p className="text-white/70 text-sm text-center md:text-right">
              {t.common.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;