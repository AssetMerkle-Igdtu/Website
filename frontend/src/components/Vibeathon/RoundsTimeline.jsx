import { motion } from "framer-motion";

const handleCardMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
  e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
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
          <div className="relative group">
            <div
              onMouseMove={handleCardMouseMove}
              className="relative p-7 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 transition-all duration-300 group-hover:border-amber-400/40 group-hover:-translate-y-2 spotlight-card"
            >
              <h3 className="text-xl font-extrabold text-white tracking-wide">
                {round.title}
              </h3>

              {round.subtitle && (
                <p className="text-xs uppercase tracking-widest text-gray-400 mt-1 font-semibold">
                  {round.subtitle}
                </p>
              )}

              <p className="text-gray-300 mt-4 leading-relaxed text-sm sm:text-base opacity-90 whitespace-pre-line font-light">
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
              className="absolute inset-0 rounded-full bg-yellow-500 opacity-20 blur-lg"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.1, 0.3, 0.1],
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
            <div
              onMouseMove={handleCardMouseMove}
              className="relative p-6 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 transition-all duration-300 group-hover:border-amber-400/40 spotlight-card"
            >
              <h3 className="text-lg font-extrabold text-white tracking-wide">
                {round.title}
              </h3>

              {round.subtitle && (
                <p className="text-xs uppercase tracking-widest text-gray-400 mt-1 font-semibold">
                  {round.subtitle}
                </p>
              )}

              <p className="text-gray-300 mt-4 leading-relaxed text-sm opacity-90 whitespace-pre-line font-light">
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
      title: "Round 1: The Vision",
      date: "7 September",
      description: `Submit your PPT and idea description.

The submission will focus on your idea, problem statement, proposed solution, and approach.

Selected teams will move forward to the Online Mentorship Round.`,
    },

    {
      title: "Round 2: The Proof",
      subtitle: "Online",
      date: "19 September",
      description: `Shortlisted teams will receive a challenge to solve.

Put your ideas, skills, and creativity to the test as you work on the challenge before the finale.
`,
    },

    {
      title: "Round 3: The Build",
      subtitle: "Offline",
      date: "To be Announced",
      // date: "23 September",
      description: `The Grand Finale: To be Announced.

Shortlisted teams will take on an 8-hour Vibeathon challenge.

Build, experiment, and bring your ideas to life as you race against the clock.
`,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="relative z-10 mt-28 mb-28 sm:mb-36 lg:mb-44">
        <div className="text-center mb-24">
          <h2 className="font-sans text-3xl sm:text-4xl font-black text-white tracking-tight">
            SheVibes <span className="font-serif italic font-normal text-amber-400">Rounds</span>
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-light">
            A step-by-step journey from idea submission to mentorship and
            the grand finale.
          </p>
        </div>

        <div className="hidden lg:block absolute top-48 bottom-48 left-1/2 w-[2px] bg-gradient-to-b from-gray-700 via-yellow-500/20 to-gray-700 transform -translate-x-1/2" />

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
