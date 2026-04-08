import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Home, Zap, Scale, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EligibilityChecker = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 'property',
      question: "What type of property do you have?",
      options: [
        { label: "Residential House", value: "residential", icon: Home },
        { label: "Group Housing Society", value: "society", icon: Building },
        { label: "Commercial / Office", value: "commercial", icon: Zap }
      ]
    },
    {
      id: 'roof',
      question: "Do you have exclusive roof rights?",
      options: [
        { label: "Yes, I own the roof", value: "yes", icon: CheckCircle2 },
        { label: "No, it's shared", value: "no", icon: XCircle }
      ]
    },
    {
      id: 'bill',
      question: "Do you have a valid electricity bill in your name?",
      options: [
        { label: "Yes, active connection", value: "yes", icon: Zap },
        { label: "No / New Connection", value: "no", icon: XCircle }
      ]
    }
  ];

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [questions[step].id]: val };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      checkEligibility(newAnswers);
    }
  };

  const checkEligibility = (finalAnswers) => {
    if (finalAnswers.property === 'commercial') {
      setResult({ status: 'partial', msg: "You are eligible for Tax Benefits (AD), but not residential subsidy." });
    } else if (finalAnswers.roof === 'no' || finalAnswers.bill === 'no') {
      setResult({ status: 'ineligible', msg: "You need exclusive roof rights and a valid connection to apply." });
    } else {
      setResult({ status: 'eligible', msg: "Congratulations! You are fully eligible for PM Surya Ghar Yojana Subsidy." });
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  // Helper for rendering icons
  function Building(props) { return <Scale {...props} />; } // Placeholder mapping

  return (
    <div className="bg-gradient-to-br from-[#1a3a52] to-[#2a4a62] rounded-2xl p-8 text-white h-full flex flex-col justify-center min-h-[400px]">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Subsidy Eligibility Check</h3>
        <p className="text-blue-200">Answer 3 simple questions to check your status</p>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-medium">{questions[step].question}</h4>
            <div className="grid gap-3">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 p-4 rounded-xl flex items-center gap-4 transition-all text-left"
                >
                  <opt.icon className="w-6 h-6 text-[#FF9500]" />
                  <span className="font-semibold">{opt.label}</span>
                  <ArrowRight className="w-5 h-5 ml-auto opacity-50" />
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              {questions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-[#FF9500]' : 'bg-white/10'}`} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
              result.status === 'eligible' ? 'bg-green-500' : result.status === 'partial' ? 'bg-[#FF9500]' : 'bg-red-500'
            }`}>
              {result.status === 'eligible' ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
            </div>
            <h3 className="text-2xl font-bold mb-3">
              {result.status === 'eligible' ? 'Eligible!' : result.status === 'partial' ? 'Partially Eligible' : 'Not Eligible'}
            </h3>
            <p className="text-blue-100 mb-8 leading-relaxed">{result.msg}</p>
            
            <div className="space-y-3">
              <Button onClick={() => document.getElementById('contact').scrollIntoView()} className="w-full bg-white text-[#1a3a52] hover:bg-gray-100 font-bold">
                Book Consultation
              </Button>
              <button onClick={reset} className="flex items-center justify-center gap-2 w-full text-sm text-blue-200 hover:text-white py-2">
                <RotateCcw className="w-4 h-4" /> Check Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EligibilityChecker;