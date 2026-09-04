import React, { useEffect, useState } from "react";
import slider1 from "../../assets/slide-1.jpg";
import slider2 from "../../assets/slide-2.jpg";
import slider3 from "../../assets/slide-3.jpg";
import slider4 from "../../assets/slide-4.jpg";

import "./slider.css";

const slides = [
  {
    image: slider1,
    title: "Built-in sustainability",
    description:
      "Sleek 14-inch 2-in-1 with on-device Copilot+ powered by Intel® Core™",
  },
  {
    image: slider2,
    title: "Power meets portability",
    description:
      "Designed for productivity with powerful performance and a premium finish.",
  },
  {
    image: slider3,
    title: "Made for your workflow",
    description:
      "A refined laptop experience built for work, creativity and everyday use.",
  },
  {
    image: slider4,
    title: "Next-level performance",
    description:
      "Experience fast, responsive performance wherever you work.",
  },
];

const CenterSlider = () => {
  const [active, setActive] = useState(2);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const getPosition = (index) => {
    let diff = index - active;

    if (diff > Math.floor(slides.length / 2)) {
      diff -= slides.length;
    }

    if (diff < -Math.floor(slides.length / 2)) {
      diff += slides.length;
    }

    return diff;
  };

  return (
    <section className="center-slider-section">
      <div className="center-slider">
        {slides.map((slide, index) => {
          const position = getPosition(index);

          return (
            <div
              key={index}
              className={`slider-card ${
                position === 0
                  ? "active"
                  : position === -1
                  ? "left"
                  : position === 1
                  ? "right"
                  : "hidden"
              }`}
              onClick={() => setActive(index)}
            >
              <img
                src={slide.image}
                alt={slide.title}
                loading={index === active ? "eager" : "lazy"}
              />

              <div className="slide-gradient"></div>

              <div className="slide-content">
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CenterSlider;