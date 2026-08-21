import React, { useMemo, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Trophy,
  Tractor,
  BookOpen,
  Medal,
  HeartPulse,
  ArrowRight
} from "lucide-react";

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

// Counter Animation Component
const AnimatedCounter = ({ target, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const AboutSection = () => {
  return (
    <div className="w-full relative overflow-hidden bg-white pt-24 pb-0">

      {/* ========================= INTRO SECTION ========================= */}
      <section
        className="w-full py-16 md:py-24 relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom right, #E9F5FF, #E6FFF3, #F5FBFF)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="absolute top-10 left-10 w-56 h-56 bg-[#BFE2F3] rounded-full blur-3xl opacity-40 pointer-events-none"
        ></motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
              <SplitText
                text="About BNP Charitable Trust"
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0A4C8B]"
              />
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-6 text-[#0F72CE] font-bold text-xl md:text-2xl"
            >
              "Serving Society with Purpose. Empowering Lives with Compassion."
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-6 text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed space-y-4 text-justify md:text-center"
            >
              <p>
                BNP Charitable Trust was established with a simple yet powerful vision—to give back to society by creating opportunities for education, recognizing excellence, empowering communities, and inspiring positive change across Odisha.
              </p>
              <p>
                Driven by decades of public service, entrepreneurship, and social responsibility, the Trust is committed to supporting deserving students, progressive farmers, eminent writers, talented sportspersons, and community welfare initiatives that build a stronger and more inclusive future.
              </p>
            </motion.div>
          </div>

          {/* ========================= ABOUT CONTENT ========================= */}
          <div className="flex flex-col gap-12 max-w-6xl mx-auto">
            
            {/* FOUNDER SECTION - Full width with large image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center hover:shadow-2xl transition-shadow"
            >
              <div className="w-full sm:w-2/3 lg:w-2/5 shrink-0 mx-auto">
                <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-gray-50">
                  <img
                    src="/niranjan.jpeg"
                    alt="Niranjan Patnaik"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400";
                    }}
                  />
                </div>
              </div>
              
              <div className="w-full lg:w-3/5 flex flex-col justify-center text-center lg:text-left">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F72CE] mb-2">
                  Niranjan Patnaik
                </h2>
                <h4 className="text-lg font-semibold text-gray-500 mb-6 uppercase tracking-wider">
                  Founder, BNP Charitable Trust
                </h4>
                
                <div className="text-gray-600 leading-relaxed text-base lg:text-lg space-y-4 text-justify sm:text-left">
                  <p>
                    Shri Niranjan Patnaik is a distinguished public leader, entrepreneur, and social worker whose life has been dedicated to the service of the people of Odisha. Over several decades, he has contributed to the state's development through public service, business leadership, and social initiatives. He served as a Minister in the Government of Odisha and held several important portfolios, including Industries, Irrigation, Health, Revenue, Science & Technology, and Power.
                  </p>
                  <p>
                    After decades in public life, he envisioned BNP Charitable Trust as a platform to continue serving society beyond politics. Through the Trust, he seeks to empower future generations by supporting education, honoring excellence, strengthening rural communities, and promoting inclusive development across Odisha.
                  </p>
                </div>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-2xl border-l-4 border-[#0F72CE] italic text-[#0A4C8B] font-medium text-lg shadow-sm">
                  "Public service does not end with public office. It continues through meaningful action that empowers people and transforms lives."
                </div>
              </div>
            </motion.div>

            {/* WHO WE ARE BOX */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-3xl font-bold text-[#0F72CE] mb-6 text-center">
                Who We Are
              </h3>
              <div className="text-gray-600 leading-relaxed text-lg space-y-5 text-center max-w-4xl mx-auto">
                <p>
                  BNP Charitable Trust is a registered charitable organization established to promote education, literary excellence, sports, agriculture, and public welfare across Odisha.
                </p>
                <p>
                  Inspired by the belief that every deserving individual should have the opportunity to succeed, the Trust provides scholarships, financial assistance, awards, and recognition to individuals whose talent and dedication contribute to society.
                </p>
                <p>
                  Our initiatives are designed to create long-term impact while ensuring that opportunities remain accessible to all, irrespective of caste, creed, religion, language, gender, or region.
                </p>
              </div>
            </motion.div>

          </div>

          {/* ========================= VISION CARD ========================= */}
          {/* <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-[#0A4C8B] to-[#0F72CE] text-white rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <h3 className="text-3xl font-bold mb-6 relative z-10">Our Vision</h3>
            <p className="text-white/95 leading-relaxed text-lg lg:text-xl max-w-4xl relative z-10 font-light">
              To build a progressive and compassionate Odisha where every deserving student receives quality education, every hardworking farmer is recognized, every talented sportsperson is encouraged, every literary contribution is celebrated, and every citizen has equal opportunities to achieve a better future.
            </p>
          </motion.div> */}
        </div>
      </section>

      {/* ========================= OUR FOCUS AREAS ========================= */}
      {/* 
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#0A4C8B]">
              Our Focus Areas
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
              Transforming Lives Through Meaningful Initiatives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group flex flex-col"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <GraduationCap size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Education & Scholarships
              </h4>
              <p className="text-gray-600 leading-relaxed flex-1">
                Providing scholarships and monthly financial assistance to meritorious and underprivileged students pursuing Engineering, Medical, Nursing, Diploma, Graduation, and Post-Graduation, ensuring financial challenges never become barriers to education.
              </p>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group flex flex-col"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all">
                <Tractor size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Farmer Recognition
              </h4>
              <p className="text-gray-600 leading-relaxed flex-1">
                Honoring outstanding cultivators from all 30 districts of Odisha through annual awards that recognize innovation, dedication, and excellence in agriculture while inspiring sustainable farming practices.
              </p>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group flex flex-col"
            >
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all">
                <BookOpen size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Literature & Sports Excellence
              </h4>
              <p className="text-gray-600 leading-relaxed flex-1">
                Celebrating Odisha's rich cultural and sporting heritage by presenting the prestigious Manoj Das Sahitya Award to eminent writers and recognizing Odia athletes who bring pride to the state through national and international achievements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      */}

      {/* ========================= OUR OBJECTIVES ========================= */}
      {/* 
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#0A4C8B] mb-4">
              Our Objectives
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: GraduationCap, title: "Educational Scholarships", text: "blue-600" },
              { icon: Trophy, title: "Academic Excellence Awards", text: "purple-600" },
              { icon: Tractor, title: "Farmer Recognition", text: "green-600" },
              { icon: BookOpen, title: "Manoj Das Sahitya Award", text: "orange-600" },
              { icon: Medal, title: "Sports Excellence Awards", text: "red-600" },
              { icon: HeartPulse, title: "Public Health & Welfare", text: "teal-600" },
            ].map((obj, i) => {
              const Icon = obj.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 hover:shadow-md transition-all"
                >
                  <div className={`p-4 rounded-xl bg-white shadow-sm text-${obj.text}`}>
                    <Icon size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">{obj.title}</h4>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      */}

      {/* ========================= FOUNDER'S JOURNEY TIMELINE ========================= */}
      {/* 
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Founder's Journey
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A lifetime of service, leadership, and unwavering commitment to the people of Odisha.
            </p>
          </motion.div>

          <div className="relative">
            
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-700 transform -translate-y-1/2"></div>
            <div className="lg:hidden absolute left-[31px] top-0 bottom-0 w-1 bg-gray-700"></div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6 relative">
              {[
                { year: "1948", title: "Birth of Shri Niranjan Patnaik", icon: "🌱" },
                { year: "Public Service", title: "Decades of political leadership and social service in Odisha", icon: "🏛️" },
                { year: "Business Leadership", title: "Building successful enterprises and creating employment", icon: "🏢" },
                { year: "2025/26", title: "Establishment of BNP Charitable Trust", icon: "🤝" },
                { year: "Today", title: "Empowering students, farmers, writers, athletes across Odisha", icon: "🚀" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true, amount: 0.8 }}
                  className="relative pl-20 lg:pl-0 lg:text-center group lg:grid lg:grid-rows-2 lg:h-[450px]"
                >
                  
                  <div className="absolute left-4 lg:left-1/2 top-0 lg:top-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-slate-900 transform lg:-translate-x-1/2 lg:-translate-y-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  
                  <div className={`hidden lg:flex flex-col w-full h-full ${i % 2 === 0 ? 'row-start-1 justify-end pb-12' : 'row-start-2 justify-start pt-12'}`}>
                    <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h4 className="text-xl font-bold text-blue-400 mb-2">{item.year}</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">{item.title}</p>
                    </div>
                  </div>

                  
                  <div className="lg:hidden w-full pb-10 pt-2">
                    <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h4 className="text-xl font-bold text-blue-400 mb-2">{item.year}</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">{item.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      */}

      {/* ========================= OUR COMMITMENT & IMPACT COUNTER ========================= */}
      {/* 
      <section className="py-24 bg-blue-50/50 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[#0A4C8B] mb-6">
                Our Commitment
              </h3>
              <div className="text-gray-700 text-lg leading-relaxed space-y-6 bg-white p-8 lg:p-10 rounded-3xl shadow-xl border border-blue-100">
                <p>
                  At BNP Charitable Trust, every initiative is guided by transparency, accountability, and a genuine commitment to public welfare. Every scholarship, award, and community program is undertaken with the vision of creating measurable social impact and empowering future generations.
                </p>
                <p>
                  We believe that investing in education, honoring excellence, supporting rural communities, and promoting equal opportunities are the foundations of a stronger and more prosperous Odisha.
                </p>
              </div>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 lg:mb-12">
                Creating Impact Across Odisha
              </h3>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { target: 500, label: "Scholarships Awarded", suffix: "+" },
                  { target: 100, label: "Farmers Recognized", suffix: "+" },
                  { target: 50, label: "Excellence Awards", suffix: "+" },
                  { target: 10, label: "Literary Awards", suffix: "+" },
                  { target: 20, label: "Welfare Initiatives", suffix: "+" },
                  { target: 30, label: "Districts Served", suffix: "" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md hover:-translate-y-1 transition-all">
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#0F72CE] mb-2">
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      */}

      {/* ========================= CALL TO ACTION FOOTER ========================= */}
      <section className="py-24 bg-gradient-to-br from-[#0F72CE] to-[#0A4C8B] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Join Us in Building a Better Odisha
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-light">
              Whether you're a student seeking support, or someone looking to partner with us for a greater cause, we welcome you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Original Apply for Scholarship button when scholarship is open
              <Link
                to="/scholarship/apply"
                className="inline-flex justify-center items-center gap-2 bg-white text-[#0A4C8B] font-bold py-4 px-8 rounded-full shadow-xl hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Apply for Scholarship <ArrowRight size={20} />
              </Link>
              */}
              <Link
                to="/admin/login"
                className="inline-flex justify-center items-center gap-2 bg-white text-[#0A4C8B] font-bold py-4 px-8 rounded-full shadow-xl hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Check Scholarship Status <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex justify-center items-center gap-2 bg-transparent border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all"
              >
                Partner With Us
              </Link>
              <Link
                to="/contact"
                className="inline-flex justify-center items-center gap-2 bg-transparent border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutSection;
