// import React from "react";
// import { motion } from "framer-motion";
// import {
//   Phone,
//   Mail,
//   MapPin,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
// } from "lucide-react";
// import { useLanguage } from "@/context/LanguageContext";
// import CompanyLogo from "@/components/CompanyLogo";

// const Footer = () => {
//   const { t } = useLanguage();

//   const scrollToSection = (href) => {
//     const element = document.querySelector(href);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const quickLinks = [
//     { name: t.header.home, href: "#home" },
//     { name: t.header.about, href: "#about" },
//     { name: t.header.services, href: "#services" },
//     { name: t.header.products, href: "#products" },
//     { name: t.header.subsidy, href: "#subsidy" },
//     { name: t.header.warranty, href: "#warranty" },
//     { name: t.header.contact, href: "#contact" },
//   ];

//   const services = [
//     t.contact.types.domestic,
//     t.contact.types.commercial,
//     t.contact.types.power,
//     t.contact.types.agriculture,
//   ];

//   return (
//     <footer className="bg-gradient-to-br from-[#1a3a52] to-[#0d1f2f] text-white">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//           {/* Company Info */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="mb-4 bg-white/90 p-3 rounded inline-block">
//               <CompanyLogo size="small" />
//             </div>

//             <p className="text-white/80 mb-4 leading-relaxed">
//               {t.footer.description}
//             </p>

//             {/* Social Icons */}
//             <div className="flex gap-3">
//               <motion.a
//                 href="https://www.facebook.com/share/17TVvuoZV2/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF9500] transition-all duration-300"
//               >
//                 <Facebook className="w-5 h-5" />
//               </motion.a>

//               <motion.a
//                 href="#"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF9500] transition-all duration-300"
//               >
//                 <Twitter className="w-5 h-5" />
//               </motion.a>

//               <motion.a
//                 href="https://www.instagram.com/jobeefie_urjatech?igsh=OWN4YWN3YjR1dG55"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF9500] transition-all duration-300"
//               >
//                 <Instagram className="w-5 h-5" />
//               </motion.a>

//               <motion.a
//                 href="https://linkedin.com/company/yourcompany"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF9500] transition-all duration-300"
//               >
//                 <Linkedin className="w-5 h-5" />
//               </motion.a>
//             </div>
//           </motion.div>

//           {/* Quick Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//           >
//             <h3 className="text-xl font-bold mb-4">{t.footer.quickLinks}</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.href}>
//                   <button
//                     onClick={() => scrollToSection(link.href)}
//                     className="text-white/80 hover:text-[#FFC107] transition-colors duration-200 text-left"
//                   >
//                     {link.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Services */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <h3 className="text-xl font-bold mb-4">{t.footer.services}</h3>
//             <ul className="space-y-2">
//               {services.map((service, index) => (
//                 <li key={index} className="text-white/80">
//                   {service}
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Contact Info */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//           >
//             <h3 className="text-xl font-bold mb-4">{t.footer.contact}</h3>

//             <div className="space-y-3">
//               <a
//                 href="https://www.google.com/maps?q=Bhutani+Alphathum+Sector+90+Noida"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-white/80 hover:text-[#FFC107]"
//               >
//                 Unit No. 604, 6th Floor, Tower B, Bhutani Alphathum, Sector 90,
//                 Noida, Uttar Pradesh - 201305
//               </a>

//               <div className="flex items-center gap-3">
//                 <Phone className="w-5 h-5 text-[#FFC107]" />
//                 <a
//                   href={`tel:${t.contact.phoneText.replace(/\s/g, "")}`}
//                   className="text-white/80 hover:text-[#FFC107]"
//                 >
//                   {t.contact.phoneText}
//                 </a>
//               </div>

//               <div className="flex items-center gap-3">
//                 <Mail className="w-5 h-5 text-[#FFC107]" />
//                 <a
//                   href={`mailto:${t.contact.emailText}`}
//                   className="text-white/80 hover:text-[#FFC107] break-all"
//                 >
//                   {t.contact.emailText}
//                 </a>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-white/10 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-white/70 text-sm text-center md:text-left">
//               © {new Date().getFullYear()} Jobeefie Urjatech. {t.footer.rights}
//             </p>

