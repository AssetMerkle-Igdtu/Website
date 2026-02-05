import React, { useState, useEffect } from 'react';
import './Tagline.css';

const Tagline = () => {
  const [registrationTimeLeft, setRegistrationTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [hackathonTimeLeft, setHackathonTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const registrationDeadline = new Date('2026-02-10T23:59:59').getTime();
    const hackathonStart = new Date('2026-02-16T09:00:00').getTime();

    const calculateTimeLeft = (targetDate) => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        return {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const updateCountdowns = () => {
      setRegistrationTimeLeft(calculateTimeLeft(registrationDeadline));
      setHackathonTimeLeft(calculateTimeLeft(hackathonStart));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tagline-section">
      <div className="gradient-bg"></div>
      <div className="particles"></div>

      <div className="pulse-ring"></div>
      <div className="pulse-ring"></div>
      <div className="pulse-ring"></div>

      <div className="tagline-box">
        <div className="deco-line top"></div>
        <div className="deco-line bottom"></div>

        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>

        <div className="corner-accent tl"></div>
        <div className="corner-accent tr"></div>
        <div className="corner-accent bl"></div>
        <div className="corner-accent br"></div>

        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>

        <h1 className="title">AM Hacks 2.0 <span>2026</span></h1>

        <p className="subtitle">
          Where Creativity Meets Technology, and Every Idea Becomes a Game Changing Innovation
        </p>

        {/* Event Date */}
        <div className="event-date">
          <p className="date-text">
            🚀🔥 <strong>AM HACKS 2.0</strong> is happening on{' '}
            <strong>16th – 18th February 2026</strong> 💻⚡
          </p>
        </div>

        {/* Registration Deadline */}
        <p className="registration-deadline">
          ⏳ <strong>Last Day of Registration:</strong> 10th February 2026 — Register Fast!!
        </p>

        {/* Registration Countdown */}
        <div className="countdown-container">
          <div className="countdown-box">
            <div className="countdown-value">{registrationTimeLeft.days}</div>
            <div className="countdown-label">Days</div>
          </div>
          <div className="countdown-separator">:</div>

          <div className="countdown-box">
            <div className="countdown-value">{registrationTimeLeft.hours}</div>
            <div className="countdown-label">Hours</div>
          </div>
          <div className="countdown-separator">:</div>

          <div className="countdown-box">
            <div className="countdown-value">{registrationTimeLeft.minutes}</div>
            <div className="countdown-label">Minutes</div>
          </div>
          <div className="countdown-separator">:</div>

          <div className="countdown-box">
            <div className="countdown-value">{registrationTimeLeft.seconds}</div>
            <div className="countdown-label">Seconds</div>
          </div>
        </div>

        {/* Hackathon Countdown */}
        {/* <p className="registration-deadline" style={{ marginTop: "30px" }}>
          🚀 <strong>Hackathon Begins:</strong> 16th February 2026, 9:00 AM (IST)
        </p> */}

        <p className="registration-deadline" style={{ marginTop: "30px" }}>
          🚀 <strong>Hackathon Begins In:</strong>{' '}
          {hackathonTimeLeft.days}d {hackathonTimeLeft.hours}h{' '}
          {hackathonTimeLeft.minutes}m {hackathonTimeLeft.seconds}s
        </p>



        <button className="pt-5">
          <a
            className="coming-btn"
            href="https://fluxor.io/hackathon/am-hacks-2026?utm_source=whatsapp&utm_medium=social&utm_campaign=hackathon_share&page=1"
          >
            Register Now
          </a>
        </button>

      </div>
    </div>
  );
};

export default Tagline;
