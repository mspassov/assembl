"use client";
import React from "react";
import { DotLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <DotLoader
      color="#22577A"
      cssOverride={{ margin: "75px auto 0 auto", display: "block" }}
      size={80}
    />
  );
};

export default LoadingPage;