//             <p className="text-white/70 text-sm text-center md:text-right">
//               {t.common.tagline}
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   Phone,
//   Mail,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   ArrowUpRight,
//   Zap,
// } from "lucide-react";
// import { useLanguage } from "@/context/LanguageContext";
// import CompanyLogo from "@/components/CompanyLogo";

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.05,
//     },
//   },
// };

// const colVariants = {
//   hidden: { opacity: 0, y: 28 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const Footer = () => {
//   const { t } = useLanguage();

//   const scrollToSection = (href) => {
//     const element = document.querySelector(href);
//     if (element) element.scrollIntoView({ behavior: "smooth" });
//   };

//   const quickLinks = [
//     { name: t.header.home, href: "#home" },
//     { name: t.header.about, href: "#about" },
//     { name: t.header.services, href: "#services" },
//     { name: t.header.products, href: "#products" },
//     { name: t.header.subsidy, href: "#subsidy" },
//     { name: t.header.warranty, href: "#warranty" },
//     { name: t.header.contact, href: "#contact" },
//   ];

//   const services = [
//     t.contact.types.domestic,
//     t.contact.types.commercial,
//     t.contact.types.power,
//     t.contact.types.agriculture,
//   ];

//   const socialLinks = [
//     {
//       icon: Facebook,
//       href: "https://www.facebook.com/share/17TVvuoZV2/",
//       label: "Facebook",
//     },
//     { icon: Twitter, href: "#", label: "Twitter" },
//     {
//       icon: Instagram,
//       href: "https://www.instagram.com/jobeefie_urjatech?igsh=OWN4YWN3YjR1dG55",
//       label: "Instagram",
//     },
//     {
//       icon: Linkedin,
//       href: "https://linkedin.com/company/yourcompany",
//       label: "LinkedIn",
//     },
//   ];

//   return (
//     <footer className="relative overflow-hidden bg-[#0b1e2d] text-white">
//       {/* Ambient glow top-left */}
//       <div
//         className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-[0.07]"
//         style={{ background: "radial-gradient(circle, #FF9500 0%, transparent 70%)" }}
//       />
//       {/* Ambient glow bottom-right */}
//       <div
//         className="pointer-events-none absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full opacity-[0.05]"
//         style={{ background: "radial-gradient(circle, #FFC107 0%, transparent 70%)" }}
//       />

//       {/* Top accent line */}
//       <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF9500]/40 to-transparent" />

//       <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-60px" }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
//         >
//           {/* Column 1: Brand */}
//           <motion.div variants={colVariants} className="flex flex-col gap-5">
//             <div className="bg-white/95 p-3 rounded-lg inline-block self-start shadow-md">
//               <CompanyLogo size="small" />
//             </div>

//             <p className="text-white/60 text-sm leading-relaxed max-w-[240px]">
//               {t.footer.description}
//             </p>

//             <div className="flex gap-2.5 flex-wrap">
//               {socialLinks.map(({ icon: Icon, href, label }) => (
//                 <motion.a
//                   key={label}
//                   href={href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={label}
//                   whileHover={{ y: -3, scale: 1.08 }}
//                   whileTap={{ scale: 0.94 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 18 }}
//                   className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#FF9500] hover:bg-[#FF9500]/10 transition-colors duration-200"
//                 >
//                   <Icon className="w-4 h-4" />
//                 </motion.a>
//               ))}
//             </div>
//           </motion.div>

//           {/* Column 2: Quick Links */}
//           <motion.div variants={colVariants}>
//             <h3 className="text-xs font-semibold uppercase tracking-widest text-[#FF9500] mb-5">
//               {t.footer.quickLinks}
//             </h3>
//             <ul className="space-y-2.5">
//               {quickLinks.map((link) => (
//                 <li key={link.href}>
//                   <button
//                     onClick={() => scrollToSection(link.href)}
//                     className="group flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors duration-200 text-left"
//                   >
//                     <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 opacity-0 group-hover:opacity-100">
//                       <ArrowUpRight className="w-3 h-3 text-[#FFC107]" />
//                     </span>
//                     {link.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Column 3: Services */}
//           <motion.div variants={colVariants}>
//             <h3 className="text-xs font-semibold uppercase tracking-widest text-[#FF9500] mb-5">
//               {t.footer.services}
//             </h3>
//             <ul className="space-y-2.5">
//               {services.map((service, index) => (
//                 <li key={index} className="flex items-center gap-2 text-sm text-white/55">
//                   <span className="w-1 h-1 rounded-full bg-[#FF9500]/50 flex-shrink-0" />
//                   {service}
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Column 4: Contact */}
//           <motion.div variants={colVariants}>
//             <h3 className="text-xs font-semibold uppercase tracking-widest text-[#FF9500] mb-5">
//               {t.footer.contact}
//             </h3>

