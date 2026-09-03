import  { useState } from "react";
import "./navbar.css"
import {
  Menu,
  Search,
  ChevronDown,
  X,
 
} from "lucide-react";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <div className="nav-logo">
          DELL<span>TECHNOLOGIES</span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#accessories">Accessories</a>
          <a href="#offers">Offers</a>
        </div>

        {/* ACTIONS */}
        <div className="nav-actions">

          <button className="nav-icon-btn">
            <Search size={20} />
          </button>

      

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#products" onClick={() => setMenuOpen(false)}>
            Products
          </a>

          <a href="#accessories" onClick={() => setMenuOpen(false)}>
            Accessories
          </a>

          <a href="#offers" onClick={() => setMenuOpen(false)}>
            Offers
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;