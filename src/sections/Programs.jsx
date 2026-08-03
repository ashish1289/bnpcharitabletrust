import React from "react";
import * as motion from "motion/react-client";
// import {  Variants } from "motion/react";
import {
  GraduationCap,
  Trophy,
  BookOpen,
  Tractor,
  Medal,
  HeartPulse,
  Leaf,
  Stethoscope,
} from "lucide-react";

export default function Programs() {
  const programs = [
    {
      icon: <GraduationCap size={80} strokeWidth={1.5} />,
      title: "Education Scholarships",
      desc: "Providing monthly financial assistance and scholarships to meritorious and underprivileged students pursuing Engineering, Medical, Nursing, Diploma, Graduation, and Post-Graduation across Odisha.",
      img: "/7777.jpeg",
      hueA: 200,
      hueB: 260,
    },
    {
      icon: <Trophy size={80} strokeWidth={1.5} />,
      title: "Academic Excellence Awards",
      desc: "Recognizing Board and University toppers with cash awards to encourage academic excellence and inspire students to pursue higher education with confidence.",
      img: "/7894.jpeg",
      hueA: 20,
      hueB: 40,
    },
    {
      icon: <BookOpen size={80} strokeWidth={1.5} />,
      title: "Manoj Das Sahitya Award",
      desc: "Instituted in memory of the legendary writer Shri Manoj Das, this prestigious award recognizes eminent writers who have made remarkable contributions to literature and cultural heritage.",
      img: "/images.jpeg",
      hueA: 300,
      hueB: 340,
    },
    {
      icon: <Tractor size={80} strokeWidth={1.5} />,
      title: "Farmers Recognition",
      desc: "Recognizing the best cultivators from all 30 districts of Odisha with annual awards that celebrate innovation, dedication, and excellence in agriculture.",
      img: "/odisha_farmer_1785671235573.png",
      hueA: 120,
      hueB: 160,
    },
    {
      icon: <Medal size={80} strokeWidth={1.5} />,
      title: "Sports Excellence Awards",
      desc: "Honouring Odia athletes who have won medals at National and International competitions, inspiring future generations through excellence in sports.",
      img: "/sports_excellence_india.png",
      hueA: 70,
      hueB: 110,
    },
    {
      icon: <HeartPulse size={80} strokeWidth={1.5} />,
      title: "Community Welfare",
      desc: "Supporting public welfare initiatives, charitable organizations, and community development programs that improve education, healthcare, and social well-being across Odisha.",
      img: "/8888.jpeg",
      hueA: 160,
      hueB: 200,
    },
    {
      icon: <Leaf size={80} strokeWidth={1.5} />,
      title: "Environmental Conservation",
      desc: "Promoting green initiatives, tree plantations, and eco-awareness campaigns to preserve natural resources and create a sustainable environment for future generations in Odisha.",
      img: "/5555.jpeg",
      hueA: 90,
      hueB: 130,
    },
    {
      icon: <Stethoscope size={80} strokeWidth={1.5} />,
      title: "Healthcare Initiatives",
      desc: "Organizing free medical checkup camps, health awareness drives, and providing essential healthcare support to underprivileged communities across rural Odisha.",
      img: "/9.png",
      hueA: 340,
      hueB: 10,
    },
  ];

  return (
    // <section className="relative w-full py-24 md:py-32 overflow-hidden">
    <section
      className="relative w-full py-24 md:py-32 overflow-hidden bg-gradient-to-br from-[#CFE8FF] via-[#D7F8E4] to-[#F1F8FF] animate-bgGlow"
    >
      {/* DOTTED BACKGROUND */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.22, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 bg-[url('/dots.png')] bg-cover opacity-30"
      />

      {/* <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-4xl md:text-5xl font-extrabold text-[#0F72CE] mb-14 leading-tight drop-shadow-sm"
      >
        <span className="text-[#26B66F] funky-text">Our</span> Programs
      </motion.h2> */}

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-8 px-6 lg:px-10">
        {programs.map((p, i) => (
          <ProgramCard
            key={i}
            icon={p.icon}
            title={p.title}
            desc={p.desc}
            img={p.img}
            hueA={p.hueA}
            hueB={p.hueB}
            i={i}
          />
        ))}
      </div>
    </section>
  );
}



function ProgramCard({ title, desc, img, icon, hueA, hueB, i }) {
  const bg = `linear-gradient(306deg, hsl(${hueA},100%,50%), hsl(${hueB},100%,50%))`;

  return (
    <motion.div
      className={`card-container-${i}`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.6 }}
      style={{
        overflow: "hidden",
        position: "relative",
        paddingTop: 20,
        paddingBottom: 80,
      }}
    >
      {/* SPLASH BACKGROUND */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: bg,
          clipPath:
            "path('M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z')",
          opacity: 0.35,
        }}
      />

      {/* ACTUAL CARD */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center z-10 relative border border-gray-200"
        style={{
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <div className="mb-6 text-[#0F72CE]">{icon}</div>

        <img
          src={img}
          className="w-full h-56 object-cover rounded-xl shadow-md mb-6"
        />

        <h3 className="text-2xl font-bold text-[#0F72CE] funky-text mb-3">
          {title}
        </h3>

        <p className="text-gray-600 text-md leading-relaxed">{desc}</p>
      </motion.div>
    </motion.div>
  );
}

const cardVariants = {
  offscreen: {
    y: 300,
    opacity: 0,
    rotate: 0,
  },
  onscreen: {
    y: 50,
    opacity: 1,
    rotate: -8,
    transition: {
      type: "spring",
      bounce: 0.35,
      duration: 0.9,
    },
  },
};
