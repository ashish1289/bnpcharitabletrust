import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { UsersRound } from "lucide-react";
import WhatWeDo from "../components/WhatWeDo";
import Impact from "../components/Impact";
import StoriesOfChange from "../components/StoriesOfChange";

// SplitText component for fancy heading animation
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

const BoardOfTrusteesSection = () => {
  const trustees = [
    {
      serialNo: 1,
      name: "Shri Tara Ranjan Patnaik",
      designation: "Chairman, Trustees",
      fathersName: "Shri Padmanav Patnaik",
      address: "Plot No-2132/5058, Tankapani Road, BJB Nagar, Bhubaneswar-751014",
      img: "/profiledemo.jpg",
    },
    {
      serialNo: 2,
      name: "Shri Dharmaditya Patnaik",
      designation: "Trustees",
      fathersName: "Shri Chita Ranjan Patnaik",
      address: "70, Forest Park, Bhubaneswar-751009",
      img: "/profiledemo.jpg",
    },
    {
      serialNo: 3,
      name: "Shri Dibyalok Patnaik",
      designation: "Trustees",
      fathersName: "Shri Chita Ranjan Patnaik",
      address: "70, Forest Park, Bhubaneswar-751009",
      img: "/profiledemo.jpg",
    },
    {
      serialNo: 4,
      name: "Shri Somjit Patnaik",
      designation: "Trustees",
      fathersName: "Shri Suranjan Patnaik",
      address: "Flat No-G 06, Block-C Ramky Towers, Gachibowli, VTC- Gochibowli, Dist- K. V. Rangaready, State- Telangana-500032",
      img: "/profiledemo.jpg",
    },
    {
      serialNo: 5,
      name: "Shri Devjyoti Patnaik",
      designation: "Trustees",
      fathersName: "Shri Niranjan Patnaik",
      address: "N-2/29, IRC Village, Nayapalli, Bhubaneswar-751015",
      img: "/profiledemo.jpg",
    },
    {
      serialNo: 6,
      name: "Shri Navajyoti Patnaik",
      designation: "Trustees",
      fathersName: "Shri Niranjan Patnaik",
      address: "N-2/29, IRC Village, Nayapalli, Bhubaneswar-751015",
      img: "/profiledemo.jpg",
    },
    {
      serialNo: 7,
      name: "Shri Abhishek Patnaik",
      designation: "Trustees",
      fathersName: "Shri Biswaranjan Patnaik",
      address: "BB-16, Civil Township Rourkela-769004",
      img: "/profiledemo.jpg",
    },
    {
      serialNo: 8,
      name: "Shri Anshuman Patnaik",
      designation: "Trustees",
      fathersName: "Shri Dipti Ranjan Patnaik",
      address: "808, ARCON RETREAT, Patia Bhubaneswar-751031",
      img: "/profiledemo.jpg",
    },
    {
      serialNo: 9,
      name: "Shri Anurag Patnaik",
      designation: "Trustees",
      fathersName: "Shri Dipti Ranjan Patnaik",
      address: "A/6, Commercial Estate, Civil Township Rourkela, Sundargarh, Odisha--769004",
      img: "/profiledemo.jpg",
    },
    {
      serialNo: 10,
      name: "Shri Parthajit Patnaik",
      designation: "Trustees",
      fathersName: "Shri Tara Ranjan Patnaik",
      address: "Plot No-2132/5058, Tankapani Road, B J B Nagar, Bhubaneswar-751014",
      img: "/profiledemo.jpg",
    },
    {
      serialNo: 11,
      name: "Ms. Adyasha Patnaik",
      designation: "Trustees",
      fathersName: "Shri Prava Ranjan Patnaik",
      address: "Plot No-2132/5058, Tankapani Road, B J B Nagar, Bhubaneswar-751014",
      img: "/profiledemo.jpg",
    },
    {
      serialNo: 12,
      name: "Shri Anupam Patnaik",
      designation: "Trustees",
      fathersName: "Shri Amiya Ranjan Patnaik",
      address: "N-2/29, IRC Village, Nayapalli, Bhubaneswar-751015",
      img: "/profiledemo.jpg",
    },
    {
      serialNo: 13,
      name: "Ms. Tanaya Patnaik",
      designation: "Trustees",
      fathersName: "Shri Soumya Ranjan Patnaik",
      address: "185 VIP Area, IRC Village, Nayapalli, Bhubaneswar-751015",
      img: "/profiledemo.jpg",
    },
  ];

  return (
    <section
      className="w-full py-24 md:py-32 relative overflow-hidden"
      style={{
        background: "url('/.png') center/cover no-repeat",
      }}
    >
      {/* Decorative assets */}
      <img
        src="/hirondelle-4.png"
        className="absolute top-10 right-10 w-40 opacity-20"
      />
      <img
        src="/brush-patch.webp"
        className="absolute bottom-0 left-0 w-60 opacity-30"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Heading */}
        <div className="text-center mb-14">
          <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
            <SplitText
              text="Board of Trustees"
              className="text-4xl md:text-5xl font-extrabold text-[#0A4C8B]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto mt-4"
          >
            “Guiding the mission, shaping the vision — our trustees stand as pillars of hope,
            compassion, and leadership at BNP Charitable Trust.”
          </motion.p>
        </div>

        {/* Trustee Message Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-[#0F72CE] mb-4">
              Message from the Board
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              At BNP Charitable Trust, our purpose is rooted in service, dignity, and compassion.
              We believe that every act of kindness creates a ripple effect that touches
              thousands of lives.  
              <br />
              <br />
              Our Board of Trustees is committed to ensuring transparency, accountability,
              and impact-driven action while supporting sustainable change for generations to come.
            </p>
          </motion.div>

          <motion.img
            src="/Niranjan.jpg"
            alt="Trustee Leader"
            className="rounded-3xl w-full h-[400px] object-cover shadow-xl"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />
        </div>

        {/* Trustees Grid */}
        <h3 className="text-3xl font-bold text-[#0F72CE] text-center mb-10">
          Meet Our Trustees
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustees.map((t, idx) => (
            <motion.div
              key={idx}
              className="rounded-3xl bg-white p-6 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4 shadow-md"
                />
                <h4 className="text-lg font-bold text-[#0A4C8B]">
                  {t.name}
                </h4>
                <p className="text-black-500 text-md mt-1">{t.designation}</p>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-semibold">Father's/Husband's Name:</span>{" "}
                  <span className="text-gray-600">{t.fathersName}</span>
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Address:</span>{" "}
                  <span className="text-gray-600">{t.address}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      <WhatWeDo/>

<StoriesOfChange/>
    </section>
  );
};

export default BoardOfTrusteesSection;
