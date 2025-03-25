"use client";

import React from "react";
import { FaPhone, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#37474f] to-[#263238] text-white py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left: Contact Info */}
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-2xl font-bold text-yellow-400">Cocomelon Kids</h2>
          <p className="text-sm">&quot;Where little minds grow, giggles flow&quot;</p> {/* ✅ Fixed this line */}

          {/* Address */}
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-yellow-400" />
            <a
              href="https://www.google.com/maps/dir//51-8,+57%2F2,+60+Feet+Road,+Nakkavanipalem,+Visakhapatnam,+Andhra+Pradesh+530013/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 underline"
            >
              51-8, 57/2, 60 Feet Road, Nakkavanipalem, Visakhapatnam 530013
            </a>
          </div>

          {/* Phone Numbers */}
          <div className="flex items-center gap-2">
            <FaPhone className="text-yellow-400" />
            <a href="tel:+916302164335" className="hover:text-yellow-400">+91 6302164335</a> | 
            <a href="tel:+917659011189" className="hover:text-yellow-400">+91 7659011189</a>
          </div>

          {/* Website */}
          <div className="flex items-center gap-2">
            <FaGlobe className="text-yellow-400" />
            <a
              href="https://www.cocomelonkids.online"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 underline"
            >
              www.cocomelonkids.online
            </a>
          </div>
        </div>

        {/* Right: Google Map */}
        <div className="w-full md:w-[400px] h-[250px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Cocomelon Kids Location"
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.086681494676!2d83.315809!3d17.7374971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a394365eaa49fdf%3A0xc211e410175c7bc8!2s51-8%2C%2057%2F2%2C%2060%20Feet%20Road%2C%20Nakkavanipalem%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20530013!5e0!3m2!1sen!2sin!4v1711365068947!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-300 text-sm mt-6">
        © {new Date().getFullYear()} Cocomelon Kids. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
