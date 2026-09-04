import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import lapvideo from "../../assets/project-lap-4.mp4";
import lapvideo2 from "../../assets/project-lap.mp4";
import lapvideo3 from "../../assets/project-lap-3.mp4";

import lap13 from "../../assets/lap-13.jpg";
import headphone from "../../assets/headphone.jpg";
import keyboard from "../../assets/keyboard.jpg";
import mouse from "../../assets/mouse.jpg";
import jbl from "../../assets/jbl.jpg";
import lapp from "../../assets/lap-raichu.jpg";
import premiumlap from "../../assets/dell-premium.jpg";

import {
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

import "./products.css";
import CenterSlider from "../activesliderfeature/CenterSlider";

const slides = [
  {
    video: lapvideo,
    poster: lap13,
    label: "NEW XPS",
    title: "Power meets\nprecision.",
    description:
      "Engineered for those who demand uncompromising performance and premium design.",
    price: "₹1,49,999/-*",
  },
  {
    video: lapvideo2,
    poster: premiumlap,
    label: "DELL PREMIUM",
    title: "Built for\nwhat's next.",
    description:
      "Experience next-generation performance wrapped in an elegant, refined design.",
    price: "₹1,29,999/-*",
  },
  {
    video: lapvideo3,
    poster: lapp,
    label: "ULTIMATE PERFORMANCE",
    title: "Create without\nlimits.",
    description:
      "Powerful hardware designed to keep up with your biggest ideas.",
    price: "₹1,19,999/-*",
  },
];

const accessories = [
  {
    image: headphone,
    title: "Premium Headphones",
    price: "₹7,999/-*",
  },
  {
    image: keyboard,
    title: "Wireless Keyboard",
    price: "₹4,999/-*",
  },
  {
    image: mouse,
    title: "Precision Mouse",
    price: "₹2,999/-*",
  },
  {
    image: jbl,
    title: "JBL Speaker",
    price: "₹9,999/-*",
  },
];

const extendedAccessories = [
  ...accessories,
  ...accessories,
];

const Products = () => {
  const [accessoryIndex, setAccessoryIndex] = useState(0);
  const [accessoryStep, setAccessoryStep] = useState(0);

  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef(null);
  const accessoryTrackRef = useRef(null);
  
  const autoSlideInterval = useRef(null);

  /* ================= HERO SLIDER ================= */

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

  /* ================= AUTO SLIDE ================= */

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

  /* ================= VIDEO ================= */

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

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  /* ================= VISIBILITY ================= */

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        videoRef.current?.pause();
      } else if (isPlaying) {
        videoRef.current?.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [isPlaying]);

  /* ================= ACCESSORY SLIDER ================= */
/* ================= ACCESSORY SLIDER ================= */

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

  /* ================= SCROLL ================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = [
        "products",
        "accessories",
        "offers",
      ];

      let current = "home";

      sections.forEach((id) => {
        const element = document.getElementById(id);

        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.top <= window.innerHeight * 0.35) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ================= KEYBOARD ================= */

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

    window.addEventListener("keydown", handleKeyDown);

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

      {/* ================= HERO ================= */}

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
                  <div className="loader-ring"></div>
                </div>
              )}

              {videoError ? (
                <img
                  src={currentSlide.poster}
                  alt={currentSlide.title}
                  className="hero-video fallback-image"
                />
              ) : (
                <video
                  ref={videoRef}
                  className="hero-video"
                  src={currentSlide.video}
                  poster={currentSlide.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedData={handleVideoLoaded}
                  onError={handleVideoError}
                />
              )}

            </div>

            <div className="hero-overlay"></div>
            <div className="hero-overlay-bottom"></div>

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
                        currentSlide.title.split("\n")
                          .length -
                          1 && <br />}
                    </span>
                  ))}
              </h1>

              <p>{currentSlide.description}</p>

              <button className="know-more">
                KNOW MORE
                <ArrowRight size={16} />
              </button>

            </div>

            {/* PRICE BADGE */}

            <div className="price-badge">

              <span>STARTING FROM</span>

              <strong>{currentSlide.price}</strong>

              <small>
                INCL. ALL TAXES
              </small>

            </div>

            {/* VIDEO CONTROL */}

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

        {/* HERO CONTROLS */}

        <div className="hero-controls">

          <button
            onClick={goPrevious}
            aria-label="Previous slide"
          >
            <ArrowLeft size={18} />
          </button>

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
            onClick={goNext}
            aria-label="Next slide"
          >
            <ArrowRight size={18} />
          </button>

        </div>

        <div className="scroll-text">
          SCROLL TO EXPLORE
        </div>

      </section>

      {/* ================= INTRO ================= */}

      <section className="intro-section">

        <span className="small-heading">
          DELL TECHNOLOGIES
        </span>

        <h2>
          Technology that
          <span> moves you forward.</span>
        </h2>

        <p>
          From everyday productivity to extraordinary
          performance, discover technology designed
          around the way you live, work and create.
        </p>

      </section>

      {/* ================= XPS ================= */}

      <section
        className="xps-section"
        id="products"
      >

        <div className="xps-copy">

          <span className="small-heading">
            XPS SERIES
          </span>

          <h2>
            Designed to
            <span> impress.</span>
          </h2>

          <p>
            The new XPS combines powerful performance,
            breathtaking displays and premium materials
            into one beautifully engineered machine.
          </p>

          <div className="xps-price">

            <span>Starting from</span>

            <strong>
              ₹1,49,999/-*
            </strong>

          </div>

          <button className="dark-button">
            EXPLORE XPS
            <ArrowRight size={15} />
          </button>

        </div>

        <motion.div
          className="xps-product"
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
            amount: 0.3,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <img
            src={lap13}
            alt="Dell XPS laptop"
          />

        </motion.div>

      </section>

      {/* ================= ACCESSORIES ================= */}

      <section
        className="accessories-section"
        id="accessories"
      >

        <div className="accessories-header">

          <div>

            <span className="small-heading">
              ACCESSORIES
            </span>

            <h2>
              Complete your
              <span> setup.</span>
            </h2>

          </div>

          <div className="accessory-controls">

            <button
              onClick={previousAccessory}
              aria-label="Previous accessories"
            >
              <ArrowLeft size={17} />
            </button>

            <button
              onClick={nextAccessory}
              aria-label="Next accessories"
            >
              <ArrowRight size={17} />
            </button>

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
                  <div
                    className="accessory-slide"
                    key={`${item.title}-${index}`}
                  >

                    <div className="accessory-image">

                      <img
                        src={item.image}
                        alt={item.title}
                      />

                    </div>

                    <div className="accessory-info">

                      <h3>{item.title}</h3>

                      <strong>
                        {item.price}
                      </strong>

                    </div>

                  </div>
                )
              )}

            </motion.div>

          </div>

        </div>

      </section>

      {/* ================= SPECIAL OFFER ================= */}

      <section className="special-offer-section">

        <div className="special-offer-content">

          <span className="small-heading">
            SPECIAL OFFER
          </span>

          <h2>
            Work smarter.
            <span> Live better.</span>
          </h2>

          <p>
            Upgrade your everyday experience with
            powerful Dell technology built for modern
            life.
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

        </div>

        <motion.div
          className="special-offer-image"
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
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <img
            src={premiumlap}
            alt="Dell premium laptop"
          />

        </motion.div>

      </section>

      {/* ================= CENTER SLIDER ================= */}

      <CenterSlider />

      {/* ================= ALIENWARE ================= */}

      <section
        className="offer-section"
        id="offers"
      >

        <div className="offer-copy">

          <span className="small-heading">
            MORE DEALS
          </span>

          <h2>
            Dell <strong>Alienware</strong>
          </h2>

          <p>
            Experience ultimate gaming performance
            with Alienware desktops and laptops.
            Power your passion with cutting-edge
            technology.
          </p>

          <div className="offer-price">

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

        </div>

        <motion.div
          className="headphone-image"
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
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <img
            src={headphone}
            alt="Alienware"
          />

        </motion.div>

      </section>

    </main>
  );
};

export default Products;