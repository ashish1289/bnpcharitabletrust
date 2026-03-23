
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

// Split text animation
const SplitText = ({ text, delayStep = 0.03, className }) => {
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <h2 className={`inline-block overflow-hidden ${className}`}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: i * delayStep,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
};

const ContactSection = () => {
  return (
    <section
      className="w-full py-24 md:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #F2FAFF, #E9FFF4, #F8FCFF)",
      }}
    >
      {/* Decorative Elements */}
      <motion.img
        src="/hirondelle-4.png"
        className="absolute top-10 left-10 w-48 opacity-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        transition={{ duration: 1.2 }}
      />

      <motion.img
        src="/brush-patch.webp"
        className="absolute bottom-10 right-10 w-64 opacity-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.25 }}
        transition={{ duration: 1.2 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Heading */}
        <div className="text-center mb-14">
          <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
            <SplitText
              text="Get In Touch"
              className="text-4xl md:text-5xl font-extrabold text-[#0A4C8B]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg"
          >
            We would love to hear from you. Whether you want to volunteer, donate, or collaborate — reach out anytime.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-[#0F72CE] mb-6">
              Contact Information
            </h3>

            <div className="space-y-6 text-gray-700">

              <div className="flex items-center gap-4">
                <Mail size={28} className="text-[#0F72CE]" />
                <p className="text-lg">support@bnpcharity.org</p>
              </div>

              <div className="flex items-center gap-4">
                <Phone size={28} className="text-[#0F72CE]" />
                <p className="text-lg">+91 98765 43210</p>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={28} className="text-[#0F72CE] mt-1" />
                <div>
                  <p className="text-lg font-bold text-[#0F72CE]">Registered Office</p>
                  <p className="text-lg leading-relaxed">
                    N2/29, Block N2, Irc Village, Nayapalli, Bhubaneswar, Odisha 751015 , India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={28} className="text-[#0F72CE] mt-1" />
                <div>
                  <p className="text-lg font-bold text-[#0F72CE]">Head Office</p>
                  <p className="text-lg leading-relaxed">
                    FALCON HOUSE, A/22, Cuttack Puri Road, Bhubaneswar-751006
                  </p>
                </div>
              </div>

            </div>

            {/* Map */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-md">
              <iframe
                title="BNP Location"
                src="https://maps.google.com/maps?q=20.2916969,85.8075064&z=17&output=embed"
                className="w-full h-64 border-0"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="text-2xl font-bold text-[#0F72CE] mb-6">
              Send Us a Message
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="text-gray-700 font-medium">Full Name</label>
                <input
                  type="text"
                  className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F72CE] outline-none"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F72CE] outline-none"
                  placeholder="Your Email"
                />
              </div>

            </div>

            <div className="mt-6">
              <label className="text-gray-700 font-medium">Message</label>
              <textarea
                className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F72CE] outline-none h-40 resize-none"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-[#0F72CE] text-white py-3 rounded-xl text-lg shadow-md hover:bg-[#094a8c] transition"
            >
              Send Message <Send size={20} />
            </button>

          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
