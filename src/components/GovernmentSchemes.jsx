import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Calculator,
  Users,
  HelpCircle,
  FileCheck,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import PMSuryagharYojana from "@/components/PMSuryagharYojana";
import SubsidyCalculator from "@/components/SubsidyCalculator";
import EligibilityChecker from "@/components/EligibilityChecker";
import SuccessStories from "@/components/SuccessStories";
import { schemesData } from "@/data/SchemesData";

const GovernmentSchemes = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("pm");

  const tabs = [
    { id: "pm", label: "PM Suryaghar Yojana", icon: Landmark },
    { id: "calc", label: "Calculator & Check", icon: Calculator },
    { id: "state", label: "State & Local", icon: Building2 },
    { id: "stories", label: "Success Stories", icon: Users },
    { id: "faq", label: "FAQs & Resources", icon: HelpCircle },
  ];

  return (
    <section id="schemes" className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1684911404626-2e53350a063b?q=80&w=2070&auto=format&fit=crop"
          alt="Solar Panel Installation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a52]/90 via-[#1a3a52]/70 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="bg-[#FF9500] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">
              Government Incentives
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Maximize Savings with <br /> Government Subsidies
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Get up to ₹78,000 subsidy on residential solar installations under
              PM Surya Ghar Muft Bijli Yojana. We handle the paperwork for you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex space-x-2 md:space-x-8 min-w-max py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                    activeTab === tab.id
                      ? "bg-[#1a3a52] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "pm" && <PMSuryagharYojana />}

            {activeTab === "calc" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <SubsidyCalculator />
                </div>
                <div className="lg:col-span-1">
                  <EligibilityChecker />
                </div>
              </div>
            )}

            {activeTab === "state" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[#1a3a52] mb-2">
                    Uttar Pradesh State Subsidies
                  </h3>
                  <p className="text-gray-600">
                    Additional benefits provided by UPNEDA (Uttar Pradesh New
                    and Renewable Energy Development Agency).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#FF9500]" />
                      Additional State Subsidy
                    </h4>
                    <p className="text-gray-700">
                      UP Government often provides top-up subsidies (e.g.,
                      ₹15,000/kW up to 30k) in addition to central subsidy.
                      *Subject to fund availability.
                    </p>

                    <h4 className="font-bold text-lg flex items-center gap-2 mt-6">
                      <FileCheck className="w-5 h-5 text-[#FF9500]" />
                      Net Metering
                    </h4>
                    <p className="text-gray-700">
                      UPPCL provides net metering facility where you can export
                      excess power to the grid and get credit in your bill.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl text-black">
                    <h4 className="font-bold text-[#1a3a52] mb-4">
                      Official Contacts
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between border-b border-blue-200 pb-2">
                        <span>UPNEDA Helpline</span>
                        <span className="font-bold">1800-180-0005</span>
                      </li>
                      <li className="flex justify-between border-b border-blue-200 pb-2">
                        <span>MVVNL (Lucknow)</span>
                        <span className="font-bold">1912</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-6 bg-[#1a3a52] text-white hover:text-black">
                      Visit UPNEDA Website
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "stories" && <SuccessStories />}

            {activeTab === "faq" && (
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-[#1a3a52] mb-8 text-center">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {schemesData.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                    >
                      <h4 className="font-bold text-lg text-gray-800 mb-2">
                        {faq.q}
                      </h4>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GovernmentSchemes;
