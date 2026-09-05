
import { motion } from "framer-motion";

const IntroSection = () => {
  return (
    <section className="intro-section">
      {/* Background Image */}
      <div className="intro-background" />

      {/* Dark Overlays */}
      <div className="intro-overlay" />
      <div className="intro-overlay-bottom" />

      {/* Content */}
      <motion.div
        className="intro-content"
        initial={{
          opacity: 0,
          y: 55,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.4,
        }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className="small-heading">
          DELL TECHNOLOGIES
        </span>

        <h2>
          Technology that
          <span> moves you forward.</span>
        </h2>

        <p>
          From everyday productivity to
          extraordinary performance, discover
          technology designed around the way
          you live, work and create.
        </p>
      </motion.div>
    </section>
  );
};

export default IntroSection;

