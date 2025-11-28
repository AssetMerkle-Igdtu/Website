import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import AMSponsi from "../components/AMSponsi";

import img1 from "/amhacks1.jpeg";
import img2 from "/amhacks2.jpeg";
import img3 from "/amhacks3.jpeg";
import img4 from "/amhacks4.jpg";
import img5 from "/amhacks5.jpg";
import heroBg from "/amhacks.jpeg";


const AMHacks = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-02-06T09:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const galleryImages = [img1, img2, img3, heroBg, img4, img5];

  return (
    <>
      {/* HERO SECTION */}
      <div
        className="relative text-white min-h-screen font-sans overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70 z-[1]"></div>

        <div className="relative z-[2] min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 sm:py-24">
            <motion.div
              className="text-center max-w-6xl mx-auto"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={childVariants}>
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500">
                    AM HACKS
                  </span>
                </h1>
                <div className="h-2 w-32 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full mb-8"></div>
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                variants={childVariants}
              >
                Where Innovation Meets Excellence. Join the ultimate hackathon
                experience and build the future with cutting-edge technology.
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 mb-16"
                variants={childVariants}
              >
                <motion.button
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register Now
                </motion.button>

                <motion.button
                  className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* PREVIOUS SPONSORS */}
      <AMSponsi />

      {/* GALLERY */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          EVENTS GALLERY
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/40 backdrop-blur-sm"
            >
              <img
                src={src}
                alt=""
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500 "
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AMHacks;