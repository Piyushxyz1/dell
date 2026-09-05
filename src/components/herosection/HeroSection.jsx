
import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowRight,
  Play,
  Pause,
} from "lucide-react";

import lapvideo from "../../assets/project-lap-4.mp4";
import lapvideo2 from "../../assets/project-lap.mp4";
import lapvideo3 from "../../assets/project-lap-3.mp4";


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

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef(null);
  const autoSlideInterval = useRef(null);

  /*
   * Keeps track of videos that have already been preloaded.
   * This prevents the loader from appearing every time
   * the user moves between already-loaded hero slides.
   */
  const preloadedVideos = useRef(new Set());

  /*
   * Preload the next hero video when the browser is idle.
   * This avoids loading all videos at the same time.
   */
  useEffect(() => {
    const preloadVideo = (videoSrc) => {
      if (
        !videoSrc ||
        preloadedVideos.current.has(videoSrc)
      ) {
        return;
      }

      const video = document.createElement("video");

      video.preload = "metadata";
      video.muted = true;
      video.playsInline = true;
      video.src = videoSrc;

      const markReady = () => {
        preloadedVideos.current.add(videoSrc);
      };

      video.addEventListener(
        "loadeddata",
        markReady,
        { once: true }
      );

      video.load();
    };

    const nextVideo =
      slides[(activeSlide + 1) % slides.length]?.video;

    let schedule;

    if (window.requestIdleCallback) {
      schedule = window.requestIdleCallback(
        () => preloadVideo(nextVideo),
        { timeout: 1200 }
      );
    } else {
      schedule = window.setTimeout(
        () => preloadVideo(nextVideo),
        500
      );
    }

    return () => {
      if (
        window.cancelIdleCallback &&
        typeof schedule === "number"
      ) {
        window.cancelIdleCallback(schedule);
      } else {
        window.clearTimeout(schedule);
      }
    };
  }, [activeSlide]);

  /*
   * Change hero slide.
   */
  const changeSlide = (
    nextIndex,
    nextDirection
  ) => {
    setDirection(nextDirection);
    setActiveSlide(nextIndex);

    setVideoError(false);
    setIsPlaying(true);

    /*
     * If the video has already been preloaded,
     * don't show the loader again.
     */
    if (
      preloadedVideos.current.has(
        slides[nextIndex].video
      )
    ) {
      setVideoLoaded(true);
    } else {
      setVideoLoaded(false);
    }
  };

  /*
   * Next slide.
   */
  const goNext = () => {
    const nextIndex =
      (activeSlide + 1) % slides.length;

    changeSlide(nextIndex, 1);
  };

  /*
   * Previous slide.
   */
  const goPrevious = () => {
    const nextIndex =
      (activeSlide - 1 + slides.length) %
      slides.length;

    changeSlide(nextIndex, -1);
  };

  /*
   * Go directly to a slide.
   */
  const goToSlide = (index) => {
    if (index === activeSlide) return;

    const nextDirection =
      index > activeSlide ? 1 : -1;

    changeSlide(index, nextDirection);
  };

  /*
   * Automatic hero slider.
   */
  useEffect(() => {
    autoSlideInterval.current =
      setInterval(() => {
        if (!isPaused) {
          setActiveSlide((prev) => {
            const nextIndex =
              (prev + 1) % slides.length;

            setDirection(1);
            setVideoError(false);
            setIsPlaying(true);

            if (
              preloadedVideos.current.has(
                slides[nextIndex].video
              )
            ) {
              setVideoLoaded(true);
            } else {
              setVideoLoaded(false);
            }

            return nextIndex;
          });
        }
      }, 6000);

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(
          autoSlideInterval.current
        );
      }
    };
  }, [isPaused]);

  /*
   * Play the newly active video.
   */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const playVideo = async () => {
      try {
        video.currentTime = 0;

        await video.play();

        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    /*
     * Give the browser a moment to attach
     * the new video source.
     */
    const timer = setTimeout(() => {
      playVideo();
    }, 50);

    return () => clearTimeout(timer);
  }, [activeSlide]);

  /*
   * Play / pause video.
   */
  const togglePlay = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();

        setIsPlaying(true);
        setIsPaused(false);
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();

      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  /*
   * Video loaded successfully.
   */
  const handleVideoLoaded = () => {
    const currentVideo =
      slides[activeSlide]?.video;

    preloadedVideos.current.add(
      currentVideo
    );

    setVideoLoaded(true);
    setVideoError(false);
  };

  /*
   * Video loading error.
   */
  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  /*
   * Pause hero video when browser tab
   * becomes hidden.
   */
  useEffect(() => {
    const handleVisibility = () => {
      const video = videoRef.current;

      if (!video) return;

      if (document.hidden) {
        video.pause();
      } else if (isPlaying) {
        video.play().catch(() => {});
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

  /*
   * Keyboard controls.
   */
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
  }, [activeSlide]);

  const currentSlide =
    slides[activeSlide];

  return (
    <section
      className="hero"
      id="home"
    >
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
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <div className="video-wrapper">

            {!videoLoaded &&
              !videoError && (
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
                preload="metadata"
                onLoadedData={
                  handleVideoLoaded
                }
                onCanPlay={
                  handleVideoLoaded
                }
                onError={
                  handleVideoError
                }
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
                      currentSlide.title.split(
                        "\n"
                      ).length -
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
            <span>
              STARTING FROM
            </span>

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
  );
};

export default HeroSection;
