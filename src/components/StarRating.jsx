import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const StarRating = ({ rating = 5, total = 5, showNumber = false, className }) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {[...Array(total)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < Math.floor(rating) 
                ? "fill-[#FCD34D] text-[#FCD34D]" 
                : i < rating 
                  ? "fill-[#FCD34D] text-[#FCD34D] opacity-50" 
                  : "text-gray-300"
            )}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-bold text-gray-700 ml-1">{rating}/{total}</span>
      )}
    </div>
  );
};

export default StarRating;