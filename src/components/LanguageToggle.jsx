import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  const isEnglish = language.toLowerCase() === "en";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1 rounded-xl text-sm text-[#1a3a52] hover:text-[#FF9500] hover:bg-gray-200/50 border-b-2 border-red-600 transition-all duration-300"
      aria-label="Switch Language"
    >
      <span className="font-bold w-[60px] text-center ">
        {isEnglish ? "Hi : En" : "En : Hi"}
      </span>
    </Button>
  );
};

export default LanguageToggle;
