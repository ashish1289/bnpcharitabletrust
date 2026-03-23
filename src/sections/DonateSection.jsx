import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { QrCode, Banknote, CreditCard, Wallet } from "lucide-react";

// Split Text Heading Animation
const SplitText = ({ text, delayStep = 0.03, className }) => {
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <h2 className={`inline-block overflow-hidden ${className}`}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: i * delayStep,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
};

const DonateSection = () => {
  return (
    <section
      className="w-full py-24 md:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #F3FBFF, #EFFFF8, #F8FCFF)",
      }}
    >
      {/* Decorative assets */}
      <motion.img
        src="/hirondelle-4.png"
        className="absolute top-10 right-10 w-60 opacity-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        transition={{ duration: 1.2 }}
      />

      {/* ========================= HERO SECTION ========================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 mb-24">
        <div className="flex flex-col md:flex-row items-center gap-14">

          {/* Left - Text */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
              <SplitText
                text="Your Donation Creates Hope"
                className="text-4xl md:text-5xl font-extrabold text-[#0A4C8B]"
              />
            </div>

            <p className="text-gray-600 text-lg mt-4">
              Every rupee you give becomes a seed of kindness.  
              Together, we uplift children, empower women, spread nourishment,  
              and build a harmonious community.Every rupee you give becomes a seed of kindness.  
              Together, we uplift children, empower women, spread nourishment,  
              and build a harmonious community.Every rupee you give becomes a seed of kindness.  
              Together, we uplift children, empower women, spread nourishment,  
              and build a harmonious community.Every rupee you give becomes a seed of kindness.  
              Together, we uplift children, empower women, spread nourishment,  
              and build a harmonious community.
            </p>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.img
            src="/charity-money-jar-donation-campaign.jpg" // Upload as: public/charity-jar.jpg
            className="w-full max-w-md rounded-3xl shadow-xl"
            alt="Charity Jar"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* ========================= QR + DONATION FORM ========================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-14 mb-32">
        
        {/* QR Box */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 text-center"
        >
          <h3 className="text-2xl font-bold text-[#0A4C8B] mb-4">
            Scan & Donate
          </h3>

          <img
            src="/qr.jpg"
            className="mx-auto w-52 h-52 rounded-xl shadow-md"
            alt="QR Donation"
          />

          <p className="text-gray-600 mt-3 text-sm">
            Works with all UPI apps — Google Pay, PhonePe, Paytm.
          </p>
        </motion.div>

        {/* Donation Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-[#0A4C8B] mb-6">Quick Donate</h3>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0A4C8B]"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0A4C8B]"
            />

            <input
              type="number"
              placeholder="Amount (₹)"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0A4C8B]"
            />

            <button className="w-full bg-[#0A4C8B] text-white py-3 rounded-xl text-lg flex items-center justify-center gap-2 hover:bg-[#083c78] transition">
              Donate <Wallet size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ========================= WHY YOUR DONATION MATTERS ========================= */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            <img
              src="/people-holding-rubber-heart.jpg"  // Upload as: public/hands-heart.jpg
              className="rounded-3xl w-full shadow-lg"
            />

            <div>
              <h3 className="text-3xl font-bold text-[#0A4C8B] mb-4">
                Why Your Donation Matters
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                Your kindness becomes food for a hungry child,  
                education for a hopeful student,  
                medicine for a struggling family,  
                and dignity for a mother rebuilding her life.
                <br /> <br />
                **You are not just donating — you are giving a family a future.**
              </p>
            </div>

          </div>
        </motion.div>
      </div>

      {/* ========================= UNITY & COMMUNITY SECTION ========================= */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 mb-20 text-center">
        <h3 className="text-3xl font-bold text-[#0A4C8B]">
          Together, We Lift Every Community
        </h3>

        <p className="text-gray-600 max-w-2xl mx-auto mt-3">
          We serve people from all religions, cultures, and backgrounds.
          Humanity is our only identity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-14">
          <img src="/52104.jpg" className="w-full rounded-3xl shadow-lg" />
          <img src="/66142.jpg" className="w-full rounded-3xl shadow-lg" />
        </div>
      </div>

      {/* ========================= OTHER WAYS TO GIVE ========================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-28">
        <h3 className="text-center text-3xl font-bold text-[#0A4C8B] mb-10">
          Other Ways to Give
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 text-center"
          >
            <Banknote size={48} className="mx-auto text-[#0A4C8B]" />
            <h4 className="text-xl font-bold mt-3">UPI ID</h4>
            <p className="text-gray-600 mt-2">bnpcharity@ybl</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 text-center"
          >
            <CreditCard size={48} className="mx-auto text-[#0A4C8B]" />
            <h4 className="text-xl font-bold mt-3">Bank Transfer</h4>
            <p className="text-gray-600 mt-2 leading-relaxed">
              A/C: 01234567890 <br />
              IFSC: HDFC0001234 <br />
              Name: BNP Charitable Trust
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 text-center"
          >
            <QrCode size={48} className="mx-auto text-[#0A4C8B]" />
            <h4 className="text-xl font-bold mt-3">International</h4>
            <p className="text-gray-600 mt-2">
              PayPal & Stripe support coming soon.
            </p>
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default DonateSection;
