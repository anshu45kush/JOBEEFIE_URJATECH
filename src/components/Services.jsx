import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Zap, Sprout, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Home className="w-12 h-12" />,
      title: t.services.domestic.title,
      description: t.services.domestic.description,
      image: 'https://images.unsplash.com/photo-1643035660996-0834db96a85a',
      features: t.services.domestic.features
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      title: t.services.commercial.title,
      description: t.services.commercial.description,
      image: 'https://images.unsplash.com/photo-1623696613585-7319e61a5659',
      features: t.services.commercial.features
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: t.services.power.title,
      description: t.services.power.description,
      image: 'https://images.unsplash.com/photo-1680612436506-34315b370261',
      features: t.services.power.features
    },
    {
      icon: <Sprout className="w-12 h-12" />,
      title: t.services.agriculture.title,
      description: t.services.agriculture.description,
      image: 'https://images.unsplash.com/photo-1589276215887-9f690f8e1b89',
      features: t.services.agriculture.features
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a52] mb-4">
            {t.services.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF9500] to-[#FFC107] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a52]/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-[#FF9500] to-[#FFC107] w-16 h-16 rounded-lg flex items-center justify-center text-white shadow-lg">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#1a3a52] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-[#FF9500] rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-sm font-semibold text-[#1a3a52] text-center">
                      {t.common.ctaSecondary}
                    </p>
                  </div>
                  
                  <a href="tel:+919151368100" className="block">
                    <Button
                      className="w-full bg-gradient-to-r from-[#FF9500] to-[#FFC107] hover:from-[#FFC107] hover:to-[#FF9500] text-white font-semibold rounded-lg transition-all duration-300 group/btn"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {t.common.bookFreeVisit}
                      <ArrowRight className="ml-2 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;