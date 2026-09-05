
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import laptop1 from "../../assets/laptop-1.avif";
import laptop2 from "../../assets/laptop-2.avif";
import laptop3 from "../../assets/laptop-3.avif";

const accessories = [
  {
    image: laptop1,
    title: "Alienware m16 R2 Gaming Laptop",
    price: "₹1,49,999/-*",
    note: "INCL. ALL TAXES",
  },
  {
    image: laptop2,
    title: "Dell G16 Gaming Laptop",
    price: "₹1,29,999/-*",
    note: "INCL. ALL TAXES",
  },
  {
    image: laptop3,
    title: "Dell G15 Gaming Laptop",
    price: "₹99,999/-*",
    note: "INCL. ALL TAXES",
  },
];

const extendedAccessories = [
  ...accessories,
  ...accessories,
  ...accessories,
];

const Accessories = () => {
  const [accessoryIndex, setAccessoryIndex] = useState(0);
  const [accessoryStep, setAccessoryStep] = useState(0);

  const accessoryTrackRef = useRef(null);

  /*
   * Accessory slider calculations.
   */
  const updateAccessoryStep = () => {
    if (!accessoryTrackRef.current) return;

    const firstSlide =
      accessoryTrackRef.current.querySelector(
        ".accessory-slide"
      );

    if (!firstSlide) return;

    const slideWidth =
      firstSlide.getBoundingClientRect().width;

    const styles = window.getComputedStyle(
      accessoryTrackRef.current
    );

    const gap = parseFloat(styles.gap) || 0;

    setAccessoryStep(slideWidth + gap);
  };

  useEffect(() => {
    updateAccessoryStep();

    window.addEventListener(
      "resize",
      updateAccessoryStep
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateAccessoryStep
      );
    };
  }, []);

  const nextAccessory = () => {
    setAccessoryIndex((prev) =>
      Math.min(prev + 1, accessories.length)
    );
  };

  const previousAccessory = () => {
    setAccessoryIndex((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  const goToAccessory = (index) => {
    setAccessoryIndex(index);
  };

  return (
    <section
      className="accessories-section"
      id="accessories"
    >
      <div className="accessories-glow" />

      <div className="accessories-header">
        <div>
          <span className="small-heading">
            ACCESSORIES
          </span>

          <h2>
            Complete your
            <span> setup.</span>
          </h2>

          <p>
            Premium peripherals to elevate
            your productivity and entertainment.
          </p>
        </div>
      </div>

      <div className="accessories-carousel-wrapper">
        <div
          className="accessories-carousel"
          ref={accessoryTrackRef}
        >
          <motion.div
            className="accessories-track"
            animate={{
              x: -(accessoryIndex * accessoryStep),
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {extendedAccessories.map(
              (item, index) => (
                <article
                  className="accessory-slide"
                  key={`${item.title}-${index}`}
                >
                  <div className="accessory-image">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading={
                        index < 2
                          ? "eager"
                          : "lazy"
                      }
                      decoding="async"
                      draggable="false"
                    />
                  </div>

                  <div className="accessory-info">
                    <h3>{item.title}</h3>

                    <div className="accessory-pricing">
                      <strong>
                        {item.price}
                      </strong>

                      {item.note && (
                        <span className="accessory-price-note">
                          {item.note}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              )
            )}
          </motion.div>
        </div>

        <button
          className="custom-slider-btn"
          onClick={previousAccessory}
          aria-label="Previous accessory"
        />

        <button
          className="custom-slider-btn"
          onClick={nextAccessory}
          aria-label="Next accessory"
        />
      </div>

      <div className="accessory-dots">
        {accessories.map((_, index) => (
          <button
            key={index}
            className={`accessory-dot ${
              accessoryIndex === index
                ? "active"
                : ""
            }`}
            onClick={() =>
              goToAccessory(index)
            }
            aria-label={`Go to slide ${
              index + 1
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Accessories;
