import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import lapvideo from "../../assets/project-lap-4.mp4";
import lapvideo2 from "../../assets/project-lap.mp4";
import lapvideo3 from "../../assets/project-lap-3.mp4";
import laptop1 from "../../assets/laptop-1.avif";
import laptop2 from "../../assets/laptop-2.avif";
import laptop3 from "../../assets/laptop-3.avif";
import slide5 from "../../assets/slide-5.jpg";

import {
  ArrowRight,
  Play,
  Pause,
  ShieldCheck,
} from "lucide-react";

import "./products.css";
import CenterSlider from "../activesliderfeature/CenterSlider";

/* =========================================================
   HERO DATA
========================================================= */

const slides = [
  {
    video: lapvideo,
    label: "NEW XPS",
    title: "Power meets\nprecision.",
    description:
      "Engineered for those who demand uncompromising performance and premium design.",
    price: "₹1,49,999/-*",
  },
  {
    video: lapvideo2,
    label: "DELL PREMIUM",
    title: "Built for\nwhat's next.",
    description:
      "Experience next-generation performance wrapped in an elegant, refined design.",
    price: "₹1,29,999/-*",
  },
  {
    video: lapvideo3,
    label: "ULTIMATE PERFORMANCE",
    title: "Create without\nlimits.",
    description:
      "Powerful hardware designed to keep up with your biggest ideas.",
    price: "₹1,19,999/-*",
  },
];

/* =========================================================
   ACCESSORIES
========================================================= */

const accessories = [
  {
    image: laptop1,
    title: "Dell USB-C Mobile Adapter",
    price: "₹9,999/-*",
    note: "INCL. ALL TAXES",
  },
  {
    image:laptop2,
    title: "Dell Pro Wireless Keyboard and Mouse",
    price: "₹7,999/-*",
    note: "INCL. ALL TAXES",
  },
  {
    image:laptop3,
    title: "Dell Pro Wireless Headset",
    price: "₹11,999/-*",
    note: "INCL. ALL TAXES",
  },

];

/* =========================================================
   EXTENDED ACCESSORIES
========================================================= */

const extendedAccessories = [
  ...accessories,
  ...accessories,
  ...accessories,
];

/* =========================================================
   PRODUCTS COMPONENT
========================================================= */

