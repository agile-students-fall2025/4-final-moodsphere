import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="circle-wrapper">
          <div className="circle-outer">
            <div className="circle-inner"></div>
          </div>
        </div>

        <h1 className="landing-title">Moodsphere</h1>

        <p className="landing-tagline">
          Monitor your mood, journal your feelings,<br />
          and discover practices to improve your<br />
          wellbeing
        </p>

        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
