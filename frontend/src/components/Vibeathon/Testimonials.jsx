import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Prizes = () => {
  const tests = [
    {
      id: 1,
      name: "🌐 Top 6 → Web3 Community",
      x_id: "Top 6",
      rank: "Community Opportunity",
      quote:
        "The Top 6 teams get an opportunity to enter our Web3 community.\n\nContinue learning, building, and collaborating beyond Vibeathon.",
    },

    {
      id: 2,
      name: "🎁 Goodies & Recognition",
      x_id: "Goodies + Recognition",
      rank: "For Your Ideas",
      quote:
        "Walk away with exciting goodies and recognition for your ideas and efforts.",
    },

    {
      id: 3,
      name: "🚀 Keep Building",
      x_id: "Keep Building",
      rank: "Beyond Vibeathon",
      quote:
        "Connect with fellow builders, explore Web3, and be part of a community that keeps your ideas moving.",
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
    <div className="min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      <div className="max-w-7xl w-full">

        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl font-bold mb-2"
            style={{ color: "oklch(82.8% 0.189 84.429)" }}
          >
            Vibeathon Benefits
          </h2>

          <div
            className="w-20 h-1 mx-auto"
            style={{
              backgroundColor: "oklch(41.4% 0.112 45.904)",
            }}
          />
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
                  <div
                    className={`rounded-3xl p-8 min-h-[440px] flex flex-col border transition-all duration-700 ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-90 opacity-40 blur-[1px]"
                    }`}
                    style={{
                      borderColor:
                        "oklch(60% 0.189 84.429 / 0.3)",
                      backgroundColor:
                        "oklch(25% 0.02 255.508 / 0.3)",
                      boxShadow: isActive
                        ? "0 20px 40px -20px oklch(60% 0.189 84.429 / 0.4)"
                        : "none",
                    }}
                  >
                    {/* Header */}
                    <div className="mb-6">
                      <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-1">
                        {item.rank}
                      </p>

                      <h2 className="text-3xl font-black text-white">
                        {item.x_id}
                      </h2>
                    </div>

                    <div className="w-full h-px bg-white/10 mb-6" />

                    {/* Description */}
                    <p
                      className="mb-6 flex-grow leading-relaxed whitespace-pre-line text-sm"
                      style={{
                        color: "oklch(92.9% 0.013 255.508)",
                      }}
                    >
                      {item.quote}
                    </p>

                    <div className="w-12 h-0.5 bg-orange-400 mb-4" />

                    {/* Footer */}
                    <div>
                      <h3 className="text-white text-lg font-semibold">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-16">
            <button
              onClick={handlePrev}
              className="rounded-full p-3 border border-white/10 hover:bg-white/10 transition-colors text-white"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-3">
              {tests.map((_, index) => {
                const realIndex =
                  (currentIndex - 1 + tests.length) % tests.length;

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index + 1)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === realIndex
                        ? "w-10 bg-orange-400"
                        : "w-2 bg-gray-600 hover:bg-gray-400"
                    }`}
                  />
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className="rounded-full p-3 border border-white/10 hover:bg-white/10 transition-colors text-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prizes;