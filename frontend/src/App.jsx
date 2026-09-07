import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FAQ from "./pages/FAQs";
import preloader from "./components/PreLoader";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import CollaboratePage from "./components/CollaboratePage";
import SponsorPage from "./components/SponsorPage";
import AuthPage from "./components/AuthPage";
import Events from "./pages/Events";
import Teams from "./pages/Teams";
import Docs from "./pages/Docs";
import AMHacksPage from "./pages/AMHacksPage";
import VibeathonPage from "./pages/vibeathon";
import SheVibesCursivePage from "./pages/SheVibesCursivePage";
import Submission from "./pages/Submission";
import Registration from "./pages/Registration";
import RequireTeam from "./components/RequireTeam";
import Web3Community from "./pages/Web3Community";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        {/* Layout Route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="preloader" element={<preloader />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="collaborate" element={<CollaboratePage />} />
          <Route path="sponsor" element={<SponsorPage />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="events" element={<Events />} />
          <Route path="team" element={<Teams />} />
          <Route path="docs" element={<Docs />} />
          <Route
            path="submit"
            element={
              <RequireTeam>
                <Submission />
              </RequireTeam>
            }
          />
          {/* <Route path="amhacks" element={<AMHacks />} /> */}
          <Route path="web3community" element={<Web3Community />} />

          
          <Route path="amhacks" element={<AMHacksPage />} />
          <Route path="vibeathon" element={<VibeathonPage />} />
          <Route path="shevibes-font" element={<SheVibesCursivePage />} />

          {/* Registration flow: Google OAuth redirects here, and Registration.jsx
              itself handles every phase (loading -> profile form -> team page)
              based on the current Supabase session, so /auth/callback reuses it. */}
          <Route path="register" element={<Registration />} />
          <Route path="auth/callback" element={<Registration />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

