import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import CompanyLogo from '@/components/CompanyLogo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.header.home, href: '#home' },
    { name: "Govt. Schemes", href: '#schemes' },
    { name: t.header.cibil, href: '#cibil' }, // Added CIBIL Link
    { name: t.header.services, href: '#services' },
    { name: t.header.products, href: '#products' },
    { name: t.header.contact, href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="hidden lg:block bg-[#1a3a52] text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-end items-center gap-6">
          <a href={`tel:${t.contact.phoneText.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-[#FFC107] transition-colors">
            <Phone size={14} />
            <span>{t.contact.phoneText}</span>
          </a>
          <a href={`mailto:${t.contact.emailText}`} className="flex items-center gap-2 hover:text-[#FFC107] transition-colors">
            <Mail size={14} />
            <span>{t.contact.emailText}</span>
          </a>
        </div>
      </div>

      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            <CompanyLogo size="medium" />
          </motion.div>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`font-medium transition-colors duration-200 ${
                  link.href === '#schemes' || link.href === '#cibil' 
                    ? 'text-[#FF9500] font-bold' 
                    : 'text-[#1a3a52] hover:text-[#FF9500]'
                }`}
              >
                {link.name}
              </motion.button>
            ))}
            
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-gradient-to-r from-[#FF9500] to-[#FFC107] hover:from-[#FFC107] hover:to-[#FF9500] text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t.header.getQuote}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <LanguageToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1a3a52] p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 bg-white border-t border-gray-100"
            >
              <div className="flex flex-col gap-4 p-4">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    whileTap={{ scale: 0.95 }}
                    className="text-left text-[#1a3a52] hover:text-[#FF9500] font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    {link.name}
                  </motion.button>
                ))}
                <Button
                  onClick={() => scrollToSection('#contact')}
                  className="bg-gradient-to-r from-[#FF9500] to-[#FFC107] hover:from-[#FFC107] hover:to-[#FF9500] text-white font-semibold w-full mt-2"
                >
                  {t.header.getQuote}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;