import React from "react";

//CSS Imports
import "@/assets/globals.css";
import { Poppins } from "next/font/google";

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

const MainLayout = ({ children }) => {
  return (
    <html className={`${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
};

export default MainLayout;
