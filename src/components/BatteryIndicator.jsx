import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Zap } from 'lucide-react';

const BatteryIndicator = ({ percentage, isCharging }) => {
  let color = 'bg-red-500';
  if (percentage > 20) color = 'bg-yellow-500';
  if (percentage > 60) color = 'bg-green-500';

  return (
    <div className="relative w-16 h-28 bg-gray-200 rounded-lg border-4 border-gray-400 flex flex-col justify-end overflow-hidden shadow-inner">
      {/* Battery Top Nipple */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3 bg-gray-400 rounded-t-sm" />
      
      {/* Liquid Fill Animation */}
      <motion.div 
        className={`w-full ${color} transition-colors duration-500 opacity-80`}
        initial={{ height: `${percentage}%` }}
        animate={{ height: `${percentage}%` }}
      >
        {/* Bubbles if charging */}
        {isCharging && (
          <div className="w-full h-full relative overflow-hidden">
             <motion.div 
               animate={{ y: [20, -100] }} 
               transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
               className="absolute bottom-0 left-2 w-2 h-2 bg-white/50 rounded-full"
             />
             <motion.div 
               animate={{ y: [20, -100] }} 
               transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "linear" }}
               className="absolute bottom-0 right-3 w-3 h-3 bg-white/50 rounded-full"
             />
          </div>
        )}
      </motion.div>

      {/* Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center font-bold text-white drop-shadow-md z-10">
        {percentage}%
        {isCharging && <Zap className="w-3 h-3 ml-0.5 fill-white text-yellow-300" />}
      </div>
    </div>
  );
};

export default BatteryIndicator;