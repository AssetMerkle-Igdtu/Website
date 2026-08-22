import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FAQ from "./pages/FAQs";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import CollaboratePage from "./components/CollaboratePage";
import SponsorPage from "./components/SponsorPage";
import AuthPage from "./components/AuthPage";
import Events from "./pages/Events";
import Teams from "./pages/Teams";
import Docs from "./pages/Docs";
import AMHacksPage from "./pages/vibeathon";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        {/* Layout Route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="collaborate" element={<CollaboratePage />} />
          <Route path="sponsor" element={<SponsorPage />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="events" element={<Events />} />
          <Route path="team" element={<Teams />} />
          <Route path="docs" element={<Docs />} />
          {/* <Route path="amhacks" element={<AMHacks />} /> */}

          {/*Fixed route */}
          <Route path="vibeathon" element={<AMHacksPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
