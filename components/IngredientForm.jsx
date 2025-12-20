"use client";
import React from "react";
import Ingredient from "./Ingredient";
import { useState } from "react";
import "@/assets/ingredientForm.css";
import { FaPlus } from "react-icons/fa6";

const IngredientForm = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredient, setIngredient] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    setIngredientList((prev) => [ingredient, ...ingredientList]);
    setIngredient("");
  };

  return (
    <div>
      <form className="ingredient-form" onSubmit={handleAdd}>
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="What's in your kitchen?"
        />
        <button
          type="submit"
          disabled={ingredient.trim() == "" ? true : false}
          className="btn ingredient-submit"
        >
          <FaPlus /> <span>Add</span>
        </button>
      </form>

      <div className="ingredient-container">
        {ingredientList &&
          ingredientList.map((item, index) => (
            <Ingredient key={index} text={item} />
          ))}
      </div>
    </div>
  );
};

export default IngredientForm;
