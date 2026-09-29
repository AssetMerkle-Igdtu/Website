import React from 'react';
import { motion } from 'framer-motion';

const sponsorsData = [
  { name: ".xyz", image: "https://res.cloudinary.com/duptmanu9/image/upload/v1743010841/xyz-logo-color_hhvfct.png" },
  { name: "Interview Buddy", image: "https://res.cloudinary.com/duptmanu9/image/upload/v1743010841/interview_buddy_ddjgmr.png" },
  { name: "Aptos", image: "https://res.cloudinary.com/dalgvlhes/image/upload/v1753770170/images_roa63h.png" },
  { name: "1stopai", image: "https://assets.hackquest.io/hackathons/45c9549b-5760-4961-bc45-422c82131436/1-sYcHUpWh36IjlAXz3UK.jpeg" },
  { name: "Bitgo", image: "https://res.cloudinary.com/duptmanu9/image/upload/v1743010841/bitgo_do4pik.png" },
  { name: "Eazydiner", image: "https://res.cloudinary.com/duptmanu9/image/upload/v1743010841/eazydiner_athbld.jpg" },
  { name: "GitHub Education", image: "/github-education.svg" },
];

const titleVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Sponsors = () => {
  // We duplicate the logos to create a seamless loop
  const duplicatedSponsors = [...sponsorsData, ...sponsorsData];

  return (
    <div className="w-full bg-transparent py-20 overflow-hidden">
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .scroller-inner {
          animation: scroll 20s linear infinite;
        }
      `}</style>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4"
      >
        <motion.h2
          variants={titleVariants}
          className="font-sans text-3xl md:text-4xl font-black text-center mb-12 text-white tracking-tight"
        >
          Supported by Industry <span className="font-serif italic font-normal text-amber-400">Leaders</span>
        </motion.h2>
      </motion.div>

      {/* The Scroller Container */}
      <div
        className="w-full inline-flex flex-nowrap overflow-hidden 
                   [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
      >
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-scroll scroller-inner group hover:[animation-play-state:paused]">
          {duplicatedSponsors.map((sponsor, index) => (
            <li key={index} className="flex-shrink-0">
              <div
                className="w-48 h-32 flex flex-col items-center justify-center p-8 bg-white/[0.15] rounded-2xl border border-white/10
                           transition-all duration-300 group-hover:bg-white/[0.22]"
              >
                <img
                  src={sponsor.image}
                  alt={`${sponsor.name} logo`}
                  className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-screen m-2"
                />
                <div><p className="text-[oklch(87.2%_0.01_258.338)]">{sponsor.name}</p></div>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sponsors;