import React from 'react';
import { Sun, Home, Zap, UtilityPole, RefreshCw } from 'lucide-react'; 
import { motion } from 'framer-motion';
import PowerFlowAnimation from './PowerFlowAnimation';
import BatteryIndicator from './BatteryIndicator';
import { visualizerConstants } from '@/data/visualizerData';

const HybridSystemDiagram = ({ scenario, onComponentClick }) => {
  const { solar, load, grid: gridStatus } = scenario;
  const isNight = solar === 0;
  
  // Hybrid Logic:
  // 1. Priority: Solar > Battery > Grid
  // 2. Outage: Grid disconnects, Battery takes over immediately
  
  const batteryLevel = 75; 
  const isGridAvailable = gridStatus !== false;

  return (
    <div className="relative w-full h-[400px] bg-sky-50 rounded-2xl overflow-hidden border border-gray-200 select-none">
       <div className={`absolute inset-0 transition-colors duration-1000 ${isNight ? 'bg-slate-900' : 'bg-gradient-to-b from-sky-300 to-sky-100'}`} />

       {/* Solar */}
       <div onClick={() => onComponentClick('panel')} className="absolute top-8 left-8 cursor-pointer z-20">
          <div className="w-20 h-14 bg-blue-600 rounded border-2 border-blue-800 shadow-lg transform -skew-y-6"></div>
          <div className="text-center mt-2 font-bold text-xs text-white bg-black/50 rounded px-1">Solar</div>
       </div>

       {/* Hybrid Inverter */}
       <div onClick={() => onComponentClick('inverter')} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer">
          <div className="w-24 h-28 bg-white rounded-xl border-4 border-[#1a3a52] shadow-2xl flex flex-col items-center justify-center relative">
             <div className="absolute -top-3 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Hybrid</div>
             <RefreshCw className="w-8 h-8 text-[#1a3a52] animate-spin-slow opacity-20 absolute" />
             <Zap className="w-8 h-8 text-orange-500 z-10" />
          </div>
       </div>

       {/* Battery */}
       <div onClick={() => onComponentClick('battery')} className="absolute bottom-8 left-10 z-20 cursor-pointer transform scale-75 origin-bottom-left">
          <BatteryIndicator percentage={batteryLevel} isCharging={solar > load} />
       </div>

       {/* Grid */}
       <div onClick={() => onComponentClick('grid')} className="absolute top-10 right-10 z-20 cursor-pointer">
          <UtilityPole className={`w-20 h-20 ${isGridAvailable ? 'text-gray-700' : 'text-red-500/50'}`} />
          {!isGridAvailable && <div className="absolute top-1/2 -right-2 bg-red-600 text-white text-[10px] px-1 rounded animate-pulse">OFF</div>}
       </div>

       {/* Home */}
       <div onClick={() => onComponentClick('home')} className="absolute bottom-8 right-10 z-20 cursor-pointer">
          <Home className="w-16 h-16 text-blue-600" />
       </div>

       {/* --- Flows --- */}
       {/* Solar -> Inverter */}
       <PowerFlowAnimation path="M 80 80 L 280 180" color={visualizerConstants.colors.solar} isActive={solar > 0} />
       
       {/* Inverter <-> Battery */}
       <PowerFlowAnimation path="M 280 250 L 100 350" color={visualizerConstants.colors.battery} isActive={true} reverse={load > solar} />
       
       {/* Inverter <-> Grid */}
       <PowerFlowAnimation path="M 320 200 L 450 100" color={visualizerConstants.colors.grid} isActive={isGridAvailable} reverse={solar < load && batteryLevel < 20} />
       
       {/* Inverter -> Home */}
       <PowerFlowAnimation path="M 320 250 L 450 350" color={visualizerConstants.colors.home} isActive={load > 0} />

    </div>
  );
};

export default HybridSystemDiagram;