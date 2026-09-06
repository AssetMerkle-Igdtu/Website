import React, { useState, useMemo } from "react";
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
//       R2: {
//         theme: "Turn Transparency into Technology",
//         challenge: "Proof Before 'Resolved'",
//         description:
//           "A broken streetlight is marked as repaired. A photograph is uploaded as proof—but it is old, unclear or taken somewhere else. Should one click be enough to close the complaint? We challenge participants to build a working system where 'resolved' is not simply a status—it must be supported by believable proof. Citizens should be able to review the evidence, question a false resolution and reopen the complaint when the problem still exists.",
//         hint: "Think before-and-after proof, time, location and citizen feedback.",
//         tagline: "Don’t just mark it resolved. Prove it.",
//         winningQues: "",
//       },
//       R3: {
//         theme: "From complaint to accountable resolution",
//         challenge: "Fix It. Prove It. Defend It.",
//         description: `Build a functional civic-issue MVP covering the complete complaint lifecycle. The MVP should support:
// • Complaint submission
// • Category and location selection
// • Evidence upload
// • Unique complaint identification
// • Authorised status updates
// • Transparent complaint history
// • Citizen verification of completed work
// • Disputed resolutions
// • Appropriate on-chain and off-chain storage

// Live competitive twist: An official marks a broken streetlight as repaired. Thirty minutes later, residents upload evidence showing that it is still broken. Your system must respond without deleting the official update or automatically trusting either side. It must preserve the record, reopen verification, and establish a transparent path towards the final decision.`,
//         hint: "",
//         tagline: "",
//         winningQues:
//           "Can your platform make accountability visible without making civic services harder to use?",
//       },
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
//       R2: {
//         theme: "When the Signal Disappears",
//         challenge: "5% Battery. No Internet. Still Miles from Home.",
//         description:
//           "It is late at night. A woman is travelling home when her internet becomes unstable and her phone battery drops to 5%. Live maps stop loading. Location updates freeze. The journey assistant she depended on is suddenly no longer useful—at the exact moment she needs it most. We challenge participants to build a low-connectivity journey mode that keeps the most essential guidance available while using as little battery and data as possible.",
//         hint: "Think offline directions, essential help points, low-power design and one compact check-in.",
//         tagline: "The signal may disappear. Support shouldn’t.",
//         winningQues: "",
//       },
//       R3: {
//         theme: "Build intelligence that adapts mid-journey",
//         challenge: "When the Route Changes",
//         description: `Build a functional journey companion that supports users before and during travel. The MVP should include:
// • Journey details
// • Multiple route options
// • Context-based recommendations
// • Explainable recommendation factors
// • Recent community information
// • Information-expiry logic
// • Confidence indicators
// • Feedback or reporting
// • Privacy-conscious location handling
// • Access to official emergency resources

// The solution must clearly state that it provides decision-support information and does not guarantee safety or replace emergency services.

// Live competitive twist: Halfway through the journey, the recommended station suddenly closes. The available alternatives contain incomplete and conflicting information. Your system must:
// • Recalculate available options
// • Account for the changed conditions
// • Communicate missing information
// • Explain the new recommendation
// • Protect the traveller’s live location
// • Provide a responsible fallback`,
//         hint: "",
//         tagline: "",
//         winningQues:
//           "Can your AI remain useful when the data becomes uncertain and the journey stops going according to plan?",
//       },
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
//       R2: {
//         theme: "The Information Rush",
//         challenge: "Fifty Messages. One Impossible Afternoon.",
//         description: `A fresher checks her phone after class and finds 50 unread announcements across emails, class groups and society channels. Buried inside the noise are a form due in two hours, a cancelled lecture, a scholarship closing tonight, two important commitments scheduled at the same time, a limited-seat placement workshop and an event she has already registered for. Some messages are repeated. Some details are missing. Some plans clash. And everything appears urgent. We challenge participants to vibecode an AI assistant that turns this chaotic afternoon into a clear and manageable action plan—without making decisions for the student or filling gaps with false information.`,
//         hint: "Think urgency, clashes, consequences and flexibility.",
//         tagline:
//           "Fifty messages. Five urgent decisions. One assistant that makes sense of it all.",
//         winningQues: "",
//       },
//       R3: {
//         theme: "Build the student command centre",
//         challenge: "From Chaos to Campus Clarity",
//         description: `Build a functional AI platform that turns scattered campus communication into a personalised student dashboard. The MVP should support:
// • Announcement input or import
// • AI-generated summaries
// • Category detection
// • Deadline and action extraction
// • Personalised relevance
// • Priority ranking
// • Duplicate detection
// • Conflict detection
// • Search or question-answering
// • Tasks or reminders
// • Recommendation explanations
// • Student corrections
// • Access to original announcements

// Live competitive twist: Twenty campus groups forward different versions of the same event announcement. Some messages omit the venue, one contains an incorrect deadline, and the official notice has just been updated. Your system must:
// • Group related announcements
// • Identify conflicting details
// • Distinguish official information from forwarded versions
// • Highlight the latest reliable update
// • Preserve the original messages
// • Refuse to invent missing information`,
//         hint: "",
//         tagline: "",
//         winningQues: "",
//       },
    },
  },
];

// ─── HELPER: bold all "Live competitive twist:" occurrences ──────────────
const formatDescription = (text) => {
  if (!text) return text;
  // Replace the phrase with a bold version (using <strong>)
  return text.replace(
    /Live competitive twist:/gi,
    (match) => `<strong>${match}</strong>`
  );
};

