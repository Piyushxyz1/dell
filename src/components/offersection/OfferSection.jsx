
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const OfferSection = () => {
  return (
    <section className="special-offer-section">

      {/* ================= CONTENT ================= */}

      <motion.div
        className="special-offer-content"
        initial={{
          opacity: 0,
          x: -50,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className="small-heading">
          SPECIAL OFFER
        </span>

        <h2>
          Work smarter.
          <span> Live better.</span>
        </h2>

        <p>
          Upgrade your everyday experience
          with powerful Dell technology built
          for modern life.
        </p>

        <div className="special-offer-price">
          <div className="price-row">
            <del>₹1,39,999/-*</del>

            <strong>
              ₹99,999/-*
            </strong>
          </div>
        </div>

        <div className="special-offer-badge">
          LIMITED TIME OFFER
        </div>

        <div className="special-offer-features">
          <span>✓ Free Delivery</span>
          <span>✓ 1 Year Warranty</span>
          <span>✓ Easy EMI</span>
        </div>

        <button className="dark-button">
          SHOP NOW
          <ArrowRight size={15} />
        </button>
      </motion.div>

      {/* ================= IMAGE ================= */}

      <motion.div
        className="special-offer-image"
        initial={{
          opacity: 0,
          x: 80,
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.4,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="special-offer-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=2200&q=92"
            alt="Premium laptop"
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>

    </section>
  );
};

export default OfferSection;

