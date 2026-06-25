import React from "react";
import Layout from "../layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Users, BookOpen, Eye, Scale, CheckCircle2, Award, Target } from "lucide-react";

const governingMembers = [
  { name: "Shri Niranjan Patnaik", role: "Founder & Patron", desc: "Visionary leader who established the foundation of trust, integrity and community service.", icon: Award },
  { name: "Shri Tara Ranjan Patnaik", role: "Chairman", desc: "Provides strategic direction and ensures governance practices align with our core mission.", icon: Target },
  { name: "Secretary", role: "Administrative Head", desc: "Oversees day-to-day operations, correspondence, and coordination across all trust activities.", icon: BookOpen },
  { name: "Treasurer", role: "Financial Oversight", desc: "Manages financial planning, audits, and ensures transparent fund utilization.", icon: Scale },
];

const committees = [
  {
    title: "Executive Committee",
    icon: Shield,
    color: "#0A4C8B",
    bg: "from-[#E8F4FF] to-[#D4ECFF]",
    members: ["Chairman", "Secretary", "Treasurer", "2 Senior Trustees"],
    duties: ["Strategic decisions", "Budget approval", "Policy-making", "Emergency resolutions"],
  },
  {
    title: "Program Committee",
    icon: Users,
    color: "#0D6E4A",
    bg: "from-[#E8FFF5] to-[#D4F5E9]",
    members: ["Program Head", "3 Trustees", "Field Coordinators"],
    duties: ["Project planning", "Impact assessment", "Partner coordination", "Beneficiary outreach"],
  },
  {
    title: "Audit & Finance Committee",
    icon: Scale,
    color: "#7C3AED",
    bg: "from-[#F3E8FF] to-[#EDD9FF]",
    members: ["Treasurer", "2 Trustees", "External Auditor"],
    duties: ["Annual audit review", "Fund allocation", "Financial compliance", "Donor reporting"],
  },
];

const principles = [
  { icon: Eye, title: "Transparency", desc: "All fund usage, decisions and program outcomes are publicly disclosed annually." },
  { icon: Shield, title: "Accountability", desc: "Every committee member is accountable to the trust, its donors, and the communities served." },
  { icon: CheckCircle2, title: "Integrity", desc: "We uphold the highest ethical standards in all our operations and partnerships." },
  { icon: Scale, title: "Fairness", desc: "Resources and opportunities are distributed equitably based on need and impact." },
];

const GoverningBody = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <div
        className="w-full pt-32 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D0B2B 0%, #1A0A4C 50%, #2D0F7C 100%)" }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #7C3AED 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0F72CE 0%, transparent 40%)" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-6">
            <Link to="/about" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
              <ArrowLeft size={15} /> Back to About
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">
              Governance
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
              Governing Body
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              A transparent and accountable governance framework that ensures every decision serves our mission and the communities we support.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <section className="w-full py-20 relative overflow-hidden" style={{ background: "linear-gradient(to bottom right, #F8FBFF, #EFF6FF, #F0FFF8)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Section: Key Members */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A4C8B] mb-3">Key Governance Members</h2>
            <p className="text-gray-500 max-w-xl mx-auto">The key pillars who uphold the trust's mission and ensure responsible leadership.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {governingMembers.map((member, idx) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0A4C8B] to-[#0F72CE] flex items-center justify-center shadow-lg">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#0A4C8B] text-lg mb-1">{member.name}</h3>
                  <p className="text-[#0F72CE] text-xs font-semibold uppercase tracking-wide mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Section: Committees */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A4C8B] mb-3">Standing Committees</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Specialized committees that handle distinct areas of governance, operations and accountability.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {committees.map((committee, idx) => {
              const Icon = committee.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  {/* Top gradient bar */}
                  <div className={`h-2 w-full bg-gradient-to-r ${committee.bg}`} />
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: committee.color + "20" }}>
                        <Icon size={20} style={{ color: committee.color }} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">{committee.title}</h3>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Members</p>
                      <ul className="space-y-1">
                        {committee.members.map((m, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: committee.color }} />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Key Duties</p>
                      <ul className="space-y-1">
                        {committee.duties.map((d, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 size={13} style={{ color: committee.color }} className="flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Section: Governance Principles */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A4C8B] mb-3">Our Governance Principles</h2>
            <p className="text-gray-500 max-w-xl mx-auto">The values that guide every decision and action of our governing body.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0A4C8B]/10 to-[#0F72CE]/20 flex items-center justify-center">
                    <Icon size={26} className="text-[#0A4C8B]" />
                  </div>
                  <h4 className="font-bold text-[#0A4C8B] mb-2">{p.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0A1A2F 0%, #0A4C8B 60%, #0F72CE 100%)" }}
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #38B2F0 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-3">Questions About Our Governance?</h3>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                We believe in full transparency. Reach out to us for any queries about our governing structure, annual reports, or fund utilization.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-white text-[#0A4C8B] rounded-xl font-bold hover:bg-blue-50 transition shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </Layout>
  );
};

export default GoverningBody;
