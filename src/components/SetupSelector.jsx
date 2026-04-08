import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const SetupSelector = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 'grid',
      key: 'grid', // Key in answers object
    },
    {
      id: 'budget',
      key: 'budget',
    },
    {
      id: 'usage',
      key: 'usage',
    }
  ];

  const calculateResult = (finalAnswers) => {
    const { grid, budget } = finalAnswers;
    
    // Logic for recommendation
    if (grid === 'none') return 'offgrid';
    if (grid === 'unstable') {
      if (budget === 'backup' || budget === 'both') return 'hybrid';
      return 'offgrid'; // Fallback if grid is really bad
    }
    if (grid === 'stable') {
      if (budget === 'backup') return 'hybrid';
      if (budget === 'both') return 'hybrid';
      return 'ongrid';
    }
    return 'ongrid'; // Default
  };

  const handleOptionSelect = (optionKey) => {
    const currentQuestion = questions[step];
    const newAnswers = { ...answers, [currentQuestion.key]: optionKey };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult(calculateResult(newAnswers));
      setStep(step + 1); // Move to result view
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  const getResultContent = (resultKey) => {
    if (!resultKey) return null;
    return t.solarSetups[resultKey];
  };

  const currentQ = questions[step];
  const questionContent = currentQ ? t.solarSetups.selector.questions[currentQ.key] : null;

  return (
    <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 md:p-8 shadow-xl border border-orange-100 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#1a3a52]">{t.solarSetups.selector.title}</h3>
        <p className="text-gray-600">{t.solarSetups.selector.subtitle}</p>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-gray-800">
                {questionContent?.text}
              </h4>
              <div className="grid gap-3">
                {questionContent && Object.entries(questionContent.options).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => handleOptionSelect(key)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-[#FF9500] hover:bg-orange-50 transition-all duration-200 flex items-center justify-between group"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-[#1a3a52]">{label}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#FF9500]" />
                  </button>
                ))}
              </div>
              <div className="flex gap-1 mt-4">
                 {questions.map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-[#FF9500]' : 'bg-gray-200'}`} />
                 ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h4 className="text-gray-500 font-medium mb-1">{t.solarSetups.selector.result.heading}</h4>
                <h3 className="text-3xl font-bold text-[#1a3a52]">
                  {getResultContent(result).title}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {getResultContent(result).description}
              </p>

              <div className="pt-4 space-y-3">
                <a href="#contact" className="block">
                  <Button className="w-full bg-[#1a3a52] hover:bg-[#2a4a62] text-white py-6 text-lg rounded-xl shadow-lg">
                    {t.solarSetups.selector.result.consult}
                  </Button>
                </a>
                <button 
                  onClick={resetQuiz}
                  className="flex items-center justify-center gap-2 text-gray-500 hover:text-[#FF9500] w-full py-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Start Over</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SetupSelector;