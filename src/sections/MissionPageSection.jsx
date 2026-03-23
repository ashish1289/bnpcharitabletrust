// import React, { useMemo } from "react";
// import { motion } from "framer-motion";

// // Split Text Utility Component
// const SplitText = ({ text, delayStep = 0.03, className = "" }) => {
//   const letters = useMemo(() => text.split(""), [text]);

//   return (
//     <h2
//       aria-hidden="true"
//       className={`inline-block overflow-hidden ${className}`}
//       style={{ lineHeight: 1.05 }}
//     >
//       {letters.map((char, i) => {
//         const letter = char === " " ? "\u00A0" : char;
//         return (
//           <motion.span
//             key={i}
//             style={{ display: "inline-block" }}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 0.45,
//               delay: i * delayStep,
//               ease: "easeOut",
//             }}
//             viewport={{ once: true, amount: 0.6 }}
//           >
//             {letter}
//           </motion.span>
//         );
//       })}
//     </h2>
//   );
// };

// const MissionPageSection = () => {
//   return (
//     <section
//       className="w-full py-24 md:py-32 relative overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(to bottom right, #E9F5FF, #E6FFF3, #F5FBFF)",
//       }}
//     >
//       {/* Background Blob */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.85 }}
//         whileInView={{ opacity: 0.25, scale: 1 }}
//         transition={{ duration: 1.2 }}
//         viewport={{ once: true }}
//         className="absolute top-10 left-10 w-60 h-60 rounded-full bg-[#CDE6FF] blur-3xl opacity-40"
//       />

//       <div className="max-w-7xl mx-auto px-6 lg:px-10">

//         {/* MAIN HEADING */}
//         <div className="text-center mb-12">
//           <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
//             <SplitText
//               text="Our Mission — Empower Change"
//               className="text-4xl md:text-5xl font-extrabold text-[#0A4C8B]"
//             />
//           </div>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg"
//           >
//             “We are driven by the belief that compassion, education, and collective effort
//             can rewrite the future of every child and every community.”
//           </motion.p>
//         </div>

//         {/* GRID BLOCKS */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

//           {/* Mission Statement */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.75 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
//           >
//             <h3 className="text-2xl font-bold text-[#0F72CE] mb-4">Our Core Mission</h3>
//             <p className="text-gray-700 leading-relaxed text-md">
//               We work to uplift communities through education, healthcare, nutrition,
//               empowerment, and opportunity.  
//               Our mission is rooted in dignity, equality, and sustainable growth.
//             </p>
//           </motion.div>

//           {/* Programs Extension */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 50 }}
//             whileInView={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ duration: 0.75 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
//           >
//             <h3 className="text-2xl font-bold text-[#0F72CE] mb-4">
//               What We Work On
//             </h3>
//             <ul className="space-y-3 text-gray-700">
//               <li>📘 Education access for every child</li>
//               <li>🥗 Food security programs</li>
//               <li>👩‍🦰 Women empowerment initiatives</li>
//               <li>🚑 Healthcare and medical support drives</li>
//               <li>🌱 Sustainable growth opportunities</li>
//             </ul>
//           </motion.div>

//           {/* Vision Expansion */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.75, delay: 0.1 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
//           >
//             <h3 className="text-2xl font-bold text-[#0F72CE] mb-4">Our Long-Term Vision</h3>
//             <p className="text-gray-700 leading-relaxed text-md">
//               To build a society that thrives on equality, compassion, and empowerment.
//               A world where no child sleeps hungry, no woman is left behind,
//               and communities flourish through opportunity.
//             </p>
//           </motion.div>

//         </div>

//         {/* IMPACT QUOTE */}
//         <motion.div
//           initial={{ opacity: 0, y: 60 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9 }}
//           viewport={{ once: true }}
//           className="mt-20 bg-[#0A4C8B] text-white rounded-3xl p-10 shadow-xl text-center"
//         >
//           <h3 className="text-3xl md:text-4xl font-bold mb-4">
//             “Impact begins with you.”
//           </h3>
//           <p className="text-white/90 text-lg max-w-3xl mx-auto">
//             Every contribution — big or small — becomes a stepping stone  
//             toward a brighter future for those who need it most.
//           </p>
//         </motion.div>

//         {/* ========================= PILLARS OF CHANGE ========================= */}
// <div className="mt-28">
//   <motion.h3
//     initial={{ opacity: 0, y: 40 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.7 }}
//     viewport={{ once: true }}
//     style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
//     className="text-center text-3xl md:text-4xl text-[#0A4C8B] font-extrabold mb-14"
//   >
//     Our Pillars of Change
//   </motion.h3>

