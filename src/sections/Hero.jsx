import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Trophy, Tractor, BookOpen, Medal, HeartPulse } from "lucide-react";

const features = [
  { icon: GraduationCap, title: "Educational Scholarships", color: "blue-600" },
  { icon: Trophy, title: "Academic Excellence Awards", color: "purple-600" },
  { icon: Tractor, title: "Farmers Recognition", color: "green-600" },
  { icon: BookOpen, title: "Manoj Das Sahitya Award", color: "orange-600" },
  { icon: Medal, title: "Sports Excellence Awards", color: "red-600" },
  { icon: HeartPulse, title: "Public Health & Welfare", color: "teal-600" },
];

// SplitText Animation Component
const SplitText = ({ lines, delayStep = 0.03, className }) => {
  let globalIndex = 0;

  return (
    <h1 className={`${className}`}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="block leading-tight">
          {line.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
              {word.split("").map((char, i) => {
                const currentIndex = globalIndex++;
                return (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: currentIndex * delayStep,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </div>
      ))}
    </h1>
  );
};

const Hero = () => {
  const backgroundImages = [
    "/201.png",
    "/202.png",
    "/203.png",
    "/odisha_graduation_celebration_1785670974702.png",
    "/odisha_tree_plantation_1785670994720.png"
  ];

  return (
    <>
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">

        {/* 🎞 Background Carousel */}
        {backgroundImages.map((img, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${img})`,
              animation: `fadeSlide 18s infinite`,
              animationDelay: `${i * 6}s`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          ></motion.div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* HERO CONTENT WITH SPACING */}
        <div className="relative z-[10] w-full flex-1 flex items-center pt-24 pb-12 lg:pt-0 lg:pb-0">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

            {/* LEFT TEXT */}
            <div className="w-full lg:w-[65%] xl:w-[70%]">
              <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
                <SplitText
                  lines={[
                    "Empowering Education, Honoring Excellence",
                    "& Transforming Lives Across Odisha"
                  ]}
                  className="text-2xl md:text-3xl lg:text-[2.25rem] xl:text-[2.75rem] leading-tight font-extrabold text-white drop-shadow-lg"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-white/90 text-base md:text-lg mt-6 leading-relaxed max-w-2xl"
              >
                BNP Charitable Trust is dedicated to supporting meritorious students, recognizing progressive farmers, celebrating literary and sporting excellence, and advancing health and community welfare across Odisha through scholarships, financial assistance, awards, and impactful social initiatives.
              </motion.p>

            </div>

            {/* RIGHT IMAGE CARD */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="hidden lg:flex lg:w-[35%] xl:w-[30%] justify-end"
            >
              {/* Static Card */}
              <div className="bg-white/95 backdrop-blur-xl p-5 pb-4 rounded-3xl shadow-2xl w-[300px] lg:w-[320px] mx-auto md:mx-0 -rotate-[6deg] mt-10 border border-white/50">
                <div className="w-full rounded-xl overflow-hidden shadow-md bg-white flex flex-col items-center">
                  <div className="w-full h-[200px] overflow-hidden relative">
                    <img
                      src="/bnplogo.png"
                      className="w-full h-auto absolute top-0 left-0"
                      alt="BNP Logo Graphic"
                    />
                  </div>
                  <div className="bg-white w-full text-center pt-2 pb-5 z-10 -mt-6">
                    <h3 className="text-gray-900 text-[21px] font-bold tracking-wide">
                      Charitable Trust
                    </h3>
                    <p className="text-[13px] font-semibold text-gray-800 mt-1">
                      Founder - Shri Niranjan Pattnaik
                    </p>
                  </div>
                </div>

                <h3 className="text-[#0A4C8B] text-lg font-bold mt-4">
                  BNP Charitable Trust
                </h3>

                <p className="text-sm font-semibold text-gray-800 mt-1">
                  Founder Niranjan Pattnaik
                </p>

                <p className="text-gray-600 text-xs mt-3 leading-relaxed">
                  Supporting society through education, farmer empowerment, literature, sports, health, and public welfare for a stronger and more inclusive Odisha.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL AUTO-SCROLL TICKER BELOW HERO SECTION */}
      {/* 
      <div className="w-full bg-gray-50 py-5 border-b border-gray-200 overflow-hidden flex items-center shadow-sm">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-6 w-max px-4 items-center"
        >
          {[...features, ...features, ...features].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className={`text-${feature.color}`}>
                  <Icon size={22} />
                </div>
                <span className="font-bold text-gray-800 text-[15px] tracking-wide">{feature.title}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
      */}
    </>
  );
};

export default Hero;

