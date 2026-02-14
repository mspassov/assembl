"use client";
import React from "react";
import Ingredient from "./Ingredient";
import { useState } from "react";
import "@/assets/ingredientForm.css";
import { FaPlus } from "react-icons/fa6";

const IngredientForm = ({ ingredientList, setIngredientList }) => {
  const [ingredient, setIngredient] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    setIngredientList((prev) => [...ingredientList, ingredient]);
    setIngredient("");
  };

  const handleRemove = (text) => {
    setIngredientList((prev) => prev.filter((item) => item != text));
  };

  return (
    <div>
      <form className="ingredient-form" onSubmit={handleAdd}>
        <input
          type="text"
          maxLength={40}
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
            <Ingredient key={index} text={item} handleRemove={handleRemove} />
          ))}
      </div>
    </div>
  );
};

export default IngredientForm;
