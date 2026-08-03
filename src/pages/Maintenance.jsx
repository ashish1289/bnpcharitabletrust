import React from 'react';
import { ServerCrash, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const Maintenance = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-xl border border-gray-100"
      >
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ServerCrash size={40} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Under Maintenance</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We are currently experiencing high traffic or performing scheduled maintenance. Please bear with us and try again in a few minutes.
        </p>

        <button 
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 w-full py-4 bg-[#0F72CE] text-white rounded-xl font-bold hover:bg-[#0A4C8B] transition-colors"
        >
          <RefreshCw size={20} />
          Refresh Page
        </button>
      </motion.div>
    </div>
  );
};

export default Maintenance;
