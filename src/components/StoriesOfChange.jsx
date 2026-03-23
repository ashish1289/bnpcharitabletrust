import React from "react";
import { motion } from "framer-motion";

const stories = [
  {
    name: "Rina",
    story: "Received education support and is now the first girl in her village to attend college.",
    img: "/story1.jpg",
  },
  {
    name: "Arjun",
    story: "Got nutrition support and overcame severe malnutrition.",
    img: "/story2.jpg",
  },
  {
    name: "Meena",
    story: "Joined our women empowerment program and now runs her own tailoring business.",
    img: "/story3.jpg",
  },
];

const StoriesOfChange = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F5FAFF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <h2 className="text-4xl md:text-5xl font-bold text-[#0A4C8B] text-center">
          Stories of Change
        </h2>

        <p className="text-gray-600 text-lg max-w-2xl text-center mx-auto mt-2">
          Real lives. Real impact. Heart-touching transformations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-14">

          {stories.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
            >
              <img
                src={s.img}
                className="rounded-2xl w-full h-56 object-cover mb-4"
                alt={s.name}
              />

              <h3 className="text-xl font-bold text-[#0A4C8B]">{s.name}</h3>

              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {s.story}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default StoriesOfChange;
