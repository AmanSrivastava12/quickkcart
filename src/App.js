import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Product from "./pages/LandingPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThanksPage from "./pages/ThanksPage";
import "./App.css";
import { useRef } from "react";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<ThanksPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const landingRef = useRef(null);
  return (
    <>
      <HomeCover scrollToRef={landingRef} />
      <Product landingRef={landingRef} />
    </>
  );
}

function HomeCover({ scrollToRef }) {
  const scrollToLandingPage = () => {
    scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-cover">
      <div className="cover-content">
        <h2>Elevate Every Step – Discover Premium Footwear Today</h2>
        <button className="explore-button" onClick={scrollToLandingPage}>
          Explore
        </button>
      </div>
    </div>
  );
}

export default App;
