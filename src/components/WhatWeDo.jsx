import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Utensils,
  HeartHandshake,
  Stethoscope,
  UsersRound,
  Leaf,
} from "lucide-react";

// SplitText animation
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
            duration: 0.45,
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

const whatWeDoData = [
  {
    title: "Education Support",
    desc: "Providing quality learning opportunities, materials, and mentorship.",
    icon: <GraduationCap size={48} strokeWidth={1.5} />,
    gradient: "linear-gradient(135deg,#D7EFFF,#B9E6FF)",
    image: "/education.jpg",
  },
  {
    title: "Nutrition Programs",
    desc: "Delivering fresh meals and essential nutrition to vulnerable families.",
    icon: <Utensils size={48} strokeWidth={1.5} />,
    gradient: "linear-gradient(135deg,#FFE3BA,#FFD29C)",
    image: "/8.png",
  },
  {
    title: "Women Empowerment",
    desc: "Skill development, financial literacy and leadership programs for women.",
    icon: <HeartHandshake size={48} strokeWidth={1.5} />,
    gradient: "linear-gradient(135deg,#EEDAFF,#E4C8FF)",
    image: "/women.jpg",
  },
  {
    title: "Healthcare Initiatives",
    desc: "Medical camps, health checkups, and emergency care support.",
    icon: <Stethoscope size={48} strokeWidth={1.5} />,
    gradient: "linear-gradient(135deg,#DAFCEB,#C6F9DF)",
    image: "/9.png",
  },
  {
    title: "Community Development",
    desc: "Building stronger communities with local leadership and resilience.",
    icon: <UsersRound size={48} strokeWidth={1.5} />,
    gradient: "linear-gradient(135deg,#FFF3C9,#FFE99C)",
    image: "/10.png",
  },
  {
    title: "Envirmonmental Conservation",
    desc: "Protecting natural resources and promoting sustainable practices.",
    icon: <Leaf size={48} strokeWidth={1.5} />,
    gradient: "linear-gradient(135deg,#D7EFFF,#B9E6FF)",
    image: "/101.jpg",
  },
];

const WhatWeDo = () => {
  return (
    <section
      className="w-full py-24 md:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right,#F2FAFF,#E9FFF4,#F8FCFF)",
      }}
    >
      {/* Decorative Blobs */}
      <motion.img
        src="/hirondelle-4.png"
        className="absolute top-10 left-10 w-48 opacity-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      />

      <motion.img
        src="/brush-patch.webp"
        className="absolute bottom-0 right-0 w-56 opacity-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.25 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
            <SplitText
              text="What We Do"
              className="text-4xl md:text-5xl font-extrabold text-[#0A4C8B]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg"
          >
            Empowering communities through education, nourishment, healthcare,
            equality, and sustainable development.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {whatWeDoData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white shadow-xl overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Accent top bar */}
              <div
                className="h-3 w-full"
                style={{ background: item.gradient }}
              ></div>

              {/* Card Content */}
              <div className="p-7 flex flex-col flex-1">
                <div className="text-[#0F72CE] mb-4">{item.icon}</div>

                <h3 className="text-xl font-bold text-[#0F72CE] mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {item.desc}
                </p>

                {/* Illustration / Image */}
                <div className="rounded-xl overflow-hidden mt-auto shadow-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
