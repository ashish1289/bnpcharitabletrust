import React, { useMemo } from "react";
import { motion } from "framer-motion";

const SplitText = ({ text, delayStep = 0.03, className }) => {
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <h2 className={`inline-flex flex-wrap justify-center gap-x-2 md:gap-x-3 overflow-hidden ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {word.split("").map((char, i) => {
            const currentDelay = charIndex * delayStep;
            charIndex++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: currentDelay, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h2>
  );
};

const BoardOfTrusteesSection = () => {
  const trustees = [
    { serialNo: 1, name: "Shri Tara Ranjan Patnaik", designation: "Chairman, Trustees", img: "/profiledemo.jpg" },
    { serialNo: 2, name: "Shri Dharmaditya Patnaik", designation: "Trustees", img: "/profiledemo.jpg" },
    { serialNo: 3, name: "Shri Dibyalok Patnaik", designation: "Trustees", img: "/profiledemo.jpg" },
    { serialNo: 4, name: "Shri Somjit Patnaik", designation: "Trustees", img: "/profiledemo.jpg" },
    { serialNo: 5, name: "Shri Devjyoti Patnaik", designation: "Trustees", img: "/profiledemo.jpg" },
    { serialNo: 6, name: "Shri Navajyoti Patnaik", designation: "Trustees", img: "/profiledemo.jpg" },
    { serialNo: 7, name: "Shri Abhishek Patnaik", designation: "Trustees", img: "/profiledemo.jpg" },
    { serialNo: 8, name: "Shri Anshuman Patnaik", designation: "Trustees", img: "/profiledemo.jpg" },
    { serialNo: 9, name: "Shri Anurag Patnaik", designation: "Trustees", img: "/profiledemo.jpg" },
    { serialNo: 10, name: "Shri Parthajit Patnaik", designation: "Trustees", img: "/profiledemo.jpg" },
    { serialNo: 11, name: "Ms. Adyasha Patnaik", designation: "Trustees", img: "/profiledemo.jpg" },
    { serialNo: 12, name: "Shri Anupam Patnaik", designation: "Trustees", img: "/profiledemo.jpg" },
    { serialNo: 13, name: "Ms. Tanaya Patnaik", designation: "Trustees", img: "/profiledemo.jpg" },
  ];

  return (
    <section
      className="w-full py-24 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom right, #F2FAFF, #E9FFF4, #F8FCFF)" }}
    >
      <img src="/hirondelle-4.png" className="absolute top-10 right-10 w-40 opacity-20" alt="" />
      <img src="/brush-patch.webp" className="absolute bottom-0 left-0 w-60 opacity-30" alt="" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="text-center mb-14">
          <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
            <SplitText text="Board of Trustees" className="text-4xl md:text-5xl font-extrabold text-[#0A4C8B]" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto mt-4"
          >
            "Guiding the mission, shaping the vision — our trustees stand as pillars of hope, compassion, and leadership at BNP Charitable Trust."
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <h3 className="text-3xl font-bold text-[#0F72CE] mb-4">Message from the Board</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              At BNP Charitable Trust, our purpose is rooted in service, dignity, and compassion.
              We believe that every act of kindness creates a ripple effect that touches thousands of lives.
              <br /><br />
              Our Board of Trustees is committed to ensuring transparency, accountability,
              and impact-driven action while supporting sustainable change for generations to come.
            </p>
          </motion.div>
          <motion.img
            src="/niranjan.jpeg" alt="Trustee Leader"
            className="rounded-3xl w-full h-[400px] object-cover object-top shadow-xl"
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}
          />
        </div>

        <h3 className="text-3xl font-bold text-[#0F72CE] text-center mb-10">Meet Our Trustees</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustees.map((t, idx) => (
            <motion.div
              key={idx}
              className="rounded-3xl bg-white p-6 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }} viewport={{ once: true }}
            >
              <div className="text-center">
                <img src={t.img} alt={t.name} className="w-32 h-32 mx-auto rounded-full object-cover object-top mb-4 shadow-md" />
                <h4 className="text-lg font-bold text-[#0A4C8B]">{t.name}</h4>
                <p className="text-gray-600 text-md mt-1">{t.designation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfTrusteesSection;