//             <div className="space-y-4">
//               {/* Address */}
//               <a
//                 href="https://www.google.com/maps?q=Bhutani+Alphathum+Sector+90+Noida"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group flex items-start gap-3 text-sm text-white/55 hover:text-white/90 transition-colors duration-200"
//               >
//                 <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FFC107]/40 transition-colors duration-200">
//                   <svg
//                     className="w-4 h-4 text-[#FFC107]"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                 </span>
//                 <span className="leading-relaxed">
//                   Unit No. 604, 6th Floor, Tower B, Bhutani Alphathum, Sector 90, Noida, UP — 201305
//                 </span>
//               </a>

//               {/* Phone */}
//               <a
//                 href={`tel:${t.contact.phoneText.replace(/\s/g, "")}`}
//                 className="group flex items-center gap-3 text-sm text-white/55 hover:text-white/90 transition-colors duration-200"
//               >
//                 <span className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FFC107]/40 transition-colors duration-200">
//                   <Phone className="w-4 h-4 text-[#FFC107]" />
//                 </span>
//                 {t.contact.phoneText}
//               </a>

//               {/* Email */}
//               <a
//                 href={`mailto:${t.contact.emailText}`}
//                 className="group flex items-center gap-3 text-sm text-white/55 hover:text-white/90 transition-colors duration-200 break-all"
//               >
//                 <span className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FFC107]/40 transition-colors duration-200">
//                   <Mail className="w-4 h-4 text-[#FFC107]" />
//                 </span>
//                 {t.contact.emailText}
//               </a>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Divider */}
//         <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

//         {/* Bottom Bar */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
//           {/* Copyright */}
//           <p className="order-2 sm:order-1 text-center sm:text-left">
//             © {new Date().getFullYear()} Jobeefie Urjatech. {t.footer.rights}
//           </p>

//           {/* Tagline */}
//           <p className="order-1 sm:order-2 text-white/25 italic tracking-wide hidden sm:block">
//             {t.common.tagline}
//           </p>

