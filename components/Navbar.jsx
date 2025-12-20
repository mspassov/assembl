import React from "react";
import Image from "next/image";

import logo from "@/assets/logo.png";
import "@/assets/nav.css";

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <div className="nav-container">
          <div className="logo-container">
            <Image
              src={logo}
              className="logo-img"
              alt="logo - created by Freepik"
            />

            <div id="logo">assembl.</div>
          </div>
          <ul className="link-container">
            <li>Home</li>
            <li>Recipes</li>
            <li>Log In</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
