import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Clock, Wrench, Zap, TrendingUp, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const Warranty = () => {
  const { t } = useLanguage();

  const warrantyBenefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t.warranty.benefits.coverage.title,
      description: t.warranty.benefits.coverage.desc
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t.warranty.benefits.generation.title,
      description: t.warranty.benefits.generation.desc
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t.warranty.benefits.life.title,
      description: t.warranty.benefits.life.desc
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: t.warranty.benefits.maintenance.title,
      description: t.warranty.benefits.maintenance.desc
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t.warranty.benefits.monitoring.title,
      description: t.warranty.benefits.monitoring.desc
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: t.warranty.benefits.support.title,
      description: t.warranty.benefits.support.desc
    }
  ];

  return (
    <section id="warranty" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-[#FF9500]" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a52]">
              {t.warranty.title}
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF9500] to-[#FFC107] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.warranty.subtitle}
          </p>
        </motion.div>

        {/* Hero Warranty Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#FF9500] via-[#FFC107] to-[#FF9500] rounded-2xl p-1 mb-12 shadow-2xl"
        >
          <div className="bg-white rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="bg-gradient-to-br from-[#FF9500] to-[#FFC107] w-32 h-32 rounded-full flex items-center justify-center shadow-2xl">
                <Shield className="w-16 h-16 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a52] mb-4">
                  {t.warranty.cardTitle}
                </h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  {t.warranty.cardText}
                </p>
                <a href="tel:+919151368100">
                  <Button className="bg-[#1a3a52] hover:bg-[#2a4a62] text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-lg transition-all duration-300">
                    <Phone className="w-5 h-5 mr-2" />
                    {t.common.callNow}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {warrantyBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="bg-gradient-to-br from-[#FF9500] to-[#FFC107] w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4 shadow-lg">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1a3a52] mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Coverage Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#1a3a52] to-[#2a4a62] rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            {t.warranty.detailsTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.warranty.coverageList.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <CheckCircle className="w-6 h-6 text-[#FFC107] flex-shrink-0 mt-0.5" />
                <span className="text-white/90 text-lg">{detail}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              <span className="font-bold text-[#FFC107]">{t.warranty.bonus}</span>
            </p>
            <a href="tel:+919151368100">
              <Button className="bg-[#FF9500] hover:bg-[#FFC107] text-white font-bold px-8 py-2 rounded-lg transition-colors">
                {t.common.bookFreeVisit}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Warranty;