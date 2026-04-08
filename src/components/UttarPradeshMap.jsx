import React from 'react';
import { motion } from 'framer-motion';

const UttarPradeshMap = () => {
  // Simplified SVG path approximation for Uttar Pradesh
  const upPath = "M180,60 L240,40 L300,50 L340,30 L400,40 L440,20 L500,30 L540,60 L600,80 L650,120 L680,160 L650,200 L620,240 L580,260 L540,300 L500,320 L460,340 L400,350 L340,340 L300,360 L250,380 L200,360 L160,320 L120,280 L100,240 L80,200 L100,160 L120,120 L150,80 Z";

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none w-full h-full overflow-hidden">
      <motion.svg
        viewBox="0 0 800 500"
        className="w-full h-full absolute inset-0 object-cover opacity-60 md:opacity-40"
        preserveAspectRatio="xMidYMid meet"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 1.5 }}
      >
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#81C784" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Map Outline with stronger visibility */}
        <motion.path
          d={upPath}
          fill="url(#mapGradient)"
          stroke="#66BB6A"
          strokeWidth="1.5"
          filter="url(#glow)"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Grid Lines Effect - Enhanced visibility */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4CAF50" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.15" style={{ mixBlendMode: 'overlay' }} />
      </motion.svg>
    </div>
  );
};

export default UttarPradeshMap;