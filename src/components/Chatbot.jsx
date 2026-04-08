import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, MinusCircle, RefreshCcw, User, Bot, ChevronUp, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const Chatbot = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const knowledgeBase = {
    en: {
      installation: "Our solar installation process typically takes 3-7 days after site approval. It includes site survey, design, procurement, installation, and grid connectivity. We handle all paperwork!",
      subsidy: "Under PM Surya Ghar Muft Bijli Yojana, you can get up to ₹78,000 subsidy for 3kW systems. State subsidies may also apply. We handle all subsidy documentation for you.",
      products: "We partner with premium brands like Tata Power, Adani Solar, Waaree, UTL, and Loom Solar. We use high-efficiency Mono PERC and Bifacial panels.",
      warranty: "We offer a 25-year performance warranty on panels and a comprehensive 5-year extra service warranty on the entire system, including inverters and workmanship.",
      price: "Pricing varies by system size and components. A typical 3kW system costs approx ₹1.8 Lakhs before subsidy. ROI is usually achieved within 3-4 years.",
      contact: "To book a free engineer visit, please call us at +91 91513 68100. We offer free site surveys!",
      cibil: "A good CIBIL score (750+) helps you get lower interest rates on solar loans. You can check your eligibility in our CIBIL section.",
      greeting: "Welcome to Jobeefie Urjatech! 👋 How can we help you today?",
      fallback: "For complex queries or custom requirements, please call us directly at +91 91513 68100. Our experts are ready to assist you!"
    },
    hi: {
      installation: "हमारी सौर स्थापना प्रक्रिया में आमतौर पर साइट अनुमोदन के बाद 3-7 दिन लगते हैं। इसमें साइट सर्वेक्षण, डिजाइन, खरीद, स्थापना और ग्रिड कनेक्टिविटी शामिल है। हम सभी कागजी कार्रवाई संभालते हैं!",
      subsidy: "पीएम सूर्य घर मुफ्त बिजली योजना के तहत, आप 3kW सिस्टम के लिए ₹78,000 तक की सब्सिडी प्राप्त कर सकते हैं। राज्य सब्सिडी भी लागू हो सकती है। हम आपके लिए सभी सब्सिडी दस्तावेज़ीकरण संभालते हैं।",
      products: "हम टाटा पावर, अडानी सोलर, वारी, यूटीएल और लूम सोलर जैसे प्रीमियम ब्रांडों के साथ साझेदारी करते हैं। हम उच्च दक्षता वाले मोनो पर्क और बिफेशियल पैनल का उपयोग करते हैं।",
      warranty: "हम पैनलों पर 25 साल की प्रदर्शन वारंटी और इनवर्टर और कारीगरी सहित पूरे सिस्टम पर 5 साल की व्यापक अतिरिक्त सेवा वारंटी प्रदान करते हैं।",
      price: "मूल्य निर्धारण सिस्टम के आकार और घटकों के अनुसार भिन्न होता है। एक सामान्य 3kW सिस्टम की लागत सब्सिडी से पहले लगभग ₹1.8 लाख है। ROI आमतौर पर 3-4 वर्षों के भीतर प्राप्त किया जाता है।",
      contact: "मुफ्त इंजीनियर विज़िट बुक करने के लिए, कृपया हमें +91 91513 68100 पर कॉल करें। हम मुफ्त साइट सर्वेक्षण प्रदान करते हैं!",
      cibil: "एक अच्छा सिबिल स्कोर (750+) आपको सोलर लोन पर कम ब्याज दर प्राप्त करने में मदद करता है। आप हमारे सिबिल अनुभाग में अपनी पात्रता की जांच कर सकते हैं।",
      greeting: "जोबीफी ऊर्जाटेक में आपका स्वागत है! 👋 हम आपकी कैसे मदद कर सकते हैं?",
      fallback: "जटिल प्रश्नों या विशेष आवश्यकताओं के लिए, कृपया हमें सीधे +91 91513 68100 पर कॉल करें। हमारे विशेषज्ञ आपकी सहायता के लिए तैयार हैं!"
    }
  };

  const keywords = {
    installation: ['install', 'process', 'time', 'long', 'days', 'step', 'how', 'प्रक्रिया', 'समय', 'दिन', 'स्थापना'],
    subsidy: ['subsidy', 'govt', 'scheme', 'pm', 'yojana', 'discount', 'benefit', 'सब्सिडी', 'योजना', 'सरकार', 'छूट'],
    products: ['product', 'brand', 'panel', 'tata', 'adani', 'waree', 'utl', 'loom', 'module', 'ब्रांड', 'पैनल', 'उत्पाद'],
    warranty: ['warranty', 'guarantee', 'repair', 'service', 'life', 'maintenance', 'वारंटी', 'गारंटी', 'सेवा', 'मरम्मत'],
    price: ['price', 'cost', 'rate', 'money', 'lakh', 'rupee', 'roi', 'expensive', 'मूल्य', 'लागत', 'पैसा', 'रुपये'],
    contact: ['contact', 'call', 'phone', 'number', 'visit', 'book', 'engineer', 'survey', 'संपर्क', 'फोन', 'नंबर', 'कॉल'],
    cibil: ['cibil', 'score', 'credit', 'loan', 'finance', 'emi', 'सिबिल', 'स्कोर', 'लोन', 'ऋण']
  };

  useEffect(() => {
    // Initial greeting
    if (messages.length === 0) {
      setMessages([{
        type: 'bot',
        text: knowledgeBase[language].greeting + " 📞 +91 91513 68100",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    const currentKB = knowledgeBase[language];
    
    // Check keywords
    for (const [key, words] of Object.entries(keywords)) {
      if (words.some(word => lowerInput.includes(word))) {
        return currentKB[key];
      }
    }
    
    return currentKB.fallback;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate thinking delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(userMessage.text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  const handleQuickReply = (questionKey) => {
    const questions = {
      process: language === 'en' ? "What is the installation process?" : "स्थापना प्रक्रिया क्या है?",
      subsidy: language === 'en' ? "Tell me about subsidies." : "सब्सिडी के बारे में बताएं।",
      pricing: language === 'en' ? "How much does it cost?" : "इसकी लागत कितनी है?",
      cibil: language === 'en' ? "Check CIBIL Eligibility" : "सिबिल पात्रता जांचें",
      contact: language === 'en' ? t.common.callNow : t.common.callNow 
    };

    const text = questions[questionKey];
    
    if (questionKey === 'cibil') {
      document.getElementById('cibil').scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      return;
    }

    setInputValue(text);
    const userMessage = {
      type: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none">
      <div className="pointer-events-auto">
        <AnimatePresence>
          {isOpen && !isMinimized && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-white w-[350px] sm:w-[380px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 mb-4"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#1a3a52] to-[#2a4a62] p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{t.chatbot.header}</h3>
                    <p className="text-xs text-green-300 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Online
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setIsMinimized(true)} className="hover:bg-white/20 p-1 rounded transition">
                    <MinusCircle className="w-5 h-5" />
                  </button>
                  <button onClick={() => setMessages([])} className="hover:bg-white/20 p-1 rounded transition">
                    <RefreshCcw className="w-5 h-5" />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                        msg.type === 'user'
                          ? 'bg-[#FF9500] text-white rounded-tr-none'
                          : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                      <span className={`text-[10px] block mt-1 ${msg.type === 'user' ? 'text-white/80' : 'text-gray-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </motion.div>
                ))}
                
                {/* Suggestions (only show if chat is empty or last message was greeting) */}
                {messages.length === 1 && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {Object.entries(t.chatbot.suggestions).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => handleQuickReply(key)}
                        className="text-xs bg-white border border-[#FF9500] text-[#FF9500] hover:bg-[#FF9500] hover:text-white py-2 px-3 rounded-lg transition-colors text-center"
                      >
                        {label}
                      </button>
                    ))}
                    <button
                        onClick={() => handleQuickReply('cibil')}
                        className="text-xs bg-white border border-[#1a3a52] text-[#1a3a52] hover:bg-[#1a3a52] hover:text-white py-2 px-3 rounded-lg transition-colors text-center flex items-center justify-center gap-1 col-span-2"
                      >
                        <CreditCard className="w-3 h-3" /> Check CIBIL Eligibility
                      </button>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.chatbot.inputPlaceholder}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500] text-sm text-gray-800"
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-[#1a3a52] hover:bg-[#2a4a62] text-white rounded-full p-2 h-auto aspect-square flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {isMinimized && isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-t-xl shadow-lg border border-gray-200 w-[200px] mb-4 cursor-pointer"
              onClick={() => setIsMinimized(false)}
            >
               <div className="bg-[#1a3a52] p-3 rounded-t-xl flex items-center justify-between text-white">
                  <span className="text-sm font-bold">Chat with us</span>
                  <ChevronUp className="w-4 h-4" />
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        {!isOpen && (
           <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className="bg-[#FF9500] hover:bg-[#FFC107] text-white p-4 rounded-full shadow-lg flex items-center justify-center group relative"
          >
            <MessageCircle className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce"></span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Chatbot;