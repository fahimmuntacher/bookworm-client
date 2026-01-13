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
    <footer className="mt-20 bg-gradient-to-b from-slate-50 to-slate-100 border-t border-primary-200">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Logo />
            <span className="font-bold text-lg text-primary-700">BookWorm</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm">
            Your go-to platform for exploring and reading books online.
            Discover, learn, and enjoy your favorite books in one place.
          </p>

          <div className="flex gap-4 mt-6 text-lg text-slate-600">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, idx) => (
                <a
                  href="#"
                  key={idx}
                  className="hover:text-primary-600 transition-colors duration-200 hover:scale-110"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h3>
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
                  className="text-slate-600 hover:text-primary-600 transition-colors duration-200 font-medium"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Resources</h3>
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
                  className="text-slate-600 hover:text-primary-600 transition-colors duration-200 font-medium"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Subscribe</h3>
          <p className="text-slate-600 text-sm mb-4">
            Get the latest updates, tutorials, and book recommendations directly
            in your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-base flex-1"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-primary-200"></div>

      {/* Bottom Footer */}
      <div className="bg-slate-900 text-white text-center py-6 text-sm mt-0">
        &copy; {new Date().getFullYear()} BookWorm. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
