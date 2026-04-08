import React from 'react';
import { motion } from 'framer-motion';

const PowerFlowAnimation = ({ path, color, isActive, speed = 1.5, reverse = false }) => {
  if (!isActive) return null;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
      {/* Base Path Line */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.3"
        strokeDasharray="4 4"
      />
      
      {/* Moving Dot */}
      <circle r="4" fill={color}>
        <animateMotion
          dur={`${speed}s`}
          repeatCount="indefinite"
          path={path}
          keyPoints={reverse ? "1;0" : "0;1"}
          keyTimes="0;1"
        />
      </circle>
    </svg>
  );
};

export default PowerFlowAnimation;