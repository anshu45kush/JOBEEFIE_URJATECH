import React from 'react';
import { Sun, Home, Zap, UtilityPole, Gauge } from 'lucide-react'; // Using icons as placeholders for complex SVG parts
import { motion } from 'framer-motion';
import PowerFlowAnimation from './PowerFlowAnimation';
import { visualizerConstants } from '@/data/visualizerData';

const OnGridSystemDiagram = ({ scenario, onComponentClick }) => {
  const { solar, load, grid: gridStatus } = scenario;
  const isNight = solar === 0;
  
  // Logic: 
  // If Solar > Load => Export to Grid
  // If Solar < Load => Import from Grid
  // If No Grid => System Shutdown (Safety)
  
  const isSystemActive = gridStatus !== false; // On-grid shuts down without grid
  const netPower = solar - load;
  const isExporting = netPower > 0;
  const gridFlowActive = isSystemActive && netPower !== 0;

  return (
    <div className="relative w-full h-[400px] bg-sky-50 rounded-2xl overflow-hidden border border-gray-200 select-none">
      {/* Sky Gradient */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${isNight ? 'bg-slate-900' : 'bg-gradient-to-b from-sky-300 to-sky-100'}`} />

      {/* Sun / Moon */}
      <motion.div 
        animate={{ 
          top: isNight ? '10%' : '15%', 
          right: isNight ? '15%' : '10%',
          opacity: isNight ? 0.8 : 1,
          scale: isNight ? 0.8 : 1
        }}
        className="absolute w-16 h-16"
      >
        {isNight ? (
          <div className="w-12 h-12 bg-gray-100 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
        ) : (
          <Sun className="w-16 h-16 text-yellow-400 fill-yellow-400 animate-spin-slow" />
        )}
      </motion.div>

      {/* --- Components Layout --- */}
      
      {/* 1. Solar Panels (Top Left) */}
      <div 
        onClick={() => onComponentClick('panel')}
        className="absolute top-1/4 left-10 cursor-pointer z-20 group"
      >
        <div className="w-24 h-16 bg-blue-600 rounded-lg transform -skew-x-12 border-2 border-blue-800 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="grid grid-cols-4 gap-0.5 w-full h-full p-1 opacity-50">
                {[...Array(12)].map((_,i) => <div key={i} className="bg-white/20 w-full h-full"></div>)}
            </div>
        </div>
        <div className="text-center mt-2 font-bold text-xs text-white bg-black/50 rounded px-1">Solar Panels</div>
      </div>

      {/* 2. Inverter (Center) */}
      <div 
        onClick={() => onComponentClick('inverter')}
        className="absolute top-1/2 left-1/3 -translate-y-1/2 cursor-pointer z-20 group"
      >
        <div className={`w-16 h-20 bg-gray-100 rounded-lg border-2 border-gray-400 shadow-lg flex flex-col items-center justify-center group-hover:scale-105 transition-transform ${!isSystemActive ? 'opacity-50' : ''}`}>
           <div className={`w-2 h-2 rounded-full mb-2 ${isSystemActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
           <Zap className="w-6 h-6 text-orange-500" />
        </div>
        <div className="text-center mt-2 font-bold text-xs text-gray-700 bg-white/80 rounded px-1">Inverter</div>
      </div>

      {/* 3. Net Meter (Right Center) */}
      <div 
        onClick={() => onComponentClick('meter')}
        className="absolute top-1/2 right-1/3 -translate-y-1/2 cursor-pointer z-20 group"
      >
        <div className="w-14 h-14 bg-gray-800 rounded-full border-4 border-gray-300 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
           <Gauge className={`w-8 h-8 ${isExporting ? 'text-green-400' : 'text-red-400'}`} />
        </div>
        <div className="text-center mt-2 font-bold text-xs text-gray-700 bg-white/80 rounded px-1">Net Meter</div>
      </div>

      {/* 4. Grid (Far Right) */}
      <div 
        onClick={() => onComponentClick('grid')}
        className="absolute top-1/4 right-5 cursor-pointer z-20 group"
      >
        <UtilityPole className={`w-24 h-24 ${gridStatus !== false ? 'text-gray-700' : 'text-red-500/50'}`} />
        {gridStatus === false && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold animate-pulse">OUTAGE</div>
        )}
        <div className="text-center -mt-2 font-bold text-xs text-gray-700 bg-white/80 rounded px-1">Grid</div>
      </div>

      {/* 5. Home (Bottom Center) */}
      <div 
        onClick={() => onComponentClick('home')}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer z-20 group"
      >
        <Home className={`w-20 h-20 text-blue-600 ${load > 0 && isSystemActive ? 'drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'opacity-50'}`} />
        <div className="text-center font-bold text-xs text-gray-700 bg-white/80 rounded px-1">Home Load</div>
      </div>

      {/* --- Power Flows (SVG Layers) --- */}
      {/* Solar to Inverter */}
      <PowerFlowAnimation 
        path="M 90 120 Q 120 180 150 200" 
        color={visualizerConstants.colors.solar} 
        isActive={solar > 0} 
      />

      {/* Inverter to Home */}
      <PowerFlowAnimation 
        path="M 190 220 Q 220 300 300 320" 
        color={visualizerConstants.colors.home} 
        isActive={isSystemActive && load > 0} 
      />

      {/* Inverter to Meter */}
      <PowerFlowAnimation 
        path="M 210 200 L 360 200" 
        color={isExporting ? visualizerConstants.colors.solar : visualizerConstants.colors.grid} 
        isActive={gridFlowActive} 
        reverse={!isExporting} // Reverse if importing
      />

      {/* Meter to Grid */}
      <PowerFlowAnimation 
        path="M 420 200 L 500 120" 
        color={isExporting ? visualizerConstants.colors.solar : visualizerConstants.colors.grid} 
        isActive={gridFlowActive} 
        reverse={!isExporting}
      />

    </div>
  );
};

export default OnGridSystemDiagram;