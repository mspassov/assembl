import React from "react";
import { FaXmark } from "react-icons/fa6";
import "@/assets/ingredient.css";

const Ingredient = ({ text, handleRemove }) => {
  return (
    <div className="ingredient">
      <span>{text}</span>{" "}
      <FaXmark className="xmark" onClick={() => handleRemove(text)} />
    </div>
  );
};

export default Ingredient;
