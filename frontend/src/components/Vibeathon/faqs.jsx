import React, { useState, useRef } from "react";

const FAQCard = ({ faq, isOpen, onToggle }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const rotateX = ((y / height) - 0.5) * -15;
    const rotateY = ((x / width) - 0.5) * 15;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
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
      className="group rounded-3xl border border-[#E38DA3]/40 p-6 transition-all duration-300 ease-out spotlight-card shadow-xl shadow-[#F3AFC0]/30 hover:shadow-[#CF547A]/40 hover:border-[#CF547A]/60 [transform-style:preserve-3d]"
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left focus:outline-none group cursor-pointer"
      >
        <span className="text-lg sm:text-xl font-bold text-[#402327] group-hover:text-[#CE4777] transition-colors pr-8 [transform:translateZ(25px)]">
          {faq.question}
        </span>

        <svg
          className={`w-5 h-5 text-[#CE4777] transition-transform duration-300 ease-in-out flex-shrink-0 [transform:translateZ(20px)] ${
            isOpen ? "transform rotate-180" : ""
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
          isOpen
            ? "max-h-96 opacity-100 transform translate-y-0"
            : "max-h-0 opacity-0 transform -translate-y-2"
        }`}
        style={{
          transitionTimingFunction: isOpen
            ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            : "ease-out",
        }}
      >
        <p className="text-sm sm:text-base text-[#402327]/80 leading-relaxed pt-4 font-normal [transform:translateZ(15px)]">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Who can participate?",
      answer:
        "SheVibes is open exclusively to IGDTUW students who are excited about technology, innovation, and building solutions. Beginners and freshers are absolutely welcome!",
    },
    {
      question: "Do I need to be a Web3/AI expert to participate?",
      answer:
        "Nope! You don’t need to be an expert. Choose a track you’re interested in, bring your ideas, and learn along the way.",
    },
    {
      question: "Is SheVibes only for women?",
      answer:
        "SheVibes is a women-focused ideathon created to encourage and empower women to explore technology, build ideas, and connect with other aspiring innovators.",
    },
    {
      question: "Can freshers participate?",
      answer:
        "Absolutely! SheVibes is designed to be beginner-friendly, so you don’t need prior hackathon experience to participate.",
    },
    {
      question: "Can I participate individually?",
      answer: "No, you can only participate as a team of 2-4 members.",
    },
    {
      question: "What do I need to submit in Round 1?",
      answer:
        "You’ll need to submit your PPT and idea description. The submissions will be evaluated to shortlist teams for the next round.",
    },
    {
      question: "What happens after Round 1?",
      answer:
        "Top 20-25 teams will be selected and will be called offline to present their round 2 solution to judges.",
    },
    {
      question: "Where will the final round take place?",
      answer: "TBA",
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
        "100%. SheVibes is about having an idea, learning, and building—not about already knowing everything. Come curious. We’ll take it from there.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="learn-more"
      className="py-24 px-4 sm:px-6 lg:px-8 w-full overflow-hidden relative"
    >
      <div className="relative max-w-4xl mx-auto">
        <h2 className="font-sans text-3xl sm:text-5xl font-black text-center mb-16 text-[#f58997] tracking-tight">
          Frequently Asked{" "}
          <span className="font-serif italic font-normal text-[#CF547A]">
            Questions
          </span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQCard
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;