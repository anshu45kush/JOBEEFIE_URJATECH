import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Sun, Battery, Info, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const ProductCard = ({ product, company, onQuickView, onAddToQuote }) => {
  const { t, language } = useLanguage();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat(language === 'hi' ? 'hi-IN' : 'en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getCategoryIcon = () => {
    switch(product.category) {
      case 'panel': return <Sun className="w-4 h-4" />;
      case 'inverter': return <Zap className="w-4 h-4" />;
      case 'battery': return <Battery className="w-4 h-4" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full group"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-[#1a3a52] flex items-center gap-1 shadow-sm">
          {company?.logo ? (
            <img src={company.logo} alt={company.name} className="h-4 w-auto object-contain max-w-[40px]" />
          ) : (
            <span>{company?.name}</span>
          )}
        </div>
        <div className="absolute top-2 right-2 bg-[#FF9500] text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
          {getCategoryIcon()}
          <span className="capitalize">{product.category}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-[#1a3a52] mb-1 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-700">{product.model}</span>
          {product.category === 'panel' && <span className="text-[#FF9500] font-bold">{product.wattage}W</span>}
          {product.category === 'inverter' && <span className="text-[#FF9500] font-bold">{product.capacity}</span>}
          {product.category === 'battery' && <span className="text-[#FF9500] font-bold">{product.capacity}</span>}
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div className="flex flex-col">
            <span className="text-gray-400">Type</span>
            <span className="font-semibold text-gray-800 line-clamp-1" title={product.type}>{product.type}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400">Warranty</span>
            <span className="font-semibold text-gray-800">{product.productWarranty || product.warranty} Yrs</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400">Efficiency</span>
            <span className="font-semibold text-gray-800">{product.efficiency}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400">Price Approx.</span>
            <span className="font-bold text-[#1a3a52]">{formatPrice(product.price)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <Button 
            onClick={() => onQuickView(product)}
            variant="outline" 
            className="w-full text-xs h-9 border-[#1a3a52] text-[#1a3a52] hover:bg-[#1a3a52] hover:text-white"
          >
            <Info className="w-3 h-3 mr-1" />
            {t.products.viewDetails || 'Details'}
          </Button>
          <Button 
            onClick={() => onAddToQuote(product)}
            className="w-full text-xs h-9 bg-[#1a3a52] hover:bg-[#2a4a62] text-white"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            {t.products.addToQuote || 'Add Quote'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;