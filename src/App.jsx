import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Tools from '@/components/Tools';
import SolarSetupTypes from '@/components/SolarSetupTypes';
import Testimonials from '@/components/Testimonials';
import TrustIndicators from '@/components/TrustIndicators';
import Subsidy from '@/components/Subsidy';
import Warranty from '@/components/Warranty';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import ProductsPage from '@/components/ProductsPage';
import GovernmentSchemes from '@/components/GovernmentSchemes';
import CIBILScoreChecker from '@/components/CIBILScoreChecker'; // New Import
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Helmet>
        <title>Jobeefie Urjatech - Solar Solutions & Government Subsidies UP</title>
        <meta 
          name="description" 
          content="Get up to ₹78,000 subsidy with PM Surya Ghar Yojana. Jobeefie Urjatech offers premium solar rooftop solutions, subsidy assistance, and expert installation in Uttar Pradesh." 
        />
      </Helmet>

      <div className="min-h-screen bg-white overflow-x-hidden">
        <Header />
        <main className="scroll-smooth">
          <Hero />
          
          <GovernmentSchemes />
          
          <section id="cibil">
            <CIBILScoreChecker />
          </section>

          <About />
          <Services />
          <Tools />
          
          <section id="products">
            <ProductsPage />
          </section>

          <SolarSetupTypes />
          <TrustIndicators />
          <Testimonials />
          <Subsidy />
          <Warranty />
          <Contact />
        </main>
        <Chatbot />
        <Footer />
        <Toaster />
      </div>
    </LanguageProvider>
  );
}

export default App;