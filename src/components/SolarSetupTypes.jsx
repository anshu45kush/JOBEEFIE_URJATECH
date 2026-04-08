import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Battery, Combine, ArrowRight, CheckCircle2, AlertCircle, IndianRupee, Clock, PlayCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import ComparisonTable from '@/components/ComparisonTable';
import SetupSelector from '@/components/SetupSelector';
import SolarSystemVisualizer from './SolarSystemVisualizer'; // New Import

const SolarSetupTypes = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('ongrid');
  const [showVisualizer, setShowVisualizer] = useState(false);

  const types = {
    ongrid: { icon: Zap, color: 'text-[#FF9500]', bg: 'bg-[#FF9500]/10', border: 'border-[#FF9500]' },
    offgrid: { icon: Battery, color: 'text-[#2196F3]', bg: 'bg-[#2196F3]/10', border: 'border-[#2196F3]' },
    hybrid: { icon: Combine, color: 'text-[#4CAF50]', bg: 'bg-[#4CAF50]/10', border: 'border-[#4CAF50]' }
  };

  const currentData = t.solarSetups[activeTab];

  return (
    <section id="systems" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a52] mb-4">
            {t.solarSetups.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF9500] to-[#FFC107] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.solarSetups.subtitle}
          </p>
        </motion.div>

        {/* Visualizer Toggle Section - New */}
        <div className="mb-12">
           {!showVisualizer ? (
             <div className="bg-[#1a3a52] rounded-2xl p-8 text-center text-white shadow-xl relative overflow-hidden group cursor-pointer" onClick={() => setShowVisualizer(true)}>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
                <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-2">How Does Solar Work?</h3>
                   <p className="text-blue-100 mb-6 max-w-lg mx-auto">Launch our interactive system simulator to see exactly how energy flows in different setups.</p>
                   <Button className="bg-[#FF9500] hover:bg-[#e68600] text-white px-8 py-6 text-lg rounded-full shadow-lg group-hover:shadow-[#FF9500]/50 transition-all">
                      <PlayCircle className="w-6 h-6 mr-2" /> Launch Visualizer
                   </Button>
                </div>
             </div>
           ) : (
             <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <SolarSystemVisualizer defaultSystem={activeTab} />
                <div className="text-center mt-4">
                   <button onClick={() => setShowVisualizer(false)} className="text-gray-500 hover:text-gray-800 text-sm underline">Close Visualizer</button>
                </div>
             </motion.div>
           )}
        </div>

        {/* Content Layout: 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          
          {/* Left Column: Interactive Selector & Tabs */}
          <div className="lg:col-span-4 space-y-8">
            {/* Setup Selector Quiz */}
            <SetupSelector />

            {/* Manual Tabs (Visible on Desktop mainly, acts as nav) */}
            <div className="bg-white rounded-2xl p-2 shadow-md border border-gray-100">
              <div className="flex flex-col gap-2">
                {Object.keys(types).map((type) => {
                  const Icon = types[type].icon;
                  const isActive = activeTab === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setActiveTab(type)}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? `${types[type].bg} ${types[type].color} ring-2 ring-inset ring-opacity-50 ring-current` 
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? types[type].color : 'text-gray-400'}`} />
                      <span className="font-bold text-lg">{t.solarSetups[type].title}</span>
                      {isActive && <ArrowRight className="w-5 h-5 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Card Display */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-3xl shadow-xl border-2 ${types[activeTab].border} p-6 md:p-10 overflow-hidden relative`}
              >
                {/* Background Decoration */}
                <div className={`absolute top-0 right-0 w-64 h-64 ${types[activeTab].bg} rounded-full blur-3xl -mr-32 -mt-32 opacity-50`}></div>

                {/* Header */}
                <div className="relative mb-8">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${types[activeTab].bg} ${types[activeTab].color} font-bold mb-4`}>
                    {React.createElement(types[activeTab].icon, { className: "w-5 h-5" })}
                    <span className="uppercase tracking-wider text-sm">System Type</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#1a3a52] mb-4">
                    {currentData.title}
                  </h3>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {currentData.description}
                  </p>
                </div>

                {/* How it Works & Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h4 className="font-bold text-[#1a3a52] mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#FF9500]" />
                      How it Works
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {currentData.howItWorks}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-xl p-4 flex items-center gap-4 border border-green-100">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <IndianRupee className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs text-green-600 font-bold uppercase">Savings</div>
                        <div className="text-xl font-bold text-[#1a3a52]">{currentData.savings}</div>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-4 border border-blue-100">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-600 font-bold uppercase">Payback Period</div>
                        <div className="text-xl font-bold text-[#1a3a52]">{currentData.payback}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lists Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Benefits */}
                  <div>
                    <h4 className="font-bold text-[#1a3a52] mb-4 flex items-center gap-2 text-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Benefits
                    </h4>
                    <ul className="space-y-3">
                      {currentData.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Drawbacks & Components */}
                  <div className="space-y-8">
                     <div>
                      <h4 className="font-bold text-[#1a3a52] mb-4 flex items-center gap-2 text-lg">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        Things to Consider
                      </h4>
                      <ul className="space-y-3">
                        {currentData.drawbacks.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Components Tag Cloud */}
                <div className="border-t border-gray-100 pt-6">
                   <h4 className="text-sm font-bold text-gray-400 uppercase mb-3">Key Components</h4>
                   <div className="flex flex-wrap gap-2">
                      {currentData.components.map((comp, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {comp}
                        </span>
                      ))}
                   </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="max-w-5xl mx-auto">
          <ComparisonTable />
        </div>

      </div>
    </section>
  );
};

export default SolarSetupTypes;