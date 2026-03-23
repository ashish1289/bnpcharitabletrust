import React from "react";
import { motion } from "framer-motion";

const SectionBox = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
  >
    <h3 className="text-2xl font-bold text-[#0F72CE] mb-4">{title}</h3>
    <div className="text-gray-600 leading-relaxed text-md">{children}</div>
  </motion.div>
);

const PrivacySection = () => {
  return (
    <section
      className="w-full py-24 md:py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #F2FAFF, #E9FFF4, #F8FCFF)",
      }}
    >
      {/* Soft Background Element */}
      <motion.img
        src="/hirondelle-4.png"
        className="absolute top-10 right-10 w-56 opacity-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        transition={{ duration: 1.2 }}
      />

      <motion.img
        src="/brush-patch.webp"
        className="absolute bottom-0 left-0 w-64 opacity-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.25 }}
        transition={{ duration: 1.2 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-[#0A4C8B]"
            style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
          >
            Privacy Policy
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg"
          >
            Your privacy matters deeply to us. This page explains how BNP
            Charitable Trust collects, protects, and uses your information.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <SectionBox title="1. Information We Collect">
            <p>
              We collect basic personal information such as your name,
              email address, phone number, and donation details
              when you interact with our website, donate, volunteer,
              or subscribe to our updates.
            </p>
            <p className="mt-2">
              For analytics, we may collect anonymized browsing data like
              pages visited, device type, and interactions.
            </p>
          </SectionBox>

          <SectionBox title="2. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-2">
              <li>To process donations safely and securely</li>
              <li>To share impact updates and newsletters (only if you opt-in)</li>
              <li>To improve website experience and performance</li>
              <li>To comply with legal and regulatory requirements</li>
            </ul>
          </SectionBox>

          <SectionBox title="3. Donation & Payment Security">
            <p>
              BNP Charitable Trust does NOT store your card details.
              All payments are processed through secure, PCI-compliant
              payment gateways. We use SSL encryption to protect all data
              transfers on our website.
            </p>
          </SectionBox>

          <SectionBox title="4. Cookies & Tracking">
            <p>
              We use cookies to improve website performance and for basic
              analytics. You can disable cookies anytime in your browser
              settings without affecting major website functionality.
            </p>
          </SectionBox>

          <SectionBox title="5. Your Rights">
            <ul className="list-disc pl-5 space-y-2">
              <li>Request access to the data we hold about you</li>
              <li>Ask for corrections or deletion of your data</li>
              <li>Opt out of newsletters or SMS campaigns anytime</li>
              <li>Request that we stop processing your information</li>
            </ul>
          </SectionBox>

          <SectionBox title="6. Third-Party Sharing">
            <p>
              We NEVER sell or rent your personal information.
              We only share data with trusted service providers
              such as payment gateways or analytics services
              that follow strict confidentiality and data protection policies.
            </p>
          </SectionBox>

          <SectionBox title="7. Policy Updates">
            <p>
              Our privacy policy may be updated occasionally.
              When updated, we will revise the “Last Updated” date
              at the bottom of this page.
            </p>
          </SectionBox>

          <SectionBox title="8. Contact Us">
            <p>
              If you have questions regarding this Privacy Policy,
              or want to request data changes, please contact:
            </p>
            <p className="mt-2 font-semibold text-[#0F72CE]">
              📧 support@bnpcharity.org  
              <br />
              📞 +91 98765 43210
            </p>
          </SectionBox>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 mt-16 text-sm">
          Last Updated: January 2025
        </p>
      </div>
    </section>
  );
};

export default PrivacySection;
