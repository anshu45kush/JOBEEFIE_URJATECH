import React from "react";
import { Helmet } from "react-helmet";

function Seo({
  title = "Solar Panel Installation in Uttar Pradesh | ₹78,000 Subsidy | Jobeefie Urjatech",
  description = "Install rooftop solar panels in Uttar Pradesh and get up to ₹78,000 subsidy under PM Surya Ghar Yojana. Trusted solar company with expert installation, fast approval & EMI options.",
  url = "https://jobeefie.com",
  image = "https://jobeefie.com/solar.jpg",
}) {
  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta
        name="keywords"
        content="solar panel Uttar Pradesh, solar subsidy UP, PM Surya Ghar Yojana apply, rooftop solar India, solar installation company UP, solar panel price UP, home solar system India"
      />

      <meta name="author" content="Jobeefie Urjatech" />
      <meta name="robots" content="index, follow" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#f97316" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Geo SEO */}
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Uttar Pradesh" />

      {/* Structured Data - Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Jobeefie Urjatech",
          url: url,
          image: image,
          telephone: "+91-XXXXXXXXXX",
          areaServed: "Uttar Pradesh",
          address: {
            "@type": "PostalAddress",
            addressRegion: "UP",
            addressCountry: "IN",
          },
          description:
            "Solar panel installation company in Uttar Pradesh offering subsidy support under PM Surya Ghar Yojana.",
        })}
      </script>

      {/* FAQ Schema (High ranking impact) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How much subsidy is available for solar panels in Uttar Pradesh?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can get up to ₹78,000 subsidy under PM Surya Ghar Yojana for rooftop solar installation.",
              },
            },
            {
              "@type": "Question",
              name: "How to apply for solar subsidy in UP?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can apply online or contact Jobeefie Urjatech for complete assistance with documentation and installation.",
              },
            },
            {
              "@type": "Question",
              name: "Is solar panel installation worth it in UP?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, solar panels reduce electricity bills by up to 90% and offer long-term savings with government subsidy support.",
              },
            },
          ],
        })}
      </script>
    </Helmet>
  );
}

export default Seo;
