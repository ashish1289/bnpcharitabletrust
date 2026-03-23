// import React, { useMemo } from "react";
// import { motion } from "framer-motion";
// import { Medal, Award, GraduationCap, Trophy } from "lucide-react";

// // SplitText component
// const SplitText = ({ text, delayStep = 0.03, className }) => {
//   const letters = useMemo(() => text.split(""), [text]);

//   return (
//     <h2 className={`inline-block overflow-hidden ${className}`}>
//       {letters.map((char, i) => (
//         <motion.span
//           key={i}
//           className="inline-block"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4, delay: i * delayStep }}
//           viewport={{ once: true }}
//         >
//           {char === " " ? "\u00A0" : char}
//         </motion.span>
//       ))}
//     </h2>
//   );
// };

// const AwardsSection = () => {
//   const awards = [
//     {
//       icon: <Award size={50} strokeWidth={1.5} />,
//       title: "Best Community Impact Award",
//       desc: "Recognized for delivering high-impact community development actions in rural and urban regions.",
//       img: "/4.png", // Replace with your own images later
//       gradient: "linear-gradient(135deg,#FFE7C4,#FFD9A5)",
//     },
//     {
//       icon: <GraduationCap size={50} strokeWidth={1.5} />,
//       title: "BNP Merit Scholarship",
//       desc: "Supporting students from underprivileged backgrounds to continue higher education.",
//       img: "/5.png",
//       gradient: "linear-gradient(135deg,#D7F8E4,#C7FFD9)",
//     },
//     {
//       icon: <Trophy size={50} strokeWidth={1.5} />,
//       title: "Excellence in Social Service Award",
//       desc: "Awarded for exceptional dedication towards uplifting vulnerable communities.",
//       img: "/6.png",
//       gradient: "linear-gradient(135deg,#E7E3FF,#DDEBFF)",
//     },
//     {
//       icon: <Medal size={50} strokeWidth={1.5} />,
//       title: "Youth Talent Scholarship",
//       desc: "Funding programs encouraging young individuals to pursue sports, arts, and skill development.",
//       img: "/7.png",
//       gradient: "linear-gradient(135deg,#CFE8FF,#DBF1FF)",
//     },
//   ];

//   return (
//     <section
//       className="w-full py-24 md:py-32 relative overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(to bottom right, #F2FAFF, #E9FFF4, #F8FCFF)",
//       }}
//     >
//       {/* Soft glowing blob */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         whileInView={{ opacity: 0.25, scale: 1 }}
//         transition={{ duration: 1.2 }}
//         viewport={{ once: true }}
//         className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#CDE6FF] blur-3xl opacity-40"
//       ></motion.div>

//       <div className="max-w-7xl mx-auto px-6 lg:px-10">
//         {/* Heading */}
//         <div className="text-center mb-14">
//           <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
//             <SplitText
//               text="Awards & Scholarships"
//               className="text-4xl md:text-5xl font-extrabold text-[#0A4C8B]"
//             />
//           </div>

//           <motion.p
//             initial={{ opacity: 0, y: 18 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="max-w-3xl mx-auto mt-4 text-gray-600 text-lg"
//           >
//             We celebrate excellence, empower talent, and support future leaders  
//             through impactful awards and transformative scholarship programs.
//           </motion.p>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
//           {awards.map((a, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 60, scale: 0.98 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 0.7 }}
//               viewport={{ once: true }}
//               className="rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden"
//             >
//               {/* Accent background */}
//               <div
//                 className="h-4 w-full"
//                 style={{ background: a.gradient }}
//               ></div>

//               <div className="p-8">
//                 <div className="text-[#0F72CE] mb-6">{a.icon}</div>

//                 <h3 className="text-2xl font-bold text-[#0F72CE] mb-3">
//                   {a.title}
//                 </h3>

//                 <p className="text-gray-600 leading-relaxed text-md mb-4">
//                   {a.desc}
//                 </p>

//                 <img
//                   src={a.img}
//                   alt={a.title}
//                   className="w-full h-52 object-cover rounded-xl shadow-md"
//                 />
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Closing Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 60 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           viewport={{ once: true }}
//           className="mt-20 bg-[#0A4C8B] text-white rounded-3xl p-10 shadow-xl text-center"
//         >
//           <h3 className="text-3xl md:text-4xl font-bold mb-3">
//             “Empowering Dreams. Celebrating Excellence.”
//           </h3>
//           <p className="text-white/90 text-lg max-w-3xl mx-auto">
//             Through awards and scholarships, we build pathways for young leaders, innovators,  
//             and changemakers to rise and shape a brighter future.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AwardsSection;


