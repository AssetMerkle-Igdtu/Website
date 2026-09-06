import { motion } from "framer-motion";

// Single round item
const RoundItem = ({ round, index }) => {
  const isRight = index % 2 !== 0;

  return (
    <motion.div
      className="mb-12 mx-auto md:w-[80%]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
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
          initial={{ opacity: 0, x: isRight ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 hover:border-yellow-500 transition">
            <h3 className="text-xl font-bold text-yellow-400">{round.title}</h3>
            {round.subtitle && (
              <p className="text-sm text-gray-400 mt-1 font-semibold">{round.subtitle}</p>
            )}
            <p className="text-gray-300 mt-3 leading-relaxed whitespace-pre-line">{round.description}</p>
            {round.link && (
              <a
                href={round.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-yellow-400 font-semibold hover:underline"
              >
                Fill Google Form →
              </a>
            )}
          </div>
        </motion.div>

        {/* Center Dot */}
        <motion.div
          className="relative w-2/12 flex justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="w-6 h-6 bg-yellow-500 rounded-full shadow-lg z-10"></div>
        </motion.div>

        {/* Date */}
        <motion.div
          className="w-5/12"
          initial={{ opacity: 0, x: isRight ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className={`font-extrabold text-xl sm:text-2xl text-yellow-400 tracking-wide ${isRight ? "text-right" : "text-left"}`}>
            {round.date}
          </p>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex">
        <motion.div
          className="flex flex-col items-center mr-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="w-6 h-6 bg-yellow-500 rounded-full shadow-lg"></div>
          <div className="w-1 mt-2 flex-grow bg-gray-600"></div>
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="font-extrabold text-xl sm:text-2xl mb-2 text-yellow-400 tracking-wide">{round.date}</p>
          <div className="p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 hover:border-yellow-500 transition">
            <h3 className="text-lg font-bold text-yellow-400">{round.title}</h3>
            {round.subtitle && (
              <p className="text-sm text-gray-400 mt-1 font-semibold">{round.subtitle}</p>
            )}
            <p className="text-gray-300 mt-3 leading-relaxed whitespace-pre-line">{round.description}</p>
            {round.link && (
              <a
                href={round.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-yellow-400 font-semibold hover:underline"
              >
                Fill Google Form →
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Timeline component
const RoundsTimeline = () => {
  const rounds = [
    {
      title: "Round 1: Screening Round",
      date: "5 February - 14 February 2026",
      link: "https://forms.gle/wSUjhqgoFsC8LjuV7",
      description: `All participants must fill the Google Form.
Submitted responses will be verified for accuracy and completeness.
Entries with incorrect or incomplete information will be rejected.`,
    },
    {
      title: "Round 2: Mentorship & Evaluation Round",
      subtitle: "Online",
      date: "15–16 February 2026",
      description: `Shortlisted teams will showcase their project progress
and prototype in front of assigned mentors.
Mentors will review solutions and provide feedback.
Teams are expected to incorporate relevant changes.`,
    },
    {
      title: "Round 3: Final Judges’ Round",
      subtitle: "Offline",
      date: "17 February 2026",
      description: `Shortlisted teams will be invited to the on-site finale.
Venue will be announced soon.`,
    },
  ];

  return (
    <div className="relative mt-24 mb-24 sm:mb-32 lg:mb-40">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400">Hackathon Rounds</h2>
        <p className="text-gray-200 sm:text-gray-300 text-base sm:text-lg font-medium mt-3 max-w-2xl mx-auto tracking-wide">
          A step by step breakdown of the AM VibeAthon selection and evaluation process
        </p>
      </div>

      {/* Desktop vertical line */}
      <div className="hidden lg:block absolute top-40 left-1/2 w-1 h-full bg-gray-600 transform -translate-x-1/2"></div>

      {rounds.map((round, index) => (
        <RoundItem key={index} round={round} index={index} />
      ))}
    </div>
  );
};

export default RoundsTimeline;
