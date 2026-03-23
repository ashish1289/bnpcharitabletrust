import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Split text letter-by-letter
const SplitText = ({ text, delayStep = 0.03, className = "" }) => {
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <h2
      aria-hidden="true"
      className={`inline-block overflow-hidden ${className}`}
      style={{ lineHeight: 1.05 }}
    >
      {letters.map((char, i) => {
        const letter = char === " " ? "\u00A0" : char;
        return (
          <motion.span
            key={i}
            style={{ display: "inline-block", whiteSpace: "pre" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: i * delayStep,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.6 }}
          >
            {letter}
          </motion.span>
        );
      })}
    </h2>
  );
};

const AboutSection = () => {
  return (
    <section
      className="w-full py-20 md:py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #E9F5FF, #E6FFF3, #F5FBFF)",
      }}
    >
      {/* Soft blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="absolute top-10 left-10 w-56 h-56 bg-[#BFE2F3] rounded-full blur-3xl opacity-40"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
            <SplitText
              text="About BNP Charitable Trust"
              className="text-4xl md:text-5xl font-extrabold text-[#0A4C8B]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-600 max-w-2xl mx-auto text-md md:text-lg"
          >
            “We believe that every act of kindness has the power to transform
            lives and build a brighter tomorrow.”
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* WHO WE ARE BOX */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-[#0F72CE] mb-4">
              Who We Are
            </h3>
            <p className="text-gray-600 leading-relaxed text-md">
              BNP Charitable Trust is a non-profit organization dedicated to
              uplifting communities through education, nutrition, women
              empowerment and healthcare.  
              We work with local partners, volunteers and communities to ensure
              that hope reaches every household.
            </p>
          </motion.div>

          {/* FOUNDER BOX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center"
          >
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-md mb-4">
              <img
                src="/np.jpg"
                alt="Founder"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#0F72CE]">
              Niranjan Patnaik
            </h3>
            <p className="text-gray-500 text-sm font-medium mb-4">
              Founder, BNP Charitable Trust
            </p>

            <p className="text-gray-600 leading-relaxed text-md">
              “Together, we can create a world where every child is educated,
              every family nourished, and every woman empowered.”
            </p>
          </motion.div>

          {/* OUR VALUES BOX */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-[#0F72CE] mb-4">
              Our Values
            </h3>
            <ul className="space-y-3 text-gray-600 text-md">
              <li>🌟 Compassion drives our work.</li>
              <li>🌍 Equality is at the heart of every program.</li>
              <li>🤝 Transparency builds trust.</li>
              <li>🚀 Innovation uplifts communities.</li>
              <li>❤️ Humanity above all.</li>
            </ul>
          </motion.div>

        </div>

        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#0A4C8B] text-white rounded-3xl p-10 shadow-xl"
        >
          <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
          <p className="text-white/90 leading-relaxed text-lg max-w-3xl">
            To build a society where opportunities are equal, dignity is upheld,
            and every person — regardless of background — has the chance to
            dream, learn, grow, and thrive.
          </p>
        </motion.div>

        {/* ========================= KINDNESS IN ACTION ========================= */}
<div className="max-w-7xl mx-auto px-6 lg:px-10 mt-32 mb-28">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
    className="text-center mb-14"
  >
    <h3 className="text-3xl md:text-4xl font-bold text-[#0A4C8B]">
      Your Kindness in Action
    </h3>

    <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-lg">
      Your donation touches real lives through education, food, healthcare,
      and community programs.
    </p>
  </motion.div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
    
    {/* Card 1 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-3xl shadow-xl border border-gray-200"
    >
      <img
        src="/1.png"
        className="h-56 w-full object-cover rounded-2xl"
      />
      <h4 className="text-xl font-bold text-[#0A4C8B] mt-4">
        Supporting Families in Need
      </h4>
      <p className="text-gray-600 mt-2">
        Your donations provide essential aid to struggling families.
      </p>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-3xl shadow-xl border border-gray-200"
    >
      <img
        src="/2.png"
        className="h-56 w-full object-cover rounded-2xl"
      />
      <h4 className="text-xl font-bold text-[#0A4C8B] mt-4">
        Giving Hope & Warmth
      </h4>
      <p className="text-gray-600 mt-2">
        A small gesture of love becomes a big change for someone in need.
      </p>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-3xl shadow-xl border border-gray-200"
    >
      <img
        src="/3.png"
        className="h-56 w-full object-cover rounded-2xl"
      />
      <h4 className="text-xl font-bold text-[#0A4C8B] mt-4">
        Empowering Communities
      </h4>
      <p className="text-gray-600 mt-2">
        Education, opportunities and unity — built through your generosity.
      </p>
    </motion.div>

  </div>
</div>

{/* ========================= DONOR LOVE / TESTIMONIALS ========================= */}
<div className="max-w-6xl mx-auto px-6 lg:px-10 mt-32 mb-32">
  <motion.h3
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
    className="text-center text-3xl md:text-4xl font-bold text-[#0A4C8B] mb-14"
  >
    Loved by Donors Across the Country
  </motion.h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200"
    >
      <p className="text-gray-600 leading-relaxed">
        “I donated during a tough time for my community. BNP used every rupee efficiently.
        I truly trust them.”
      </p>
      <h4 className="text-[#0A4C8B] font-bold mt-4">— Priya Sharma</h4>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200"
    >
      <p className="text-gray-600 leading-relaxed">
        “The transparency and kindness of BNP Charitable Trust is unmatched.
        Happy to support such a cause.”
      </p>
      <h4 className="text-[#0A4C8B] font-bold mt-4">— Amit Verma</h4>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200"
    >
      <p className="text-gray-600 leading-relaxed">
        “I could SEE the real impact through photos and stories.
        That’s why I regularly donate now.”
      </p>
      <h4 className="text-[#0A4C8B] font-bold mt-4">— Fatima Noor</h4>
    </motion.div>

  </div>
</div>


      </div>
    </section>
  );
};

export default AboutSection;