import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Medal, Award, GraduationCap, Trophy } from "lucide-react";

// SplitText Component
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
          transition={{ duration: 0.4, delay: i * delayStep }}
          viewport={{ once: true }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
};

const AwardsSection = () => {
  const awards = [
    {
      icon: <Award size={50} strokeWidth={1.5} />,
      title: "Best Community Impact Award",
      desc: "Recognized for delivering high-impact community development actions in rural and urban regions.",
      img: "/4.png",
      gradient: "linear-gradient(135deg,#FFE7C4,#FFD9A5)",
    },
    {
      icon: <GraduationCap size={50} strokeWidth={1.5} />,
      title: "BNP Merit Scholarship",
      desc: "Supporting students from underprivileged backgrounds to continue higher education.",
      img: "/5.png",
      gradient: "linear-gradient(135deg,#D7F8E4,#C7FFD9)",
    },
    {
      icon: <Trophy size={50} strokeWidth={1.5} />,
      title: "Excellence in Social Service Award",
      desc: "Awarded for exceptional dedication towards uplifting vulnerable communities.",
      img: "/6.png",
      gradient: "linear-gradient(135deg,#E7E3FF,#DDEBFF)",
    },
    {
      icon: <Medal size={50} strokeWidth={1.5} />,
      title: "Youth Talent Scholarship",
      desc: "Funding programs encouraging young individuals to pursue sports, arts, and skill development.",
      img: "/7.png",
      gradient: "linear-gradient(135deg,#CFE8FF,#DBF1FF)",
    },
  ];

  return (
    <section
      className="w-full py-24 md:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, #F2FAFF, #E9FFF4, #F8FCFF)",
      }}
    >
      {/* Soft Glowing Blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#CDE6FF] blur-3xl opacity-40"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-14">
          <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
            <SplitText
              text="Awards & Scholarships"
              className="text-4xl md:text-5xl font-extrabold text-[#0A4C8B]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-4 text-gray-600 text-lg"
          >
            We celebrate excellence, empower talent, and support future leaders  
            through impactful awards and transformative scholarship programs.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {awards.map((a, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Accent background */}
              <div
                className="h-4 w-full"
                style={{ background: a.gradient }}
              ></div>

              <div className="p-8">
                <div className="text-[#0F72CE] mb-6">{a.icon}</div>

                <h3 className="text-2xl font-bold text-[#0F72CE] mb-3">
                  {a.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {a.desc}
                </p>

                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-52 object-cover rounded-xl shadow-md"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* =================================================================== */}
        {/* NEW SECTION 1 — WITH IMAGE (VERY RESPONSIVE) */}
        {/* =================================================================== */}

        <div className="mt-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <motion.img
            src="/11.png"
            alt="BNP Charity Work"
            className="w-full h-[380px] object-cover rounded-3xl shadow-xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#0A4C8B] leading-tight">
              Recognizing Excellence.  
              <br /> Inspiring the Next Generation.
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our awards celebrate the individuals and teams who go above and beyond  
              to uplift communities. Their dedication inspires thousands and strengthens  
              our commitment to serve with compassion and impact.
            </p>
          </motion.div>
        </div>

        {/* =================================================================== */}
        {/* NEW SECTION 2 — POWERFUL TEXT ONLY */}
        {/* =================================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="mt-28 bg-[#0A4C8B] text-white rounded-3xl p-12 shadow-xl text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            “Every Award Is a Promise to Do Better.”
          </h3>

          <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
            Behind every recognition lies hours of service, unwavering commitment,
            and the belief that every life can be transformed.  
            <br /><br />
            These awards are not just achievements —  
            <strong>they are milestones in our journey to create lasting impact.</strong>
          </p>
        </motion.div>

        {/* Closing Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-[#0A4C8B] text-white rounded-3xl p-10 shadow-xl text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-3">
            “Empowering Dreams. Celebrating Excellence.”
          </h3>
          <p className="text-white/90 text-lg max-w-3xl mx-auto">
            Through awards and scholarships, we build pathways for young leaders, innovators,  
            and changemakers to rise and shape a brighter future.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsSection;
