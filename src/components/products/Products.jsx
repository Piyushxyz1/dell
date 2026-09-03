import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import lapvideo from "../../assets/project-lap-4.mp4";
import lapvideo2 from "../../assets/project-lap.mp4";
import lapvideo3 from "../../assets/project-lap-3.mp4";
import lap13 from "../../assets/lap-13.jpg"
import headphone from "../../assets/headphone.jpg"
import keyboard from "../../assets/keyboard.jpg"
import mouse from "../../assets/mouse.jpg"
import jbl from "../../assets/jbl.jpg"
import lapp from "../../assets/lap-raichu.jpg"
import premiumlap from   "../../assets/dell-premium.jpg"


import {
  ArrowLeft,
  ArrowRight,
  Menu,
  Search,
  ChevronDown,
  X,
  Play,
  Pause,
  Headphones,
  ShoppingBag,
  Star,
  TrendingUp,
} from "lucide-react";

import "./products.css";


/* ================= HERO SLIDES ================= */

const slides = [
  {
    video: lapvideo,
    poster:
      "https://cdn.pixabay.com/video/2024/01/17/197386-900817962_preview.jpg",
    label: "DELL INSPIRON",
    title: "14 Plus",
    subtitle: "2-in-1 Laptop",
    description:
      "Sleek 14-inch 2-in-1 with on-device Copilot+ powered by Intel® Core™ Ultra processors, with stunning performance that powers the newest AI experiences.",
    price: "₹56,000",
  },

  {
    video: lapvideo2,
    poster:
      "https://cdn.pixabay.com/video/2023/07/18/172561-847587783_preview.jpg",
    label: "NEW",
    title: "New AI",
    subtitle: "experiences",
    description:
      "Experience intelligent performance and smarter ways to work with the newest AI experiences.",
    price: "₹56,000",
  },

  {
    video: lapvideo3,
    poster:
      "https://cdn.pixabay.com/video/2023/06/27/168978-838580119_preview.jpg",
    label: "DESIGNED WITH PURPOSE",
    title: "Built-in",
    subtitle: "sustainability",
    description:
      "Thoughtfully designed technology that delivers powerful performance while keeping sustainability in mind.",
    price: "₹56,000",
  },
];


/* ================= ACCESSORIES ================= */
const accessories = [
  {
    image: headphone,
    title: "Dell Wireless Headphones",
  },
  {
    image: premiumlap,
    title: "Dell Premium laptop",
  },
  {
    image: jbl,
    title: "jbl speaker",
  },
  {
    image: lapp,
    title: "Dell Laptop Dock",
  },
  {
    image: mouse,
    title: "Dell Wireless Mouse",
  },
  {
    image: keyboard,
    title: "Dell Mechanical Keyboard",
  },
];
/*
  Duplicate the array.

  This gives the carousel enough content
  to keep moving without ever showing empty space.
*/
const extendedAccessories = [
  ...accessories,
  ...accessories,
  ...accessories,
];


