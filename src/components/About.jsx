import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Target } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const metrics = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: '1000+',
      label: t.about.metrics.installations,
      description: t.about.metrics.installationsDesc
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: '5+',
      label: t.about.metrics.yearsBusiness,
      description: t.about.metrics.yearsBusinessDesc
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: '98%',
      label: t.about.metrics.satisfaction,
      description: t.about.metrics.satisfactionDesc
    },
    {
      icon: <Target className="w-8 h-8" />,
      number: '100%',
      label: t.about.metrics.quality,
      description: t.about.metrics.qualityDesc
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a52] mb-4">
            {t.about.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF9500] to-[#FFC107] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-[#1a3a52] to-[#2a4a62] rounded-2xl p-8 md:p-12 mb-12 shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-white mb-6">{t.about.missionTitle}</h3>
          <p className="text-lg text-white/90 leading-relaxed mb-6">
            {t.about.missionText1}
          </p>
          <p className="text-lg text-white/90 leading-relaxed">
            {t.about.missionText2}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
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
                {metric.icon}
              </div>
              <div className="text-4xl font-bold text-[#1a3a52] mb-2">
                {metric.number}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {metric.label}
              </div>
              <div className="text-sm text-gray-500">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;