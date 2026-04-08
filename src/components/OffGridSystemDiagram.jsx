import React from 'react';
import { Sun, Home, Zap, BatteryCharging } from 'lucide-react'; 
import { motion } from 'framer-motion';
import PowerFlowAnimation from './PowerFlowAnimation';
import BatteryIndicator from './BatteryIndicator';
import { visualizerConstants } from '@/data/visualizerData';

const OffGridSystemDiagram = ({ scenario, onComponentClick }) => {
  const { solar, load } = scenario;
  const isNight = solar === 0;
  
  // Simulation State for Battery (Visual only)
  // Logic: 
  // Solar > Load => Charge Battery + Power Home
  // Solar < Load => Discharge Battery + Solar to Home
  // Night => Battery to Home
  
  const batteryLevel = isNight ? 45 : 85; // Simulated levels
  const isCharging = solar > load;
  const isDischarging = load > solar;

  return (
    <div className="relative w-full h-[400px] bg-sky-50 rounded-2xl overflow-hidden border border-gray-200 select-none">
       {/* Sky Gradient */}
       <div className={`absolute inset-0 transition-colors duration-1000 ${isNight ? 'bg-slate-900' : 'bg-gradient-to-b from-sky-300 to-sky-100'}`} />

       {/* Solar Panels */}
       <div onClick={() => onComponentClick('panel')} className="absolute top-10 left-10 cursor-pointer z-20 group">
          <div className="w-24 h-16 bg-blue-600 rounded-lg transform -skew-x-12 border-2 border-blue-800 shadow-lg flex items-center justify-center">
            <div className="grid grid-cols-4 gap-0.5 w-full h-full p-1 opacity-50">
                {[...Array(12)].map((_,i) => <div key={i} className="bg-white/20 w-full h-full"></div>)}
            </div>
          </div>
          <div className="text-center mt-2 font-bold text-xs text-white bg-black/50 rounded px-1">Solar Panels</div>
       </div>

       {/* Charge Controller & Inverter Combo (Off-grid Inverter) */}
       <div onClick={() => onComponentClick('inverter')} className="absolute top-1/3 left-1/3 z-20 cursor-pointer">
          <div className="w-20 h-24 bg-gray-800 rounded-lg border-2 border-gray-600 shadow-xl flex flex-col items-center justify-center">
             <div className="w-16 h-8 bg-green-900/50 rounded mb-2 border border-green-800/50 flex items-center justify-center">
                 <span className="text-xs text-green-400 font-mono">230V</span>
             </div>
             <Zap className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-center mt-2 font-bold text-xs text-gray-700 bg-white/80 rounded px-1">Off-Grid Inverter</div>
       </div>

       {/* Battery Bank */}
       <div onClick={() => onComponentClick('battery')} className="absolute bottom-10 right-1/4 z-20 cursor-pointer transform scale-90">
          <BatteryIndicator percentage={batteryLevel} isCharging={isCharging} />
          <div className="text-center mt-2 font-bold text-xs text-gray-700 bg-white/80 rounded px-1">Battery Bank</div>
       </div>

       {/* Home */}
       <div onClick={() => onComponentClick('home')} className="absolute bottom-5 right-5 z-20 cursor-pointer">
          <Home className={`w-20 h-20 text-blue-600 ${load > 0 ? 'drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'opacity-50'}`} />
          <div className="text-center font-bold text-xs text-gray-700 bg-white/80 rounded px-1">Home Load</div>
       </div>

       {/* --- Flows --- */}
       {/* Solar to Inverter */}
       <PowerFlowAnimation 
          path="M 100 80 Q 150 150 200 150" 
          color={visualizerConstants.colors.solar} 
          isActive={solar > 0} 
       />

       {/* Inverter to Battery (Bi-directional based on charge/discharge) */}
       <PowerFlowAnimation 
          path="M 240 200 Q 280 250 350 300" 
          color={isCharging ? visualizerConstants.colors.solar : visualizerConstants.colors.battery} 
          isActive={true} 
          reverse={isDischarging}
       />

       {/* Inverter to Home */}
       <PowerFlowAnimation 
          path="M 280 180 Q 400 180 480 320" 
          color={visualizerConstants.colors.home} 
          isActive={load > 0} 
       />
    </div>
  );
};

export default OffGridSystemDiagram;