//           {/* Developer credit */}
//           <p className="order-3 flex items-center gap-1 text-white/30">
//             <Zap className="w-3 h-3 text-[#FF9500]/50" />
//             Developed by{" "}
//             <a
//               href="https://www.linkedin.com/in/himanshu-kushwaha-734728333/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white/40 hover:text-[#FFC107] underline-offset-2 hover:underline transition-all duration-200 ml-0.5"
//             >
//               Himanshu
//             </a>
//             {" "}&amp;{" "}
//             <a
//               href="https://www.linkedin.com/in/ram-pratap-maurya-2a14772ab/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white/40 hover:text-[#FFC107] underline-offset-2 hover:underline transition-all duration-200"
//             >
//               Ram
//             </a>
//             {" "}· Powered by{" "}
//             <a
//               href="https://www.instagram.com/varyonics?igsh=MW0xZjFpNGR6eTFvMA=="
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white/40 hover:text-[#FFC107] underline-offset-2 hover:underline transition-all duration-200 ml-0.5"
//             >
//               Varyonics
//             </a>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };//tested by varionics 

// export default Footer;

import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Zap,
  MapPin,
  Sun,
  Shield,
  Award,
  Users,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import CompanyLogo from "@/components/CompanyLogo";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const stats = [
  { icon: Sun,    value: "500+",    label: "Solar Installations" },
  { icon: Award,  value: "₹78,000", label: "Subsidy Assistance"  },
  { icon: Shield, value: "25-Year", label: "Panel Support"       },
  { icon: Users,  value: "100%",    label: "Trusted Across UP"   },
];

const Footer = () => {
  const { t } = useLanguage();

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const quickLinks = [
    { name: t.header.home,     href: "#home"     },
    { name: t.header.about,    href: "#about"    },
    { name: t.header.services, href: "#services" },
    { name: t.header.products, href: "#products" },
    { name: t.header.subsidy,  href: "#subsidy"  },
    { name: t.header.warranty, href: "#warranty" },
    { name: t.header.contact,  href: "#contact"  },
  ];

  const services = [
    t.contact.types.domestic,
    t.contact.types.commercial,
    t.contact.types.power,
    t.contact.types.agriculture,
  ];

  const socials = [
    { icon: Facebook,  href: "https://www.facebook.com/share/17TVvuoZV2/",                              label: "Facebook"  },
    { icon: Twitter,   href: "#",                                                                        label: "Twitter"   },
    { icon: Instagram, href: "https://www.instagram.com/jobeefie_urjatech?igsh=OWN4YWN3YjR1dG55",      label: "Instagram" },
    { icon: Linkedin,  href: "https://linkedin.com/company/yourcompany",                                 label: "LinkedIn"  },
  ];

  return (
    <footer className="relative bg-[#08172280] overflow-hidden" style={{ background: "#071520" }}>

      {/* ── decorative orbs ── */}
      <div className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
           style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,149,0,0.06) 0%, transparent 65%)" }} />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
           style={{ background: "radial-gradient(circle at 70% 70%, rgba(255,193,7,0.04) 0%, transparent 65%)" }} />

      {/* ── gold top border ── */}
      <div className="w-full h-[2px]"
           style={{ background: "linear-gradient(90deg, transparent 0%, #FF9500 30%, #FFC107 70%, transparent 100%)" }} />

      {/* ════════════════════════════════
          STATS BAND
      ════════════════════════════════ */}
      <div className="relative z-10 border-b border-white/[0.06]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center gap-3 py-8 px-4 bg-[#071520] group hover:bg-white/[0.03] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                     style={{ background: "rgba(255,149,0,0.1)", border: "1px solid rgba(255,149,0,0.2)" }}>
                  <Icon className="w-5 h-5 text-[#FF9500]" />
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-[#FF9500] leading-none mb-1"
                     style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {value}
                  </p>
                  <p className="text-xs text-white/40 tracking-wide">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          MAIN FOOTER GRID
      ════════════════════════════════ */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

          {/* ── Col 1: Brand (spans 3) ── */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col gap-5"
          >
            <div className="bg-white rounded-xl p-3 inline-block self-start shadow-lg shadow-black/30">
              <CompanyLogo size="small" />
            </div>

            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full"
                 style={{ background: "rgba(255,149,0,0.1)", border: "1px solid rgba(255,149,0,0.2)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF9500] animate-pulse" />
              <span className="text-[11px] font-medium text-[#FFC107] tracking-wider">
                Empowering Uttar Pradesh
              </span>
            </div>

            <p className="text-[13px] leading-relaxed text-white/45 max-w-[230px]">
              {t.footer.description}
            </p>

            <div className="flex gap-2 flex-wrap">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 transition-all duration-200 hover:text-white"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255,149,0,0.12)";
                    e.currentTarget.style.border = "1px solid rgba(255,149,0,0.3)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Col 2: Quick Links (spans 2) ── */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#FF9500] mb-6">
              {t.footer.quickLinks}
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="group flex items-center gap-2 text-[13px] text-white/45 hover:text-white transition-colors duration-200 text-left"
                  >
                    <span className="w-4 h-[1px] bg-[#FF9500]/40 group-hover:w-6 group-hover:bg-[#FF9500] transition-all duration-300" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 3: Services (spans 3) ── */}
          <motion.div
            custom={2} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#FF9500] mb-6">
              {t.footer.services}
            </p>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i} className="flex items-center gap-3 text-[13px] text-white/45">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                       style={{ background: "rgba(255,149,0,0.5)" }} />
                  {service}
                </li>
              ))}
            </ul>

            {/* CTA mini card */}
            <div className="mt-8 p-4 rounded-xl"
                 style={{ background: "rgba(255,149,0,0.06)", border: "1px solid rgba(255,149,0,0.15)" }}>
              <p className="text-[11px] text-white/40 mb-2 uppercase tracking-wider">Free Consultation</p>
              <p className="text-sm font-medium text-white/80 mb-3">
                Get your free solar assessment today
              </p>
              <button
                onClick={() => scrollTo("#contact")}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#FF9500] hover:text-[#FFC107] transition-colors duration-200"
              >
                Book Now <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* ── Col 4: Contact (spans 4) ── */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#FF9500] mb-6">
              {t.footer.contact}
            </p>

            <div className="space-y-4">

              {/* Address */}
              <a
                href="https://www.google.com/maps?q=Bhutani+Alphathum+Sector+90+Noida"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <div className="mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                     style={{ background: "rgba(255,149,0,0.08)", border: "1px solid rgba(255,149,0,0.15)" }}>
                  <MapPin className="w-4 h-4 text-[#FF9500]" />
                </div>
                <div>
                  <p className="text-[11px] text-white/30 uppercase tracking-wider mb-0.5">Office</p>
                  <p className="text-[13px] text-white/50 group-hover:text-white/80 transition-colors duration-200 leading-relaxed">
                    Unit No. 604, 6th Floor, Tower B,<br />
                    Bhutani Alphathum, Sector 90,<br />
                    Noida, UP — 201305
                  </p>
                </div>
              </a>

              <div className="w-full h-[1px] bg-white/[0.05]" />

              {/* Phone */}
              <a
                href={`tel:${t.contact.phoneText?.replace(/\s/g, "")}`}
                className="group flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                     style={{ background: "rgba(255,149,0,0.08)", border: "1px solid rgba(255,149,0,0.15)" }}>
                  <Phone className="w-4 h-4 text-[#FF9500]" />
                </div>
                <div>
                  <p className="text-[11px] text-white/30 uppercase tracking-wider mb-0.5">Call Us</p>
                  <p className="text-[13px] text-white/50 group-hover:text-white/80 transition-colors duration-200 font-medium">
                    {t.contact.phoneText}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${t.contact.emailText}`}
                className="group flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                     style={{ background: "rgba(255,149,0,0.08)", border: "1px solid rgba(255,149,0,0.15)" }}>
                  <Mail className="w-4 h-4 text-[#FF9500]" />
                </div>
                <div>
                  <p className="text-[11px] text-white/30 uppercase tracking-wider mb-0.5">Email Us</p>
                  <p className="text-[13px] text-white/50 group-hover:text-white/80 transition-colors duration-200 break-all">
                    {t.contact.emailText}
                  </p>
                </div>
              </a>

            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-[1px] mb-6"
             style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)" }} />

        {/* ── Bottom bar ── */}
{/* ── Bottom bar ── */}
<div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/25">

  <p className="order-2 sm:order-1">
    © {new Date().getFullYear()} Jobeefie Urjatech. {t.footer.rights}
  </p>

  <p className="order-1 sm:order-2 flex items-center gap-1.5">
    <Zap className="w-3 h-3 text-[#FF9500]/40" />
    Powered by{" "}
    <a href="https://www.instagram.com/varyonics?igsh=MW0xZjFpNGR6eTFvMA=="
       target="_blank" rel="noopener noreferrer"
       className="text-white/35 hover:text-[#FFC107] transition-colors duration-200 underline underline-offset-2">
      Varyonics
    </a>
  </p>

  <p className="order-3 flex items-center gap-1.5 flex-wrap justify-center sm:justify-end">
    Developed by{" "}
    <a href="https://www.linkedin.com/in/himanshu-kushwaha-734728333/"
       target="_blank" rel="noopener noreferrer"
       className="text-white/35 hover:text-[#FFC107] transition-colors duration-200 underline underline-offset-2">
      Himanshu
    </a>
    {" "}&amp;{" "}
    <a href="https://www.linkedin.com/in/ram-pratap-maurya-2a14772ab/"
       target="_blank" rel="noopener noreferrer"
       className="text-white/35 hover:text-[#FFC107] transition-colors duration-200 underline underline-offset-2">
      Ram
    </a>
  </p>

</div>
      </div>
    </footer>
  );
};

export default Footer;