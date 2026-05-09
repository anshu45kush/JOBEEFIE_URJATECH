import { useState } from "react";
const AboutTeam = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const ceoMember = {
    id: 1,
    name: "Raj Pandey",
    designation: "Business Head",
    message:
      "At UrjaTech, we believe clean energy is a right, not a luxury. Our mission is to empower every household in Uttar Pradesh with affordable, reliable solar solutions.",
    mission: "15+ years transforming renewable energy across India",
    image:
      "/images/raj-pandey.png",
  };

  const teamMembers = [
    {
      id: 2,
      name: "Vipin Singh",
      designation: "Cluster Head Sales",
      responsibility: "Driving growth and building strong customer relationships through strategic solar sales and market expansion.",
      image: "/images/vipin-singh.png",
    },
    {
      id: 3,
      name: "Shobhit Sahoo",
      designation: "Cluster Head Officer",
      responsibility: "Overseeing regional operations, team coordination, and ensuring efficient execution of solar projects across multiple territories.",
      image: "/images/shobhit-sahoo.png",
    },
    {
      id: 4,
      name: "Satyam Singh",
      designation: "Zonal Manager",
      responsibility: "Leading regional operations and strengthening customer relationships to expand clean energy adoption across Uttar Pradesh.",
      image: "/images/satyam-singh.png",
    },
    {
      id: 5,
      name: "Amit Verma",
      designation: "Regional Manager",
      responsibility: "Managing client relationships, customer support, and ensuring a smooth experience throughout the solar journey.",
      image: "/images/amit-verma.jpeg",
    },
    {
      id: 6,
      name: "Aryan Raj",
      designation: "IT Manager",
      responsibility: "Managing digital infrastructure, technology systems, and ensuring smooth technical operations across the organization.",
      image: "/images/aryan-raj.jpeg",
    },
    {
      id: 7,
      name: "Himanshu Kushwaha",
      designation: "CRM&Vendor Manager",
      responsibility: "Managing vendor partnerships, customer relationship systems, and ensuring smooth operational coordination across solar projects.",
      image: "/images/himanshu-kushwaha.png",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Homes Powered" },
    { value: "25 Yrs", label: "Warranty Guarantee" },
    { value: "15+", label: "Years of Expertise" },
    { value: "98%", label: "Customer Satisfaction" },
  ];

  return (
    <section
      style={{
        fontFamily: "'Sora', sans-serif",
        background: "#fff",
        color: "#1a2d4d",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

        *, *::before, *::after { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
          outline: none;
        }

        :root {
          --navy: #0d1f3c;
          --navy-mid: #1a2d4d;
          --navy-light: #2d4563;
          --orange: #FF9500;
          --orange-glow: rgba(255,149,0,0.15);
          --orange-light: #ffd280;
          --white: #ffffff;
          --off-white: #f7f8fc;
          --muted: #64748b;
          --border: rgba(13,31,60,0.08);
          --shadow-sm: 0 2px 8px rgba(13,31,60,0.08);
          --shadow-md: 0 8px 24px rgba(13,31,60,0.12);
          --shadow-lg: 0 24px 64px rgba(13,31,60,0.15);
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideRight {
          from { width: 0; }
          to { width: 56px; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.92); opacity: 0.6; }
          50% { transform: scale(1.04); opacity: 0.2; }
          100% { transform: scale(0.92); opacity: 0.6; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        /* ── UTILITY CLASSES ── */
        .u-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .u-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 14px;
          animation: fadeUp 0.7s ease both;
        }

        .u-rule {
          width: 56px;
          height: 3px;
          background: linear-gradient(90deg, var(--orange), #ffcc70);
          border-radius: 4px;
          margin-bottom: 28px;
          animation: slideRight 0.9s ease 0.3s both;
        }

        /* ── HERO SECTION ── */
        .hero {
          background: var(--navy);
          padding: 100px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 55% at 80% 50%, rgba(255,149,0,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(45,69,99,0.6) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 760px;
          animation: fadeUp 0.8s ease 0.1s both;
        }

        .hero-h1 {
          font-size: clamp(2.4rem, 6vw, 4rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -1px;
          margin-bottom: 22px;
        }

        .hero-h1 span {
          background: linear-gradient(90deg, #FF9500, #ffd280);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(255,255,255,0.65);
          line-height: 1.8;
          max-width: 540px;
          margin-bottom: 28px;
          font-weight: 300;
        }

        .hero-desc {
          font-size: 0.975rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.8;
          max-width: 500px;
          font-weight: 300;
        }

        /* ── STATS BAR ── */
        .stats-bar {
          background: var(--white);
          border-bottom: 1px solid var(--border);
          padding: 0 24px;
          box-shadow: 0 4px 24px rgba(13,31,60,0.06);
        }

        .stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-left: 1px solid var(--border);
        }

        .stat-item {
          padding: 32px 28px;
          border-right: 1px solid var(--border);
          position: relative;
          transition: background 0.25s;
        }

        .stat-item:hover {
          background: var(--off-white);
        }

        .stat-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 28px;
          width: 0;
          height: 2px;
          background: var(--orange);
          transition: width 0.35s ease;
          border-radius: 2px;
        }

        .stat-item:hover::after {
          width: 40px;
        }

        .stat-val {
          font-size: 2rem;
          font-weight: 800;
          color: var(--navy);
          letter-spacing: -0.5px;
          line-height: 1;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--muted);
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        /* ── CEO SECTION ── */
        .ceo-section {
          background: var(--off-white);
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
        }

        .ceo-section::before {
          content: '';
          position: absolute;
          top: -120px;
          right: -120px;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--orange-glow) 0%, transparent 70%);
          pointer-events: none;
        }

        .ceo-grid {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 72px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .ceo-img-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 4/5;
          box-shadow: 0 32px 80px rgba(13,31,60,0.18);
        }

        .ceo-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.23,1,0.32,1);
          display: block;
        }

        .ceo-img-wrap:hover img {
          transform: scale(1.04);
        }

        .ceo-img-wrap::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: -2px;
          width: 80px;
          height: 80px;
          background: var(--orange);
          border-radius: 0 20px 0 20px;
          z-index: 2;
          opacity: 0.9;
        }

        .ceo-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,31,60,0.35) 0%, transparent 50%);
          z-index: 1;
        }

        .ceo-content {
          animation: fadeUp 0.8s ease 0.2s both;
        }

        .ceo-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--orange);
          color: #fff;
          padding: 7px 18px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .ceo-name {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--navy);
          letter-spacing: -0.5px;
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .ceo-title {
          font-size: 1rem;
          color: var(--orange);
          font-weight: 600;
          margin-bottom: 28px;
          letter-spacing: 0.3px;
        }

        .ceo-quote {
          font-family: 'Lora', Georgia, serif;
          font-style: italic;
          font-size: 1.15rem;
          color: var(--navy-mid);
          line-height: 1.85;
          margin-bottom: 24px;
          position: relative;
          padding-left: 22px;
        }

        .ceo-quote::before {
          content: '';
          position: absolute;
          left: 0;
          top: 4px;
          bottom: 4px;
          width: 3px;
          background: linear-gradient(to bottom, var(--orange), #ffd280);
          border-radius: 4px;
        }

        .ceo-mission {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px 20px;
          font-size: 0.9rem;
          color: var(--muted);
          font-weight: 500;
          box-shadow: 0 2px 12px rgba(13,31,60,0.05);
          transition: all 0.3s ease;
        }

        .ceo-mission:hover {
          border-color: var(--orange);
          box-shadow: 0 8px 24px rgba(255,149,0,0.1);
        }

        .ceo-mission-dot {
          width: 10px;
          height: 10px;
          background: var(--orange);
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 4px var(--orange-glow);
          animation: pulse-ring 2.4s ease-in-out infinite;
        }

        /* ── QUOTE BANNER ── */
        .quote-banner {
          background: var(--navy);
          padding: 64px 24px;
          position: relative;
          overflow: hidden;
        }

        .quote-banner::before {
          content: '"';
          position: absolute;
          top: -20px;
          left: 40px;
          font-size: 280px;
          color: rgba(255,149,0,0.05);
          font-family: 'Lora', serif;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .quote-banner-text {
          font-family: 'Lora', Georgia, serif;
          font-size: clamp(1.4rem, 3.5vw, 2rem);
          font-weight: 400;
          color: #fff;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.55;
          position: relative;
          z-index: 1;
        }

        .quote-banner-text strong {
          color: var(--orange);
          font-weight: 600;
        }

        /* ── TEAM SECTION ── */
        .team-section {
          background: var(--white);
          padding: 100px 24px;
        }

        .team-header {
          margin-bottom: 64px;
        }

        .team-h2 {
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
          color: var(--navy);
          letter-spacing: -0.5px;
          margin-bottom: 10px;
        }

        .team-sub {
          font-size: 1rem;
          color: var(--muted);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 36px;
        }

        /* ── ENHANCED TEAM CARDS ── */
        .team-card {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          position: relative;
          cursor: pointer;
        }

        .team-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 28px 72px rgba(13,31,60,0.16);
          border-color: rgba(255,149,0,0.3);
        }

        .team-card:hover .team-card-bar {
          width: 100%;
        }

        .team-card:hover .team-img-wrap img {
          transform: scale(1.08);
        }

        .team-card:hover .team-img-overlay {
          opacity: 1;
        }

        .team-card-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--orange), #ffcc70);
          width: 0;
          transition: width 0.5s cubic-bezier(0.23,1,0.32,1);
          border-radius: 0;
          z-index: 10;
        }

        .team-img-wrap {
          position: relative;
          aspect-ratio: 1/1.15;
          overflow: hidden;
          background: linear-gradient(135deg, var(--off-white), #e8ecf4);
        }

        .team-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.6s cubic-bezier(0.23,1,0.32,1);
          display: block;
        }

        .team-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,31,60,0.65) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 5;
        }

        .team-info {
          padding: 24px 26px 28px;
          border-top: 1.5px solid var(--border);
          background: var(--white);
          transition: all 0.3s ease;
        }

        .team-card:hover .team-info {
          background: linear-gradient(135deg, var(--off-white), #f5f9ff);
        }

        .team-name {
          font-size: 1.08rem;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 6px;
          letter-spacing: -0.2px;
          transition: color 0.3s ease;
        }

        .team-card:hover .team-name {
          color: var(--orange);
        }

        .team-designation {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 12px;
          transition: all 0.3s ease;
        }

        .team-card:hover .team-designation {
          color: var(--navy);
          font-size: 0.78rem;
          letter-spacing: 1.8px;
        }

        .team-responsibility {
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.65;
          font-weight: 400;
          transition: color 0.3s ease;
        }

        .team-card:hover .team-responsibility {
          color: var(--navy-mid);
        }

        /* ── SECOND QUOTE ── */
        .quote2 {
          background: linear-gradient(135deg, var(--orange) 0%, #e07b00 100%);
          padding: 64px 24px;
        }

        .quote2-text {
          font-family: 'Lora', Georgia, serif;
          font-size: clamp(1.4rem, 3.5vw, 2rem);
          color: #fff;
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
          line-height: 1.55;
          font-weight: 400;
        }

        /* ── CTA SECTION ── */
        .cta-section {
          background: var(--navy);
          padding: 120px 24px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        .cta-section::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(255,149,0,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-inner {
          position: relative;
          z-index: 1;
          max-width: 640px;
          margin: 0 auto;
        }

        .cta-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 20px;
        }

        .cta-h2 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          line-height: 1.15;
          margin-bottom: 18px;
        }

        .cta-desc {
          font-size: 1rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
          margin-bottom: 40px;
          font-weight: 300;
        }

        .cta-btn {
          display: inline-block;
          background: linear-gradient(135deg, var(--orange) 0%, #e07b00 100%);
          color: #fff;
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.3px;
          padding: 17px 40px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 40px rgba(255,149,0,0.35);
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
        }

        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 56px rgba(255,149,0,0.45);
        }

        .cta-btn:active {
          transform: translateY(-1px);
        }

        .cta-btn:focus {
          outline: none;
        }

        /* ── RESPONSIVE DESIGN ── */
        @media (max-width: 1024px) {
          .ceo-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .ceo-img-wrap {
            aspect-ratio: 4/3;
            max-width: 480px;
          }
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
          .stats-inner {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .ceo-section {
            padding: 80px 20px;
          }
          .ceo-grid {
            gap: 40px;
          }
          .ceo-img-wrap {
            aspect-ratio: 3/4;
            max-width: 320px;
            margin: 0 auto;
          }
          .ceo-img-wrap::before {
            width: 60px;
            height: 60px;
          }
          .ceo-name {
            font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          }
          .ceo-quote {
            font-size: 1rem;
            margin-bottom: 20px;
          }
          .team-section {
            padding: 80px 20px;
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding: 72px 20px 60px;
          }
          .stats-inner {
            grid-template-columns: repeat(2, 1fr);
          }
          .stat-item {
            padding: 22px 18px;
          }
          .stat-val {
            font-size: 1.6rem;
          }
          .team-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .ceo-section {
            padding: 60px 16px;
          }
          .ceo-grid {
            gap: 32px;
          }
          .ceo-img-wrap {
            aspect-ratio: 3/4;
            max-width: 280px;
            margin: 0 auto;
          }
          .ceo-img-wrap::before {
            width: 50px;
            height: 50px;
          }
          .ceo-name {
            font-size: 1.5rem;
            margin-bottom: 4px;
          }
          .ceo-title {
            font-size: 0.9rem;
            margin-bottom: 20px;
          }
          .ceo-quote {
            font-size: 0.95rem;
            line-height: 1.7;
            margin-bottom: 18px;
            padding-left: 18px;
          }
          .ceo-quote::before {
            width: 2px;
          }
          .ceo-mission {
            font-size: 0.85rem;
            padding: 14px 16px;
            gap: 10px;
          }
          .ceo-mission-dot {
            width: 8px;
            height: 8px;
          }
          .team-section {
            padding: 60px 16px;
          }
          .cta-section {
            padding: 80px 16px;
          }
          .u-container {
            padding: 0 16px;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <div className="hero">
        <div className="u-container">
          <div className="hero-inner">
            <span className="u-label">Our People</span>
            <div className="u-rule" />
            <h1 className="hero-h1">
              The People Behind<br />
              <span>UrjaTech</span>
            </h1>
            <p className="hero-sub">
              Meet the passionate team dedicated to transforming solar energy across Uttar Pradesh.
            </p>
            <p className="hero-desc">
              UrjaTech is built by renewable energy experts committed to making clean, affordable solar
              solutions accessible to every household. We combine innovation with reliability to power
              a sustainable future.
            </p>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        <div className="stats-inner">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <div className="stat-val">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CEO ── */}
      <div className="ceo-section">
        <div className="u-container">
          <div className="ceo-grid">
            {/* Image */}
            <div className="ceo-img-wrap" style={{ animation: "fadeUp 0.8s ease 0.1s both" }}>
              <img src={ceoMember.image} alt={ceoMember.name} loading="lazy" />
            </div>

            {/* Content */}
            <div className="ceo-content">
              <span className="u-label">Visionary Leadership</span>
              <div className="u-rule" />
              <div className="ceo-badge">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "inline-block" }} />
                Business Head
              </div>
              <h2 className="ceo-name">{ceoMember.name}</h2>
              <p className="ceo-title">{ceoMember.designation}</p>
              <p className="ceo-quote">{ceoMember.message}</p>
              <div className="ceo-mission">
                <span className="ceo-mission-dot" />
                {ceoMember.mission}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── QUOTE 1 ── */}
      <div className="quote-banner">
        <div className="u-container">
          <p className="quote-banner-text">
            "Driven by <strong>innovation</strong>. Powered by <strong>people</strong>."
          </p>
        </div>
      </div>

      {/* ── TEAM ── */}
      <div className="team-section">
        <div className="u-container">
          <div className="team-header">
            <span className="u-label">The Core Team</span>
            <div className="u-rule" />
            <h2 className="team-h2">Our Leadership Team</h2>
            <p className="team-sub">Six dedicated professionals committed to excellence</p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <div
                key={member.id}
                className="team-card"
                style={{ animation: `fadeUp 0.6s ease ${0.1 + i * 0.08}s both` }}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="team-card-bar" />
                <div className="team-img-wrap">
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <div className="team-img-overlay" />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-designation">{member.designation}</p>
                  <p className="team-responsibility">{member.responsibility}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUOTE 2 ── */}
      <div className="quote2">
        <div className="u-container">
          <p className="quote2-text">
            "Building a cleaner future across Uttar Pradesh — one rooftop at a time."
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="cta-section">
        <div className="cta-inner">
          <span className="cta-label">Get Started</span>
          <h2 className="cta-h2">Ready to Go Solar?</h2>
          <p className="cta-desc">
            Connect with our team to discover how UrjaTech can power your home
            with clean, affordable solar energy.
          </p>
          <button 
            className="cta-btn"
            onClick={() => {
              const phoneNumber = '919151368100';
              const message = 'Hi UrjaTech, I would like to schedule a free solar consultation.';
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
          >
            Schedule Your Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
