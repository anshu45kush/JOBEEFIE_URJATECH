import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Products = () => {
  const { t } = useLanguage();

  const brands = [
    { name: 'Tata', description: t.products.brands.tata.description },
    { name: 'Adani', description: t.products.brands.adani.description },
    { name: 'Waree', description: t.products.brands.waree.description },
    { name: 'UTL', description: t.products.brands.utl.description },
    { name: 'Loom', description: t.products.brands.loom.description }
  ];

  return (
    <section id="products" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-[#FF9500]" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a52]">
              {t.products.title}
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF9500] to-[#FFC107] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.products.subtitle}
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center justify-center text-center"
            >
              <div className="bg-gradient-to-br from-[#FF9500] to-[#FFC107] w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                {brand.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-[#1a3a52] mb-2">
                {brand.name}
              </h3>
              <p className="text-sm text-gray-600">
                {brand.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quality Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#1a3a52] to-[#2a4a62] rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            {t.products.qualityTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.products.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-6 h-6 text-[#FFC107] flex-shrink-0 mt-0.5" />
                <span className="text-white/90 text-lg">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;