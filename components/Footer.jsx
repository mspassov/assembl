import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container footer-container">
        <Link
          className="links source-container"
          href="https://github.com/mspassov/assembl"
          target="_blank"
        >
          <FaGithub /> <span>Source Code</span>
        </Link>
        <div>&copy; {year} Assembl Development. All rights reserved.</div>
        <ul className="contact-container">
          <li>
            <Link
              className="links"
              href="https://github.com/mspassov/assembl"
              target="_blank"
            >
              <FaLinkedin className="linkedin" />
            </Link>
          </li>
          <li>
            <Link
              href="https://mspassov.vercel.app/"
              target="_blank"
              className="links portfolio"
            >
              Portfolio
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
