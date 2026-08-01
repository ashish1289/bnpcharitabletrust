import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, BookOpen, Star } from 'lucide-react';

const ScholarshipPromoSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-start space-y-6 lg:pr-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 border border-blue-200 text-blue-800 rounded-full font-medium text-sm shadow-sm">
              <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span>Empowering Future Leaders</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              BNP Sikshya Sahayog <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Scholarship
              </span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
              We believe that financial constraints should never stand in the way of true potential. Our scholarship program is dedicated to identifying and supporting meritorious students, helping them achieve their academic dreams and shape a brighter tomorrow.
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-6 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                to="/scholarship-info" 
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                Learn More <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/scholarship/apply" 
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-200 hover:border-blue-400 hover:bg-blue-50 font-semibold py-4 px-8 rounded-full shadow-sm transition-all duration-300"
              >
                Apply Now
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:ml-auto w-full max-w-lg mx-auto lg:max-w-none"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/20 group">
              <div className="aspect-[4/3] sm:aspect-square lg:aspect-[4/3] bg-gradient-to-br from-indigo-500 via-blue-600 to-blue-800 flex items-center justify-center relative overflow-hidden">
                {/* Decorative background overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                
                {/* Animated Central Icon */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                    <GraduationCap className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-lg" strokeWidth={1.5} />
                  </div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div
                   animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6], rotate: [0, 10, 0] }}
                   transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
                   className="absolute top-12 left-12 md:top-20 md:left-20"
                >
                   <BookOpen className="w-10 h-10 md:w-14 md:h-14 text-blue-200/80 drop-shadow-md" />
                </motion.div>
                
                <motion.div
                   animate={{ y: [0, 20, 0], opacity: [0.4, 0.9, 0.4], rotate: [0, -15, 0] }}
                   transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: "easeInOut" }}
                   className="absolute bottom-16 right-16 md:bottom-24 md:right-24"
                >
                   <Star className="w-8 h-8 md:w-12 md:h-12 text-yellow-300/80 fill-yellow-300/40 drop-shadow-md" />
                </motion.div>
              </div>
            </div>
            
            {/* Floating Stats Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-10 -left-6 md:-left-12 bg-white/95 backdrop-blur-xl p-5 md:p-6 rounded-2xl shadow-xl shadow-indigo-900/10 border border-white/50 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center border border-green-100">
                  <GraduationCap className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-extrabold text-gray-900">100+</p>
                  <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Scholars Supported</p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipPromoSection;