const Products = () => {
  const [accessoryIndex, setAccessoryIndex] = useState(0);
  const [accessoryStep, setAccessoryStep] = useState(0);

  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef(null);
  const accessoryTrackRef = useRef(null);
  const autoSlideInterval = useRef(null);

  /* =========================================================
     HERO CONTROLS
  ========================================================= */

  const goNext = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setVideoLoaded(false);
    setVideoError(false);
    setIsPlaying(true);
  };

  const goPrevious = () => {
    setDirection(-1);
    setActiveSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
    setVideoLoaded(false);
    setVideoError(false);
    setIsPlaying(true);
  };

  const goToSlide = (index) => {
    if (index === activeSlide) return;

    setDirection(index > activeSlide ? 1 : -1);
    setActiveSlide(index);
    setVideoLoaded(false);
    setVideoError(false);
    setIsPlaying(true);
  };

  /* =========================================================
     HERO AUTO SLIDER
  ========================================================= */

  useEffect(() => {
    autoSlideInterval.current = setInterval(() => {
      if (!isPaused) {
        goNext();
      }
    }, 6000);

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [isPaused, activeSlide]);

  /* =========================================================
     VIDEO PLAY
  ========================================================= */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = 0;

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    playVideo();
  }, [activeSlide]);

  /* =========================================================
     VIDEO TOGGLE
  ========================================================= */

  const togglePlay = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  /* =========================================================
     VIDEO EVENTS
  ========================================================= */

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  /* =========================================================
     TAB VISIBILITY
  ========================================================= */

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        videoRef.current?.pause();
      } else if (isPlaying) {
        videoRef.current?.play().catch(() => {});
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [isPlaying]);

  /* =========================================================
     ACCESSORY WIDTH
  ========================================================= */

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

  /* =========================================================
     ACCESSORY CONTROLS
  ========================================================= */

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

  /* =========================================================
     KEYBOARD CONTROLS
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrevious();
      }

      if (event.key === " ") {
        event.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const currentSlide = slides[activeSlide];

  return (
    <main className="page">

      {/* =====================================================
          1. HERO
      ===================================================== */}

      <section className="hero" id="home">

        <AnimatePresence
          initial={false}
          custom={direction}
          mode="sync"
        >

          <motion.div
            key={activeSlide}
            className="hero-slide"

            initial={{
              opacity: 0,
              scale: 1.04,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              scale: 1.02,
            }}

            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="video-wrapper">

              {!videoLoaded && !videoError && (
                <div className="video-loader">
                  <div className="loader-ring" />
                </div>
              )}

              {videoError ? (
                <div className="hero-video fallback-image" />
              ) : (
                <video
                  ref={videoRef}
                  className="hero-video"
                  src={currentSlide.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedData={handleVideoLoaded}
                  onError={handleVideoError}
                />
              )}

            </div>

            <div className="hero-overlay" />
            <div className="hero-overlay-bottom" />

            <div className="hero-text">

              <span className="hero-label">
                {currentSlide.label}
              </span>

              <h1>
                {currentSlide.title
                  .split("\n")
                  .map((line, index) => (
                    <span key={index}>
                      {line}

                      {index <
                        currentSlide.title.split("\n").length -
                          1 && <br />}
                    </span>
                  ))}
              </h1>

              <p>
                {currentSlide.description}
              </p>

              <button className="know-more">
                KNOW MORE
                <ArrowRight size={16} />
              </button>

            </div>

            <div className="price-badge">

              <span>STARTING FROM</span>

              <strong>
                {currentSlide.price}
              </strong>

              <small>
                INCL. ALL TAXES
              </small>

            </div>

            <button
              className="video-control"
              onClick={togglePlay}
              aria-label={
                isPlaying
                  ? "Pause video"
                  : "Play video"
              }
            >
              {isPlaying ? (
                <Pause size={16} />
              ) : (
                <Play size={16} />
              )}
            </button>

          </motion.div>

        </AnimatePresence>

        <div className="hero-controls">

          <button
            className="custom-slider-btn"
            onClick={goPrevious}
            aria-label="Previous slide"
          />

          <div className="hero-dots">

            {slides.map((_, index) => (
              <button
                key={index}
                className={
                  activeSlide === index
                    ? "active"
                    : ""
                }
                onClick={() =>
                  goToSlide(index)
                }
                aria-label={`Go to slide ${
                  index + 1
                }`}
              />
            ))}

          </div>

          <button
            className="custom-slider-btn"
            onClick={goNext}
            aria-label="Next slide"
          />

        </div>

        <div className="scroll-text">
          SCROLL TO EXPLORE
        </div>

      </section>


      {/* =====================================================
          2. SPECIAL OFFER
      ===================================================== */}

      <section className="special-offer-section">

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
            amount: 0.2,
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

              <del>
                ₹1,39,999/-*
              </del>

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
            amount: 0.2,
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


      {/* =====================================================
          3. DELL ALIENWARE HERO
      ===================================================== */}

      <section
        className="alienware-hero"
        id="offers"
      >

        <div className="alienware-bg" />
        <div className="alienware-overlay" />

        <div className="alienware-content">

          {/* =================================================
              ALIENWARE LAPTOP
          ================================================= */}

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
              scale: 1,
            }}

            viewport={{
              once: true,
              amount: 0.25,
            }}

            transition={{
              duration: 1.35,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="alienware-laptop-wrap">

              <div className="alienware-image-glow" />

              <img
                src= {slide5}
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

                <span>
                  Secure and reliable
                </span>

              </motion.div>

            </div>

          </motion.div>


          {/*ALIENWARE CONTEN*/}

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
              amount: 0.25,
            }}

            transition={{
              duration: 1,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <span className="small-heading">
              MORE DEALS
            </span>

            <h2>
              Dell
              <strong>
                Alienware
              </strong>
            </h2>

            <p>
              Experience ultimate gaming
              performance with Alienware
              desktops and laptops. Power
              your passion with cutting-edge
              technology.
            </p>

            <div className="alienware-price">

              <del>
                ₹1,99,999/-*
              </del>

              <strong>
                ₹1,49,999/-*
              </strong>

            </div>

            <button className="dark-button">
              SHOP NOW
              <ArrowRight size={15} />
            </button>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          4. ACCESSORIES
      ===================================================== */}

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

                      <h3>
                        {item.title}
                      </h3>

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

                      <button className="accessory-btn">

                        ADD TO CART

                        <ArrowRight
                          size={14}
                        />

                      </button>

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


      {/* =====================================================
          5. INTRO
      ===================================================== */}

      <section className="intro-section">

        <div className="intro-background" />
        <div className="intro-overlay" />
        <div className="intro-overlay-bottom" />

        <div className="intro-content">

          <span className="small-heading">
            DELL TECHNOLOGIES
          </span>

          <h2>
            Technology that
            <span>
              {" "}moves you forward.
            </span>
          </h2>

          <p>
            From everyday productivity to
            extraordinary performance, discover
            technology designed around the way
            you live, work and create.
          </p>

        </div>

      </section>

      <div className="white-section">

      </div>


      {/* =====================================================
          6. XPS
      ===================================================== */}

      <motion.section
        className="xps-section"
        id="products"

        initial={{
          opacity: 0,
          y: 45,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        viewport={{
          once: true,
          amount: 0.18,
        }}

        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >

        <div className="xps-background-glow" />

        <motion.div
          className="xps-copy"

          initial={{
            opacity: 0,
            x: -45,
          }}

          whileInView={{
            opacity: 1,
            x: 0,
          }}

          viewport={{
            once: true,
            amount: 0.25,
          }}

          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <span className="small-heading">
            XPS SERIES
          </span>

          <h2>
            Designed to
            <span> impress.</span>
          </h2>

          <p>
            The new XPS combines powerful
            performance, breathtaking displays
            and premium materials into one
            beautifully engineered machine.
          </p>

          <div className="xps-price">

            <span>
              Starting from
            </span>

            <strong>
              ₹1,49,999/-*
            </strong>

          </div>

          <button className="dark-button">
            EXPLORE XPS
            <ArrowRight size={15} />
          </button>

        </motion.div>


        <motion.div
          className="xps-price-badge"

          initial={{
            opacity: 0,
            scale: 0.75,
          }}

          whileInView={{
            opacity: 1,
            scale: 1,
          }}

          viewport={{
            once: true,
            amount: 0.25,
          }}

          transition={{
            duration: 0.8,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <span>
            STARTING FROM
          </span>

          <strong>
            ₹1,49,999/-*
          </strong>

          <small>
            INCL. ALL TAXES
          </small>

        </motion.div>

      </motion.section>


      {/* =====================================================
          7. CENTER SLIDER
      ===================================================== */}

      <div className="white-section"></div>
        <CenterSlider />

    </main>
  );
};

export default Products;