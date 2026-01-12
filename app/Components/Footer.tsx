"use client";

import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="mt-12 bg-blue-50 text-blue-900">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
         <span>
            <Logo></Logo>
         </span>
          <p className="text-blue-700 leading-relaxed text-sm mt-2.5">
            Your go-to platform for exploring and reading books online.
            Discover, learn, and enjoy your favorite books in one place.
          </p>

          <div className="flex gap-4 mt-4 text-base text-blue-800">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, idx) => (
                <a
                  href="#"
                  key={idx}
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Home",
              "Browse Books",
              "Tutorials",
              "About",
              "Contact",
              "FAQ",
              "Blog",
            ].map((link) => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase().replace(" ", "")}`}
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Help Center",
              "Community",
              "Guides",
              "Terms of Service",
              "Privacy Policy",
            ].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Subscribe</h3>
          <p className="text-blue-700 text-sm mb-3">
            Get the latest updates, tutorials, and book recommendations directly
            in your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-l-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            <button className="bg-blue-800 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-blue-100 text-blue-700 text-center py-4 text-sm mt-6">
        &copy; {new Date().getFullYear()} BookWorm. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
