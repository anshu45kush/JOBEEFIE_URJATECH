export const visualizerConstants = {
  colors: {
    solar: '#FF9500',   // Orange for Solar
    grid: '#EF4444',    // Red for Grid
    battery: '#22C55E', // Green for Battery
    home: '#3B82F6',    // Blue for Home Consumption
    neutral: '#9CA3AF'  // Gray for inactive
  },
  scenarios: {
    sunny: { solar: 100, load: 40, label: 'Sunny Day' },
    cloudy: { solar: 40, load: 50, label: 'Cloudy Day' },
    night: { solar: 0, load: 80, label: 'Night Time' },
    outage: { solar: 80, load: 30, grid: false, label: 'Grid Outage' }
  }
};

export const componentDetails = {
  panel: {
    title: { en: "Solar Panels", hi: "सौर पैनल" },
    desc: { 
      en: "Captures sunlight and converts it into DC electricity. Requires direct sunlight for best performance.",
      hi: "सूर्य के प्रकाश को पकड़ता है और इसे DC बिजली में परिवर्तित करता है। सर्वोत्तम प्रदर्शन के लिए सीधी धूप की आवश्यकता होती है।"
    },
    specs: ["330W - 550W per panel", "25 Year Warranty", "Monocrystalline / Polycrystalline"],
    cost: "₹15,000 - ₹22,000 per panel"
  },
  inverter: {
    title: { en: "Solar Inverter", hi: "सोलर इन्वर्टर" },
    desc: {
      en: "The brain of the system. Converts DC power from panels/batteries to AC power for home appliances.",
      hi: "सिस्टम का मस्तिष्क। पैनल/बैटरी से DC पावर को घरेलू उपकरणों के लिए AC पावर में परिवर्तित करता है।"
    },
    specs: ["97% Efficiency", "Grid-tie / Hybrid / Off-grid", "5-10 Year Warranty"],
    cost: "₹25,000 - ₹80,000"
  },
  battery: {
    title: { en: "Battery Bank", hi: "बैटरी बैंक" },
    desc: {
      en: "Stores excess solar energy generated during the day for use at night or during power cuts.",
      hi: "दिन के दौरान उत्पन्न अतिरिक्त सौर ऊर्जा को रात में या बिजली कटौती के दौरान उपयोग के लिए संग्रहीत करता है।"
    },
    specs: ["Lead Acid / Lithium-ion", "150Ah - 200Ah", "3-5 Year Warranty"],
    cost: "₹15,000 - ₹1,50,000"
  },
  meter: {
    title: { en: "Net Meter / Bi-directional Meter", hi: "नेट मीटर" },
    desc: {
      en: "Records both import (from grid) and export (to grid) of electricity. Essential for On-Grid systems.",
      hi: "बिजली के आयात (ग्रिड से) और निर्यात (ग्रिड को) दोनों को रिकॉर्ड करता है। ऑन-ग्रिड सिस्टम के लिए आवश्यक है।"
    },
    specs: ["Digital Smart Meter", "Approved by DISCOM", "Bi-directional"],
    cost: "₹8,000 - ₹15,000"
  },
  grid: {
    title: { en: "Utility Grid", hi: "उपयोगिता ग्रिड" },
    desc: {
      en: "The public electricity network. Acts as a virtual battery for On-Grid systems.",
      hi: "सार्वजनिक बिजली नेटवर्क। ऑन-ग्रिड सिस्टम के लिए वर्चुअल बैटरी के रूप में कार्य करता है।"
    },
    specs: ["230V Single Phase / 415V Three Phase"],
    cost: "N/A"
  },
  home: {
    title: { en: "Home Load", hi: "घर का लोड" },
    desc: {
      en: "Your appliances and lights. Can run on Solar, Battery, or Grid power depending on availability.",
      hi: "आपके उपकरण और लाइटें। उपलब्धता के आधार पर सौर, बैटरी या ग्रिड पावर पर चल सकता है।"
    },
    specs: ["AC 230V 50Hz"],
    cost: "N/A"
  }
};