function Products() {

  /* ================= STATES ================= */

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


  /* ================= REFS ================= */

  const videoRef = useRef(null);
  const accessoryTrackRef = useRef(null);
  const isAccessoryResetting = useRef(false);
  const autoSlideInterval = useRef(null);


  /* ================= HERO SLIDER ================= */

  const goNext = () => {
    setDirection(1);

    setActiveSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };


  const goPrevious = () => {
    setDirection(-1);

    setActiveSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };


  const goToSlide = (index) => {
    if (index === activeSlide) return;

    setDirection(index > activeSlide ? 1 : -1);

    setActiveSlide(index);
  };


  /* ================= AUTO SLIDE ================= */

  const startAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
    autoSlideInterval.current = setInterval(() => {
      if (!isPaused) {
        goNext();
      }
    }, 6000);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    }
  };


  /* ================= VIDEO ================= */

  const playCurrentVideo = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      video.currentTime = 0;

      await video.play();

      setIsPlaying(true);
      setVideoLoaded(true);
      setVideoError(false);
    } catch (error) {
      console.log("Video playback failed:", error);
      setIsPlaying(false);
    }
  };


  const toggleVideo = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Play failed:", error);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };


  /* ================= VIDEO ON SLIDE CHANGE ================= */

  useEffect(() => {
    setVideoLoaded(false);
    setVideoError(false);
    setIsPlaying(true);

    const timer = setTimeout(() => {
      playCurrentVideo();
    }, 200);

    return () => clearTimeout(timer);
  }, [activeSlide]);


  /* ================= AUTO SLIDE CONTROL ================= */

  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, [activeSlide]);


  /* ================= ACCESSORY WIDTH ================= */

  useEffect(() => {

    const calculateAccessoryStep = () => {

      if (!accessoryTrackRef.current) return;

      const firstSlide =
        accessoryTrackRef.current.querySelector(
          ".accessory-slide"
        );

      if (!firstSlide) return;

      const slideWidth =
        firstSlide.getBoundingClientRect().width;

      const styles =
        window.getComputedStyle(
          accessoryTrackRef.current
        );

      const gap =
        parseFloat(styles.columnGap || styles.gap) || 0;

      setAccessoryStep(slideWidth + gap);
    };


    calculateAccessoryStep();

    window.addEventListener(
      "resize",
      calculateAccessoryStep
    );


    return () => {
      window.removeEventListener(
        "resize",
        calculateAccessoryStep
      );
    };

  }, []);


  /* ================= ACCESSORIES AUTO SLIDER ================= */

  useEffect(() => {

    if (!accessoryStep) return;


    const interval = setInterval(() => {

      setAccessoryIndex((current) => current + 1);

    }, 3000);


    return () => {
      clearInterval(interval);
    };

  }, [accessoryStep]);


  /* ================= ACCESSORIES RESET ================= */

  const handleAccessoryAnimationComplete = () => {

    /*
      Once the first original set has passed,
      silently jump back by the exact number
      of original items.

      User never sees an empty section.
    */

    if (accessoryIndex >= accessories.length) {

      isAccessoryResetting.current = true;

      setAccessoryIndex(
        (current) =>
          current - accessories.length
      );


      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          isAccessoryResetting.current = false;

        });

      });

    }
  };


  /* ================= SCROLL ================= */

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 50);

      const sections = [
        "home",
        "products",
        "accessories",
        "special-offer",
        "offers",
      ];

      const scrollPosition =
        window.scrollY + 150;


      for (const section of sections) {

        const element =
          document.getElementById(section);

        if (!element) continue;


        const top = element.offsetTop;

        const bottom =
          top + element.offsetHeight;


        if (
          scrollPosition >= top &&
          scrollPosition < bottom
        ) {

          setActiveSection(section);

          break;
        }
      }
    };


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);


  /* ================= KEYBOARD ================= */

  useEffect(() => {

    const handleKeyboard = (event) => {

      if (event.key === "ArrowRight") {
        event.preventDefault();
        stopAutoSlide();
        goNext();
        setTimeout(startAutoSlide, 3000);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        stopAutoSlide();
        goPrevious();
        setTimeout(startAutoSlide, 3000);
      }

      if (event.key === " ") {

        event.preventDefault();

        toggleVideo();
      }
    };


    window.addEventListener(
      "keydown",
      handleKeyboard
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };

  }, [activeSlide, isPlaying]);


  /* ================= VISIBILITY ================= */

  useEffect(() => {

    const handleVisibility = () => {

      const video = videoRef.current;

      if (!video) return;


      if (document.hidden) {

        video.pause();

        setIsPlaying(false);

      } else {

        playCurrentVideo();

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

  }, [activeSlide]);


  return (

    <main className="page">


     



      {/* ================= HERO ================= */}

      <section
        className="hero"
        id="home"
        onMouseEnter={() =>
          setIsPaused(true)
        }
        onMouseLeave={() =>
          setIsPaused(false)
        }
      >

        <AnimatePresence
          initial={false}
          custom={direction}
          mode="sync"
        >

          <motion.div
            key={activeSlide}
            className="hero-slide"
            custom={direction}

            initial={{
              x:
                direction === 1
                  ? "100%"
                  : "-100%",
              opacity: 0,
              scale: 1.02,
            }}

            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
            }}

            exit={{
              x:
                direction === 1
                  ? "-100%"
                  : "100%",
              opacity: 0,
              scale: 1.01,
            }}

            transition={{
              duration: 0.9,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >


            {/* VIDEO */}

            <div className="video-wrapper">

              <video
                key={
                  slides[activeSlide].video
                }
                ref={videoRef}
                className="hero-video"

                muted
                autoPlay
                loop
                playsInline
                preload="auto"

                poster={
                  slides[activeSlide].poster
                }

                onLoadedData={() => {
                  setVideoLoaded(true);
                }}

                onCanPlay={() => {
                  setVideoLoaded(true);
                }}

                onError={() => {

                  console.log(
                    "Video could not be loaded"
                  );

                  setVideoError(true);
                  setVideoLoaded(false);

                }}
              >

                <source
                  src={
                    slides[activeSlide].video
                  }
                  type="video/mp4"
                />

                Your browser does not support
                the video element.

              </video>


              {!videoLoaded &&
                !videoError && (
                  <div className="video-loader">
                    <div className="loader-spinner" />
                  </div>
                )}


              {videoError && (
                <div className="video-error">
                  <span>
                    Video unavailable
                  </span>
                </div>
              )}

            </div>



            {/* OVERLAYS */}

            <div className="hero-dark-gradient" />

            <div className="hero-blue-gradient" />



            {/* HERO TEXT */}

            <div className="hero-text">

              <motion.span
                className="hero-label"

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.2,
                  duration: 0.6,
                }}
              >
                {slides[activeSlide].label}
              </motion.span>


              <motion.h1

                initial={{
                  opacity: 0,
                  y: 35,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.3,
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >

                {slides[activeSlide].title}

                <br />

                <span>
                  {slides[activeSlide].subtitle}
                </span>

              </motion.h1>


              <motion.div
                className="hero-divider"

                initial={{
                  width: 0,
                }}

                animate={{
                  width: 100,
                }}

                transition={{
                  delay: 0.45,
                  duration: 0.6,
                }}
              />


              <motion.p

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.5,
                  duration: 0.7,
                }}
              >
                {slides[activeSlide].description}
              </motion.p>


              <motion.button
                className="know-more"

                initial={{
                  opacity: 0,
                  y: 15,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.6,
                  duration: 0.6,
                }}

                whileHover={{
                  scale: 1.03,
                }}

                whileTap={{
                  scale: 0.97,
                }}
              >

                KNOW MORE

                <ArrowRight size={15} />

              </motion.button>

            </div>



            {/* PRICE */}

            {slides[activeSlide].price && (

              <motion.div
                className="price-badge"

                initial={{
                  scale: 0.85,
                  opacity: 0,
                  y: 15,
                }}

                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.45,
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >

                <span className="price-title">Price</span>
                
                <span className="price-label">Starting from</span>

                <strong className="price-amount">
                  {slides[activeSlide].price}
                </strong>

                <small className="price-asterisk">*</small>

              </motion.div>

            )}

          </motion.div>

        </AnimatePresence>



        {/* VIDEO CONTROL - CENTERED */}

        <button
          className="video-control-btn"
          onClick={toggleVideo}
          aria-label={
            isPlaying
              ? "Pause video"
              : "Play video"
          }
        >

          {isPlaying ? (
            <Pause size={28} />
          ) : (
            <Play size={28} />
          )}

        </button>



        {/* HERO CONTROLS */}

        <div className="hero-controls">

          <button
            className="slide-arrow"
            onClick={() => {
              stopAutoSlide();
              goPrevious();
              setTimeout(startAutoSlide, 3000);
            }}
            aria-label="Previous slide"
          >
            <ArrowLeft size={24} />
          </button>


          <div className="slide-numbers">

            {slides.map((_, index) => (

              <button
                key={index}

                className={
                  activeSlide === index
                    ? "slide-dot active"
                    : "slide-dot"
                }

                onClick={() => {
                  stopAutoSlide();
                  goToSlide(index);
                  setTimeout(startAutoSlide, 3000);
                }}

                aria-label={`Go to slide ${
                  index + 1
                }`}
              />

            ))}

          </div>


          <button
            className="slide-arrow"
            onClick={() => {
              stopAutoSlide();
              goNext();
              setTimeout(startAutoSlide, 3000);
            }}
            aria-label="Next slide"
          >
            <ArrowRight size={24} />
          </button>

        </div>



        {/* SCROLL */}

        <div className="scroll-text">
          SCROLL TO EXPLORE
          <ChevronDown size={15} />
        </div>

      </section>



      {/* ================= INTRO ================= */}

      <section className="intro">

        <div className="intro-content">

          <span className="small-heading">
            EXPERIENCE MORE
          </span>

          <h2>
            Technology
            <br />
            <em>that moves.</em>
          </h2>

          <p>
            Discover a new generation of Dell
            devices designed around performance,
            intelligence and flexibility.
          </p>

        </div>

      </section>



      {/* ================= XPS ================= */}

      <section
        className="xps-section"
        id="products"
      >

        <div className="xps-copy">

          <span className="small-heading">
            DELL XPS
          </span>

          <h2>
            XPS
            <br />
            <strong>13</strong>
          </h2>

          <p>
            Meet the sleek and powerful XPS 13.
            Engineered for performance wherever
            your day takes you.
          </p>

          <div className="xps-price">

            <span>
              Starting at
            </span>

            <strong>
              ₹53,364
            </strong>

            <small>
              EMI starting at ₹2,224
            </small>

          </div>

          <button className="outline-button">

            KNOW MORE

            <ArrowRight size={15} />

          </button>

        </div>


        <motion.div
          className="xps-product"

          initial={{
            opacity: 0,
            x: 120,
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
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >

          <img
            src={lap13}
            alt="Dell XPS 13"
          />

        </motion.div>

      </section>



      {/* ================= ACCESSORIES ================= */}

     {/* ================= ACCESSORIES ================= */}

<section
  className="accessories-section"
  id="accessories"
>

  <div className="section-title">

    <span className="small-heading">
      COMPLETE YOUR SETUP
    </span>

    <h2>
      ACCESSORIES
    </h2>

  </div>


  <div className="accessories-carousel-wrapper">

    <button
      className="accessory-arrow accessory-arrow-left"
      onClick={() => {
        setAccessoryIndex((current) => 
          current > 0 ? current - 1 : accessories.length * 2 - 1
        );
      }}
      aria-label="Previous accessories"
    >
      <ArrowLeft size={24} />
    </button>

    <div className="accessories-carousel">

      <motion.div
        ref={accessoryTrackRef}
        className="accessories-track"

        animate={{
          x:
            -(accessoryIndex *
              accessoryStep),
        }}

        transition={
          isAccessoryResetting.current
            ? {
                duration: 0,
              }
            : {
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 1],
              }
        }

        onAnimationComplete={
          handleAccessoryAnimationComplete
        }
      >

        {extendedAccessories.map(
          (item, index) => (

            <div
              className="accessory-slide"
              key={`${item.title}-${index}`}
            >

              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />

              <div className="accessory-slide-overlay">
                <span className="accessory-slide-title">{item.title}</span>
              </div>

            </div>

          )
        )}

      </motion.div>

    </div>

    <button
      className="accessory-arrow accessory-arrow-right"
      onClick={() => {
        setAccessoryIndex((current) => current + 1);
      }}
      aria-label="Next accessories"
    >
      <ArrowRight size={24} />
    </button>

  </div>

</section>



      {/* ================= SPECIAL OFFER ================= */}

      <section
        className="special-offer-section"
        id="special-offer"
      >

        <motion.div
          className="special-offer-content"
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >

          <div className="special-offer-badge">
            <span className="small-heading">SPECIAL OFFER</span>
            <div className="offer-tag">LIMITED TIME</div>
          </div>

          <h2>
            JBL Tune <strong>770NC</strong>
          </h2>

          <p>
            Premium wireless noise-cancelling headphones with 
            crystal-clear audio, 70-hour battery life, and 
            ultra-comfortable design.
          </p>

          <div className="special-offer-features">
            <div className="feature-item">
              <Headphones size={20} />
              <span>Wireless ANC</span>
            </div>
            <div className="feature-item">
              <Star size={20} />
              <span>Premium Sound</span>
            </div>
            <div className="feature-item">
              <TrendingUp size={20} />
              <span>70hr Battery</span>
            </div>
          </div>

          <div className="special-offer-price">
            <div className="price-row">
              <span className="original-price">₹9,999/-*</span>
              <span className="discount-badge">80% OFF</span>
            </div>
            <div className="price-row">
              <span className="offer-price">₹1,999/-*</span>
            </div>
            <small>Limited time offer • While stocks last</small>
          </div>

          <button className="special-offer-button">
            <ShoppingBag size={18} />
            GRAB THIS OFFER
            <ArrowRight size={15} />
          </button>

        </motion.div>

        <motion.div
          className="special-offer-image"
          initial={{
            opacity: 0,
            x: 80,
            rotate: 5,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            rotate: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >

          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&h=700&fit=crop"
            alt="JBL Tune 770NC Headphones"
          />

          <div className="floating-badge">
            <span>Save ₹8,000</span>
          </div>

        </motion.div>

      </section>



      {/* ================= OFFER ================= */}

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
            Experience ultimate gaming performance with 
            Alienware desktops and laptops. Power your passion 
            with cutting-edge technology.
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
            x: 120,
            rotate: 8,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            rotate: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >

          <img
            src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=700&h=700&fit=crop"
            alt="Dell Alienware"
          />

        </motion.div>

      </section>




    </main>
  );
}


export default Products;