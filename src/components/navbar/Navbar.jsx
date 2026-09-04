import { useState } from "react";
import "./navbar.css";
import {
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* ================= LOGO ================= */}
        <div className="nav-logo">
          DELL<span>TECHNOLOGIES</span>
        </div>

        {/* ================= DESKTOP LINKS ================= */}
        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#accessories">Accessories</a>
          <a href="#offers">Offers</a>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="nav-actions">

          {/* CIRCULAR TRUST LOGO */}
<button className="nav-circle-logo" aria-label="20 Years of Trust">
  <svg
    className="trust-ring"
    viewBox="0 0 100 100"
  >
    <defs>
      <path
        id="trustCirclePath"
        d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
      />
    </defs>

    <text className="trust-text">
      <textPath
        href="#trustCirclePath"
        startOffset="0%"
      >
        20 YEARS OF TRUST • EXCELLENCE • INNOVATION •
      </textPath>
    </text>
  </svg>

  <span className="trust-d">D</span>
</button>

          {/* MENU BUTTON */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="mobile-menu">

          <a
            href="#products"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </a>

          <a
            href="#accessories"
            onClick={() => setMenuOpen(false)}
          >
            Accessories
          </a>

          <a
            href="#offers"
            onClick={() => setMenuOpen(false)}
          >
            Offers
          </a>

        </div>
      )}
    </nav>
  );
};

export default Navbar;