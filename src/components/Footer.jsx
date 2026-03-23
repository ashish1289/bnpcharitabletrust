import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0A1A2F] text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* LOGO + ABOUT */}
        <div className="space-y-4">
          <motion.img
            src="/bnplogo1.png"
            alt="BNP Logo"
            className="h-16 bg-white p-2 rounded shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          />


          <motion.p
            className="text-gray-300 text-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            BNP Charitable Trust empowers communities through education,
            nutrition, women empowerment and healthcare.
            Together, we create change that lasts.
          </motion.p>
        </div>

        {/* QUICK LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-[#5CC9FF]">Quick Links</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            {["Home", "About Us", "Our Mission", "Programs", "Donate"].map((item, idx) => (
              <li key={idx} className="hover:text-white transition cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-[#5CC9FF]">Contact</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@bnpcharity.org
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={18} className="mt-1 shrink-0" />
              <div>
                <span className="block font-semibold text-[#5CC9FF]">Registered Office:</span>
                N2/29, Block N2, Irc Village, Nayapalli, Bhubaneswar, Odisha 751015 , India
              </div>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={18} className="mt-1 shrink-0" />
              <div>
                <span className="block font-semibold text-[#5CC9FF]">Head Office:</span>
                FALCON HOUSE, A/22, Cuttack Puri Road, Bhubaneswar-751006
              </div>
            </li>
          </ul>
        </motion.div>

        {/* SOCIAL LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-[#5CC9FF]">Follow Us</h3>

          <div className="flex items-center gap-4">
            {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>

      {/* BOTTOM BAR */}
      <div className="mt-14 border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} BNP Charitable Trust — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
