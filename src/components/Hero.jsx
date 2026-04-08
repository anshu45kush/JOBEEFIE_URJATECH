import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import UttarPradeshMap from '@/components/UttarPradeshMap';
import SolarPanelElements from '@/components/SolarPanelElements';
import LocationPin from '@/components/LocationPin';

const Hero = () => {
  const { t } = useLanguage();

  const stats = [
    { number: '1000+', label: t.hero.stats.installations },
    { number: '5+', label: t.hero.stats.experience },
    { number: '100%', label: t.hero.stats.satisfaction }
  ];

  // Installation data for map pins - Approximated coordinates for relative positioning
  const cityLocations = [
    { city: 'Lucknow', count: '850+', x: 45, y: 45 },
    { city: 'Barabanki', count: '420+', x: 52, y: 43 },
    { city: 'Kanpur', count: '380+', x: 40, y: 55 },
    { city: 'Varanasi', count: '240+', x: 75, y: 65 },
    { city: 'Agra', count: '150+', x: 15, y: 40 },
    { city: 'Noida', count: '310+', x: 10, y: 25 },
    { city: 'Prayagraj', count: '290+', x: 60, y: 70 },
    { city: 'Gorakhpur', count: '180+', x: 70, y: 30 },
    { city: 'Meerut', count: '120+', x: 12, y: 15 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* 1. Map Background Layer - z-0 */}
      <div className="absolute inset-0 z-0 w-full h-full">
         <UttarPradeshMap />
      </div>

      {/* 2. Solar Panels Animation Layer - z-1 */}
      <SolarPanelElements />

      {/* 3. Location Pins Layer - z-2 */}
      <div className="absolute inset-0 z-[2] max-w-7xl mx-auto h-full w-full pointer-events-none hidden md:block">
        <div className="relative w-full h-full">
          {cityLocations.map((loc, idx) => (
             <div key={loc.city} className="pointer-events-auto">
                <LocationPin 
                  city={loc.city} 
                  count={loc.count} 
                  x={loc.x} 
                  y={loc.y} 
                  delay={1 + (idx * 0.1)} 
                />
             </div>
          ))}
        </div>
      </div>

      {/* 4. Dark Overlay Gradient - z-3 */}
      {/* Adjusted gradient opacity to ensure map is visible */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-slate-900/30 pointer-events-none"></div>

      {/* 5. Main Content Layer */}
      <div className="relative z-10 container mx-auto px-4 py-32 mt-16">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
            >
              {t.hero.heading}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-[#FFC107] font-semibold mb-8 drop-shadow-lg"
            >
              {t.hero.subheading}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl leading-relaxed drop-shadow-md text-shadow"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col gap-6"
            >
              {/* Primary CTA */}
              <a href="tel:+919151368100" className="inline-block self-start">
                <Button
                  className="bg-gradient-to-r from-[#FF9500] to-[#FFC107] hover:from-[#FFC107] hover:to-[#FF9500] text-white font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-[#FF9500]/50 transition-all duration-300 transform hover:scale-105 group border border-white/10"
                >
                  <Phone className="mr-2 group-hover:rotate-12 transition-transform" />
                  {t.common.callNow}
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </a>

              {/* Secondary Message Display */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 inline-block self-start max-w-2xl shadow-lg">
                <p className="text-white font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FFC107] rounded-full animate-pulse"></span>
                  {t.hero.ctaSubtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all"
            >
              <div className="text-4xl font-bold text-[#FFC107] mb-2 drop-shadow">{stat.number}</div>
              <div className="text-white/95 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2 backdrop-blur-sm"
        >
          <motion.div className="w-1 h-2 bg-white/80 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;