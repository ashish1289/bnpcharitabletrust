// src/sections/Mission.jsx
import React, { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

// NOTE: This component expects the Gloria Hallelujah font to be loaded in index.html:
// <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap" rel="stylesheet" />
// And add to your CSS: body { font-family: 'Poppins', system-ui, ... } and for headline use 'Gloria Hallelujah' as shown.

const HeadingSplit = ({ text, letterDelay = 0.03, className = "" }) => {
  // Splits into letters and preserves spaces
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <h2
      aria-hidden="true"
      className={`overflow-hidden inline-block ${className}`}
      style={{ lineHeight: 1.02 }}
    >
      {letters.map((char, i) => {
        // keep spaces as non-breaking spaces
        const displayChar = char === " " ? "\u00A0" : char;
        return (
          <motion.span
            key={i}
            style={{ display: "inline-block", whiteSpace: "pre" }}
            initial={{ opacity: 0, y: 24, rotate: -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.45, delay: i * letterDelay, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.6 }}
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
          <div className="w-full h-36 md:h-44 overflow-hidden rounded-xl mb-4">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-semibold text-[#0F72CE] mb-2">
            {title}
          </h3>

          <p className="text-gray-600 text-sm md:text-base">{text}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <a
            href="#donate"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F72CE] text-white text-sm shadow-sm hover:bg-[#095aa4] transition"
          >
            Support
          </a>
          <span className="text-sm text-gray-400">Learn more →</span>
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
      text: "We provide scholarships, classrooms, and mentors — because every child deserves a future.",
      image: "/educationgif.gif",
      gradient: "linear-gradient(135deg,#A8E6FF 0%, #D7F8E4 100%)",
    },
    {
      title: "Nourish & Thrive",
      text: "Healthy meals and nutrition programs for children and families at risk.",
      image: "/nutrition.gif",
      gradient: "linear-gradient(135deg,#FFD8B6 0%, #FFEFD6 100%)",
    },
    {
      title: "Women-Led Change",
      text: "Training, small business grants and community leadership support for women.",
      image: "/issue-4.gif",
      gradient: "linear-gradient(135deg,#E7E3FF 0%, #DDEBFF 100%)",
    },
    {
      title: "Community Resilience",
      text: "Local healthcare, disaster relief and sustainable livelihood initiatives.",
      image: "/community.gif",
      gradient: "linear-gradient(135deg,#CFF7E1 0%, #E6FFF6 100%)",
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
                  text={"Our Mission — Ignite Hope"}
                  letterDelay={0.03}
                  className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A4C8B]"
                />
              </div>
            </div>

            <div className="mb-6">
              {/* Big quote - animate line by line */}
              <LineSplit
                lines={[
                  "“Small acts of kindness create the ripples that become waves of change.”",
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
  We work hand-in-hand with communities, educators, frontline workers, and
  local leaders to build sustainable pathways of hope. Our mission is rooted
  in dignity — ensuring that every child, woman, and family has access to
  opportunities that empower them to rise above hardship with confidence.
  <br /><br />
  Through education, nutrition, healthcare, and community development, we
  nurture environments where people are not just supported, but strengthened
  to shape their own futures. We believe true impact is created not through
  temporary aid, but through long-term transformation — the kind that uplifts
  generations.
  <br /><br />
  Every program we initiate is designed to restore dignity, amplify
  potential, and enable communities to stand resilient, united, and hopeful.
  Together, we are building a movement where compassion becomes action,
  action becomes change, and change becomes a better world for all.
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
