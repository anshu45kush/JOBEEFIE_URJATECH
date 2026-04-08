import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Zap } from 'lucide-react';

const LocationPin = ({ city, count, x, y, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute z-20" 
      style={{ top: `${y}%`, left: `${x}%` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, duration: 0.5, type: "spring" }}
        className="relative cursor-pointer group"
      >
        {/* Pulse Effect */}
        <div className="absolute -inset-2 bg-yellow-400/30 rounded-full animate-ping pointer-events-none" />
        
        {/* Pin Icon */}
        <div className={`
          relative z-10 p-1.5 rounded-full shadow-lg transition-all duration-300
          ${isHovered ? 'bg-[#FDD835] scale-125' : 'bg-[#4CAF50]'}
        `}>
          <MapPin className={`w-4 h-4 md:w-5 md:h-5 ${isHovered ? 'text-gray-900' : 'text-white'}`} />
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl border border-green-100 min-w-[140px] z-50 pointer-events-none"
            >
              <div className="text-center">
                <h4 className="font-bold text-gray-900 text-sm whitespace-nowrap">{city}</h4>
                <div className="flex items-center justify-center gap-1 text-[#4CAF50] mt-0.5">
                  <Zap className="w-3 h-3 fill-current" />
                  <span className="text-xs font-bold">{count} Installations</span>
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white/95" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LocationPin;