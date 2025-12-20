import React from "react";
import { FaXmark } from "react-icons/fa6";
import "@/assets/ingredient.css";

const Ingredient = ({ text }) => {
  return (
    <div className="ingredient">
      <span>{text}</span> <FaXmark className="xmark"/>
    </div>
  );
};

export default Ingredient;
