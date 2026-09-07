import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PrizeCard = ({ item, isActive }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isActive) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const rotateX = ((y / height) - 0.5) * -18;
    const rotateY = ((x / width) - 0.5) * 18;

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
      className={`rounded-3xl p-8 min-h-[420px] flex flex-col transition-all duration-500 backdrop-blur-xl spotlight-card [transform-style:preserve-3d] ${
        isActive
          ? "scale-100 opacity-100 border border-[#CF547A]/50 shadow-2xl shadow-[#F3AFC0]/50 hover:border-[#CF547A]"
          : "scale-90 opacity-30 blur-[1px] border border-[#E38DA3]/20 shadow-[#E38DA3]/10"
      }`}
    >
      {/* Header */}
      <div className="mb-6 [transform:translateZ(25px)]">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#CF547A] mb-2">
          {item.rank}
        </p>
        <h2 className="text-2xl font-extrabold text-[#402327]">
          {item.x_id}
        </h2>
      </div>

      <div className="w-full h-px bg-[#E38DA3]/30 mb-6" />

      {/* Description */}
      <p className="mb-6 flex-grow leading-relaxed whitespace-pre-line text-sm text-[#402327]/80 font-normal [transform:translateZ(15px)]">
        {item.quote}
      </p>

      <div className="w-12 h-px bg-[#CE4777] mb-4" />

      {/* Footer */}
      <div className="[transform:translateZ(20px)]">
        <h3 className="text-[#402327] text-base font-bold">
          {item.name}
        </h3>
      </div>
    </div>
  );
};

const Prizes = () => {
  const tests = [
    {
      id: 1,
      name: "🌐 Top 6 → Web3 Community",
      x_id: "Web3 Community",
      rank: "Top 6 Winners",
      quote:
        "The Top 6 teams get an opportunity to join our Web3 community.\n\nKeep learning, building, and collaborating with fellow Web3 enthusiasts.",
    },
    {
      id: 2,
      name: "🧑‍💻 Top 6 → Mentorship",
      x_id: "Mentorship Opportunity",
      rank: "Top 6 Winners",
      quote:
        "The Top 6 teams get an exclusive mentorship opportunity.\n\nLearn from experienced mentors, get guidance, and take your ideas to the next level.",
    },
    {
      id: 3,
      name: "🎁 Top 3 → Swags + Courses",
      x_id: "Swags + Free Courses",
      rank: "Top 3 Winners",
      quote:
        "The Top 3 teams will win exciting swags along with access to free courses.\n\nKeep building, keep learning, and level up your skills.",
    },
    {
      id: 4,
      name: "💰 Prize Pool → ₹50K",
      x_id: "₹50K Prize Pool",
      rank: "Total Prize Pool",
      quote:
        "A total prize pool of ₹50,000 is up for grabs.\n\nBring your best ideas, build something impactful, and compete for the win.",
    },
  ];

  /* Clone items for infinite loop */
  const extendedTests = [
    tests[tests.length - 1],
    ...tests,
    tests[0],
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleNext = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const handlePrev = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  /* Infinite teleport */
  useEffect(() => {
    if (currentIndex === extendedTests.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 700);
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(tests.length);
      }, 700);
    }
  }, [currentIndex, extendedTests.length, tests.length]);

  /* Turn transitions back on */
  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => setIsTransitioning(true), 50);
    }
  }, [isTransitioning]);

  /* Responsive */
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* Auto-play */
  useEffect(() => {
    const interval = setInterval(handleNext, 4500);

    return () => clearInterval(interval);
  }, [handleNext]);

  const getTranslateX = () => {
    if (isMobile) {
      return -(currentIndex * 100);
    }

    return -(currentIndex * (100 / 3)) + 100 / 3;
  };

  return (
    <section className="relative py-20 overflow-hidden w-full">
      <div className="relative flex items-center justify-center px-4">
        <div className="max-w-7xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-sans text-3xl md:text-5xl font-black text-center mb-4 text-[#f58997] tracking-tight">
              SheVibes{" "}
              <span className="font-serif italic font-normal text-[#CF547A]">
                Benefits
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#CF547A] to-[#CE4777] mx-auto rounded-full" />
          </div>

          {/* Carousel */}
          <div className="relative">
            <div
              className="flex"
              style={{
                transform: `translateX(${getTranslateX()}%)`,
                transition: isTransitioning
                  ? "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)"
                  : "none",
              }}
            >
              {extendedTests.map((item, index) => {
                const isActive = index === currentIndex;

                return (
                  <div
                    key={`${item.id}-${index}`}
                    className="w-full lg:w-1/3 flex-shrink-0 px-3"
                  >
                    <PrizeCard item={item} isActive={isActive} />
                  </div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-16">
              <button
                onClick={handlePrev}
                className="rounded-full p-3 border border-[#E38DA3]/40 bg-[#F4C4C9]/20 hover:bg-[#CF547A] transition-colors text-[#402327] hover:text-white cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-3">
                {tests.map((_, index) => {
                  const realIndex =
                    (currentIndex - 1 + tests.length) % tests.length;

                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index + 1)}
                      className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                        index === realIndex
                          ? "w-8 bg-[#CF547A]"
                          : "w-1.5 bg-[#E38DA3]/50 hover:bg-[#E38DA3]"
                      }`}
                    />
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                className="rounded-full p-3 border border-[#E38DA3]/40 bg-[#F4C4C9]/20 hover:bg-[#CF547A] transition-colors text-[#402327] hover:text-white cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prizes;