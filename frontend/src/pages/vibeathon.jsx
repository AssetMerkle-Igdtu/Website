import Tagline from "../components/Vibeathon/Tagline";
import AMHacks from "../components/Vibeathon/Hero";
import Sponsor from "../components/Vibeathon/sponsor";
import FAQs from "../components/Vibeathon/faqs";
import AMSponsi from "../components/Vibeathon/AMSponsi";
import Prizes from "../components/Vibeathon/Testimonials";
import Glimpses from "../components/Vibeathon/Glimpses";
import RoundsTimeline from "../components/Vibeathon/RoundsTimeline";

const AMHacksPage = () => {
  return (
    <div className="top-[-90px] relative pt-24">
      <AMHacks />
      <RoundsTimeline />
      <Prizes />
      <Glimpses />
      <FAQs />
    </div>
  );
};

export default AMHacksPage;
