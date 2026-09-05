
import { motion } from "framer-motion";

import "./products.css";

import CenterSlider from "../activesliderfeature/CenterSlider";
import HeroSection from "../herosection/HeroSection";
import OfferSection from "../offersection/OfferSection";
import Alienware from "../alienware/Alienware";
import Accessories from "../accessories/Accessories";
import IntroSection from "../introsection/IntroSection";
import XpsSection from "../xpssection/XpsSection";

const Products = () => {
  return (
    <main className="page">

      {/*  HERO  */}
      <HeroSection />

      {/* SPECIAL OFFER */}
      <OfferSection />

      {/* ALIENWARE */}
      <Alienware />

      {/* ACCESSORIES */}
      <Accessories />

      {/* XPS */}
      <XpsSection />

      {/* WHITE SPACE */}
      <section className="white-section" />

      {/* About-Product */}

      <IntroSection />
      {/* WHITE SPACE */}
      <section className="white-section" />

      {/* CENTER SLIDER */}
      <CenterSlider />

    </main>
  );
};

export default Products;

