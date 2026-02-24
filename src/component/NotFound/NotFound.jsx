import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate floating particles
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={styles.container}>
      {/* Animated background particles */}
      <div className={styles.particles}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content with parallax */}
      <div
        className={styles.content}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        {/* Animated 404 */}
        <div className={styles.errorCode}>
          <span className={`${styles.digit} ${styles.digit1}`}>4</span>
          <span className={`${styles.digit} ${styles.digit2}`}>
            <div className={styles.zeroContainer}>
              <svg viewBox="0 0 100 100" className={styles.zeroSvg}>
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="283"
                  strokeDashoffset="283"
                  className={styles.zeroCircle}
                />
              </svg>
              <div className={styles.zeroInner}>0</div>
            </div>
          </span>
          <span className={`${styles.digit} ${styles.digit3}`}>4</span>
        </div>

        {/* Glitch effect overlay */}
        <div className={styles.glitchOverlay} aria-hidden="true">
          <span className={styles.digit}>4</span>
          <span className={styles.digit}>0</span>
          <span className={styles.digit}>4</span>
        </div>

        {/* Message */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Page Not Found
        </h1>

        <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-12 max-w-2xl mx-auto px-4">
          The page you're looking for seems to have wandered off into the
          digital void. Don't worry, even the best explorers get lost sometimes.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button onClick={() => navigate("/")} className={styles.btnPrimary}>
            <span className={styles.btnIcon}>🏠</span>
            <span className={styles.btnText}>Take Me Home</span>
            <span className={styles.btnShimmer} />
          </button>

          <button onClick={() => navigate(-1)} className={styles.btnSecondary}>
            <span className={styles.btnIcon}>←</span>
            <span className={styles.btnText}>Go Back</span>
            <span className={styles.btnShimmer} />
          </button>
        </div>

        {/* Decorative elements */}
        <div className={`${styles.decoration} ${styles.decoration1}`} />
        <div className={`${styles.decoration} ${styles.decoration2}`} />
        <div className={`${styles.decoration} ${styles.decoration3}`} />
      </div>
    </div>
  );
};

export default NotFound;
