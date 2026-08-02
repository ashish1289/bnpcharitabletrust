import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Heart, 
  Handshake, 
  Leaf, 
  Trophy, 
  BookOpen, 
  Tractor, 
  Medal, 
  CheckCircle2, 
  Users, 
  Coins, 
  Globe 
} from "lucide-react";
import { Link } from "react-router-dom";

// Split Text Utility Component
const SplitText = ({ text, delayStep = 0.03, className = "" }) => {
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <h2
      aria-hidden="true"
      className={`inline-block overflow-hidden ${className}`}
      style={{ lineHeight: 1.05 }}
    >
      {letters.map((char, i) => {
        const letter = char === " " ? "\u00A0" : char;
        return (
          <motion.span
            key={i}
            style={{ display: "inline-block" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: i * delayStep,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.6 }}
          >
            {letter}
          </motion.span>
        );
      })}
    </h2>
  );
};

// Fade up animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const MissionPageSection = () => {
  return (
    <div className="w-full bg-white overflow-hidden">
      
      {/* ======================= HERO SECTION ======================= */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center pt-20 pb-16 px-6">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/mission_hero_1785615348050.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A4C8B]/60 via-[#0A4C8B]/40 to-white/90"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center mt-20 md:mt-0">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm mb-6 tracking-wider uppercase"
          >
            Our Mission Page | BNP Charitable Trust
          </motion.span>
          
          <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }} className="mb-6">
            <SplitText
              text="Our Mission — Creating Opportunities, Transforming Lives"
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white drop-shadow-lg"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-md font-medium"
          >
            BNP Charitable Trust is committed to creating a society where talent is nurtured, hard work is recognized, and every deserving individual has the opportunity to succeed. Through scholarships, financial assistance, awards, and community development initiatives, we strive to uplift lives and promote inclusive growth across Odisha.
          </motion.p>
        </div>
      </section>

      {/* ======================= MISSION STATEMENT ======================= */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="space-y-8 text-xl md:text-2xl text-gray-700 leading-relaxed font-light"
          >
            <p>
              Our mission is to support meritorious and underprivileged students, encourage progressive farmers, honor literary excellence, recognize outstanding sportspersons, and contribute to public welfare. Guided by <strong className="font-semibold text-[#0A4C8B]">compassion, integrity, and service</strong>, we believe that investing in people today creates a stronger and more prosperous tomorrow.
            </p>
            <p>
              Every initiative of the Trust is undertaken without discrimination based on caste, creed, religion, language, gender, or region, ensuring equal opportunities for all.
            </p>
          </motion.div>
        </div>
      </section>

      {false && (
        <>
      {/* ======================= SECTION 1: MISSION IN ACTION ======================= */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A4C8B] mb-4">Our Mission in Action</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto italic">
              "We believe that education, compassion, and opportunity can transform lives and build stronger communities."
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-900/5 border border-blue-100 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-[#0F72CE] mb-6">
                <Heart size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Core Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                BNP Charitable Trust works to uplift society by supporting education, promoting equal opportunities, encouraging academic excellence, assisting deserving individuals, and contributing to sustainable community development. Every initiative is guided by our commitment to dignity, inclusivity, and long-term social progress.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={fadeUp} className="bg-[#0A4C8B] text-white rounded-3xl p-8 shadow-xl shadow-blue-900/10 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-6">What We Focus On</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-center gap-3"><BookOpen size={20} className="text-blue-300" /> Education & Scholarships</li>
                <li className="flex items-center gap-3"><Tractor size={20} className="text-green-300" /> Rural Development</li>
                <li className="flex items-center gap-3"><Leaf size={20} className="text-emerald-300" /> Environmental Conservation</li>
                <li className="flex items-center gap-3"><Coins size={20} className="text-yellow-300" /> Financial Assistance</li>
                <li className="flex items-center gap-3"><Trophy size={20} className="text-purple-300" /> Academic, Sports & Literary Excellence</li>
                <li className="flex items-center gap-3"><Users size={20} className="text-pink-300" /> Community Development</li>
              </ul>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-900/5 border border-blue-100 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision for Tomorrow</h3>
              <p className="text-gray-600 leading-relaxed">
                We envision an inclusive society where every child can pursue education, every deserving individual receives support, every community grows sustainably, and every citizen has the opportunity to contribute to the nation's progress with dignity and confidence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* QUOTE BANNER 1 */}
      <section className="w-full bg-[#0F72CE] py-20 px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
            "Empowering one life creates opportunities for generations."
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed font-medium">
            Every scholarship, every act of support, and every community initiative brings us one step closer to building a stronger, educated, and more compassionate society.
          </p>
        </motion.div>
      </section>

      {/* ======================= SECTION 2: DRIVING CHANGE ======================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A4C8B] mb-4">Driving Change Through Action</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our mission is reflected in practical initiatives that empower individuals, encourage excellence, and strengthen communities across Odisha.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeUp} className="group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" alt="Education" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="bg-white p-8">
                <h3 className="text-xl font-bold text-[#0A4C8B] mb-3">Education & Scholarships</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Providing scholarships, educational resources, and financial assistance to deserving students so that financial limitations never become barriers to learning and success.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <img src="/community_welfare_india.png" alt="Community" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="bg-white p-8">
                <h3 className="text-xl font-bold text-[#0A4C8B] mb-3">Community Development</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Supporting communities through social welfare initiatives, public development programs, and activities that improve the quality of life for individuals and families.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <img src="/mission_environment_1785615361296.png" alt="Environment" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="bg-white p-8">
                <h3 className="text-xl font-bold text-[#0A4C8B] mb-3">Environmental Conservation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Promoting environmental awareness, tree plantation, and sustainable development to preserve natural resources for future generations.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ======================= SECTION 3: PILLARS OF CHANGE ======================= */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A4C8B] mb-4">Our Pillars of Change</h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-md border-t-4 border-red-500">
              <Heart className="w-10 h-10 text-red-500 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Compassion</h4>
              <p className="text-gray-600 text-sm">Every initiative begins with empathy, kindness, and a genuine desire to improve lives.</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-md border-t-4 border-blue-500">
              <Users className="w-10 h-10 text-blue-500 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Equality</h4>
              <p className="text-gray-600 text-sm">We believe everyone deserves equal opportunities regardless of caste, religion, language, gender, or economic background.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-md border-t-4 border-green-500">
              <GraduationCap className="w-10 h-10 text-green-500 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Empowerment</h4>
              <p className="text-gray-600 text-sm">Creating opportunities through education, financial support, and community development that enable people to become self-reliant.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-md border-t-4 border-purple-500">
              <Handshake className="w-10 h-10 text-purple-500 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Transparency</h4>
              <p className="text-gray-600 text-sm">We maintain integrity, accountability, and responsible management of every contribution entrusted to the Trust.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ======================= SECTION 4: OUR OBJECTIVES ======================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A4C8B] mb-4">Our Objectives</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The objectives of BNP Charitable Trust are designed to promote inclusive growth, educational excellence, and sustainable community development while ensuring that charitable support reaches those who need it most.
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row gap-6 items-start bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <BookOpen size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Education & Human Development</h3>
                <p className="text-gray-600 leading-relaxed">
                  Promote education by providing scholarships, financial assistance, educational resources, awards for academic excellence, and support for deserving students pursuing higher education. Encourage literature, sports, culture, and skill development to nurture future leaders.
                </p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row gap-6 items-start bg-green-50/50 p-8 rounded-3xl border border-green-100">
              <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <Coins size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Financial Assistance & Public Welfare</h3>
                <p className="text-gray-600 leading-relaxed">
                  Provide grants, financial support, and charitable assistance to deserving individuals, educational institutions, community organizations, and initiatives working towards social welfare and public development.
                </p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row gap-6 items-start bg-amber-50/50 p-8 rounded-3xl border border-amber-100">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <Globe size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Sustainable Community Development</h3>
                <p className="text-gray-600 leading-relaxed">
                  Support rural development, agriculture, environmental conservation, disaster relief, public welfare, and other charitable initiatives that improve livelihoods and strengthen communities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================= SECTION 5: TRUST INITIATIVES ======================= */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative BG element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Trust Initiatives & Programs</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              BNP Charitable Trust undertakes purpose-driven initiatives that create opportunities, recognize excellence, and support sustainable community development.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 1, title: "BNP Sikshya Sahayog Scholarship", desc: "Supporting meritorious students from economically weaker backgrounds by providing scholarships and financial assistance for higher education." },
              { id: 2, title: "Academic Excellence Awards", desc: "Recognizing exceptional academic achievements of students at school, college, and university levels to encourage excellence in education." },
              { id: 3, title: "Manoj Das Sahitya Award", desc: "Honouring distinguished writers and promoting literature, language, creativity, and cultural heritage." },
              { id: 4, title: "Student Financial Assistance", desc: "Providing financial support to deserving students pursuing Engineering, Medical, Diploma, Undergraduate, Postgraduate, Nursing, and other professional courses." },
              { id: 5, title: "Best Farmer Recognition", desc: "Recognizing progressive farmers who contribute to agricultural innovation, sustainable farming practices, and rural development." },
              { id: 6, title: "Sports Excellence Awards", desc: "Celebrating athletes from Odisha who achieve excellence in state, national, and international sporting events." },
              { id: 7, title: "Community Organization Support", desc: "Providing assistance to charitable organizations, educational institutions, and community groups working for social welfare and public development." },
              { id: 8, title: "Special Community Assistance", desc: "Undertaking charitable activities, emergency assistance, and public welfare initiatives that align with the objectives of the Trust and benefit society." },
            ].map((program) => (
              <motion.div key={program.id} variants={fadeUp} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl hover:bg-white/15 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mb-4">
                  {program.id}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{program.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{program.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======================= SECTION 6: NO DISCRIMINATION ======================= */}
      <section className="py-24 bg-white relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="w-20 h-20 mx-auto bg-blue-100 text-[#0F72CE] rounded-full flex items-center justify-center mb-8">
              <Users size={40} />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A4C8B] mb-6">Serving Society Without Discrimination</h2>
            <p className="text-xl text-gray-500 font-medium mb-8">BNP Charitable Trust believes that compassion knows no boundaries.</p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every program, scholarship, and charitable initiative is open to deserving individuals without discrimination based on caste, religion, language, gender, region, or economic background. We are committed to building an inclusive society where every person is treated with dignity, fairness, and respect.
            </p>
          </motion.div>
        </div>
      </section>
        </>
      )}

      {/* ======================= FINAL CTA BANNER ======================= */}
      <section className="relative w-full overflow-hidden text-center text-white py-24 px-6">
         <div className="absolute inset-0 z-0">
          <img 
            src="/mission_equality_1785615373359.png" 
            alt="Equality" 
            className="w-full h-full object-cover object-center filter brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
            "Together, We Build a Better Tomorrow."
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-10">
            Real change begins when compassionate people come together with a shared purpose. Through education, scholarships, financial assistance, environmental conservation, and community development, BNP Charitable Trust is creating opportunities that empower individuals and strengthen society.
          </p>
          <Link to="/scholarship/apply" className="inline-flex items-center justify-center bg-white text-[#0A4C8B] hover:bg-blue-50 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg">
            Apply for Scholarship
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default MissionPageSection;
