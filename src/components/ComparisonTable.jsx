import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const ComparisonTable = () => {
  const { t } = useLanguage();

  const renderValue = (value) => {
    // Helper to render icons for boolean-like values
    if (value === 'Yes' || value === 'हाँ') return <Check className="w-6 h-6 text-green-500 mx-auto" />;
    if (value === 'No' || value === 'नहीं') return <X className="w-6 h-6 text-red-500 mx-auto" />;
    return value;
  };

  const rows = [
    { key: 'cost', label: t.solarSetups.comparison.rows.cost },
    { key: 'maintenance', label: t.solarSetups.comparison.rows.maintenance },
    { key: 'reliability', label: t.solarSetups.comparison.rows.reliability },
    { key: 'outage', label: t.solarSetups.comparison.rows.outage },
    { key: 'bill', label: t.solarSetups.comparison.rows.bill }
  ];

  const data = {
    ongrid: {
      cost: t.solarSetups.comparison.values.low,
      maintenance: t.solarSetups.comparison.values.low,
      reliability: t.solarSetups.comparison.values.none,
      outage: t.solarSetups.comparison.values.no,
      bill: t.solarSetups.comparison.values.max
    },
    offgrid: {
      cost: t.solarSetups.comparison.values.high,
      maintenance: t.solarSetups.comparison.values.high,
      reliability: t.solarSetups.comparison.values.full,
      outage: t.solarSetups.comparison.values.yes,
      bill: t.solarSetups.comparison.values.full
    },
    hybrid: {
      cost: t.solarSetups.comparison.values.high,
      maintenance: t.solarSetups.comparison.values.medium,
      reliability: t.solarSetups.comparison.values.partial,
      outage: t.solarSetups.comparison.values.yes,
      bill: t.solarSetups.comparison.values.max
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
    >
      <div className="bg-[#1a3a52] text-white p-4 text-center font-bold text-xl">
        {t.solarSetups.comparison.title}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left text-gray-600 font-semibold w-1/4">
                {t.solarSetups.comparison.columns.feature}
              </th>
              <th className="p-4 text-center text-[#FF9500] font-bold text-lg w-1/4">
                {t.solarSetups.comparison.columns.ongrid}
              </th>
              <th className="p-4 text-center text-[#2196F3] font-bold text-lg w-1/4">
                {t.solarSetups.comparison.columns.offgrid}
              </th>
              <th className="p-4 text-center text-[#4CAF50] font-bold text-lg w-1/4">
                {t.solarSetups.comparison.columns.hybrid}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr 
                key={row.key} 
                className={cn(
                  "border-t border-gray-100 transition-colors hover:bg-gray-50",
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                )}
              >
                <td className="p-4 font-medium text-gray-700">
                  {row.label}
                </td>
                <td className="p-4 text-center font-semibold text-gray-600">
                  {renderValue(data.ongrid[row.key])}
                </td>
                <td className="p-4 text-center font-semibold text-gray-600">
                  {renderValue(data.offgrid[row.key])}
                </td>
                <td className="p-4 text-center font-semibold text-gray-600">
                  {renderValue(data.hybrid[row.key])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ComparisonTable;