//   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">

//     {/* 1 */}
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       viewport={{ once: true }}
//       className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100"
//     >
//       <h4 className="text-xl font-bold text-[#0F72CE] mb-3">Compassion</h4>
//       <p className="text-gray-700">
//         We believe kindness is the first step toward real societal transformation.
//       </p>
//     </motion.div>

//     {/* 2 */}
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: 0.1 }}
//       viewport={{ once: true }}
//       className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100"
//     >
//       <h4 className="text-xl font-bold text-[#0F72CE] mb-3">Equality</h4>
//       <p className="text-gray-700">
//         A fair society begins when opportunities reach those who need them most.
//       </p>
//     </motion.div>

//     {/* 3 */}
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: 0.15 }}
//       viewport={{ once: true }}
//       className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100"
//     >
//       <h4 className="text-xl font-bold text-[#0F72CE] mb-3">Empowerment</h4>
//       <p className="text-gray-700">
//         Empowering individuals ensures sustainable and long-lasting progress.
//       </p>
//     </motion.div>

//     {/* 4 */}
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: 0.2 }}
//       viewport={{ once: true }}
//       className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100"
//     >
//       <h4 className="text-xl font-bold text-[#0F72CE] mb-3">Unity</h4>
//       <p className="text-gray-700">
//         We unite communities across differences to build shared futures.
//       </p>
//     </motion.div>

//   </div>
// </div>



// {/* ========================= FUTURE COMMITMENT ========================= */}
// <motion.div
//   initial={{ opacity: 0, y: 50 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.9 }}
//   viewport={{ once: true }}
//   className="mt-32 bg-[#0A4C8B] text-white rounded-3xl p-12 shadow-xl text-center"
// >
//   <h3 className="text-3xl md:text-4xl font-bold mb-4">
//     “Together, we shape a future filled with dignity.”
//   </h3>
//   <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
//     Our mission stretches far beyond temporary help.  
//     We work to create systems, support, and opportunities  
//     that transform lives for generations to come.  
//     <br /><br />
//     **Every smile, every future, every empowered life — begins with you.**
//   </p>
// </motion.div>

//       </div>      
//     </section>
//   );
// };

// export default MissionPageSection;


import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Split Text Utility Component
const SplitText = ({ text, delayStep = 0.03, className = "" }) => {
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <h2
      aria-hidden="true"
      className={`inline-block overflow-hidden ${className}`}
      style={{ lineHeight: 1.05 }}
    >
      {letters.map((char, i) => {
        const letter = char === " " ? "\u00A0" : char;
        return (
          <motion.span
            key={i}
            style={{ display: "inline-block" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: i * delayStep,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.6 }}
          >
            {letter}
          </motion.span>
        );
      })}
    </h2>
  );
};

