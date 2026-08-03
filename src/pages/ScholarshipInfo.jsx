import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Download, Mail, MapPin, CheckCircle, GraduationCap, Coins } from 'lucide-react';
import Layout from '../layout/Layout';

const ScholarshipInfo = () => {
  return (
    <Layout>
      <div className="bg-gray-50/50 min-h-screen pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-6">
              <GraduationCap className="text-[#0F72CE]" size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              BNP Sikshya Sahayog <span className="text-[#0F72CE]">Scholarship</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Empowering deserving students to achieve their educational dreams. The BNP Sikshya Sahayog Scholarship provides crucial financial support to meritorious students facing financial difficulties.
            </p>


          </motion.div>

          {/* Eligibility Criteria Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-200 max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CheckCircle className="text-[#0F72CE]" size={28} />
              Eligibility Criteria
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-800">Minimum 60%+ marks required in the last qualifying examination.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
                  <Coins size={24} />
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-800">Annual family income must be less than ₹3,00,000.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Application Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">

            {/* Online Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-900/5 border border-blue-50 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#0F72CE] text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
                  <FileText size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Apply Online</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  The fastest and most convenient way to apply. Fill out our secure digital form, upload your documents directly, and track your application status in real-time.
                </p>
                <Link to="/scholarship/apply" className="inline-flex items-center justify-center w-full py-4 bg-[#0F72CE] text-white rounded-xl font-bold text-lg hover:bg-[#0A4C8B] transition-colors shadow-lg shadow-blue-500/30">
                  Online Application
                </Link>
              </div>
            </motion.div>

            {/* Offline Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-900/5 border border-gray-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gray-800 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-gray-800/20">
                  <Download size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Apply Offline</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Prefer a physical copy? Download the official form, print it, fill it out by hand, and mail it along with your documents to our trust office.
                </p>
                <a
                  href="/offineform.pdf"
                  download="BNP_Sikshya_Sahayog_Scholarship_Form.pdf"
                  className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gray-100 text-gray-800 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
                >
                  <Download size={20} />
                  Download PDF Form
                </a>
              </div>
            </motion.div>

          </div>

          {/* Offline Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-200 max-w-4xl mx-auto"
          >
            <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-blue-100 text-[#0F72CE] p-2 rounded-lg"><Mail size={20} /></span>
              Offline Submission Instructions
            </h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">
                  Once you have completely filled out the physical form and attached all required photocopies (Aadhaar, Income Certificate, Fee Receipts, etc.), please submit it via:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Mail className="text-gray-400 mt-1 shrink-0" size={18} />
                    <span className="text-gray-700"><strong>Email:</strong> Scan the completed documents and email them to <a href="mailto:support@bnptrust.in" className="text-[#0F72CE] font-semibold hover:underline">support@bnptrust.in</a></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="text-gray-400 mt-1 shrink-0" size={18} />
                    <span className="text-gray-700"><strong>Post/Courier:</strong> N2/25,IRC Village, Nayapalli, Bhubaneswar, Odisha 751015 , India</span>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h5 className="font-bold text-[#0F72CE] mb-2">Need Help?</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  If you face any issues while filling out the form, feel free to contact our support team. We recommend the online application for faster processing and real-time status updates!
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </Layout>
  );
};

export default ScholarshipInfo;
