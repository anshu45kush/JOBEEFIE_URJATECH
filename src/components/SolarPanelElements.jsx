import React from 'react';
import { motion } from 'framer-motion';

const SolarPanelIcon = ({ delay }) => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8 md:w-12 md:h-12 opacity-80 drop-shadow-[0_0_10px_rgba(253,216,53,0.3)]"
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [-8, 8, -8],
      rotate: [-3, 3, -3],
      opacity: 0.8,
      filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
    }}
    transition={{ 
      duration: 5, 
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut" 
    }}
  >
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#1a3a52" stroke="#FDD835" strokeWidth="1.5" fillOpacity="0.4" />
    <path d="M2 8H22" stroke="#FDD835" strokeWidth="1" strokeOpacity="0.6" />
    <path d="M2 16H22" stroke="#FDD835" strokeWidth="1" strokeOpacity="0.6" />
    <path d="M8 2V22" stroke="#FDD835" strokeWidth="1" strokeOpacity="0.6" />
    <path d="M16 2V22" stroke="#FDD835" strokeWidth="1" strokeOpacity="0.6" />
  </motion.svg>
);

const SolarPanelElements = () => {
  // Positions for decorative panels
  const positions = [
    { top: '20%', left: '25%' },
    { top: '35%', left: '65%' },
    { top: '55%', left: '30%' },
    { top: '70%', left: '75%' },
    { top: '45%', left: '15%' },
    { top: '15%', left: '55%' },
    { top: '60%', left: '85%' },
  ];

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden w-full h-full">
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute transform scale-75 md:scale-100 transition-transform duration-500"
          style={{ ...pos }}
        >
          <SolarPanelIcon delay={i * 0.8} />
        </div>
      ))}
    </div>
  );
};

export default SolarPanelElements;