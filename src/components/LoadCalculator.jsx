import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Sun, Zap, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const LoadCalculator = () => {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState({
    fans: 2,
    lights: 4,
    ac: 0,
    fridge: 1,
    pumps: 0,
    hours: 8
  });

  const [results, setResults] = useState({
    dailyKWh: 0,
    recommendedKw: 0,
    panels: 0
  });

  // Wattage constants
  const WATTS = {
    fans: 70,
    lights: 10,
    ac: 1500,
    fridge: 200,
    pumps: 750
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const val = parseInt(value) || 0;
    setInputs(prev => ({
      ...prev,
      [name]: Math.max(0, val) // Ensure positive numbers
    }));
  };

  useEffect(() => {
    // Calculate total connected load in Watts
    const totalWatts = 
      (inputs.fans * WATTS.fans) + 
      (inputs.lights * WATTS.lights) + 
      (inputs.ac * WATTS.ac) + 
      (inputs.fridge * WATTS.fridge) + 
      (inputs.pumps * WATTS.pumps);

    // Calculate Daily Consumption in kWh (Units)
    // Daily Consumption = (Total Watts * Usage Hours) / 1000
    const dailyKWh = (totalWatts * inputs.hours) / 1000;

    // Recommended System Size
    // Rule of thumb: System Size (kW) = Daily Consumption (kWh) / 4 (Avg peak sun hours)
    const recommendedKw = dailyKWh / 4;

    // Number of 400W Panels
    // Panels = (System Size kW * 1000) / 400
    const panels = Math.ceil((recommendedKw * 1000) / 400);

    setResults({
      dailyKWh: dailyKWh.toFixed(2),
      recommendedKw: recommendedKw.toFixed(2),
      panels: panels
    });
  }, [inputs]);

  const inputFields = [
    { name: 'fans', label: t.tools.loadCalculator.inputs.fans, icon: '💨' },
    { name: 'lights', label: t.tools.loadCalculator.inputs.lights, icon: '💡' },
    { name: 'ac', label: t.tools.loadCalculator.inputs.ac, icon: '❄️' },
    { name: 'fridge', label: t.tools.loadCalculator.inputs.fridge, icon: '🧊' },
    { name: 'pumps', label: t.tools.loadCalculator.inputs.pumps, icon: '💧' },
    { name: 'hours', label: t.tools.loadCalculator.inputs.hours, icon: '⏱️' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100 h-full flex flex-col">
      <div className="bg-gradient-to-r from-[#FF9500] to-[#FFC107] p-4 md:p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-6 h-6" />
          <h3 className="text-xl md:text-2xl font-bold">{t.tools.loadCalculator.title}</h3>
        </div>
        <p className="text-white/95 font-medium text-sm">
          {t.tools.loadCalculator.description}
        </p>
      </div>

      <div className="p-4 md:p-6 flex flex-col flex-grow">
        {/* Responsive Grid for Inputs - Vertical on Mobile, 2 Cols on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {inputFields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm md:text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-lg">{field.icon}</span>
                {field.label}
              </label>
              <input
                type="number"
                name={field.name}
                value={inputs[field.name]}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FF9500] focus:ring-0 transition-all outline-none bg-white text-gray-900 font-bold text-lg shadow-sm placeholder-gray-500"
              />
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={results.recommendedKw}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-5 md:p-6 border-2 border-orange-200 shadow-md"
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-orange-200 pb-3 gap-2">
                  <span className="text-gray-900 font-bold text-sm md:text-base">{t.tools.loadCalculator.results.totalPower}</span>
                  <span className="text-xl md:text-2xl font-extrabold text-[#1a3a52]">{results.dailyKWh} kWh</span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-orange-200 pb-3 gap-2">
                  <span className="text-gray-900 font-bold text-sm md:text-base">{t.tools.loadCalculator.results.capacity}</span>
                  <div className="flex items-center gap-2 text-[#FF9500]">
                    <Zap className="w-5 h-5 fill-current" />
                    <span className="text-2xl md:text-3xl font-extrabold">{results.recommendedKw} kW</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="text-gray-900 font-bold text-sm md:text-base">{t.tools.loadCalculator.results.panels}</span>
                  <div className="flex items-center gap-2 text-[#1a3a52]">
                    <Sun className="w-6 h-6 stroke-[3px]" />
                    <span className="text-2xl md:text-3xl font-extrabold">{results.panels}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <a href="tel:+919151368100" className="block mt-6">
            <Button className="w-full bg-[#1a3a52] hover:bg-[#2a4a62] text-white font-bold text-lg py-6 md:py-7 rounded-xl shadow-lg transition-all group">
              <Phone className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t.common.callNow}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoadCalculator;