import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Zap, BadgeCheck, MapPin, IndianRupee } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/StarRating';

const Testimonials = () => {
  const { t } = useLanguage();
  const [startIndex, setStartIndex] = useState(0);

  // New images mapped to testimonials as provided by the user
  const testimonialImages = [
    "https://horizons-cdn.hostinger.com/23c98876-5937-4e72-aeca-0b7745c6eb02/c49ca28e40fa67045ee73ccae471ffe2.jpg",
    "https://horizons-cdn.hostinger.com/23c98876-5937-4e72-aeca-0b7745c6eb02/a0eaed4e8734ee3665dd06587d32ff25.jpg",
    "https://horizons-cdn.hostinger.com/23c98876-5937-4e72-aeca-0b7745c6eb02/22d1f34698c8484b74ce77b08b36dce8.jpg",
    "https://horizons-cdn.hostinger.com/23c98876-5937-4e72-aeca-0b7745c6eb02/4a66a9a8fa611b5777364cd8cf65a415.jpg",
    "https://horizons-cdn.hostinger.com/23c98876-5937-4e72-aeca-0b7745c6eb02/a98de8faaa1b9d5b4ea06e1805e15366.jpg"
  ];

  const testimonials = t.testimonials.reviews.map((review, index) => ({
    ...review,
    image: testimonialImages[index] || testimonialImages[0], // Fallback if fewer images than reviews
    rating: 5
  }));

  const nextTestimonials = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonials = () => {
    setStartIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Function to get visible testimonials with circular wrapping
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Quote className="w-8 h-8 text-[#FF9500]" />
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a3a52]">
              {t.testimonials.title}
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF9500] to-[#FFC107] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonials}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-orange-50 p-3 rounded-full shadow-lg border border-gray-100 transition-all text-[#1a3a52] hover:text-[#FF9500]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextTestimonials}
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-orange-50 p-3 rounded-full shadow-lg border border-gray-100 transition-all text-[#1a3a52] hover:text-[#FF9500]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-8">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((review, i) => (
                <motion.div
                  key={`${review.name}-${startIndex}-${i}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group h-full flex flex-col ${i > 0 ? 'hidden md:flex' : 'flex'}`}
                >
                  {/* Image Header */}
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={review.image} 
                      alt={review.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                      <div className="flex items-center gap-2 text-white">
                        <MapPin className="w-4 h-4 text-[#FF9500]" />
                        <span className="text-sm font-medium drop-shadow-md">{review.location}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <BadgeCheck className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-bold text-[#1a3a52]">{t.common.verifiedCustomer}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-[#1a3a52] line-clamp-1">{review.name}</h3>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 italic text-sm leading-relaxed flex-grow">
                      "{review.text}"
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="flex items-center gap-1.5 text-orange-600 mb-1">
                          <Zap className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold uppercase">{t.testimonials.capacity}</span>
                        </div>
                        <span className="text-lg font-bold text-[#1a3a52]">{review.capacity}</span>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center gap-1.5 text-green-600 mb-1">
                          <IndianRupee className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold uppercase">{t.testimonials.savings}</span>
                        </div>
                        <span className="text-lg font-bold text-[#1a3a52]">{review.savings}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="text-center mt-12">
          <a href="tel:+919151368100">
            <Button size="lg" className="bg-[#1a3a52] hover:bg-[#2a4a62] text-white px-8 rounded-full shadow-lg hover:shadow-xl transition-all">
              {t.common.callNow}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;