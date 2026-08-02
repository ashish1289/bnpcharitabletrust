import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Tractor, Medal, Trophy, CheckCircle2, Target, Award, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

// Split Text Utility Component
const SplitText = ({ text, delayStep = 0.03, className = "" }) => {
  const letters = useMemo(() => text.split(""), [text]);
  return (
    <h2 aria-hidden="true" className={`inline-block overflow-hidden ${className}`} style={{ lineHeight: 1.05 }}>
      {letters.map((char, i) => {
        const letter = char === " " ? "\u00A0" : char;
        return (
          <motion.span
            key={i}
            style={{ display: "inline-block" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * delayStep, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.6 }}
          >
            {letter}
          </motion.span>
        );
      })}
    </h2>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const EncouragementPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full pt-20">
        
        {/* ======================= HERO SECTION ======================= */}
        <section className="relative w-full min-h-[70vh] flex items-center justify-center py-20 px-6">
          <div className="absolute inset-0 z-0">
            <img 
              src="/encouragement_hero.png" 
              alt="Awards Ceremony" 
              className="w-full h-full object-cover object-center filter brightness-[0.3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center mt-12">
            <motion.span 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm mb-6 tracking-wider uppercase"
            >
              Areas of Encouragement
            </motion.span>
            
            <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }} className="mb-6">
              <SplitText
                text="Recognizing Talent, Inspiring Excellence"
                className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white drop-shadow-lg"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium"
            >
              At BNP Charitable Trust, we believe that recognizing talent inspires excellence and creates a better society. Through our awards and recognition programs, we encourage outstanding achievements in Literature, Agriculture, and Sports, celebrating individuals who make meaningful contributions to Odisha and the nation.
            </motion.p>
          </div>
        </section>

        {/* ======================= INTRODUCTION ======================= */}
        <section className="py-20 bg-white relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A4C8B] mb-6">Recognizing Excellence Across Diverse Fields</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                BNP Charitable Trust honours individuals whose dedication, innovation, and achievements inspire communities. Our recognition programs are designed to encourage talent, preserve cultural heritage, promote agricultural progress, and celebrate sporting excellence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ======================= AWARD CARDS ======================= */}
        <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-16">

              {/* CARD 1: Literature */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row items-stretch">
                <div className="md:w-2/5 relative">
                  <img src="/images.jpeg" alt="Literature" className="w-full h-full object-cover min-h-[300px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <h3 className="text-3xl font-bold text-white flex items-center gap-3"><BookOpen size={32} /> Literature</h3>
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-12">
                  <h4 className="text-2xl font-bold text-[#0F72CE] mb-4">Manoj Das Sahitya Samman</h4>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Literature shapes society by preserving culture, language, and ideas. To honour the remarkable legacy of Padma Shri Manoj Das, BNP Charitable Trust presents the Manoj Das Sahitya Samman to distinguished writers and literary personalities whose work enriches Odia literature and contributes to intellectual and cultural development.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Target size={18} className="text-[#0F72CE]" /> Objectives</h5>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Honour outstanding literary contributions</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Encourage emerging writers</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Preserve Odia language and culture</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Promote creativity and lifelong learning</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Award size={18} className="text-[#0F72CE]" /> Award Includes</h5>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>🏆 Prestigious Recognition</li>
                        <li>📜 Certificate of Honour</li>
                        <li>💰 Cash Award (as decided by the Trust)</li>
                        <li>🎖 Public Felicitation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CARD 2: Agriculture */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row-reverse items-stretch">
                <div className="md:w-2/5 relative">
                  <img src="/odisha_agriculture_award.png" alt="Agriculture" className="w-full h-full object-cover min-h-[300px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <h3 className="text-3xl font-bold text-white flex items-center gap-3"><Tractor size={32} /> Agriculture</h3>
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-12">
                  <h4 className="text-2xl font-bold text-green-600 mb-4">Krushak Bandana Samman</h4>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Agriculture is the backbone of our nation, and farmers are the true builders of our economy. Through the Krushak Bandana Samman, BNP Charitable Trust recognizes progressive farmers who demonstrate innovation, sustainability, and dedication to agricultural excellence.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Target size={18} className="text-green-600" /> Objectives</h5>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Recognize progressive farmers</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Encourage sustainable farming</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Promote agricultural innovation</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Inspire rural development</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Award size={18} className="text-green-600" /> Award Includes</h5>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>🏆 Excellence Award</li>
                        <li>📜 Certificate of Recognition</li>
                        <li>💰 Cash Prize</li>
                        <li>🌱 Public Appreciation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CARD 3: Sports */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row items-stretch">
                <div className="md:w-2/5 relative">
                  <img src="/odisha_sports_award.png" alt="Sports" className="w-full h-full object-cover min-h-[300px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <h3 className="text-3xl font-bold text-white flex items-center gap-3"><Medal size={32} /> Sports</h3>
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-12">
                  <h4 className="text-2xl font-bold text-amber-600 mb-4">BNP Sports Excellence Award</h4>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Sports build discipline, leadership, confidence, and national pride. BNP Charitable Trust is committed to recognizing athletes who excel at district, state, national, and international levels, inspiring future generations to pursue sporting excellence.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Target size={18} className="text-amber-600" /> Objectives</h5>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Encourage young athletes</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Recognize outstanding sporting achievements</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Promote sportsmanship and discipline</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Support emerging talent across Odisha</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Award size={18} className="text-amber-600" /> Award Includes</h5>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>🏆 Sports Excellence Trophy</li>
                        <li>📜 Certificate of Achievement</li>
                        <li>💰 Performance Award</li>
                        <li>⭐ Public Recognition</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ======================= WHY RECOGNITION MATTERS & SELECTION ======================= */}
        <section className="py-24 bg-gray-50 relative">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-[#0A4C8B] mb-2">Why Recognition Matters</h3>
              <h4 className="text-lg font-medium text-blue-600 mb-6 font-serif italic">Encouraging Talent. Inspiring Society.</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                Recognition motivates individuals to dream bigger and achieve greater success. By honouring excellence, BNP Charitable Trust inspires future generations to pursue knowledge, innovation, hard work, and service to society.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our recognition programs celebrate those who become role models for others through dedication and excellence.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0A4C8B] p-10 rounded-3xl shadow-lg border border-blue-900 text-white">
              <h3 className="text-2xl font-bold mb-2">Our Selection Process</h3>
              <h4 className="text-lg font-medium text-blue-300 mb-6 font-serif italic">Transparent & Merit-Based Recognition</h4>
              <p className="text-white/90 leading-relaxed mb-6">
                Every award recipient is selected through a fair and transparent evaluation process conducted by a committee constituted by BNP Charitable Trust. The selection considers:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><Star size={18} className="text-yellow-400" /> Outstanding Contribution</li>
                <li className="flex items-center gap-3"><Star size={18} className="text-yellow-400" /> Excellence in the Respective Field</li>
                <li className="flex items-center gap-3"><Star size={18} className="text-yellow-400" /> Positive Social Impact</li>
                <li className="flex items-center gap-3"><Star size={18} className="text-yellow-400" /> Innovation and Leadership</li>
                <li className="flex items-center gap-3"><Star size={18} className="text-yellow-400" /> Commitment to Ethical Values</li>
              </ul>
            </motion.div>

          </div>
        </section>

        {/* ======================= FUTURE RECOGNITION ======================= */}
        <section className="py-20 bg-white relative text-center">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Future Recognition Programs</h2>
              <h3 className="text-xl font-medium text-[#0F72CE] mb-6">Expanding Our Mission</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                BNP Charitable Trust continuously explores new opportunities to recognize excellence across diverse sectors. In the future, the Trust aims to introduce additional awards and recognition programs that encourage innovation, leadership, social service, education, environmental conservation, entrepreneurship, and youth development.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ======================= FINAL CTA ======================= */}
        <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-24 text-center px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
              Celebrating Excellence. Inspiring Tomorrow.
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-10">
              Every achievement deserves recognition. Through our awards and honours, BNP Charitable Trust celebrates individuals who inspire society through knowledge, hard work, innovation, and dedication.
            </p>
            <Link to="/contact" className="inline-block bg-white text-[#0A4C8B] font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              Contact Us
            </Link>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default EncouragementPage;
