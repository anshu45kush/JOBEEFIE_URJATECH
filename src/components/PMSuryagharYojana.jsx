import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, ExternalLink, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { schemesData } from '@/data/SchemesData';

const PMSuryagharYojana = () => {
  const data = schemesData.pmSuryaghar;

  return (
    <div className="space-y-12">
      {/* Overview */}
      <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100">
        <h3 className="text-2xl font-bold text-[#1a3a52] mb-4">{data.overview.title}</h3>
        <p className="text-gray-700 leading-relaxed mb-6">{data.overview.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.overview.highlights.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#FF9500]" />
              <span className="font-semibold text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subsidy Table */}
      <div>
        <h3 className="text-xl font-bold text-[#1a3a52] mb-6">Subsidy Structure</h3>
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
          <table className="w-full">
            <thead className="bg-[#1a3a52] text-white">
              <tr>
                <th className="p-4 text-left">System Capacity</th>
                <th className="p-4 text-left">Central Subsidy Amount</th>
                <th className="p-4 text-left">Percentage (Approx)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.subsidyTable.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-800">{row.capacity}</td>
                  <td className="p-4 font-bold text-green-600">{row.subsidy}</td>
                  <td className="p-4 text-gray-600">{row.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Process Timeline */}
      <div className="relative">
        <h3 className="text-xl font-bold text-[#1a3a52] mb-8">Application Process</h3>
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200 md:left-1/2 md:-ml-0.5"></div>
        <div className="space-y-8">
          {data.steps.map((step, i) => (
            <div key={i} className={`relative flex items-center md:justify-between ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1 md:w-1/2"></div>
              <div className="absolute left-8 w-8 h-8 rounded-full bg-white border-4 border-[#FF9500] z-10 transform -translate-x-1/2 md:left-1/2 flex items-center justify-center">
                <span className="text-[10px] font-bold text-gray-500">{i + 1}</span>
              </div>
              <div className="flex-1 md:w-1/2 pl-16 md:pl-0 md:pr-12 md:text-right">
                <div className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 ${i % 2 === 0 ? 'md:text-left md:ml-12' : ''}`}>
                  <h4 className="font-bold text-[#1a3a52] mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents & CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-[#1a3a52] mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FF9500]" />
            Required Documents
          </h3>
          <ul className="space-y-3">
            {schemesData.documents.map((doc, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <div className={`w-2 h-2 rounded-full ${doc.required ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                <span className={doc.required ? 'font-medium' : ''}>{doc.name}</span>
                {doc.required && <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded ml-auto">Required</span>}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="w-full mt-6 border-dashed border-gray-300 text-gray-500">
            <Download className="w-4 h-4 mr-2" /> Download Checklist PDF
          </Button>
        </div>

        <div className="bg-gradient-to-br from-[#1a3a52] to-[#2a4a62] rounded-2xl p-8 text-white flex flex-col justify-center text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
          <p className="text-blue-100 mb-8">
            Don't worry about the complexity. Jobeefie Urjatech handles the entire application process for you for FREE when you choose us for installation.
          </p>
          <div className="space-y-4">
            <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noreferrer" className="block">
              <Button className="w-full bg-[#FF9500] hover:bg-[#e68600] text-white">
                Visit Official Portal <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white hover:text-white">
              Book Jobeefie Assistance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMSuryagharYojana;