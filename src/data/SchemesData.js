export const schemesData = {
  pmSuryaghar: {
    overview: {
      title: "PM Surya Ghar: Muft Bijli Yojana",
      description: "A flagship scheme by the Government of India to provide free electricity to 1 crore households. Get up to ₹78,000 subsidy directly in your bank account.",
      highlights: ["Free Electricity", "Direct Subsidy", "25 Year Savings"]
    },
    subsidyTable: [
      { capacity: "0-1 kW", subsidy: "₹30,000", percentage: "Approx 40-50%" },
      { capacity: "1-2 kW", subsidy: "₹60,000", percentage: "Approx 40%" },
      { capacity: "2-3 kW", subsidy: "₹78,000", percentage: "Approx 30-40%" },
      { capacity: "> 3 kW", subsidy: "₹78,000 (Fixed)", percentage: "Fixed Cap" }
    ],
    eligibility: [
      { title: "Ownership", text: "Must own the house with roof rights." },
      { title: "Connection", text: "Valid electricity connection in own name." },
      { title: "Income", text: "Valid bank account linked with Aadhar." },
      { title: "Previous", text: "Must not have availed solar subsidy before." }
    ],
    steps: [
      { title: "Registration", desc: "Register on pmsuryaghar.gov.in" },
      { title: "Application", desc: "Apply for Rooftop Solar" },
      { title: "Approval", desc: "Technical Feasibility Approval by DISCOM" },
      { title: "Installation", desc: "Install via Registered Vendor (Jobeefie)" },
      { title: "Net Metering", desc: "Apply for Net Meter & Inspection" },
      { title: "Commissioning", desc: "Certificate from DISCOM" },
      { title: "Subsidy", desc: "Submit bank details & receive money" }
    ]
  },
  documents: [
    { name: "Electricity Bill", required: true },
    { name: "Aadhar Card", required: true },
    { name: "PAN Card", required: false },
    { name: "Bank Passbook/Cheque", required: true },
    { name: "Passport Photo", required: true },
    { name: "Property Papers", required: false }
  ],
  stories: [
    {
      id: 1,
      name: "Ramesh Gupta",
      location: "Lucknow, UP",
      system: "3kW Residential",
      subsidy: "₹78,000",
      savings: "₹36,000/year",
      image: "https://images.unsplash.com/photo-1643035660996-0834db96a85a",
      testimonial: "The subsidy process was smooth. Jobeefie team handled all the paperwork."
    },
    {
      id: 2,
      name: "Sneha Patel",
      location: "Kanpur, UP",
      system: "5kW Residential",
      subsidy: "₹78,000",
      savings: "₹60,000/year",
      image: "https://images.unsplash.com/photo-1621750072333-c972efe8ebbd",
      testimonial: "My electricity bill is now zero. Best investment for my home."
    },
    {
      id: 3,
      name: "Vikram Singh",
      location: "Varanasi, UP",
      system: "10kW Commercial",
      subsidy: "Tax Benefits",
      savings: "₹1.2 Lakhs/year",
      image: "https://images.unsplash.com/photo-1623696613585-7319e61a5659",
      testimonial: "Great for business. The depreciation benefits are substantial."
    }
  ],
  faqs: [
    {
      q: "Who is eligible for PM Surya Ghar Yojana?",
      a: "Any Indian household with a suitable roof and valid electricity connection who has not availed solar subsidy earlier is eligible."
    },
    {
      q: "How long does it take to get the subsidy?",
      a: "Typically, the subsidy is credited to your bank account within 30 days after the commissioning certificate is issued."
    },
    {
      q: "Can I install it on my office roof?",
      a: "This specific scheme is for residential households. Offices can avail commercial benefits like accelerated depreciation."
    }
  ]
};