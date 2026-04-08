export const productsDatabase = {
  companies: [
    {
      id: 'tata',
      name: 'Tata Power Solar',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_Power_Logo.svg/1200px-Tata_Power_Logo.svg.png',
      description: 'India\'s most trusted solar brand with over 30 years of manufacturing experience.',
      certifications: ['IEC 61215', 'IEC 61730', 'BIS']
    },
    {
      id: 'adani',
      name: 'Adani Solar',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Adani_Group_logo.svg/1200px-Adani_Group_logo.svg.png',
      description: 'Top-tier Indian solar manufacturer known for high-efficiency modules and large-scale projects.',
      certifications: ['IEC', 'UL', 'BIS']
    },
    {
      id: 'waree',
      name: 'Waaree Energies',
      logo: 'https://www.waaree.com/images/logo.png',
      description: 'One of India\'s largest solar PV module manufacturers with a wide range of products.',
      certifications: ['IEC', 'BIS', 'TUV']
    },
    {
      id: 'luminous',
      name: 'Luminous',
      logo: 'https://www.luminousindia.com/media/logo/stores/1/Luminous_Logo_1.png',
      description: 'Leading power backup and home electrical specialist in India.',
      certifications: ['ISO 9001', 'ISO 14001']
    },
    {
      id: 'utl',
      name: 'UTL Solar',
      logo: 'https://utlsolar.com/wp-content/uploads/2020/06/UTL-Solar-Logo.png',
      description: 'Excellent range of solar inverters and batteries specifically designed for Indian conditions.',
      certifications: ['MNRE Approved', 'BIS']
    },
    {
      id: 'loom',
      name: 'Loom Solar',
      logo: 'https://www.loomsolar.com/cdn/shop/files/Loom_Solar_Logo_300x.png',
      description: 'Innovative startup focusing on high-efficiency mono-perc and bifacial panels.',
      certifications: ['IEC', 'BIS']
    },
    {
      id: 'microtek',
      name: 'Microtek',
      logo: 'https://www.microtekdirect.com/media/logo/stores/1/logo_1.png',
      description: 'Technology innovator and a pioneer in the power backup industry of India.',
      certifications: ['ISO', 'BIS']
    },
    {
      id: 'fujiyama',
      name: 'Fujiyama',
      logo: '', // Placeholder if no direct URL, handled by UI fallback
      description: 'Emerging player delivering quality solar solutions at competitive prices.',
      certifications: ['ISO', 'BIS']
    }
  ],
  products: [
    // --- PANELS ---
    {
      id: 'p1',
      category: 'panel',
      companyId: 'tata',
      model: 'Tata Power 445W Mono Perc',
      name: 'Tata 445W Monocrystalline PERC Split Cell',
      wattage: 445,
      type: 'Monocrystalline PERC',
      efficiency: 20.5,
      productWarranty: 12,
      performanceWarranty: 25,
      price: 13500,
      compatibility: ['ongrid', 'hybrid', 'offgrid'],
      features: ['Split Cell Technology', 'Low Light Performance', 'Anti-PID'],
      specs: { dimensions: '2108 x 1048 x 35 mm', weight: '24 kg', tempCoeff: '-0.35%/°C' },
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'p2',
      category: 'panel',
      companyId: 'adani',
      model: 'Adani 540W Bifacial',
      name: 'Adani 540W Bifacial TopCon Module',
      wattage: 540,
      type: 'Bifacial TOPCON',
      efficiency: 21.8,
      productWarranty: 12,
      performanceWarranty: 30,
      price: 16500,
      compatibility: ['ongrid', 'hybrid'],
      features: ['Dual Glass', 'Generation from rear side', 'Zero LID'],
      specs: { dimensions: '2278 x 1134 x 30 mm', weight: '32 kg', tempCoeff: '-0.30%/°C' },
      image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'p3',
      category: 'panel',
      companyId: 'loom',
      model: 'Shark 550',
      name: 'Loom Solar Shark 550W Mono Perc Half Cut',
      wattage: 550,
      type: 'Monocrystalline Half-cut',
      efficiency: 21.0,
      productWarranty: 10,
      performanceWarranty: 25,
      price: 17000,
      compatibility: ['ongrid', 'hybrid', 'offgrid'],
      features: ['Super High Efficiency', 'MBB Technology', 'Reduced Hot Spot Loss'],
      specs: { dimensions: '2279 x 1134 x 35 mm', weight: '29 kg', tempCoeff: '-0.34%/°C' },
      image: 'https://images.unsplash.com/photo-1592833159057-65a269f3d200?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'p4',
      category: 'panel',
      companyId: 'waree',
      model: 'Waaree 335W Poly',
      name: 'Waaree 335W Polycrystalline',
      wattage: 335,
      type: 'Polycrystalline',
      efficiency: 17.5,
      productWarranty: 10,
      performanceWarranty: 25,
      price: 9500,
      compatibility: ['ongrid', 'offgrid'],
      features: ['Cost Effective', 'Robust Design', 'Reliable in high temp'],
      specs: { dimensions: '1960 x 990 x 35 mm', weight: '22 kg', tempCoeff: '-0.38%/°C' },
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?auto=format&fit=crop&q=80&w=800'
    },

    // --- INVERTERS ---
    {
      id: 'i1',
      category: 'inverter',
      companyId: 'luminous',
      model: 'Luminous NXG 1400',
      name: 'Luminous NXG 1400 Solar Hybrid Inverter',
      capacity: '1.1 kVA',
      type: 'Hybrid (Off-grid capable)',
      efficiency: 85,
      warranty: '2 Years',
      price: 8500,
      compatibility: ['offgrid', 'hybrid'],
      features: ['ISOT Technology', 'Intelligent Load Sharing', 'Built-in Charge Controller'],
      specs: { dimensions: '300 x 300 x 200 mm', weight: '12 kg', tempCoeff: 'N/A' },
      image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'i2',
      category: 'inverter',
      companyId: 'utl',
      model: 'UTL Gamma Plus',
      name: 'UTL Gamma Plus 1kVA 12V rMPPT',
      capacity: '1 kVA',
      type: 'Off-grid rMPPT',
      efficiency: 94,
      warranty: '2 Years',
      price: 10500,
      compatibility: ['offgrid'],
      features: ['rMPPT Technology', 'Multi-colour LCD', 'Supports all battery types'],
      specs: { dimensions: '350 x 300 x 200 mm', weight: '15 kg', tempCoeff: 'N/A' },
      image: 'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'i3',
      category: 'inverter',
      companyId: 'microtek',
      model: 'Microtek M-Sun 1135',
      name: 'Microtek M-Sun Solar Inverter 1135',
      capacity: '1135 VA',
      type: 'Solar PCU',
      efficiency: 80,
      warranty: '2 Years',
      price: 6500,
      compatibility: ['offgrid'],
      features: ['PWM Technology', 'DSC Based', 'Mains Mode Selection'],
      specs: { dimensions: '280 x 280 x 180 mm', weight: '10 kg', tempCoeff: 'N/A' },
      image: 'https://images.unsplash.com/photo-1548613053-220015f6067b?auto=format&fit=crop&q=80&w=800'
    },

    // --- BATTERIES ---
    {
      id: 'b1',
      category: 'battery',
      companyId: 'luminous',
      model: 'LME 12V 150Ah',
      name: 'Luminous Solar 150Ah C10 Tubular Battery',
      capacity: '150 Ah',
      type: 'Lead Acid Tubular',
      efficiency: 85,
      warranty: '5 Years',
      price: 14500,
      compatibility: ['offgrid', 'hybrid'],
      features: ['C10 Rating', 'Low Maintenance', 'Long Life'],
      specs: { dimensions: '500 x 190 x 400 mm', weight: '55 kg', tempCoeff: 'N/A' },
      image: 'https://images.unsplash.com/photo-1616401784845-180886ba9bb8?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'b2',
      category: 'battery',
      companyId: 'utl',
      model: 'UTL 12V 200Ah',
      name: 'UTL Solar 200Ah C10 Battery',
      capacity: '200 Ah',
      type: 'Lead Acid Tubular',
      efficiency: 85,
      warranty: '3+2 Years',
      price: 18500,
      compatibility: ['offgrid', 'hybrid'],
      features: ['High Acid Volume', 'Unique Tubular Gauntlet', 'Quick Recharge'],
      specs: { dimensions: '500 x 190 x 400 mm', weight: '65 kg', tempCoeff: 'N/A' },
      image: 'https://images.unsplash.com/photo-1619641472913-755017e2978a?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'b3',
      category: 'battery',
      companyId: 'loom',
      model: 'Loom Atom 100Ah',
      name: 'Loom Solar Lithium Battery 100Ah 12V',
      capacity: '100 Ah (Li-ion)',
      type: 'Lithium-ion',
      efficiency: 95,
      warranty: '3 Years',
      price: 25000,
      compatibility: ['offgrid', 'hybrid'],
      features: ['Maintenance Free', 'Light Weight', 'Fast Charging', '2000+ Cycles'],
      specs: { dimensions: '300 x 200 x 200 mm', weight: '12 kg', tempCoeff: 'N/A' },
      image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800'
    }
  ]
};