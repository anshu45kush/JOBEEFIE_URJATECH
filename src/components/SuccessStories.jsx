import React from 'react';
import { motion } from 'framer-motion';
import { Quote, User } from 'lucide-react';
import { schemesData } from '@/data/SchemesData';

const SuccessStories = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {schemesData.stories.map((story, i) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col"
        >
          <div className="h-48 overflow-hidden relative">
            <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Subsidy: {story.subsidy}
            </div>
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#1a3a52]">{story.name}</h4>
                <p className="text-xs text-gray-500">{story.location}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm grid grid-cols-2 gap-2">
              <div>
                <span className="block text-gray-500 text-xs">System</span>
                <span className="font-semibold text-gray-800">{story.system}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-xs">Savings</span>
                <span className="font-semibold text-green-600">{story.savings}</span>
              </div>
            </div>

            <div className="mt-auto relative">
              <Quote className="w-8 h-8 text-gray-200 absolute -top-4 -left-2" />
              <p className="text-gray-600 italic text-sm relative z-10 pl-4">
                "{story.testimonial}"
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SuccessStories;