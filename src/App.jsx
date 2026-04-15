import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Tools from "@/components/Tools";
import SolarSetupTypes from "@/components/SolarSetupTypes";
import Testimonials from "@/components/Testimonials";
import TrustIndicators from "@/components/TrustIndicators";
import Subsidy from "@/components/Subsidy";
import Warranty from "@/components/Warranty";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ProductsPage from "@/components/ProductsPage";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import CIBILScoreChecker from "@/components/CIBILScoreChecker";

import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/routes/ProtectedRoute";

// Pages
import LoginPage from "@/pages/LoginPage";
import EmployeeDashboard from "@/pages/EmployeeDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import { TaskProvider } from "@/context/TaskContext";
import Seo from "./components/Seo";

function LandingPage() {
  return (
    <>
      <Seo />

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
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <TaskProvider>
            {" "}
            {/* ✅ THIS IS THE FIX */}
            <Routes>
              {/* Public */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected */}
              <Route
                path="/employee-dashboard"
                element={
                  <ProtectedRoute role="employee">
                    <EmployeeDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </TaskProvider>{" "}
          {/* ✅ THIS IS THE FIX */}
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
export default App;
