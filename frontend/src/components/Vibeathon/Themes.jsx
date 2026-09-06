import React, { useState, useMemo, useRef } from "react";
import {
  FaRobot,
  FaGraduationCap,
  FaTimes,
  FaChevronRight,
  FaChevronDown,
  FaLaptopCode,
} from "react-icons/fa";
import { motion } from "framer-motion";

// ─── UPDATED THEME DATA ──────────────────────────────────────────────────────
const themeData = [
  {
    id: 1,
    theme: "Web3 for Transparent and Accountable Cities",
    tagline: "A complaint can be ignored. A verified record cannot.",
    shortDescription:
      "A civic complaint platform using Web3 to ensure transparency and accountability.",
    icon: FaRobot,
    fullDescription: `Every day, people report potholes, broken streetlights, water leaks, overflowing bins and unsafe roads. But after submitting a complaint, they are often left wondering: Was it seen? Was any action taken? Was the problem actually fixed?`,
    rounds: {
      R1: {
        theme: "Rethink Civic Trust",
        challenge: "The Complaint That Cannot Disappear",
        description:
          "We invite participants to imagine a simple and trustworthy civic complaint platform where every important action leaves a clear record—from the first report to the final resolution. The goal is to ensure that complaints cannot quietly disappear, updates cannot be changed without a trace and citizens can question a resolution if the problem still exists—all while keeping personal information private.",
        hint: "Think trust, privacy, clear records and ease of use.",
        tagline: "Report it. Track it. Verify it.",
        winningQues: "",
      },
    },
  },
  {
    id: 2,
    theme: "AI/ML for Context-Aware Women's Travel Recommendations",
    tagline: "The fastest route is not always the right route.",
    shortDescription:
      "An AI-powered journey companion that considers context, privacy, and uncertainty to recommend safer travel options for women.",
    icon: FaRobot,
    fullDescription: `Most navigation platforms focus on three things: time, distance and cost. But for many women travelling to college, work, an event or home, the choice of route can depend on much more. A busy road in the afternoon may feel completely different after dark. Street lighting, nearby transport, accessibility, open spaces and recent community reports can all change the journey.`,
    rounds: {
      R1: {
        theme: "Reimagine How a Journey Is Recommended",
        challenge: "Beyond the Fastest Route",
        description:
          "We invite participants to rethink navigation through an AI/ML-powered system that understands changing situations—not just maps. The aim is to help women compare routes with more clarity and confidence, without promising complete safety, revealing live locations, promoting surveillance or unfairly judging an area or community.",
        hint: "Think real time, surroundings, privacy, fairness and clear choices.",
        tagline: "Not just where to go—but which journey fits the moment.",
        winningQues: "",
      },
    },
  },
  {
    id: 3,
    theme: "AI for Smarter Campus Information",
    tagline: "Everything is announced. Almost nothing is understood.",
    shortDescription:
      "An AI-powered assistant that turns scattered campus announcements into clear, relevant, and actionable updates for freshers.",
    icon: FaGraduationCap,
    fullDescription: `Freshers enter college and instantly become part of countless class groups, department channels, societies, hostel communities and email lists. Deadlines, timetable changes, events, scholarships, workshops and opportunities arrive every day—often repeated, incomplete, outdated or lost beneath hundreds of messages.`,
    rounds: {
      R1: {
        theme: "Turn Campus Noise into Student Action",
        challenge: "What Actually Matters to Me?",
        description:
          "We invite participants to reimagine how freshers receive and understand campus information through an AI-powered assistant that turns scattered announcements into clear, relevant and useful updates. The aim is to help students understand what matters, why it matters and what they need to do next—without hiding unexpected opportunities or filling information gaps with made-up details.",
        hint: "Think relevance, easy to access, deadlines, clarity, trust and discovery.",
        tagline: "Less scrolling. Less confusion. More action.",
        winningQues: "",
      },
    },
  },
];

// ─── HELPER: bold all "Live competitive twist:" occurrences ──────────────
const formatDescription = (text) => {
  if (!text) return text;
  return text.replace(
    /Live competitive twist:/gi,
    (match) => `<strong>${match}</strong>`
  );
};

