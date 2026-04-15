import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.projectType
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const submissionData = {
      ...formData,
      locationReference:
        "Unit No. 604, 6th Floor, Tower B, Bhutani Alphathum, Sector 90, Noida, Uttar Pradesh - 201305",
    };

    console.log("Form submitted:", submissionData);

    toast({
      title: t.contact.form.success,
      description: t.contact.form.successDesc,
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    });
  };

  // ✅ Updated Contact Info (Address fixed + clickable)
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: t.contact.phoneLabel,
      details: t.contact.phoneText,
      action: `tel:${t.contact.phoneText.replace(/\s/g, "")}`,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t.contact.emailLabel,
      details: t.contact.emailText,
      action: `mailto:${t.contact.emailText}`,
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t.contact.addressLabel,
      details:
        "Unit No. 604, 6th Floor, Tower B, Bhutani Alphathum, Sector 90, Noida, Uttar Pradesh - 201305",
      action: "https://www.google.com/maps?q=Bhutani+Alphathum+Sector+90+Noida",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a52] mb-4">
            {t.contact.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF9500] to-[#FFC107] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#FF9500] via-[#FFC107] to-[#FF9500] rounded-2xl p-8 text-center mb-12 shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            {t.contact.ctaTitle}
          </h3>
          <p className="text-xl text-white/90 mb-6">{t.contact.ctaSubtitle}</p>

          <a href={`tel:${t.contact.phoneText.replace(/\s/g, "")}`}>
            <Button className="bg-white text-[#FF9500] hover:bg-gray-100 font-bold px-8 py-5 rounded-xl">
              <Phone className="mr-2" />
              {t.common.ctaMain}
            </Button>
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-[#1a3a52] mb-8">
              {t.contact.infoTitle}
            </h3>

            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-[#FF9500] to-[#FFC107] w-12 h-12 rounded-lg flex items-center justify-center text-white">
                      {info.icon}
                    </div>

                    <div>
                      <div className="font-semibold text-gray-700">
                        {info.title}
                      </div>

                      <a
                        href={info.action}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1a3a52] font-bold text-lg hover:text-[#FF9500]"
                      >
                        {info.details}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-[#1a3a52] text-white p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-[#FFC107]" />
                <h4 className="text-xl font-bold">{t.contact.hoursTitle}</h4>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Saturday:</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>10:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h3 className="text-3xl font-bold text-[#1a3a52] mb-6">
              {t.contact.formTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={t.contact.form[field]}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              ))}

              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
                required
              >
                <option value="">{t.contact.form.selectType}</option>
                <option value="domestic">{t.contact.types.domestic}</option>
                <option value="commercial">{t.contact.types.commercial}</option>
                <option value="power">{t.contact.types.power}</option>
                <option value="agriculture">
                  {t.contact.types.agriculture}
                </option>
              </select>

              <textarea
                name="message"
                rows="4"
                placeholder={t.contact.form.message}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />

              <Button type="submit" className="w-full bg-[#FF9500] text-white">
                <Send className="mr-2" />
                {t.contact.form.submit}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
