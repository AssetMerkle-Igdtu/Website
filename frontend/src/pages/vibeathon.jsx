import { useState, useEffect } from "react";
import Tagline from "../components/Vibeathon/Tagline";
import FAQs from "../components/Vibeathon/faqs";
import Prizes from "../components/Vibeathon/Prizes";
import Hero from "../components/Vibeathon/Hero";
import RoundsTimeline from "../components/Vibeathon/RoundsTimeline";
import Tracks from "../components/Vibeathon/Themes";
import MoltenMetal from "../components/MoltenMetal";

const VibeathonPage = () => {
  const [showTracks, setShowTracks] = useState(false);

  useEffect(() => {
    // Target date: 7 September 2026, 00:00:00 (local time)
    const targetDate = new Date("2026-09-06T00:00:00");
    const now = new Date();

    if (now >= targetDate) {
      setShowTracks(true);
    }
  }, []);

  return (
    <div className="relative pt-16 sm:pt-20 pb-12 bg-transparent min-h-screen">
      {/* Background MoltenMetal for SheVibes */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <MoltenMetal
          color1="#e41ade"
          color2="#FF9FFC"
          color3="#FFFFFF"
          colorMode="molten"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          opacity={1}
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseStrength={0.3}
        />
      </div>

      <div className="relative z-10">
        <Hero />
        {showTracks && <Tracks />}
        <RoundsTimeline />
        <Prizes />
        <FAQs />
      </div>
    </div>
  );
};

export default VibeathonPage;