// ─── 3D CARD COMPONENT ──────────────────────────────────────────────────────────
const Card = ({ icon: Icon, theme, tagline, shortDescription, onClick }) => {
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
      onClick={onClick}
      style={{
        ...style,
        background: "linear-gradient(145deg, #FBF4F7 0%, #F7DFD4 100%)",
      }}
      className="group relative w-full max-w-sm cursor-pointer rounded-3xl border border-[#E38DA3]/40 p-6 shadow-xl shadow-[#F3AFC0]/30 transition-all duration-300 ease-out hover:border-[#CF547A]/60 hover:shadow-[#CF547A]/40 [transform-style:preserve-3d] spotlight-card flex flex-col justify-between"
    >
      <div className="relative flex h-full flex-col [transform-style:preserve-3d]">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#CF547A] to-[#CE4777] text-2xl text-white shadow-md shadow-[#CE4777]/30 transition-all duration-300 group-hover:shadow-[#CE4777]/50 [transform:translateZ(40px)]">
          <Icon />
        </div>

        <h3 className="mb-1 text-xl font-bold text-[#402327] tracking-tight group-hover:text-[#CE4777] transition-colors [transform:translateZ(30px)]">
          {theme}
        </h3>
        <p className="mb-3 text-sm font-semibold text-[#CF547A] [transform:translateZ(20px)]">{tagline}</p>
        <p className="flex-1 text-sm leading-relaxed text-[#402327]/80 line-clamp-3 font-normal [transform:translateZ(15px)]">
          {shortDescription}
        </p>

        <div className="mt-6 flex items-center text-xs font-semibold text-[#CE4777] transition-all duration-300 group-hover:text-[#CF547A] [transform:translateZ(20px)]">
          <span>Click to explore</span>
          <FaChevronRight className="ml-1 text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

// ─── MODAL COMPONENT ─────────────────────────────────────────────────────────
const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const { theme, tagline, icon: Icon, fullDescription, rounds } = data;
  const roundKeys = Object.keys(rounds);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#402327]/60 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#FBF4F7] p-6 shadow-2xl shadow-[#CE4777]/30 border border-[#E38DA3]/40"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-[#F4C4C9]/50 p-2 text-[#402327]/60 transition-colors hover:bg-[#F4C4C9] hover:text-[#402327] cursor-pointer"
          aria-label="Close modal"
        >
          <FaTimes size={18} />
        </button>

        <div className="mb-6 flex items-start gap-4 pr-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#CF547A] to-[#CE4777] text-2xl text-white shadow-md shadow-[#CE4777]/30">
            <Icon />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#402327]">{theme}</h2>
            <p className="text-[#CF547A] font-semibold mt-1">{tagline}</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="mb-2 flex items-center text-sm font-bold uppercase tracking-wider text-[#CE4777]">
            <FaLaptopCode className="mr-2" />
            Problem Statement
          </h4>
          <p className="text-sm leading-relaxed text-[#402327]/80 font-normal whitespace-pre-wrap">
            {fullDescription}
          </p>
        </div>

        <div>
          <h4 className="mb-3 flex items-center text-sm font-bold uppercase tracking-wider text-[#CE4777]">
            <FaChevronDown className="mr-2" />
            Round Details
          </h4>

          {roundKeys.map((key) => {
            const round = rounds[key];
            return (
              <div
                key={key}
                className="mb-4 rounded-2xl bg-[#F7DFD4]/70 border border-[#E38DA3]/30 p-4 last:mb-0"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#402327]">
                    {key}
                  </span>
                  {round.theme && (
                    <span className="text-xs text-[#CF547A] font-bold">
                      {round.theme}
                    </span>
                  )}
                </div>

                {round.challenge && (
                  <div className="mb-2">
                    <span className="text-xs text-[#402327]/60 uppercase tracking-wider font-bold">
                      Challenge
                    </span>
                    <p className="text-sm font-bold text-[#402327] mt-0.5">
                      {round.challenge}
                    </p>
                  </div>
                )}

                {round.description && (
                  <div className="mb-2">
                    <span className="text-xs text-[#402327]/60 uppercase tracking-wider font-bold">
                      Description
                    </span>
                    <div
                      className="text-sm text-[#402327]/80 font-normal leading-relaxed mt-0.5 whitespace-pre-wrap [&_strong]:font-extrabold [&_strong]:text-[#CE4777]"
                      dangerouslySetInnerHTML={{
                        __html: formatDescription(round.description),
                      }}
                    />
                  </div>
                )}

                {round.hint && (
                  <div className="mb-2 rounded-xl border border-[#CF547A]/30 bg-[#F3AFC0]/20 p-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#CF547A]">
                      💡 Hint
                    </span>
                    <p className="text-sm text-[#402327]/80 font-normal mt-0.5">{round.hint}</p>
                  </div>
                )}

                {round.tagline && (
                  <div className="mb-2">
                    <span className="text-xs text-[#402327]/60 uppercase tracking-wider font-bold">
                      Tagline
                    </span>
                    <p className="text-sm italic text-[#402327]/70 mt-0.5">
                      "{round.tagline}"
                    </p>
                  </div>
                )}

                {round.winningQues && (
                  <div className="rounded-xl border border-[#CE4777]/30 bg-[#F3AFC0]/20 p-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#CE4777]">
                      🏆 Winning Question
                    </span>
                    <p className="text-sm text-[#402327] mt-0.5 font-medium">
                      {round.winningQues}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-[#CF547A] to-[#CE4777] px-6 py-2 text-sm font-semibold text-white transition-colors hover:shadow-lg shadow-md shadow-[#CE4777]/30 cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─── MAIN THEMES COMPONENT ──────────────────────────────────────────────────
const Themes = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (theme) => {
    setSelectedTheme(theme);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTheme(null), 300);
  };

  // Cute floating hearts
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 12 + Math.random() * 20,
        opacity: 0.1 + Math.random() * 0.15,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 15,
      })),
    []
  );

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white">
            <span className="bg-gradient-to-r from-[#CF547A] to-[#CE4777] bg-clip-text text-transparent">
              THEMES
            </span>
          </h2>
          <p className="text-pink-200/90 mt-2 font-medium">
            Choose your track and build the future
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {themeData.map((item) => (
            <Card
              key={item.id}
              icon={item.icon}
              theme={item.theme}
              tagline={item.tagline}
              shortDescription={item.shortDescription}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedTheme}
      />
    </section>
  );
};

export default Themes;