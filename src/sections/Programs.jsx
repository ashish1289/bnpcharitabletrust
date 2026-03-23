import React from "react";
import * as motion from "motion/react-client";
// import {  Variants } from "motion/react";
import {
  BookOpenCheck,
  HandHeart,
  UtensilsCrossed,
  Users,
  Leaf,
  HeartPulse,
} from "lucide-react";

export default function Programs() {
  const programs = [
    {
      icon: <BookOpenCheck size={80} strokeWidth={1.5} />,
      title: "Education For All",
      desc: "Helping children access quality education and learning materials.",
      img: "https://images.unsplash.com/photo-1569420626546-55b02c8376b1?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with your real images
      hueA: 200,
      hueB: 260,
    },
    {
      icon: <UtensilsCrossed size={80} strokeWidth={1.5} />,
      title: "Food & Nutrition",
      desc: "Providing nutritious meals to underprivileged families.",
      img: "/education.jpg",
      hueA: 20,
      hueB: 40,
    },
    {
      icon: <Users size={80} strokeWidth={1.5} />,
      title: "Women Empowerment",
      desc: "Training and supporting women to build a better future.",
      img: "/women.jpg",
      hueA: 300,
      hueB: 340,
    },
    {
      icon: <HandHeart size={80} strokeWidth={1.5} />,
      title: "Community Support",
      desc: "Supporting families with essential resources and care.",
      img: "/education.jpg",
      hueA: 120,
      hueB: 160,
    },
    {
      icon: <Leaf size={80} strokeWidth={1.5} />,
      title: "Envirmonmental Conservation",
      desc: "Protecting and preserving natural ecosystems for future generations.",
      img: "/101.jpg",
      hueA: 70,
      hueB: 110,
    },
    {
      icon: <HeartPulse size={80} strokeWidth={1.5} />,
      title: "healthcare initiatives",
      desc: "Providing medical care and health resources to underserved communities.",
      img: "/9.png",
      hueA: 160,
      hueB: 200,
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

      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-4xl md:text-5xl font-extrabold text-[#0F72CE] mb-14 leading-tight drop-shadow-sm"
      >
        <span className="text-[#26B66F] funky-text">Our</span> Programs
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16 px-6">
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
