import React from 'react'

import img1 from "/amhacks1.jpeg";
import img2 from "/amhacks2.jpeg";
import img3 from "/amhacks3.jpeg";
import img4 from "/amhacks4.jpg";
import img5 from "/amhacks5.jpg";
import heroBg from "/amhacks.jpeg";


const Glimpses = () => {
    const galleryImages = [img1, img2, img3, heroBg, img4, img5];
  return (
    <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          GLIMPSES OF AM HACKS 2025
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
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500 "
              />
            </div>
          ))}
        </div>
      </div>
  )
}

export default Glimpses;