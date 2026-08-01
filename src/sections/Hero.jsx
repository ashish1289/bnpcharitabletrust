// import React from "react";
// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";

// const Hero = () => {
//   const textRef = useRef(null);
//   const isInView = useInView(textRef, { once: true, margin: "-80px" });

//   const textVariants = {
//     hidden: { opacity: 0, x: -60 },
//     visible: (i) => ({
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.35,
//         delay: i * 0.2,
//         ease: "easeOut",
//       },
//     }),
//   };

//   return (
//     <div
//       className="w-full bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: `url('/201.png')`, // <-- add your background here
//       }}
//     >
//       {/* Soft overlay */}
//       <div className="w-full min-h-screen bg-[#BFE2F3]/20 px-6 md:px-12 lg:px-20 pt-32 pb-20 flex justify-center">
//         <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-28">

//           {/* LEFT CONTENT */}
//           <div className="flex-1" ref={textRef}>
//             <motion.h1
//               custom={0}
//               variants={textVariants}
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               className="text-4xl md:text-5xl font-extrabold text-white leading-tight "
//             >
//               Together, We Can Change Lives
//             </motion.h1>

//             <motion.p
//               custom={1}
//               variants={textVariants}
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               className="text-lg md:text-xl font-semibold text-black mt-4"
//             >
//               {/* Nous donnons le pouvoir médiatique à nos partenaires */}
//             </motion.p>

//             <motion.p
//               custom={2}
//               variants={textVariants}
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               className="text-md md:text-lg text-white/80 mt-6 leading-relaxed"
//             >
//               Empowering underprivileged <span className="font-bold">communities through education, healthcare,</span>and social support—one step, one smile, one life at a time.
//               <span className="font-bold"> one smile, one life at a time </span>

//             </motion.p>

//             <motion.a
//               custom={3}
//               variants={textVariants}
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               href="#"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.97 }}
//               className="inline-block mt-8 px-8 py-4 bg-black text-white rounded-full text-sm md:text-md tracking-wide shadow-lg hover:bg-black/90 transition"
//             >
//               Support Our Mission
//             </motion.a>
//           </div>

//           {/* RIGHT IMAGE CARD */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex-1 flex justify-center"
//           >
//             <motion.div
//               className="bg-white/60 backdrop-blur-md border border-black/10 rounded-xl p-6 shadow-xl"
//               style={{ rotate: "-3deg" }}
//               whileHover={{ rotate: "0deg", scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <img
//                 src="/bnplogo.png"
//                 className="w-[280px] md:w-[350px] lg:w-[420px]"
//                 alt="BNP Logo"
//               />

//               <div className="mt-4 text-center">
//                 <h3 className="text-xl font-semibold text-black">BNP</h3>
//                 <p className="text-md text-black/80">
//                   Charitable Trust <br /> Founder – Niranjan Patnaik
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;


// import React, { useMemo } from "react";
// import { motion } from "framer-motion";

// // SplitText Animation Component
// const SplitText = ({ text, delayStep = 0.03, className }) => {
//   const letters = useMemo(() => text.split(""), [text]);

//   return (
//     <h1 className={`inline-block overflow-hidden ${className}`}>
//       {letters.map((char, i) => (
//         <motion.span
//           key={i}
//           className="inline-block"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 0.45,
//             delay: i * delayStep,
//             ease: "easeOut",
//           }}
//           viewport={{ once: true }}
//         >
//           {char === " " ? "\u00A0" : char}
//         </motion.span>
//       ))}
//     </h1>
//   );
// };

// const Hero = () => {
//   const backgroundImages = ["/201.png", "/202.png", "/203.png"];

//   return (
//     <section className="relative w-full min-h-screen overflow-hidden">

//       {/* 🎞 Background Carousel */}
//       {backgroundImages.map((img, i) => (
//         <motion.div
//           key={i}
//           className="absolute inset-0 w-full h-full bg-cover bg-center"
//           style={{
//             backgroundImage: `url(${img})`,
//             animation: `fadeSlide 18s infinite`,
//             animationDelay: `${i * 6}s`,
//           }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 2 }}
//         ></motion.div>
//       ))}

//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/20"></div>

//       {/* HERO CONTENT */}
//       <div className="relative z-[10] w-full min-h-screen flex items-center px-6 md:px-12 lg:px-20 ">

//         {/* LEFT TEXT */}
//         <div className="flex-1 max-w-xl">
//           <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
//             <SplitText
//               text="Building Hope, One Life at a Time"
//               className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg"
//             />
//           </div>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             viewport={{ once: true }}
//             className="text-white/90 text-lg mt-4 leading-relaxed"
//           >
//             Together, we create sustainable change by uplifting communities,
//             empowering families, and bringing opportunities to those who need them most.
//           </motion.p>

//           <motion.button
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.45 }}
//             viewport={{ once: true }}
//             className="mt-6 px-6 py-3 bg-white text-[#0A4C8B] rounded-xl text-lg font-semibold shadow-md hover:bg-gray-200 transition"
//           >
//             Support Our Mission
//           </motion.button>
//         </div>

//         {/* RIGHT IMAGE CARD */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7 }}
//           viewport={{ once: true }}
//           className="hidden md:block flex-1 flex justify-end"
//         >
//           <div className="bg-white/90 backdrop-blur-lg p-6 rounded-3xl shadow-2xl w-[380px]">
//             <img
//               src="/bnplogo.png"
//               className="w-full rounded-xl shadow-md"
//               alt="BNP Logo"
//             />

//             <h3 className="text-[#0A4C8B] text-xl font-bold mt-4">
//               BNP Charitable Trust
//             </h3>

//             <p className="text-gray-600 text-sm mt-2">
//               Empowering communities with dignity, opportunity,  
//               and hope through sustainable programs.
//             </p>
//           </div>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default Hero;


import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Trophy, Tractor, BookOpen, Medal, HeartPulse } from "lucide-react";

const features = [
  { icon: GraduationCap, title: "Educational Scholarships", color: "blue-600" },
  { icon: Trophy, title: "Academic Excellence Awards", color: "purple-600" },
  { icon: Tractor, title: "Farmer Recognition", color: "green-600" },
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
  const backgroundImages = ["/201.png", "/202.png", "/203.png"];

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
              BNP Charitable Trust is dedicated to supporting meritorious students, recognizing progressive farmers, celebrating literary and sporting excellence, and advancing community welfare across Odisha through scholarships, financial assistance, awards, and impactful social initiatives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Link
                to="/scholarship/apply"
                className="inline-flex items-center rounded-xl bg-white px-6 py-3 text-lg font-semibold text-[#0A4C8B] shadow-md transition hover:bg-gray-200"
              >
                Apply for Scholarship
              </Link>
            </motion.div>
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
            <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl w-[300px] lg:w-[320px] mx-auto md:mx-0 -rotate-[6deg] mt-10 border border-white/50">
              <img
                src="/bnplogo.png"
                className="w-full rounded-xl shadow-md"
                alt="BNP Logo"
              />

              <h3 className="text-[#0A4C8B] text-lg font-bold mt-4">
                BNP Charitable Trust
              </h3>

              <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                Creating opportunities through education, farmer empowerment, literature, sports, and public welfare for a stronger and more inclusive Odisha.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

      {/* HORIZONTAL AUTO-SCROLL TICKER BELOW HERO SECTION */}
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
    </>
  );
};

export default Hero;

