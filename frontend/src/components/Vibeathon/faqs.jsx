import React, { useState } from "react";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Who can participate?",
      answer:
        "Vibeathon is open exclusively to IGDTUW students who are excited about technology, innovation, and building solutions. Beginners and freshers are absolutely welcome!",
    },

    {
      question: "Do I need to be a Web3/AI expert to participate?",
      answer:
        "Nope! You don’t need to be an expert. Choose a track you’re interested in, bring your ideas, and learn along the way.",
    },

    {
      question: "Is Vibeathon only for women?",
      answer:
        "Vibeathon is a women-focused ideathon created to encourage and empower women to explore technology, build ideas, and connect with other aspiring innovators.",
    },

    {
      question: "Can freshers participate?",
      answer:
        "Absolutely! Vibeathon is designed to be beginner-friendly, so you don’t need prior hackathon experience to participate.",
    },

    {
      question: "Can I participate individually?",
      answer:
        "No, you can only participate as a team of 3-4 members.",
    },

    {
      question: "What are the different tracks?",
      answer:
        "There are 4 tracks: Web2, Open Innovation, AI, and Web3.",
    },

    {
      question: "What do I need to submit in Round 1?",
      answer:
        "You’ll need to submit your PPT and idea description. The submissions will be evaluated to shortlist teams for the next round.",
    },

    {
      question: "What happens after Round 1?",
      answer:
        "Shortlisted teams will enter the Online Mentorship Round, where they’ll present their ideas to mentors, receive feedback, and refine their concepts.",
    },

    {
      question: "Where will the final round take place?",
      answer:
        "The Grand Finale will be held offline at IGDTUW. The exact venue will be announced soon.",
    },

    {
      question: "Do I need to build a complete project for Round 1?",
      answer:
        "No. Round 1 focuses on your idea, problem statement, proposed solution, and approach. Details about the final-round requirements will be shared with shortlisted teams.",
    },

    {
      question: "What do the Top 6 teams get?",
      answer:
        "The Top 6 teams will get an opportunity to enter the Web3 community, along with goodies and recognition.",
    },

    {
      question: "Can I improve my idea after Round 1?",
      answer:
        "Yes! The Mentorship Round is specifically designed to help you get feedback and improve your idea before the finale.",
    },

    {
      question: "I’m new to hackathons. Should I still participate?",
      answer:
        "100%. Vibeathon is about having an idea, learning, and building—not about already knowing everything. Come curious. We’ll take it from there.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="learn-more"
      className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-5xl sm:text-6xl font-bold text-center mb-16"
          style={{ color: "#F5A623" }}
        >
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-700 pb-4 transition-transform duration-200 hover:scale-[1.02]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left py-4 focus:outline-none group"
              >
                <span className="text-xl sm:text-2xl font-normal text-white pr-8">
                  {faq.question}
                </span>

                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 ease-in-out flex-shrink-0 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100 transform translate-y-0"
                    : "max-h-0 opacity-0 transform -translate-y-2"
                }`}
                style={{
                  transitionTimingFunction:
                    openIndex === index
                      ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
                      : "ease-out",
                }}
              >
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;