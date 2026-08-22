import React from "react";
import { FaLightbulb, FaCogs } from "react-icons/fa";

const themeData = [
  {
    icon: <FaLightbulb />,
    title: "Open Innovation",
    description:
      "AM Hacks 2.0 2026 follows an Open Innovation Track, empowering participants from any domain to ideate, design, and build impactful solutions aligned with their own interests—without being constrained by a predefined theme. All submissions will be evaluated by an expert jury panel."
  },
  {
    icon: <FaCogs />,
    title: "Build with TRAE",
    description:
      "TRAE Partner Advantage: Build your project using TRAE to unlock exclusive benefits including a dedicated prize pool, complimentary premium TRAE plans for eligible teams, and a chance to showcase production-ready solutions. Approved teams will receive TRAE credentials via registered email."
  }
];

const Card = ({ icon, title, description }) => (
  <div className="bg-black border-2 border-yellow-400 rounded-2xl p-8 w-full max-w-xl flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]">
    <div className="text-yellow-400 mb-5 text-6xl">{icon}</div>
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-200 text-base leading-relaxed">
      {description}
    </p>
  </div>
);

const Sponsor = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-14">
          THEMES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
          {themeData.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsor;
