// AMSponsi Component - Version 1.0
// Last modified: [Current Date]
import React from "react";
import { motion } from "framer-motion";

const AMSponsi = () => {
  // Sponsors section - avoid editing this array directly
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full bg-black py-20 overflow-hidden">


      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4"
      >
        <motion.h2 
          variants={childVariants}
          className="text-4xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          SPONSORS
        </motion.h2>
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {(() => {
            // SPONSORS_ARRAY_START - Do not modify without coordination
            const sponsors = [
              { name: 'Trae', logo: 'https://images.newsfilecorp.com/files/8457/267532_aeea8d38049d9acd_001full.jpg', link: 'https://www.trae.ai/' },
              { name: 'Codecrafters', logo: 'https://codecrafters.io/images/logo.png', link: 'https://codecrafters.io/' },
              { name: 'Fluxor', logo: 'https://bnb.fluxor.io/fluxor.png', link: 'https://www.fluxor.io/en' },
              { name:"Rise In", logo:"/risein.png", link: 'https://www.risein.com/' },
              { name: "Vyper", logo: "https://vyperlang.org/assets/images/vyper-logo.svg", link: "https://vyperlang.org/"}
              ];
            
            return sponsors.map((sponsor, index) => (
              <div key={index} className="flex-shrink-0">
                <a href={sponsor.link} target="_blank">
                <div 
                  className="w-90 h-40 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10
                             transition-all duration-300 hover:bg-white/10 hover:scale-105"
                >
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      className="max-w-full max-h-16 object-contain mb-4"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-black font-bold text-xs">{sponsor.name.slice(0,3).toUpperCase()}</span>
                    </div>
                  )}
                  <div className="text-[oklch(87.2%_0.01_258.338)] text-center text-sm font-medium">{sponsor.name}</div>
                </div>
                </a>
              </div>
            ));
          })()}
        </div>
      </div>
    </div>
  );
};

export default AMSponsi;