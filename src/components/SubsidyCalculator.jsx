import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, IndianRupee, Zap, ArrowRight, Sun } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const SubsidyCalculator = () => {
  const [capacity, setCapacity] = useState(3);
  const [type, setType] = useState('ongrid');

  // Calculation Logic (Approximate market rates)
  const baseRatePerKw = 55000; 
  
  const calculateSubsidy = (kw) => {
    if (kw <= 1) return 30000;
    if (kw <= 2) return 60000;
    if (kw <= 3) return 78000;
    return 78000; // Capped at 3kW value
  };

  const calculateGeneration = (kw) => kw * 4 * 300; // ~4 units/day * 300 days
  const calculateSavings = (units) => units * 7.5; // Avg rate ₹7.5/unit

  const totalCost = capacity * baseRatePerKw;
  const subsidy = calculateSubsidy(capacity);
  const netCost = totalCost - subsidy;
  const annualSavings = calculateSavings(calculateGeneration(capacity));
  const paybackYears = (netCost / annualSavings).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-[#1a3a52] p-6 text-white">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Calculator className="w-6 h-6 text-[#FF9500]" />
          Subsidy & Savings Calculator
        </h3>
        <p className="text-blue-200">Estimate your ROI with PM Surya Ghar Yojana</p>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Controls */}
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              System Capacity: <span className="text-2xl font-bold text-[#1a3a52] ml-2">{capacity} kW</span>
            </label>
            <Slider
              value={[capacity]}
              min={1}
              max={10}
              step={1}
              onValueChange={(vals) => setCapacity(vals[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>1 kW</span>
              <span>10 kW</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">System Type</label>
            <div className="flex gap-3">
              {['ongrid', 'hybrid', 'offgrid'].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all capitalize font-medium ${
                    type === t
                      ? 'border-[#FF9500] bg-orange-50 text-[#FF9500]'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-[#1a3a52] mb-2 flex items-center gap-2">
              <Sun className="w-4 h-4 text-[#FF9500]" />
              Impact
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Trees Saved</p>
                <p className="font-bold text-gray-800">{Math.round(capacity * 25)} / year</p>
              </div>
              <div>
                <p className="text-gray-500">CO2 Reduced</p>
                <p className="font-bold text-gray-800">{Math.round(capacity * 1.5)} Tons</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <span className="text-gray-600">Est. Project Cost</span>
            <span className="font-semibold text-gray-900">₹{totalCost.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 bg-green-50 -mx-6 px-6 py-4">
            <span className="text-green-700 font-medium">Government Subsidy</span>
            <span className="font-bold text-green-700">- ₹{subsidy.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold text-[#1a3a52]">Net Cost to You</span>
            <span className="text-2xl font-bold text-[#1a3a52]">₹{netCost.toLocaleString()}</span>
          </div>

          <div className="pt-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase font-semibold">Annual Savings</p>
              <p className="text-xl font-bold text-green-600 mt-1">₹{annualSavings.toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase font-semibold">Payback Period</p>
              <p className="text-xl font-bold text-blue-600 mt-1">{paybackYears} Years</p>
            </div>
          </div>

          <Button className="w-full mt-4 bg-[#FF9500] hover:bg-[#e68600] text-white">
            Get Detailed Quote <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubsidyCalculator;