import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, IndianRupee, TrendingUp, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const BillGenerator = () => {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState({
    bill: 5000,
    units: 600,
    rate: 8.5
  });

  const [results, setResults] = useState({
    annualCost: 0,
    annualSavings: 0,
    systemCost: 0,
    payback: 0,
    projection: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const val = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [name]: Math.max(0, val)
    }));
  };

  useEffect(() => {
    // Annual Cost
    const annualCost = inputs.bill * 12;

    // Potential Annual Savings (Assuming 80% reduction)
    const annualSavings = annualCost * 0.80;

    // Required System Size (Approx: 1kW generates ~120 units/month)
    const requiredKw = inputs.units / 120;

    // System Cost (Approx 1 Lakh per kW for domestic)
    const systemCost = requiredKw * 100000;

    // Payback Period (Years)
    const payback = systemCost / (annualSavings || 1);

    // 25-Year Savings Projection
    const projection = annualSavings * 25;

    setResults({
      annualCost: Math.round(annualCost),
      annualSavings: Math.round(annualSavings),
      systemCost: Math.round(systemCost),
      payback: payback.toFixed(1),
      projection: Math.round(projection)
    });
  }, [inputs]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100 h-full flex flex-col">
      <div className="bg-gradient-to-r from-[#1a3a52] to-[#2a4a62] p-4 md:p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <IndianRupee className="w-6 h-6" />
          <h3 className="text-xl md:text-2xl font-bold">{t.tools.billGenerator.title}</h3>
        </div>
        <p className="text-white/95 font-medium text-sm">
          {t.tools.billGenerator.description}
        </p>
      </div>

      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <div className="space-y-6 mb-8">
          <div>
            <label className="text-sm md:text-base font-bold text-gray-900 mb-2 block">
              {t.tools.billGenerator.inputs.bill}
            </label>
            <input
              type="number"
              name="bill"
              value={inputs.bill}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1a3a52] focus:ring-0 transition-all outline-none bg-white text-gray-900 font-bold text-lg shadow-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="text-sm md:text-base font-bold text-gray-900 mb-2 block">
                {t.tools.billGenerator.inputs.units}
              </label>
              <input
                type="number"
                name="units"
                value={inputs.units}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1a3a52] focus:ring-0 transition-all outline-none bg-white text-gray-900 font-bold text-lg shadow-sm"
              />
            </div>
            <div>
              <label className="text-sm md:text-base font-bold text-gray-900 mb-2 block">
                {t.tools.billGenerator.inputs.rate}
              </label>
              <input
                type="number"
                name="rate"
                value={inputs.rate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1a3a52] focus:ring-0 transition-all outline-none bg-white text-gray-900 font-bold text-lg shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={results.annualSavings}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-5 md:p-6 border-2 border-green-200 shadow-md"
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-green-200 pb-3 gap-2">
                  <span className="text-gray-900 font-bold text-sm md:text-base">{t.tools.billGenerator.results.annualCost}</span>
                  <span className="text-lg md:text-xl font-bold text-gray-500 line-through decoration-red-500 decoration-2">
                    {formatCurrency(results.annualCost)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-green-200 pb-3 gap-2">
                  <span className="text-gray-900 font-bold text-sm md:text-base">{t.tools.billGenerator.results.savings}</span>
                  <div className="flex items-center gap-2 text-green-700">
                    <TrendingUp className="w-6 h-6 stroke-[3px]" />
                    <span className="text-xl md:text-2xl font-extrabold">{formatCurrency(results.annualSavings)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/80 p-3 rounded-lg shadow-sm border border-green-100">
                    <div className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">{t.tools.billGenerator.results.payback}</div>
                    <div className="font-extrabold text-xl text-[#1a3a52]">{results.payback} Years</div>
                  </div>
                  <div className="bg-white/80 p-3 rounded-lg shadow-sm border border-green-100">
                    <div className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">{t.tools.billGenerator.results.projection}</div>
                    <div className="font-extrabold text-xl text-green-700">{formatCurrency(results.projection)}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <a href="tel:+919151368100" className="block mt-6">
            <Button className="w-full bg-[#FF9500] hover:bg-[#FFC107] text-white font-bold text-lg py-6 md:py-7 rounded-xl shadow-lg transition-all group">
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

export default BillGenerator;