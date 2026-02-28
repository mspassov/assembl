"use client";
import React from "react";
import "@/assets/sideProfile.css";
import { FaXmark } from "react-icons/fa6";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const SideProfile = ({ isOpen, setIsOpen }) => {
  const { data: sessionData } = useSession();
  console.log(sessionData);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key == "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <section className={`overlay ${isOpen ? "show" : ""}`}>
      <div className={`side-profile ${isOpen ? "open" : ""}`}>
        <FaXmark className="close-x" onClick={() => setIsOpen(false)} />
        <h2>Account</h2>
        <p>Username: {sessionData?.user?.name}</p>
        <p>Email: {sessionData?.user?.email}</p>
      </div>
    </section>
  );
};

export default SideProfile;
