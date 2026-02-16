import React from "react";

//CSS Imports
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/assets/globals.css";
import { Poppins, Gabarito } from "next/font/google";

export const metadata = {
  title: "assembl | Home",
  keywords: "AI, food, fridge, cooking, recipes",
  description:
    "Decide on your next meal by adding all of your ingredients in the fridge, and getting custom-made recipes",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const gabarito = Gabarito({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const MainLayout = ({ children }) => {
  return (
    <html className={`${poppins.variable} ${gabarito.variable}`}>
      <body className="page-wrapper">
        <div className="page-content">
          <Navbar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
