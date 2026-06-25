import React, { useState } from "react";
import Layout from "../layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Image, Video, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const tabs = ["All", "Photos", "Videos", "Events"];

const mediaItems = [
  { id: 1, type: "photo", category: "Events", title: "Inauguration Ceremony", desc: "Grand inauguration of BNP Charitable Trust", src: "/1.png", tag: "2024" },
  { id: 2, type: "photo", category: "Events", title: "Community Outreach", desc: "Reaching families across rural Odisha", src: "/2.png", tag: "2024" },
  { id: 3, type: "photo", category: "Events", title: "Empowering Communities", desc: "Building futures through united effort", src: "/3.png", tag: "2024" },
  { id: 4, type: "photo", category: "Events", title: "Nutrition Drive", desc: "Delivering meals to those in need", src: "/8.png", tag: "2024" },
  { id: 5, type: "photo", category: "Events", title: "Healthcare Camp", desc: "Free medical checkups for communities", src: "/9.png", tag: "2024" },
  { id: 6, type: "photo", category: "Events", title: "Green Initiative", desc: "Environmental conservation effort", src: "/10.png", tag: "2024" },
  { id: 7, type: "photo", category: "Events", title: "Education Support", desc: "Scholarships and learning materials distributed", src: "/education.jpg", tag: "2023" },
  { id: 8, type: "photo", category: "Events", title: "Women Empowerment", desc: "Skill development workshop for women", src: "/women.jpg", tag: "2023" },
  { id: 9, type: "photo", category: "Events", title: "Leadership Meet", desc: "Annual trustees leadership meeting", src: "/Niranjan.jpg", tag: "2023" },
  { id: 10, type: "photo", category: "Events", title: "Environmental Conservation", desc: "Nature and eco-awareness initiative", src: "/101.jpg", tag: "2023" },
];

const MediaPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeTab === "All"
    ? mediaItems
    : activeTab === "Photos"
    ? mediaItems.filter((m) => m.type === "photo")
    : activeTab === "Videos"
    ? mediaItems.filter((m) => m.type === "video")
    : mediaItems.filter((m) => m.category === "Events");

  return (
    <Layout>
      {/* Hero Banner */}
      <div
        className="w-full pt-32 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A1A2F 0%, #0A4C8B 55%, #1E8FD5 100%)" }}
      >
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 80% 30%, #38B2F0 0%, transparent 50%), radial-gradient(circle at 20% 70%, #5CC9FF 0%, transparent 40%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top, #F8FBFF, transparent)" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest mb-5">
              Gallery
            </span>
            <h1
              className="text-4xl md:text-6xl font-extrabold text-white mb-4"
              style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
            >
              Media
            </h1>
            <p className="text-white/70 max-w-xl mx-auto text-lg leading-relaxed">
              Moments of impact, stories of change — a visual journey of our work across communities.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <section className="w-full py-16 relative" style={{ background: "linear-gradient(to bottom right, #F8FBFF, #EFF6FF, #F0FFF8)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Tab Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-12 flex-wrap"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-[#0A4C8B] text-white shadow-lg scale-105"
                    : "bg-white text-[#4A5568] border border-gray-200 hover:border-[#0A4C8B] hover:text-[#0A4C8B]"
                }`}
              >
                {tab === "Photos" && <Image size={13} className="inline mr-1.5 -mt-0.5" />}
                {tab === "Videos" && <Video size={13} className="inline mr-1.5 -mt-0.5" />}
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence>
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="group relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  onClick={() => setLightbox(item)}
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <p className="text-white font-bold text-sm">{item.title}</p>
                        <p className="text-white/70 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    {/* Type badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 bg-white/90 rounded-full text-[10px] font-bold text-[#0A4C8B]">
                        {item.tag}
                      </span>
                    </div>
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <Play size={20} className="text-[#0A4C8B] ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-[#0A4C8B] text-sm truncate">{item.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 truncate">{item.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              <Video size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No media in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-[#0A1A2F] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <X size={18} />
              </button>
              <img src={lightbox.src} alt={lightbox.title} className="w-full max-h-[70vh] object-contain" />
              <div className="p-5">
                <h3 className="text-white font-bold text-lg">{lightbox.title}</h3>
                <p className="text-white/60 text-sm mt-1">{lightbox.desc}</p>
                <span className="inline-block mt-2 px-3 py-0.5 bg-white/10 rounded-full text-white/70 text-xs">{lightbox.category} • {lightbox.tag}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default MediaPage;
