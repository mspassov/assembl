"use client";
import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import logo from "@/assets/logo.png";
import profile from "@/assets/defaultProfile.png";
import SideProfile from "./SideProfile";
import "@/assets/nav.css";

const Navbar = () => {
  const [providers, setProviders] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  const { data: sessionData } = useSession();

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
            {sessionData && (
              <li>
                <Link href="/cookbook" className="links">
                  My Cookbook
                </Link>
              </li>
            )}
            <li>
              {!sessionData && (
                <div>
                  {providers &&
                    Object.values(providers).map((provider, index) => (
                      <button
                        onClick={() => signIn(provider.id)}
                        key={index}
                        className="btn log-in-btn"
                      >
                        Log In / Register
                      </button>
                    ))}
                </div>
              )}
              {sessionData && (
                <div className="account-details">
                  <Image
                    src={
                      sessionData?.user?.image
                        ? sessionData.user.image
                        : profile
                    }
                    className="profile-image"
                    alt="default profile image"
                    width={40}
                    height={40}
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  <button onClick={() => signOut()} className="btn log-out-btn">
                    Log Out
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      <SideProfile isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default Navbar;
