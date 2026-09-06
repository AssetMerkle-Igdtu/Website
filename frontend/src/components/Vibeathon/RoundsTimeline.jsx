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
              className="relative p-7 rounded-xl bg-[#FBF4F7] backdrop-blur-md border border-[#E38DA3]/30 shadow-md shadow-[#F3AFC0]/20 transition-all duration-300 group-hover:border-[#CF547A]/60 group-hover:-translate-y-2 group-hover:shadow-[#CF547A]/30 spotlight-card"
              style={{
                background: "linear-gradient(145deg, #FBF4F7 0%, #F7DFD4 100%)",
              }}
            >
              <h3 className="text-xl font-extrabold text-[#402327] tracking-wide">
                {round.title}
              </h3>

              {round.subtitle && (
                <p className="text-xs uppercase tracking-widest text-[#CF547A] mt-1 font-semibold">
                  {round.subtitle}
                </p>
              )}

              <p className="text-[#402327]/80 mt-4 leading-relaxed text-sm sm:text-base whitespace-pre-line font-normal">
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

        {/* Mode / Venue */}
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

          <div className="relative group">
            <div
              onMouseMove={handleCardMouseMove}
              className="relative p-6 rounded-xl bg-[#FBF4F7] backdrop-blur-md border border-[#E38DA3]/30 shadow-md shadow-[#F3AFC0]/20 transition-all duration-300 group-hover:border-[#CF547A]/60 spotlight-card"
              style={{
                background: "linear-gradient(145deg, #FBF4F7 0%, #F7DFD4 100%)",
              }}
            >
              <h3 className="text-lg font-extrabold text-[#402327] tracking-wide">
                {round.title}
              </h3>

              {round.subtitle && (
                <p className="text-xs uppercase tracking-widest text-[#CF547A] mt-1 font-semibold">
                  {round.subtitle}
                </p>
              )}

              <p className="text-[#402327]/80 mt-4 leading-relaxed text-sm whitespace-pre-line font-normal">
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

Put your ideas, skills, and creativity to the test as you work on the challenge before the finale.`,
    },
    {
      title: "Round 3: The Build",
      subtitle: "Offline",
      date: "To be Announced",
      description: `The Grand Finale: To be Announced.

Shortlisted teams will take on an 8-hour Vibeathon challenge.

Build, experiment, and bring your ideas to life as you race against the clock.`,
    },
  ];

  return (
    <section className="relative overflow-hidden py-16">
      {/* Decorative floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#F3AFC0]"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              fontSize: `${16 + Math.random() * 24}px`,
              opacity: 0.15,
            }}
            animate={{
              y: [0, -15, 0, 15, 0],
              rotate: [0, 10, -10, 5, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

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