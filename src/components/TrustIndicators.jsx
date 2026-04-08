import React from 'react';
import { motion } from 'framer-motion';
import { Users, Sun, Star, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const TrustIndicators = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: "5,000+",
      label: t.trust.customers,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      icon: Sun,
      value: "4,800+",
      label: t.trust.installations,
      color: "text-orange-600",
      bg: "bg-orange-100"
    },
    {
      icon: Star,
      value: "4.8/5",
      label: t.trust.rating,
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    },
    {
      icon: Clock,
      value: "8+",
      label: t.trust.years,
      color: "text-green-600",
      bg: "bg-green-100"
    }
  ];

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </h3>
              <p className="text-gray-600 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;