import { motion } from "framer-motion";

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
          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-yellow-500/30 via-yellow-400/10 to-yellow-500/30 opacity-0 group-hover:opacity-100 blur-md transition duration-300" />

            <div className="relative p-7 rounded-xl bg-black border border-gray-700/70 transition-all duration-300 group-hover:border-yellow-500/60 group-hover:-translate-y-2">
              <h3 className="text-xl font-extrabold text-yellow-400 tracking-wide">
                {round.title}
              </h3>

              {round.subtitle && (
                <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                  {round.subtitle}
                </p>
              )}

              <p className="text-gray-300 mt-4 leading-relaxed text-sm sm:text-base opacity-90 whitespace-pre-line">
                {round.description}
              </p>
            </div>
          </div>
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
              className="absolute inset-0 rounded-full bg-yellow-500 opacity-30 blur-lg"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative w-6 h-6 bg-yellow-500 rounded-full shadow-xl z-10" />
          </div>
        </motion.div>

        {/* Mode / Venue */}
        <motion.div
          className="w-5/12"
          initial={{ opacity: 0, x: isRight ? -70 : 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p
            className={`font-bold text-lg text-gray-300 ${
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
            <div className="absolute inset-0 rounded-full bg-yellow-500 opacity-30 blur-md animate-pulse" />
            <div className="relative w-6 h-6 bg-yellow-500 rounded-full shadow-lg" />
          </div>

          <div className="w-1 mt-2 flex-grow bg-gray-700" />
        </div>

        <div className="w-full">
          <p className="font-bold text-lg mb-3 text-yellow-400">
            {round.date}
          </p>

          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-yellow-500/30 via-yellow-400/10 to-yellow-500/30 opacity-0 group-hover:opacity-100 blur-md transition duration-300" />

            <div className="relative p-6 rounded-xl bg-black border border-gray-700/70 transition-all duration-300 group-hover:border-yellow-500/60">
              <h3 className="text-lg font-extrabold text-yellow-400 tracking-wide">
                {round.title}
              </h3>

              {round.subtitle && (
                <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                  {round.subtitle}
                </p>
              )}

              <p className="text-gray-300 mt-4 leading-relaxed text-sm opacity-90 whitespace-pre-line">
                {round.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RoundsTimeline = () => {
  const rounds = [
    {
      title: "Round 1: PPT and Idea Submission Round",
      date: "PPT + Idea Submission",
      description: `Submit your PPT and idea description.

The submission will focus on your idea, problem statement, proposed solution, and approach.

Selected teams will move forward to the Online Mentorship Round.`,
    },

    {
      title: "Round 2: Online Mentorship Round",
      subtitle: "Online",
      date: "Online Mentorship",
      description: `Shortlisted teams will present their ideas to mentors.

You’ll receive feedback, guidance, and an opportunity to refine your concept before the finale.`,
    },

    {
      title: "Round 3: Offline Final Round",
      subtitle: "Offline",
      date: "IGDTUW",
      description: `The Grand Finale will be held offline at IGDTUW.

Shortlisted teams will get the opportunity to present their refined ideas and take their concepts to the next level.`,
    },
  ];

  return (
    <section className="tagline-section relative overflow-hidden">
      <div className="gradient-bg" />
      <div className="particles" />

      <div className="relative z-10 mt-28 mb-28 sm:mb-36 lg:mb-44">
        <div className="text-center mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400">
            Vibeathon Rounds
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A step-by-step journey from idea submission to mentorship and
            the grand finale.
          </p>
        </div>

        <div className="hidden lg:block absolute top-44 left-1/2 w-[2px] h-full bg-gradient-to-b from-gray-700 via-yellow-500/30 to-gray-700 transform -translate-x-1/2" />

        {rounds.map((round, index) => (
          <RoundItem
            key={index}
            round={round}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default RoundsTimeline;


