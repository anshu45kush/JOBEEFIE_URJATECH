import React from 'react';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-[#1a3a52] hover:text-[#FF9500] hover:bg-gray-100/50 rounded-lg transition-all duration-300"
      aria-label="Switch Language"
    >
      <Languages className="w-5 h-5" />
      <span className="font-bold w-6">
        {language === 'en' ? 'EN' : 'HI'}
      </span>
    </Button>
  );
};

export default LanguageToggle;