import React from "react";
import { motion } from "framer-motion";

const AMSponsi = () => {
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full bg-black py-20 overflow-hidden">
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .scroller-inner {
          animation: scroll 80s linear infinite;
        }
      `}</style>

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
          Previous Sponsors
        </motion.h2>
      </motion.div>
      
      <div 
        className="w-full inline-flex flex-nowrap overflow-hidden 
                   [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
      >
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-scroll scroller-inner group hover:[animation-play-state:paused]">
          {(() => {
            const sponsors = [
              { name: 'Aptos', logo: 'https://cryptologos.cc/logos/aptos-apt-logo.svg' },
              { name: 'Algorand', logo: 'https://cryptologos.cc/logos/algorand-algo-logo.svg' },
              { name: 'AoPS', logo: 'https://artofproblemsolving.com/assets/images/aops-logo.png' },
              { name: 'Beeceptor', logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=https%3A%2F%2Fbeeceptor.com%2F' },
              { name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg' },
              { name: 'Coding Blocks', logo: 'https://media.licdn.com/dms/image/v2/C560BAQF5th2_4vAFkA/company-logo_200_200/company-logo_200_200/0/1630626661031/codingblocksindia_logo?e=2147483647&v=beta&t=B5ts0hZFiRmgEXYqUZ6BHueCK8YMEiA3KgOy-ghcKPc' },
              { name: 'Devfolio', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-devfolio-icon-svg-download-png-8383724.png' },
              { name: 'Filecoin', logo: 'https://cryptologos.cc/logos/filecoin-fil-logo.svg' },
              { name: 'fleek', logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=https%3A%2F%2Ffleek.xyz%2F' },
              { name: 'GUVI', logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=https%3A%2F%2Fwww.guvi.in%2F' },
              { name: 'KRNL', logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=https%3A%2F%2Fkrnltech.com%2F' },
              { name: 'MEXC', logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=https%3A%2F%2Fwww.mexc.co%2F' },
              { name: 'MLH', logo: 'https://static.mlh.io/brand-assets/logo/official/mlh-logo-color.svg' },
              { name: 'polygon', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg' },
              { name: 'PW', logo: 'https://www.google.com/s2/favicons?sz=128&domain_url=https%3A%2F%2Fwww.pw.live%2F' },
              { name: 'Quick Heal', logo: 'https://cdn.brandfetch.io/idNBiLEMXo/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B' },
              { name: 'Rajdhani', logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=https%3A%2F%2Frajdhanigroup.com%2F' },
              { name: 'Reskill', logo: 'https://www.reskilll.com/reskillllogo.png' },
              { name: 'Rise in', logo: 'https://files.risein.com/bootcamps/from-code-to-chain-stellar-workshop/vimtv-cohorts-coverpng' },
              { name: 'STARKNET', logo: 'https://www.starknet.io/favicon.ico' },
              { name: 'Stellar', logo: 'https://cryptologos.cc/logos/stellar-xlm-logo.svg' },
              { name: 'tezos', logo: 'https://cryptologos.cc/logos/tezos-xtz-logo.svg' },
              { name: 'The Graph India', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0p489sFlss7HSIKcPQOQoC0FdzyQ7AsGVg&s' },
              { name: 'YHills', logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=https%3A%2F%2Fyhills.com%2F' }
            ];
            const duplicatedSponsors = [...sponsors, ...sponsors];
            
            return duplicatedSponsors.map((sponsor, index) => (
              <li key={index} className="flex-shrink-0">
                <div 
                  className="w-48 h-32 flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10
                             transition-all duration-300 group-hover:bg-white/10"
                >
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      className={`max-w-full object-contain ${sponsor.name === 'Reskill' ? 'max-h-10 mt-2 mb-2' : 'max-h-16 mb-2'}`}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-black font-bold text-xs">{sponsor.name.slice(0,3).toUpperCase()}</span>
                    </div>
                  )}
                  <div className="text-[oklch(87.2%_0.01_258.338)] text-center text-xs font-medium">{sponsor.name}</div>
                </div>
              </li>
            ));
          })()}
        </ul>
      </div>
    </div>
  );
};

export default AMSponsi;