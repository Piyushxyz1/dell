
import React, { useEffect, useState } from "react";
import slider1 from "../../assets/slide-1.jpg"
import slider2 from "../../assets/slide-2.jpg"
import slider3 from "../../assets/slide-3.jpg"
import slider4 from "../../assets/slide-4.jpg"
import slider5 from "../../assets/slide-5.jpg"
import "./slider.css";

const slides = [
    {
        image:
            slider1,
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
        image:slider4,
        title: "Next-level performance",
        description:
            "Experience fast, responsive performance wherever you work.",
    },
   
];

const CenterSlider = () => {
    const [active, setActive] = useState(2);

    // NEXT SLIDE
    const nextSlide = () => {
        setActive((prev) => (prev + 1) % slides.length);
    };

    // PREVIOUS SLIDE
    const prevSlide = () => {
        setActive(
            (prev) => (prev - 1 + slides.length) % slides.length
        );
    };

    // AUTO SLIDE
    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    // FIND POSITION OF EACH SLIDE
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
                            className={`slider-card ${position === 0
                                    ? "active"
                                    : position === -1
                                        ? "left"
                                        : position === 1
                                            ? "right"
                                            : "hidden"
                                }`}
                            onClick={() => setActive(index)}
                        >

                            {/* IMAGE */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                            />

                            {/* DARK GRADIENT */}
                            <div className="slide-gradient"></div>

                            {/* TEXT */}
                            <div className="slide-content">

                                <h3>{slide.title}</h3>

                                <p>{slide.description}</p>

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* CONTROLS */}
           

        </section>
    );
};

export default CenterSlider;


