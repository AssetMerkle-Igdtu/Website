import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const RoundCard = ({ round }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const rotateX = ((y / height) - 0.5) * -20;
    const rotateY = ((x / width) - 0.5) * 20;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        background: "linear-gradient(145deg, #FBF4F7 0%, #F7DFD4 100%)",
      }}
      className="group relative p-7 rounded-3xl border border-[#E38DA3]/40 shadow-xl shadow-[#F3AFC0]/30 transition-all duration-300 ease-out hover:border-[#CF547A]/60 hover:shadow-[#CF547A]/40 [transform-style:preserve-3d] spotlight-card"
    >
      <h3 className="text-xl font-extrabold text-[#402327] tracking-wide group-hover:text-[#CE4777] transition-colors [transform:translateZ(30px)]">
        {round.title}
      </h3>

      {round.subtitle && (
        <p className="text-xs uppercase tracking-widest text-[#CF547A] mt-1 font-semibold [transform:translateZ(20px)]">
          {round.subtitle}
        </p>
      )}

      <p className="text-[#402327]/80 mt-4 leading-relaxed text-sm sm:text-base whitespace-pre-line font-normal [transform:translateZ(15px)]">
        {round.description}
      </p>
    </div>
  );
};

/* Single round item */
const RoundItem = ({ round, index }) => {
  const isRight = index % 2 !== 0;

  return (
    <motion.div
      className="mb-24 mx-auto max-w-6xl px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.15, 0.4),
      }}
    >
      {/* Desktop */}
      <div
        className={`hidden lg:flex justify-between items-center w-full ${
          isRight ? "flex-row-reverse" : ""
        }`}
      >
        {/* Card */}
        <motion.div
          className="w-5/12"
          initial={{ opacity: 0, x: isRight ? 70 : -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <RoundCard round={round} />
        </motion.div>

        {/* Center Dot */}
        <motion.div
          className="relative w-2/12 flex justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-[#CE4777] opacity-20 blur-lg"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative w-6 h-6 bg-[#CF547A] rounded-full shadow-xl shadow-[#CF547A]/40 z-10" />
          </div>
        </motion.div>

        {/* Mode / Venue / Date */}
        <motion.div
          className="w-5/12"
          initial={{ opacity: 0, x: isRight ? -70 : 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p
            className={`font-extrabold text-xl sm:text-2xl text-[#ed94a0] tracking-wide drop-shadow-sm ${
              isRight ? "text-right" : "text-left"
            }`}
          >
            {round.date}
          </p>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex">
        <div className="flex flex-col items-center mr-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#CE4777] opacity-30 blur-md animate-pulse" />
            <div className="relative w-6 h-6 bg-[#CF547A] rounded-full shadow-lg shadow-[#CF547A]/40" />
          </div>
          <div className="w-1 mt-2 flex-grow bg-gradient-to-b from-[#CF547A]/40 to-[#E38DA3]/40" />
        </div>

        <div className="w-full">
          <p className="font-extrabold text-xl sm:text-2xl mb-3 text-[#CE4777] tracking-wide drop-shadow-sm">
            {round.date}
          </p>

          <RoundCard round={round} />
        </div>
      </div>
    </motion.div>
  );
};

const RoundsTimeline = () => {
  const rounds = [
    {
      title: "🧠 Round 1 — THE VISION",
      date: "Idea & Concept",
      description: `Brainstorm the problem statement and understand the challenge.
Develop a clear solution idea and define your vision for the application.
Focus on creativity, problem-solving, and turning your idea into a solid concept.`,
    },
    {
      title: "💻 Round 2 — THE PROOF",
      subtitle: "Vibecoding",
      date: "10 Sept",
      description: `Starting 10 September, bring your vision to life through vibecoding.
Build your application based on the problem statement and turn your solution into a working prototype.
Focus on execution, functionality, and how effectively you translate your idea into reality.`,
    },
    {
      title: "⚡ Round 3 — THE BUILD",
      subtitle: "Offline Finale",
      date: "TBA",
      description: `The shortlisted teams will enter the final 8-hour offline round.
Build, refine, and polish your solution while competing against the top teams.
Date and venue will be announced soon — stay tuned!`,
    },
  ];

  return (
    <section className="relative overflow-hidden py-16">
      <div className="relative z-10 mt-12 mb-16 sm:mb-20 lg:mb-28">
        <div className="text-center mb-16">
          <h2 className="font-sans text-3xl sm:text-4xl font-black text-[#d26876] tracking-tight">
            SheVibes{" "}
            <span className="font-serif italic font-normal text-[#f30a54]">
              Rounds
            </span>
          </h2>

          <p className="text-[#ed94a0] sm:text-pink-200/90 mt-4 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed tracking-wide">
            A step-by-step journey from idea submission to mentorship and the
            grand finale.
          </p>
        </div>

        <div className="hidden lg:block absolute top-48 bottom-48 left-1/2 w-[2px] bg-gradient-to-b from-[#E38DA3]/30 via-[#CE4777]/50 to-[#E38DA3]/30 transform -translate-x-1/2" />

        {rounds.map((round, index) => (
          <RoundItem key={index} round={round} index={index} />
        ))}
      </div>
    </section>
  );
};

export default RoundsTimeline;