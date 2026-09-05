
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

import slide5 from "../../assets/slide-5.jpg";

const Alienware = () => {
  return (
    <section className="alienware-hero" id="offers">
      <div className="alienware-bg" />
      <div className="alienware-overlay" />

      <div className="alienware-content">
        <motion.div
          className="alienware-center-content"
          initial={{
            opacity: 0,
            x: -180,
            scale: 0.86,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 1.35,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="alienware-laptop-wrap">
            <div className="alienware-image-glow" />

            <img
              src={slide5}
              alt="Dell Alienware Laptop"
              loading="lazy"
              decoding="async"
              draggable="false"
            />

            <motion.div
              className="alienware-secure-badge"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ShieldCheck size={19} />

              <span>Secure and reliable</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="alienware-copy"
          initial={{
            opacity: 0,
            x: 80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 1,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="small-heading">MORE DEALS</span>

          <h2>
            Dell
            <strong>Alienware</strong>
          </h2>

          <p>
            Experience ultimate gaming performance with Alienware desktops and
            laptops. Power your passion with cutting-edge technology.
          </p>

          <div className="alienware-price">
            <del>₹1,99,999/-*</del>

            <strong>₹1,49,999/-*</strong>
          </div>

          <button className="dark-button">
            SHOP NOW
            <ArrowRight size={15} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Alienware;
