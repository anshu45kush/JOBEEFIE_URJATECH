import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronRight, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import CompanyLogo from "@/components/CompanyLogo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.header.home, href: "#home" },
    { name: "Govt. Schemes", href: "#schemes" },
    { name: t.header.cibil, href: "#cibil" },
    { name: t.header.services, href: "#services" },
    { name: t.header.products, href: "#products" },
    { name: t.header.contact, href: "#contact" },
  ];

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: "smooth",
    });

    setIsOpen(false);
    setActive(id);
  };

  const isAccent = (href) => href === "#schemes" || href === "#cibil";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 font-sans
        ${isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"}`}
    >
      {/* TOP BAR */}
      <div className="hidden lg:block bg-gradient-to-r from-[#0f2744] via-[#1a3a52] to-[#0f2744] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-end gap-6 py-1">
          <a
            href={`tel:${t.contact.phoneText}`}
            className="flex items-center gap-2 text-white/70 hover:text-yellow-400"
          >
            <Phone size={12} />
            {t.contact.phoneText}
          </a>

          <span className="w-px bg-white/20" />

          <a
            href={`mailto:${t.contact.emailText}`}
            className="flex items-center gap-2 text-white/70 hover:text-yellow-400"
          >
            <Mail size={12} />
            {t.contact.emailText}
          </a>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="max-w-8xl mx-auto px-2 sm:px-5 lg:px-9 flex items-center justify-between min-h-[64px] sm:min-h-[72px]">
        {/* LEFT */}
        <div className="flex items-center gap-4 sm:gap-4">
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("#home")}
            className="cursor-pointer bg-white p-1 sm:p-3 rounded-xl"
          >
            <CompanyLogo size="medium" />
          </motion.div>

          <div className="hidden md:block w-px h-6 sm:h-8 bg-gray-600" />

          {/* Employee Login */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              (window.location.href = "https://www.kit19.com/login_new.aspx")
            }
            className="hidden md:flex items-center gap-2
              px-4 lg:px-5 h-9 sm:h-10 rounded-xl 
              text-xs sm:text-sm font-semibold
              bg-gradient-to-r from-[#0f2744] to-[#1a3a52]
              text-white shadow-md"
          >
            <Zap size={14} className="text-yellow-400" />
            <span className="hidden lg:inline">Employee Login</span>
            <ChevronRight size={14} className="text-white/50" />
          </motion.button>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex rounded-xl items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`px-3 xl:px-4 py-2 rounded-xl  text-lg xl:text-base font-medium transition
                ${
                  isAccent(link.href)
                    ? "text-orange-500 bg-orange-100"
                    : "text-gray-700  bg-sky-40 hover:border-b-2 border-red-600 hover:text-black"
                }
                ${active === link.href && " border-b-2 border-red-600"}
              `}
            >
              {link.name}
            </button>
          ))}

          <div className="hidden md:block w-px h-6 sm:h-8 bg-gray-600" />

          <LanguageToggle />

          {/* CTA */}
          <button
            onClick={() => scrollToSection("#contact")}
            className="ml-2 px-5 xl:px-6 h-9 sm:h-10 rounded-xl
              text-xs sm:text-sm font-semibold tracking-tight text-white
              bg-gradient-to-r from-orange-500 to-yellow-400
              shadow-md hover:shadow-lg
              hover:scale-[1.03] active:scale-[0.97]
              transition-all duration-200"
          >
            {t.header.getQuote}
          </button>
        </div>

        {/* MOBILE */}

        <div className="flex lg:hidden items-center ">
          <LanguageToggle />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-9 sm:w-10 h-9 sm:h-10 m-2 flex items-center justify-center rounded-xl
              ${
                isOpen
                  ? "bg-gradient-to-r from-orange-500 to-yellow-400 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            {isOpen ? <X size={20} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden px-4 pb-4 mt-4"
          >
            <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2">
              <button
                onClick={() =>
                  (window.location.href =
                    "https://www.kit19.com/login_new.aspx")
                }
                className="w-full h-11 rounded-xl bg-[#1a3a52] text-white font-semibold"
              >
                Employee Login
              </button>

              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-left px-3 py-2 rounded-md font-medium  border-b-2 border-red-600
                    ${
                      isAccent(link.href)
                        ? "text-orange-500 bg-orange-100"
                        : "text-gray-700"
                    }`}
                >
                  {link.name}
                </button>
              ))}

              <button
                onClick={() => scrollToSection("#contact")}
                className="w-full h-11 rounded-xl
                  bg-gradient-to-r from-orange-500 to-yellow-400
                  text-white font-semibold"
              >
                {t.header.getQuote}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL LINE */}
      <motion.div
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        className="h-[2px] origin-left bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500"
      />
    </motion.header>
  );
};

export default Header;
