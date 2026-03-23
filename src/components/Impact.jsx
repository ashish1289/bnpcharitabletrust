import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Heart, School, Utensils } from "lucide-react";

const ImpactCard = ({ icon, value, label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center"
    >
      <div className="text-[#0F72CE] mb-4">{icon}</div>
      <h3 className="text-4xl font-bold text-[#0F72CE]">{value}</h3>
      <p className="text-gray-600 mt-2">{label}</p>
    </motion.div>
  );
};

const Impact = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#E5F6FF] to-[#E9FFF2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">

        <h2 className="text-4xl md:text-5xl font-bold text-[#0A4C8B]">
          Our Impact
        </h2>

        <p className="text-gray-600 text-lg mt-4 max-w-xl mx-auto">
          Together, we create measurable change in lives and communities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-16">

          <ImpactCard
            icon={<School size={48} />}
            value="12,500+"
            label="Children Educated"
          />

          <ImpactCard
            icon={<Utensils size={48} />}
            value="3.8 Million+"
            label="Meals Served"
          />

          <ImpactCard
            icon={<Heart size={48} />}
            value="4,600+"
            label="Women Empowered"
          />

          <ImpactCard
            icon={<Users size={48} />}
            value="1,200+"
            label="Volunteers"
          />

        </div>
      </div>
    </section>
  );
};

export default Impact;
