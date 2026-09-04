
import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* =========================
          FOOTER TOP
      ========================= */}

      <div className="footer-top">

        {/* BRAND */}
        <div className="footer-brand-section">

          <div className="footer-brand">
            DELL Technologies
          </div>

          <p className="footer-tagline">
            Powering the future of technology
          </p>

          <p className="footer-description">
            Technology solutions designed to help people and organizations
            achieve more through intelligent, scalable and sustainable
            innovation.
          </p>

          <div className="footer-social">

            <a href="#" aria-label="Facebook" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a href="#" aria-label="Twitter" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a href="#" aria-label="Instagram" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.333.014 8.741 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>

            <a href="#" aria-label="YouTube" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            <a href="#" aria-label="LinkedIn" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

          </div>

        </div>


        {/* =========================
            PRODUCTS
        ========================= */}

        <div className="footer-links-section">

          <div className="footer-links-column">

            <h4>Products</h4>

            <a href="#products">Laptops</a>
            <a href="#products">2-in-1 PCs</a>
            <a href="#products">Desktops</a>
            <a href="#products">Workstations</a>
            <a href="#products">Monitors</a>
            <a href="#products">Gaming PCs</a>
            <a href="#accessories">Accessories</a>
            <a href="#products">PC Components</a>

          </div>


          {/* =========================
              SOLUTIONS
          ========================= */}

          <div className="footer-links-column">

            <h4>Solutions</h4>

            <a href="#">For Business</a>
            <a href="#">For Small Business</a>
            <a href="#">For Education</a>
            <a href="#">For Healthcare</a>
            <a href="#">For Government</a>
            <a href="#">Cloud Solutions</a>
            <a href="#">Data Center</a>
            <a href="#">AI &amp; Analytics</a>

          </div>


          {/* =========================
              SUPPORT
          ========================= */}

          <div className="footer-links-column">

            <h4>Support</h4>

            <a href="#">Support Home</a>
            <a href="#">Product Support</a>
            <a href="#">Drivers &amp; Downloads</a>
            <a href="#">Warranty &amp; Contracts</a>
            <a href="#">Order Support</a>
            <a href="#">Returns &amp; Refunds</a>
            <a href="#">Contact Technical Support</a>
            <a href="#">Community Forums</a>

          </div>


          {/* =========================
              COMPANY
          ========================= */}

          <div className="footer-links-column">

            <h4>Company</h4>

            <a href="#">About Us</a>
            <a href="#">Leadership</a>
            <a href="#">Careers</a>
            <a href="#">Newsroom</a>
            <a href="#">Investor Relations</a>
            <a href="#">Corporate Responsibility</a>
            <a href="#">Sustainability</a>
            <a href="#">Partner Program</a>

          </div>


          {/* =========================
              CONTACT
          ========================= */}

          <div className="footer-links-column">

            <h4>Contact Us</h4>

            <div className="footer-contact-item">

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>

              <span>+1 800 555 0199</span>

            </div>


            <div className="footer-contact-item">

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>

              <span>support@dell.com</span>

            </div>


            <div className="footer-contact-item">

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>

              <span>
                1 Dell Way,
                <br />
                Round Rock, TX
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          NEWSLETTER / CTA
      ========================= */}

      <div className="footer-newsletter">

        <div className="newsletter-content">

          <h3>
            Stay connected with Dell Technologies
          </h3>

          <p>
            Get the latest product announcements, technology insights,
            special offers and more delivered to your inbox.
          </p>

        </div>

        <button className="newsletter-btn">
          Sign Up
          <span>→</span>
        </button>

      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================= */}

      <div className="footer-bottom">

        <div className="footer-bottom-left">

          <p>
            © 2026 Dell Technologies. All rights reserved.
          </p>

        </div>


        <div className="footer-bottom-right">

          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Accessibility</a>
          <a href="#">Legal</a>
          <a href="#">Cookies</a>
          <a href="#">Sitemap</a>

        </div>

      </div>

    </footer>
  );
};

export default Footer;

