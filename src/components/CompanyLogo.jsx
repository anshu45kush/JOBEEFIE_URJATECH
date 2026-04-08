import React from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const CompanyLogo = ({ size = 'medium', className = '' }) => {
  const { t } = useLanguage();
  
  const sizes = {
    small: {
      icon: 'w-6 h-6',
      title: 'text-xl',
      tagline: 'text-[10px]'
    },
    medium: {
      icon: 'w-8 h-8',
      title: 'text-2xl',
      tagline: 'text-xs'
    },
    large: {
      icon: 'w-12 h-12',
      title: 'text-4xl',
      tagline: 'text-sm'
    }
  };

  const currentSize = sizes[size] || sizes.medium;

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <motion.div
        whileHover={{ rotate: 180 }}
        transition={{ duration: 1 }}
        className="mt-1"
      >
        <Sun className={`${currentSize.icon} text-[#FF9500] fill-[#FF9500]`} />
      </motion.div>
      <div className="flex flex-col">
        <h1 className={`${currentSize.title} font-bold text-[#1a3a52] leading-none tracking-tight`}>
          Jobeefie <span className="text-[#1a3a52]">UrjaTech</span>
        </h1>
        <span className={`${currentSize.tagline} text-gray-600 font-medium mt-1`}>
          {t.common.tagline}
        </span>
      </div>
    </div>
  );
};

export default CompanyLogo;