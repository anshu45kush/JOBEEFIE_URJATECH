import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { productsDatabase } from '@/data/productsDatabase';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

const ProductsPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    companies: [],
    categories: ['panel', 'inverter', 'battery'], // Show all by default
    minPrice: 0,
    maxPrice: 100000
  });

  const [filteredProducts, setFilteredProducts] = useState(productsDatabase.products);

  useEffect(() => {
    let result = productsDatabase.products;

    // Search Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerTerm) || 
        p.model.toLowerCase().includes(lowerTerm)
      );
    }

    // Category Filter
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    // Company Filter
    if (filters.companies.length > 0) {
      result = result.filter(p => filters.companies.includes(p.companyId));
    }

    setFilteredProducts(result);
  }, [searchTerm, filters]);

  const handleQuickView = (product) => {
    toast({
      title: "Opening Details",
      description: `Viewing details for ${product.name}`,
    });
    // Implement modal opening here in future
  };

  const handleAddToQuote = (product) => {
    toast({
      title: "Added to Quote",
      description: `${product.name} has been added to your inquiry list.`,
      variant: "success"
    });
  };

  const clearFilters = () => {
    setFilters({
      companies: [],
      categories: ['panel', 'inverter', 'battery'],
      minPrice: 0,
      maxPrice: 100000
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-[#1a3a52] text-white py-12 px-4">
        <div className="container mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Solar Products & Solutions
          </motion.h1>
          <p className="text-gray-300 max-w-2xl text-lg">
            Explore our extensive range of high-efficiency solar panels, inverters, and batteries from top Indian and global brands.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex gap-4">
          <Button onClick={() => setIsFilterOpen(true)} variant="outline" className="flex-1 border-[#1a3a52] text-[#1a3a52]">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#1a3a52]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Sidebar Filters (Desktop) */}
        <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24 h-[calc(100vh-120px)]">
          <ProductFilters 
            filters={filters} 
            setFilters={setFilters} 
            companies={productsDatabase.companies}
            onClear={clearFilters}
            onClose={() => setIsFilterOpen(false)}
          />
        </div>

        {/* Mobile Filter Modal */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            >
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="absolute left-0 top-0 bottom-0 w-80 bg-white"
              >
                <ProductFilters 
                  filters={filters} 
                  setFilters={setFilters} 
                  companies={productsDatabase.companies}
                  onClear={clearFilters}
                  onClose={() => setIsFilterOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1">
          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="relative w-96">
              <input 
                type="text" 
                placeholder="Search by name, brand or model..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF9500]/20 focus:border-[#FF9500] transition-all"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <div className="text-sm text-gray-500">
              Showing <span className="font-bold text-[#1a3a52]">{filteredProducts.length}</span> products
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  company={productsDatabase.companies.find(c => c.id === product.companyId)}
                  onQuickView={handleQuickView}
                  onAddToQuote={handleAddToQuote}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search term.</p>
              <Button onClick={clearFilters} className="bg-[#1a3a52] text-white">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;