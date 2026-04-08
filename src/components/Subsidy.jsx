import React from 'react';
import { motion } from 'framer-motion';
import { BadgeIndianRupee, Home, Building2, Zap, Sprout, FileCheck, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const Subsidy = () => {
  const { t } = useLanguage();

  const subsidySchemes = [
    {
      icon: <Home className="w-10 h-10" />,
      title: t.subsidy.schemes.domestic.title,
      type: t.subsidy.schemes.domestic.type,
      subsidy: 'Up to 40%',
      details: t.subsidy.schemes.domestic.details,
      eligibility: t.subsidy.schemes.domestic.eligibility,
      capacity: t.subsidy.schemes.domestic.capacity
    },
    {
      icon: <Building2 className="w-10 h-10" />,
      title: t.subsidy.schemes.commercial.title,
      type: t.subsidy.schemes.commercial.type,
      subsidy: 'Up to 20%',
      details: t.subsidy.schemes.commercial.details,
      eligibility: t.subsidy.schemes.commercial.eligibility,
      capacity: t.subsidy.schemes.commercial.capacity
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: t.subsidy.schemes.power.title,
      type: t.subsidy.schemes.power.type,
      subsidy: 'Special Incentives',
      details: t.subsidy.schemes.power.details,
      eligibility: t.subsidy.schemes.power.eligibility,
      capacity: t.subsidy.schemes.power.capacity
    },
    {
      icon: <Sprout className="w-10 h-10" />,
      title: t.subsidy.schemes.agriculture.title,
      type: t.subsidy.schemes.agriculture.type,
      subsidy: 'Up to 60%',
      details: t.subsidy.schemes.agriculture.details,
      eligibility: t.subsidy.schemes.agriculture.eligibility,
      capacity: t.subsidy.schemes.agriculture.capacity
    }
  ];

  const scrollToSchemes = () => {
    document.getElementById('schemes').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="subsidy" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BadgeIndianRupee className="w-8 h-8 text-[#FF9500]" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a52]">
              {t.subsidy.title}
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF9500] to-[#FFC107] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subsidy.subtitle}
          </p>
          <Button onClick={scrollToSchemes} variant="link" className="mt-4 text-[#FF9500] font-bold text-lg">
            View PM Suryaghar Yojana Details <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subsidySchemes.map((scheme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="bg-gradient-to-br from-[#FF9500] to-[#FFC107] w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg">
                  {scheme.icon}
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-lg">
                  {scheme.subsidy}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[#1a3a52] mb-2">
                {scheme.title}
              </h3>
              <p className="text-[#FF9500] font-semibold mb-6">{scheme.type}</p>

              {/* Details */}
              <div className="space-y-3 mb-6">
                {scheme.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <FileCheck className="w-5 h-5 text-[#FF9500] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Eligibility & Capacity */}
              <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <span className="font-semibold text-[#1a3a52]">Eligibility: </span>
                    <span className="text-gray-600">{scheme.eligibility}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#1a3a52]">Capacity: </span>
                    <span className="text-gray-600">{scheme.capacity}</span>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-4 space-y-3">
                <p className="text-sm font-medium text-center text-[#1a3a52] bg-blue-50 p-2 rounded">
                  {t.common.ctaSecondary}
                </p>
                <a href="tel:+919151368100" className="block">
                  <Button
                    className="w-full bg-gradient-to-r from-[#FF9500] to-[#FFC107] hover:from-[#FFC107] hover:to-[#FF9500] text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t.common.bookFreeVisit}
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-gradient-to-br from-[#1a3a52] to-[#2a4a62] rounded-2xl p-8 text-center shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            {t.subsidy.docTitle}
          </h3>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-6">
            {t.subsidy.docText}
          </p>
          <a href="tel:+919151368100">
            <Button className="bg-white text-[#1a3a52] hover:bg-gray-100 font-bold px-8 py-3 rounded-lg shadow-lg">
              {t.common.callNow}
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Subsidy;