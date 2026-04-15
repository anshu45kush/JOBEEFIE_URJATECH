import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Landmark,
  Percent,
  ShieldCheck,
  ArrowRight,
  X,
  Clock,
  FileWarning,
  Search,
  ChevronDown,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { cibilData } from "@/data/cibilData";
import { Slider } from "@/components/ui/slider";

// --- Sub Components ---

const ScoreRangeCard = ({ rangeData }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`p-6 rounded-xl border border-gray-100 shadow-lg bg-white relative overflow-hidden`}
  >
    <div
      className={`absolute top-0 left-0 w-2 h-full ${rangeData.color}`}
    ></div>
    <div className="flex justify-between items-start mb-2">
      <h4 className={`text-2xl font-bold ${rangeData.textColor}`}>
        {rangeData.range}
      </h4>
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold text-white ${rangeData.color}`}
      >
        {rangeData.label}
      </span>
    </div>
    <div className="space-y-2 text-sm text-gray-600 mt-4">
      <div className="flex justify-between border-b pb-2">
        <span>Approval Chance:</span>
        <span className="font-semibold text-gray-900">
          {rangeData.approvalChance}
        </span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span>Interest Rate:</span>
        <span className="font-semibold text-gray-900">
          {rangeData.interestRate}
        </span>
      </div>
    </div>
    <p className="text-xs text-gray-500 mt-3 italic bg-gray-50 p-2 rounded">
      "{rangeData.tips}"
    </p>
  </motion.div>
);

const LoanCalculator = () => {
  const [score, setScore] = useState(750);
  const [amount, setAmount] = useState(100000);
  const [tenure, setTenure] = useState(5);

  const getInterestRate = (s) => {
    if (s >= 750) return 9.5;
    if (s >= 700) return 10.5;
    if (s >= 650) return 12.0;
    return 14.0;
  };

  const interestRate = getInterestRate(score);
  const monthlyRate = interestRate / (12 * 100);
  const months = tenure * 12;
  const emi =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalAmount = emi * months;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h3 className="text-2xl font-bold text-[#1a3a52] mb-6 flex items-center gap-2">
        <Calculator className="w-6 h-6 text-[#FF9500]" />
        Eligibility & EMI Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estimated CIBIL Score:{" "}
              <span className="text-[#FF9500] font-bold">{score}</span>
            </label>
            <Slider
              value={[score]}
              min={300}
              max={900}
              step={10}
              onValueChange={(val) => setScore(val[0])}
              className="py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan Amount:{" "}
              <span className="text-[#1a3a52] font-bold">
                ₹{amount.toLocaleString()}
              </span>
            </label>
            <Slider
              value={[amount]}
              min={50000}
              max={1000000}
              step={10000}
              onValueChange={(val) => setAmount(val[0])}
              className="py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan Tenure:{" "}
              <span className="text-[#1a3a52] font-bold">{tenure} Years</span>
            </label>
            <div className="flex gap-2">
              {[3, 5, 7, 10].map((y) => (
                <button
                  key={y}
                  onClick={() => setTenure(y)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tenure === y
                      ? "bg-[#1a3a52] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {y} Yrs
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Interest Rate (Est.)</span>
            <span className="font-bold text-[#FF9500] text-lg">
              {interestRate}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Monthly EMI</span>
            <span className="font-bold text-[#1a3a52] text-2xl">
              ₹{Math.round(emi).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-gray-600">Total Payment</span>
            <span className="font-bold text-gray-800">
              ₹{Math.round(totalAmount).toLocaleString()}
            </span>
          </div>

          <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-100">
            Note: This is an approximation. Actual rates depend on bank
            policies.
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const CIBILScoreChecker = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Request Submitted",
        description:
          "We will contact you shortly to verify your details for CIBIL check.",
        className: "bg-green-50 border-green-200",
      });
      setFormData({ name: "", email: "", phone: "", pan: "" });
    }, 1500);
  };

  const iconMap = {
    Clock: Clock,
    Percent: Percent,
    FileWarning: FileWarning,
    Search: Search,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      {/* Hero Section */}
      <div className="bg-[#1a3a52] text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9500] rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="bg-[#FF9500]/20 text-[#FF9500] border border-[#FF9500]/30 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block">
              Financial Health
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Check Your Solar Loan <br />{" "}
              <span className="text-[#FF9500]">Eligibility Score</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              A good CIBIL score is key to getting low-interest solar loans.
              Understand your score, check eligibility, and get expert tips to
              improve it.
            </p>
            <div className="flex flex-wrap gap-4 ">
              <a href="https://www.paisabazaar.com/cibil-credit-report/">
                <Button className="bg-[#FF9500] hover:bg-[#e68600] text-white px-8 py-6 text-lg border-b-2 border-red-600 rounded-full shadow-lg">
                  Check My Score
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        {/* Score Ranges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {cibilData.scoreRanges.map((range, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ScoreRangeCard rangeData={range} />
            </motion.div>
          ))}
        </div>

        {/* Checker Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div id="checker-form">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#1a3a52] mb-6">
                Check Eligibility Instantly
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF9500] focus:border-transparent"
                    placeholder="As per PAN Card"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF9500] focus:border-transparent"
                      placeholder="+91"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pan}
                      onChange={(e) =>
                        setFormData({ ...formData, pan: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF9500] focus:border-transparent uppercase"
                      placeholder="ABCDE1234F"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF9500] focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="flex items-start gap-2 text-xs text-gray-500 my-4">
                  <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <p>
                    Your data is 100% secure. We do not share your information
                    with third parties without consent. This check will not
                    impact your score.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1a3a52] hover:bg-[#2a4a62] text-white py-6 text-lg font-bold rounded-xl"
                >
                  {loading ? "Processing..." : "Verify Eligibility Now"}
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#FF9500] to-[#FFC107] rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                Why CIBIL Score Matters?
              </h3>
              <p className="mb-6 opacity-90">
                Your Credit Information Bureau (India) Limited (CIBIL) score is
                a 3-digit number representing your creditworthiness. For solar
                loans:
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>
                    Higher Score = Lower Interest Rates (Save up to 2-3%)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Faster Loan Approval (Within 48 hours)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>
                    Zero Down Payment Options available for 750+ score
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
              <h3 className="text-xl font-bold text-[#1a3a52] mb-4">
                Official Resources
              </h3>
              <p className="text-gray-600 mb-4">
                You can check your official CIBIL score for free once a year
                from the official website.
              </p>
              <a
                href="https://www.cibil.com/freecibilscore"
                target="_blank"
                rel="noreferrer"
                className="text-[#FF9500] font-bold flex items-center hover:underline"
              >
                Visit Official CIBIL Website{" "}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Loan Calculator */}
        <div className="mb-20">
          <LoanCalculator />
        </div>

        {/* Tips & Loan Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Tips */}
          <div>
            <h3 className="text-3xl font-bold text-[#1a3a52] mb-8">
              How to Improve Score?
            </h3>
            <div className="space-y-4">
              {cibilData.improvementTips.map((tip) => {
                const Icon = iconMap[tip.icon] || CheckCircle2;
                return (
                  <div
                    key={tip.id}
                    className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex gap-4"
                  >
                    <div className="bg-blue-50 p-3 rounded-full h-fit text-[#1a3a52]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-1">
                        {tip.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{tip.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Loan Options */}
          <div>
            <h3 className="text-3xl font-bold text-[#1a3a52] mb-8">
              Loan Options
            </h3>
            <div className="space-y-4">
              {cibilData.loanOptions.map((loan) => (
                <div
                  key={loan.id}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-[#1a3a52]">
                        {loan.name}
                      </h4>
                      <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-500">
                        {loan.type}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#FF9500] text-lg">
                        {loan.interestRate}
                      </div>
                      <div className="text-xs text-gray-500">Interest Rate</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Min CIBIL</span>
                      <span className="font-bold">{loan.minCibil}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Processing</span>
                      <span className="font-bold">{loan.processingTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {loan.pros.map((pro, i) => (
                      <span
                        key={i}
                        className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" /> {pro}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-[#1a3a52] mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {cibilData.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <h4 className="font-bold text-lg text-gray-800 mb-2">
                  {faq.q}
                </h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIBILScoreChecker;
