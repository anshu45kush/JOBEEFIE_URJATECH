import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Tag, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const ComponentDetailsModal = ({ component, onClose }) => {
  const { language } = useLanguage();
  if (!component) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative z-10"
        >
          {/* Header */}
          <div className="bg-[#1a3a52] p-6 text-white flex justify-between items-start">
            <div>
              <div className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">System Component</div>
              <h3 className="text-2xl font-bold">{component.title[language]}</h3>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              {component.desc[language]}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h4 className="flex items-center gap-2 font-bold text-[#1a3a52] mb-2 text-sm">
                  <Tag className="w-4 h-4" /> Specs
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {component.specs.map((s, i) => <li key={i}>• {s}</li>)}
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <h4 className="flex items-center gap-2 font-bold text-[#1a3a52] mb-2 text-sm">
                  <Wrench className="w-4 h-4" /> Cost Est.
                </h4>
                <p className="text-green-700 font-bold text-sm">{component.cost}</p>
              </div>
            </div>
            
            <div className="pt-2">
               <Button onClick={() => {
                  onClose();
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
               }} className="w-full bg-[#FF9500] hover:bg-[#e68600] text-white">
                  View Products <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ComponentDetailsModal;