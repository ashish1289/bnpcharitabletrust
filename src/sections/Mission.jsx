// src/sections/Mission.jsx
import React, { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

// NOTE: This component expects the Gloria Hallelujah font to be loaded in index.html:
// <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap" rel="stylesheet" />
// And add to your CSS: body { font-family: 'Poppins', system-ui, ... } and for headline use 'Gloria Hallelujah' as shown.

const HeadingSplit = ({ text, letterDelay = 0.03, className = "" }) => {
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <h2
      className={`inline-block ${className}`}
      style={{ lineHeight: 1.15 }}
    >
      {letters.map((char, i) => {
        const displayChar = char === " " ? "\u00A0" : char;
        return (
          <motion.span
            key={i}
            style={{ display: "inline-block", whiteSpace: "pre" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * letterDelay, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {displayChar}
          </motion.span>
        );
      })}
    </h2>
  );
};

const LineSplit = ({ lines = [], className = "" }) => {
  return (
    <div className={className}>
      {lines.map((line, idx) => (
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-lg md:text-xl leading-relaxed"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
};

const BentoCard = ({ title, text, image, accentGradient }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 80, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "circOut" }}
      viewport={{ once: true, amount: 0.6 }}
      className="relative rounded-3xl overflow-hidden shadow-xl"
      style={{ borderRadius: 22 }}
    >
      {/* accent blob behind card */}
      <div
        className="absolute -left-6 -top-6 w-40 h-40 rounded-2xl opacity-30 blur-md pointer-events-none"
        style={{ background: accentGradient, transform: "rotate(-12deg)" }}
      />

      <div className="bg-white/95 p-6 md:p-8 rounded-3xl min-h-[260px] flex flex-col">
        <div className="flex-1">
          <div className="w-full h-36 md:h-44 overflow-hidden rounded-xl mb-4 bg-transparent flex items-center justify-center">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-contain p-2 mix-blend-multiply" />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-semibold text-[#0F72CE] mb-2">
            {title}
          </h3>

          <p className="text-gray-600 text-sm md:text-base">{text}</p>
        </div>

      </div>
    </motion.article>
  );
};

export default function Mission() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  // sample bento cards content (replace images with your own public paths)
  const cards = [
    {
      title: "Empower Education",
      text: "We provide scholarships and monthly financial assistance to meritorious and underprivileged students pursuing Engineering, Medical, Nursing, Diploma, Graduation, and Post-Graduation, enabling them to achieve their academic aspirations without financial barriers.",
      image: "/education_card.png",
      gradient: "linear-gradient(135deg,#A8E6FF 0%, #D7F8E4 100%)",
    },
    {
      title: "Empower Farmers",
      text: "Recognizing the backbone of our nation, we honor outstanding cultivators from all 30 districts of Odisha with cash awards, encouraging innovation, sustainable farming, and rural prosperity.",
      image: "/farmer_card.png",
      gradient: "linear-gradient(135deg,#FFD8B6 0%, #D7F8E4 100%)",
    },
    {
      title: "Manoj Das Sahitya Award",
      text: "In memory of the legendary writer Manoj Das, the Trust recognizes eminent authors through the prestigious Manoj Das Sahitya Award, celebrating excellence in literature and preserving Odisha's rich literary heritage.",
      image: "/literature_card.png",
      gradient: "linear-gradient(135deg,#FFD8B6 0%, #FFEFD6 100%)",
    },
    {
      title: "Celebrate Sporting Excellence",
      text: "We recognize and reward Odia athletes who have brought glory to the state and the nation through outstanding performances at National and International sporting events, inspiring future generations of champions.",
      image: "/sports_card.png",
      gradient: "linear-gradient(135deg,#E7E3FF 0%, #DDEBFF 100%)",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-20 md:py-28"
      aria-labelledby="our-mission"
      style={{
        // using the uploaded image path here — your toolchain will transform it to a usable URL
        backgroundImage: `linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), url('/mnt/data/hero.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* subtle overlay blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 0.22, scale: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,_rgba(255,255,255,0.12),_transparent)]"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* left column: split heading + quote */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              {/* small tag */}
              <motion.span
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block px-3 py-1 rounded-full text-sm bg-white/80 text-[#0A4C8B] font-semibold"
              >
                Our Purpose
              </motion.span>
            </div>

            <div className="mb-6">
              {/* Heading with splittext letters — uses Gloria Hallelujah */}
              <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
                <HeadingSplit
                  text={"Our Mission"}
                  letterDelay={0.03}
                  className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A4C8B]"
                />
              </div>
            </div>

            <div className="mb-6">
              {/* Big quote - animate line by line */}
              <LineSplit
                lines={[
                  "“Empowering Lives. Recognizing Excellence. Building a Better Odisha.”",
                ]}
                className="text-lg md:text-xl text-[#0F72CE] font-semibold"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              viewport={{ once: true }}
              className="text-gray-700 leading-relaxed"
            >
              BNP Charitable Trust is committed to creating a society where talent is nurtured, hard work is recognized, and every deserving individual has the opportunity to succeed. Through scholarships, financial assistance, awards, and community development initiatives, we strive to uplift lives and promote inclusive growth across Odisha.
              <br /><br />
              Our mission is to support meritorious and underprivileged students, encourage progressive farmers, honor literary excellence, recognize outstanding sportspersons, and contribute to public welfare. Guided by compassion, integrity, and service, we believe that investing in people today creates a stronger and more prosperous tomorrow.
              <br /><br />
              Every initiative of the Trust is undertaken without discrimination based on caste, creed, religion, language, gender, or region, ensuring equal opportunities for all.
            </motion.p>
          </div>

          {/* right column: bento grid (2x2 on large screens) */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cards.map((c, idx) => (
                <BentoCard
                  key={idx}
                  title={c.title}
                  text={c.text}
                  image={c.image}
                  accentGradient={c.gradient}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
