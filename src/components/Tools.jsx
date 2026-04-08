import React from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LoadCalculator from '@/components/LoadCalculator';
import BillGenerator from '@/components/BillGenerator';

const Tools = () => {
  const { t } = useLanguage();

  return (
    <section id="tools" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF9500] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1a3a52] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="w-8 h-8 text-[#FF9500]" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a52]">
              {t.tools.title}
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF9500] to-[#FFC107] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.tools.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-full"
          >
            <LoadCalculator />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full"
          >
            <BillGenerator />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Tools;