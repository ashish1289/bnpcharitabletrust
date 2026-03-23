import React from "react";
import { motion } from "framer-motion";

const InspirationSection = () => {
  return (
    <section className="w-full bg-white py-16 md:py-12">
      <div className="w-full flex flex-col items-center">

        {/* CHILDREN IMAGE */}
        {/* <div className="w-full flex justify-center">
          <img
            src="/hero.png"   // Your uploaded image
            alt="Happy Children"
            className="w-full max-w-7xl mx-auto object-cover"
          />
        </div> */}

        {/* CHILDREN IMAGE */}
<div className="w-full">
  <img
    src="/hero.png"
    alt="Happy Children"
    className="w-full h-auto object-cover"
  />
</div>

        {/* MOTIVATIONAL TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mt-10 md:mt-1 px-6"
        >
          <h2 className="sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            “Every smile we create, every life we touch,  
            brings us one step closer to a brighter world.”
          </h2>

          <p className="text-sm text-lg md:text-xl mt-4 text-gray-600">
            Together, we can turn hope into action — and action into change.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default InspirationSection;
