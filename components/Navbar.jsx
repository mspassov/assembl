import React from "react";
import Image from "next/image";
import Link from "next/link";

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

            <div id="logo">
              <Link href="/" className="links">
                assembl.
              </Link>
            </div>
          </div>
          <ul className="link-container">
            <li>
              <Link href="/" className="links">
                Home
              </Link>
            </li>
            <li>
              <Link href="/recipes" className="links">
                Recipes
              </Link>
            </li>
            <li>
              <button className="btn log-in-btn">Log In</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