// ─── CARD COMPONENT ──────────────────────────────────────────────────────────
const Card = ({ icon: Icon, theme, tagline, shortDescription, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full max-w-sm cursor-pointer rounded-2xl bg-[#F7DFD4] p-[1px] shadow-lg shadow-[#F3AFC0]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#CF547A]/30"
      onClick={onClick}
    >
      <div className="relative flex h-full flex-col rounded-2xl bg-[#FBF4F7] p-6 backdrop-blur-sm transition-all duration-300">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#CF547A] to-[#CE4777] text-2xl text-white shadow-md shadow-[#CE4777]/30 transition-all duration-300 group-hover:shadow-[#CE4777]/50">
          <Icon />
        </div>

        <h3 className="mb-1 text-xl font-bold text-[#402327] tracking-tight">
          {theme}
        </h3>
        <p className="mb-3 text-sm font-medium text-[#CF547A]">{tagline}</p>
        <p className="flex-1 text-sm leading-relaxed text-[#402327]/70 line-clamp-2">
          {shortDescription}
        </p>

        <div className="mt-4 flex items-center text-xs font-medium text-[#CE4777] transition-all duration-300 group-hover:text-[#CF547A]">
          <span>Click to explore</span>
          <FaChevronRight className="ml-1 text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
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
      <div className="absolute inset-0 bg-[#402327]/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#FBF4F7] p-6 shadow-2xl shadow-[#CE4777]/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-[#F4C4C9]/50 p-2 text-[#402327]/60 transition-colors hover:bg-[#F4C4C9] hover:text-[#402327]"
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
            <p className="text-[#CF547A]">{tagline}</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="mb-2 flex items-center text-sm font-semibold uppercase tracking-wider text-[#CE4777]">
            <FaLaptopCode className="mr-2" />
            Problem Statement
          </h4>
          <p className="text-sm leading-relaxed text-[#402327]/80 whitespace-pre-wrap">
            {fullDescription}
          </p>
        </div>

        <div>
          <h4 className="mb-3 flex items-center text-sm font-semibold uppercase tracking-wider text-[#CE4777]">
            <FaChevronDown className="mr-2" />
            Round Details
          </h4>

          {roundKeys.map((key) => {
            const round = rounds[key];
            return (
              <div
                key={key}
                className="mb-4 rounded-xl bg-[#F7DFD4]/70 p-4 last:mb-0"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#402327]">
                    {key}
                  </span>
                  {round.theme && (
                    <span className="text-xs text-[#CF547A]">
                      {round.theme}
                    </span>
                  )}
                </div>

                {round.challenge && (
                  <div className="mb-2">
                    <span className="text-xs text-[#402327]/80 whitespace-pre-wrap [&_strong]:font-extrabold [&_strong]:text-[#CE4777]font-medium uppercase tracking-wider">
                      Challenge
                    </span>
                    <p className="text-sm font-medium text-[#402327]">
                      {round.challenge}
                    </p>
                  </div>
                )}

                {round.description && (
                  <div className="mb-2">
                    <span className="text-xs text-[#402327]/80 whitespace-pre-wrap [&_strong]:font-extrabold [&_strong]:text-[#CE4777]font-medium uppercase tracking-wider">
                      Description
                    </span>
                    {/* Bold "Live competitive twist:" using dangerouslySetInnerHTML */}
                    <div
                      className="text-sm text-[#402327]/80 whitespace-pre-wrap [&_strong]:font-extrabold [&_strong]:text-[#CE4777]"
                      dangerouslySetInnerHTML={{
                        __html: formatDescription(round.description),
                      }}
                    />
                  </div>
                )}

                {round.hint && (
                  <div className="mb-2 rounded-lg border border-[#CF547A]/30 bg-[#F3AFC0]/20 p-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-[#CF547A]">
                      💡 Hint
                    </span>
                    <p className="text-sm text-[#402327]/80">{round.hint}</p>
                  </div>
                )}

                {round.tagline && (
                  <div className="mb-2">
                    <span className="text-xs text-[#402327]/80 whitespace-pre-wrap [&_strong]:font-extrabold [&_strong]:text-[#CE4777]font-medium uppercase tracking-wider">
                      Tagline
                    </span>
                    <p className="text-sm italic text-[#402327]/70">
                      "{round.tagline}"
                    </p>
                  </div>
                )}

                {round.winningQues && (
                  <div className="rounded-lg border border-[#CE4777]/30 bg-[#F3AFC0]/20 p-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-[#CE4777]">
                      🏆 Winning Question
                    </span>
                    <p className="text-sm text-[#402327]/90">
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
            className="rounded-lg bg-[#CF547A] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#CE4777] shadow-md shadow-[#CE4777]/30"
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute text-[#F3AFC0]"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
              fontSize: h.size,
              opacity: h.opacity,
            }}
            initial={{ y: 0, rotate: 0 }}
            animate={{
              y: [0, -20, 0, 20, 0],
              rotate: [0, 10, -10, 5, 0],
            }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold tracking-tight text-[#402327]">
            <span className="bg-gradient-to-r from-[#CF547A] to-[#CE4777] bg-clip-text text-transparent">
              THEMES
            </span>
          </h2>
          <p className="text-[#402327]/60 mt-2">
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