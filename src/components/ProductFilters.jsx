import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const ProductFilters = ({ filters, setFilters, companies, onClear, onClose }) => {
  const { t } = useLanguage();

  const handleCompanyChange = (companyId) => {
    setFilters(prev => {
      const newCompanies = prev.companies.includes(companyId)
        ? prev.companies.filter(c => c !== companyId)
        : [...prev.companies, companyId];
      return { ...prev, companies: newCompanies };
    });
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
  };

  return (
    <div className="bg-white h-full overflow-y-auto p-4 md:p-6 shadow-xl w-full max-w-sm flex flex-col">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h3 className="text-xl font-bold text-[#1a3a52] flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#FF9500]" />
          Filters
        </h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-[#FF9500] flex items-center gap-1 underline"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-red-500">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="space-y-8 flex-grow">
        {/* Category Filter */}
        <div>
          <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Category</h4>
          <div className="space-y-2">
            {['panel', 'inverter', 'battery'].map(cat => (
              <label key={cat} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                <Checkbox 
                  checked={filters.categories.includes(cat)}
                  onCheckedChange={() => handleCategoryChange(cat)}
                />
                <span className="capitalize text-gray-700">{cat}s</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Brands</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {companies.map(company => (
              <label key={company.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                <Checkbox 
                  checked={filters.companies.includes(company.id)}
                  onCheckedChange={() => handleCompanyChange(company.id)}
                />
                <span className="text-gray-700">{company.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Wattage Filter (Only for panels) */}
        {filters.categories.includes('panel') && (
           <div>
            <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Wattage</h4>
             <div className="space-y-2">
               {[100, 300, 400, 500].map(w => (
                 <label key={w} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                    <Checkbox />
                    <span className="text-gray-700">{w}W+</span>
                 </label>
               ))}
             </div>
           </div>
        )}
      </div>

      <div className="pt-6 border-t mt-4">
        <Button onClick={onClose} className="w-full bg-[#1a3a52] text-white">
          Show Results
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;