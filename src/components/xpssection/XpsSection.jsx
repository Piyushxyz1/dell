
import { motion } from "framer-motion";

const XpsSection = () => {
  return (
    <section className="xps-section">
      <motion.div
        className="xps-copy"
        initial={{ opacity: 0, x: -70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className="small-heading">DELL XPS</span>

        <h2>
          Designed for<strong> what's next.</strong>
        </h2>

        <p>
          Experience premium performance, stunning
          design and intelligent technology built
          around the way you work.
        </p>

        <button className="dark-button">
          EXPLORE XPS
        </button>
      </motion.div>

      <motion.div
        className="xps-price-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.3,
        }}
      >
        <span>STARTING FROM</span>
        <strong>₹1,19,999/-*</strong>
      </motion.div>
    </section>
  );
};

export default XpsSection;

