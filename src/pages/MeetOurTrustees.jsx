import React from "react";
import Layout from "../layout/Layout";
import BoardOfTrusteesSection from "../sections/BoardOfTrusteesSection";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MeetOurTrustees = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <div
        className="w-full pt-32 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A1A2F 0%, #0A4C8B 60%, #0F72CE 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #38B2F0 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #5CC9FF 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <Link to="/about" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
              <ArrowLeft size={15} /> Back to About
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">
              Our People
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
              Meet Our Trustees
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              The dedicated individuals who guide BNP Charitable Trust with vision, integrity, and unwavering commitment to our mission.
            </p>
          </motion.div>
        </div>
      </div>

      <BoardOfTrusteesSection />
    </Layout>
  );
};

export default MeetOurTrustees;
