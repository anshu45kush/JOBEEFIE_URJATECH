import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { visualizerConstants, componentDetails } from '@/data/visualizerData';
import OnGridSystemDiagram from './OnGridSystemDiagram';
import OffGridSystemDiagram from './OffGridSystemDiagram';
import HybridSystemDiagram from './HybridSystemDiagram';
import SystemControlPanel from './SystemControlPanel';
import ComponentDetailsModal from './ComponentDetailsModal';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const SolarSystemVisualizer = ({ defaultSystem = 'ongrid' }) => {
  const { t } = useLanguage();
  const [activeSystem, setActiveSystem] = useState(defaultSystem);
  const [activeScenarioId, setActiveScenarioId] = useState('sunny');
  const [selectedComponent, setSelectedComponent] = useState(null);

  const currentScenarioData = visualizerConstants.scenarios[activeScenarioId];

  // Helper to update scenario
  const handleScenarioChange = (id) => {
    setActiveScenarioId(id);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-[#1a3a52] text-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              Interactive System Visualizer
            </h3>
            <p className="text-blue-200 text-sm mt-1">
              Select a system type and simulate different weather conditions to see how it works.
            </p>
          </div>
          
          {/* System Tabs */}
          <div className="bg-black/20 p-1 rounded-xl flex gap-1">
             {['ongrid', 'offgrid', 'hybrid'].map(sys => (
               <button
                 key={sys}
                 onClick={() => setActiveSystem(sys)}
                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all capitalize ${
                   activeSystem === sys 
                     ? 'bg-white text-[#1a3a52] shadow-sm' 
                     : 'text-white/70 hover:text-white hover:bg-white/10'
                 }`}
               >
                 {sys.replace('grid', '-Grid')}
               </button>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Main Visualization Area */}
        <div className="lg:col-span-2 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50/50">
           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
              <span className="font-bold text-gray-700">Current View: <span className="text-[#FF9500] uppercase ml-1">{activeSystem} System</span></span>
              <span className="text-xs text-gray-400">Click components for details</span>
           </div>

           <div className="relative">
              {activeSystem === 'ongrid' && (
                <OnGridSystemDiagram 
                  scenario={currentScenarioData} 
                  onComponentClick={setSelectedComponent} 
                />
              )}
              {activeSystem === 'offgrid' && (
                <OffGridSystemDiagram 
                  scenario={currentScenarioData} 
                  onComponentClick={setSelectedComponent} 
                />
              )}
              {activeSystem === 'hybrid' && (
                <HybridSystemDiagram 
                  scenario={currentScenarioData} 
                  onComponentClick={setSelectedComponent} 
                />
              )}
           </div>

           {/* Quick Explanation */}
           <div className="mt-6 p-4 bg-blue-50 text-blue-800 text-sm rounded-lg border border-blue-100 leading-relaxed">
             <strong>System Status:</strong> {
                activeSystem === 'ongrid' && activeScenarioId === 'outage' 
                  ? "System is OFF due to safety regulations during grid outage."
                  : activeScenarioId === 'night' 
                    ? "Running on Grid/Battery. Solar generation is 0."
                    : "System operating normally. Converting solar energy to power."
             }
           </div>
        </div>

        {/* Controls Sidebar */}
        <div className="lg:col-span-1 p-6 md:p-8 bg-white">
           <SystemControlPanel 
              scenario={{ id: activeScenarioId, data: currentScenarioData }} 
              setScenario={handleScenarioChange}
              activeSystem={activeSystem}
           />
           
           <div className="mt-8 pt-8 border-t border-gray-100">
             <h4 className="font-bold text-gray-800 mb-4">Why choose {activeSystem.replace('grid', '-Grid')}?</h4>
             <ul className="space-y-3 text-sm text-gray-600">
               {activeSystem === 'ongrid' && (
                 <>
                   <li className="flex gap-2"><span className="text-green-500">✔</span> Lowest upfront cost</li>
                   <li className="flex gap-2"><span className="text-green-500">✔</span> Highest ROI with Net Metering</li>
                   <li className="flex gap-2"><span className="text-red-500">✖</span> No power during outages</li>
                 </>
               )}
               {activeSystem === 'offgrid' && (
                 <>
                   <li className="flex gap-2"><span className="text-green-500">✔</span> 100% Energy Independence</li>
                   <li className="flex gap-2"><span className="text-green-500">✔</span> Works where grid is absent</li>
                   <li className="flex gap-2"><span className="text-red-500">✖</span> Expensive batteries required</li>
                 </>
               )}
               {activeSystem === 'hybrid' && (
                 <>
                   <li className="flex gap-2"><span className="text-green-500">✔</span> Best of both worlds</li>
                   <li className="flex gap-2"><span className="text-green-500">✔</span> Power security + Savings</li>
                   <li className="flex gap-2"><span className="text-red-500">✖</span> Most expensive system type</li>
                 </>
               )}
             </ul>
             
             <Button className="w-full mt-6 bg-[#FF9500] hover:bg-[#e68600] text-white">
               Get {activeSystem.replace('grid', '-Grid')} Quote
             </Button>
           </div>
        </div>
      </div>

      {/* Component Modal */}
      <ComponentDetailsModal 
        component={selectedComponent ? componentDetails[selectedComponent] : null} 
        onClose={() => setSelectedComponent(null)} 
      />
    </div>
  );
};

export default SolarSystemVisualizer;