const MissionPageSection = () => {
  return (
    <section
      className="w-full py-24 md:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, #E9F5FF, #E6FFF3, #F5FBFF)",
      }}
    >
      {/* Background Blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="absolute top-10 left-10 w-60 h-60 rounded-full bg-[#CDE6FF] blur-3xl opacity-40"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* MAIN HEADING */}
        <div className="text-center mb-12">
          <div style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
            <SplitText
              text="Our Mission — Empower Change"
              className="text-4xl md:text-5xl font-extrabold text-[#0A4C8B]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg"
          >
            “We are driven by the belief that compassion, education, and collective effort
            can rewrite the future of every child and every community.”
          </motion.p>
        </div>

        {/* ================= GRID BLOCKS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-[#0F72CE] mb-4">Our Core Mission</h3>
            <p className="text-gray-700 leading-relaxed text-md">
              We work to uplift communities through education, healthcare, nutrition,
              empowerment, and opportunity.
              Our mission is rooted in dignity, equality, and sustainable growth.
            </p>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-[#0F72CE] mb-4">
              What We Work On
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>📘 Education access for every child</li>
              <li>🥗 Food security programs</li>
              <li>👩‍🦰 Women empowerment initiatives</li>
              <li>🚑 Healthcare and medical support drives</li>
              <li>🌱 Sustainable growth opportunities</li>
            </ul>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-[#0F72CE] mb-4">Our Long-Term Vision</h3>
            <p className="text-gray-700 leading-relaxed text-md">
              To build a society where no child sleeps hungry, no woman is left behind,
              and communities flourish through opportunity and empowerment.
            </p>
          </motion.div>
        </div>

        {/* ================= IMPACT QUOTE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="mt-20 bg-[#0A4C8B] text-white rounded-3xl p-10 shadow-xl text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            “Impact begins with you.”
          </h3>
          <p className="text-white/90 text-lg max-w-3xl mx-auto">
            Every contribution — big or small — becomes a stepping stone
            toward a brighter future for those who need it most.
          </p>
        </motion.div>


        {/* ======================================================
              NEW SECTION — IMAGE CONTENT (Education, Food, Health)
        ====================================================== */}
        <div className="mt-28">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
            className="text-center text-3xl md:text-4xl text-[#0A4C8B] font-extrabold mb-16"
          >
            Touching Lives Through Action
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
            >
              <img src="/7.png" className="w-full h-56 object-cover" alt="Education Program" />
              <div className="p-7">
                <h4 className="text-xl font-bold text-[#0F72CE] mb-3">Education Support</h4>
                <p className="text-gray-700">
                  Providing books, school kits, and classroom support to underprivileged children.
                </p>
              </div>
            </motion.div>

            {/* Food Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
            >
              <img src="/8.png" className="w-full h-56 object-cover" alt="Food Program" />
              <div className="p-7">
                <h4 className="text-xl font-bold text-[#0F72CE] mb-3">Healthy Meals</h4>
                <p className="text-gray-700">
                  Ensuring children and families receive nutritious meals every week.
                </p>
              </div>
            </motion.div>

            {/* Healthcare */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
            >
              <img src="/9.png" className="w-full h-56 object-cover" alt="Healthcare Program" />
              <div className="p-7">
                <h4 className="text-xl font-bold text-[#0F72CE] mb-3">Medical Camps</h4>
                <p className="text-gray-700">
                  Offering free health checkups, medicines, and awareness drives.
                </p>
              </div>
            </motion.div>

          </div>
        </div>


        {/* ================= PILLARS OF CHANGE ================= */}
        <div className="mt-28">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
            className="text-center text-3xl md:text-4xl text-[#0A4C8B] font-extrabold mb-14"
          >
            Our Pillars of Change
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">

            {/* 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100"
            >
              <h4 className="text-xl font-bold text-[#0F72CE] mb-3">Compassion</h4>
              <p className="text-gray-700">
                We believe kindness is the first step toward real societal transformation.
              </p>
            </motion.div>

            {/* 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100"
            >
              <h4 className="text-xl font-bold text-[#0F72CE] mb-3">Equality</h4>
              <p className="text-gray-700">
                A fair society begins when opportunities reach those who need them most.
              </p>
            </motion.div>

            {/* 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100"
            >
              <h4 className="text-xl font-bold text-[#0F72CE] mb-3">Empowerment</h4>
              <p className="text-gray-700">
                Empowering individuals ensures sustainable and long-lasting progress.
              </p>
            </motion.div>

            {/* 4 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100"
            >
              <h4 className="text-xl font-bold text-[#0F72CE] mb-3">Unity</h4>
              <p className="text-gray-700">
                We unite communities across differences to build shared futures.
              </p>
            </motion.div>

          </div>
        </div>


        {/* ================= OUR OBJECTIVES ================= */}
        <div className="mt-32">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
            className="text-center text-3xl md:text-4xl text-[#0A4C8B] font-extrabold mb-6"
          >
            Our Objectives
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 max-w-3xl mx-auto mb-16 text-lg"
          >
            The mission of BNP Charitable Trust is built on purpose-driven objectives designed to empower communities and create lasting impact.
          </motion.p>

          {/* Primary Objects */}
          <div className="mb-20">
            <motion.h4
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-[#0F72CE] mb-10"
            >
              Primary Objects
            </motion.h4>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Primary Object 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0F72CE] text-white flex items-center justify-center text-xl font-bold">
                    i
                  </div>
                  <h5 className="text-lg font-bold text-[#0F72CE]">Education & Development</h5>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  To undertake and support relief or assistance of any kind relating to education, literary excellence, sports, people engaged in farming, public health including the creation or upgradation of facilities, funding activities or any other type of support.
                </p>
              </motion.div>

              {/* Primary Object 2 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl border-2 border-purple-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0F72CE] text-white flex items-center justify-center text-xl font-bold">
                    ii
                  </div>
                  <h5 className="text-lg font-bold text-[#0F72CE]">Financial Assistance</h5>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  To render financial assistance, provide grants or payment of money or take such other steps as may be deemed necessary by the Board of Trustees including assistance to charitable organizations with charitable objectives.
                </p>
              </motion.div>

              {/* Primary Object 3 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-xl border-2 border-green-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0F72CE] text-white flex items-center justify-center text-xl font-bold">
                    iii
                  </div>
                  <h5 className="text-lg font-bold text-[#0F72CE]">Aligned Activities</h5>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  To undertake any other activity which is not inconsistent with the above objectives, ensuring all efforts contribute to the greater good of society.
                </p>
              </motion.div>

            </div>
          </div>

          {/* Trust Initiatives */}
          <div>
            <motion.h4
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-[#0F72CE] mb-10"
            >
              Trust Initiatives & Programs
            </motion.h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Initiative 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0F72CE] flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h6 className="font-bold text-[#0F72CE] mb-2">Regional Development Schemes</h6>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Schemes spreading across different blocks of Odisha, specifically the 15 blocks of Keonjhar District and Bonth and Bhandari Pokahri Blocks of Bhadrak District.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Initiative 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-[#0F72CE] flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h6 className="font-bold text-[#0F72CE] mb-2">Academic Excellence Awards</h6>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Cash prizes for exam toppers in different streams clearing Board and University level exams, decided by a committee formed by the Chairman.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Initiative 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-[#0F72CE] flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h6 className="font-bold text-[#0F72CE] mb-2">Manoj Das Sahitya Award</h6>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Cash prize award for eminent writers to be decided by a committee formed by the Chairman of the Trust.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Initiative 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 text-[#0F72CE] flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h6 className="font-bold text-[#0F72CE] mb-2">Student Financial Support</h6>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Monthly financial assistance to meritorious and underprivileged students in Engineering, Medical, Diploma Engineering, Bachelor's, Post Graduation, and Nursing streams.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Initiative 5 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-[#0F72CE] flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h6 className="font-bold text-[#0F72CE] mb-2">Best Cultivator Awards</h6>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Cash prize awards for the best cultivator in all 30 districts of Odisha, promoting agricultural excellence.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Initiative 6 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 text-[#0F72CE] flex items-center justify-center font-bold flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h6 className="font-bold text-[#0F72CE] mb-2">Sports Excellence Recognition</h6>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Cash prize awards to Odia Medal Winners of National and International sports, celebrating athletic achievement.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Initiative 7 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-[#0F72CE] flex items-center justify-center font-bold flex-shrink-0">
                    7
                  </div>
                  <div>
                    <h6 className="font-bold text-[#0F72CE] mb-2">Charitable Organization Support</h6>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Annual cash prize awards to KMBB and Ama Odissa for pursuing their charitable objectives.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Initiative 8 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-[#0F72CE] flex items-center justify-center font-bold flex-shrink-0">
                    8
                  </div>
                  <div>
                    <h6 className="font-bold text-[#0F72CE] mb-2">Direct Benefit Programs</h6>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Direct benefits to particular programmes, institutions, or persons aligned with the above objectives.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* Inclusivity Statement */}
        {/* Inclusivity Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24 relative"
        >
          {/* Gradient Border/Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-3xl blur opacity-25"></div>

          <div className="relative bg-white rounded-3xl p-10 md:p-12 shadow-2xl border border-gray-100 text-center overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-50 rounded-full blur-3xl opacity-60"></div>

            {/* Icon/Symbol */}
            <div className="mb-6 flex justify-center relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center text-3xl shadow-inner border border-white">
                🤝
              </div>
            </div>

            <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 relative z-10">
              Unwavering Inclusivity
            </h4>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto relative z-10 italic">
              "The benefit of the Objects would be available to the general public irrespective of caste, creed, language, religion, region, sex."
            </p>
          </div>
        </motion.div>




        {/* ================= FUTURE COMMITMENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="mt-32 bg-[#0A4C8B] text-white rounded-3xl p-12 shadow-xl text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            “Together, we shape a future filled with dignity.”
          </h3>
          <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
            Our mission stretches far beyond temporary help.
            We work to create systems, support, and opportunities
            that transform lives for generations to come.
            <br /><br />
            <strong>Every smile, every future, every empowered life — begins with you.</strong>
          </p>
        </motion.div>

      </div>
    </section >
  );
};

export default MissionPageSection;
