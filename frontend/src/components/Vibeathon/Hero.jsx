import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

import img1 from "/amhacks1.jpeg";
import img2 from "/amhacks2.jpeg";
import img3 from "/amhacks3.jpeg";
import img4 from "/amhacks4.jpg";
import img5 from "/amhacks5.jpg";
import heroBg from "/amhacks.jpeg";


const Vibeathon = () => {
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      {/* HERO SECTION */}
      <div
        className="relative text-white min-h-screen font-sans overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/80 z-[1]" />

        <div className="relative z-[2] min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 sm:py-24 min-w-[90%] relative">
            <motion.div
              className="text-center max-w-6xl mx-auto"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              {/* TITLE */}
              <motion.div variants={childVariants}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 mt-12">
                  <span className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500">
                    Ideas Made by Her.
                  </span>

                  <br />

                  <span className="text-white">
                    Impact Made by Us.
                  </span>
                </h1>

                <div className="h-2 w-32 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full mb-8" />
              </motion.div>

              {/* DESCRIPTION */}
              <motion.p
                className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                variants={childVariants}
              >
                A women-focused vibeathon where fresh ideas meet
                technology, creativity, and a community of women builders.
              </motion.p>

              {/* REGISTRATION */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 mb-8"
                variants={childVariants}
              >
                <motion.a
                  href="#register"
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register Now
                </motion.a>

                <motion.a
                  href="#learn-more"
                  className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </motion.div>

              {/* PS */}
              <motion.p
                className="text-sm md:text-base text-slate-400"
                variants={childVariants}
              >
                PS: To be announced
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vibeathon;