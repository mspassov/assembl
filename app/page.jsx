"use client";
import React from "react";
import { useState } from "react";
import { FaBolt } from "react-icons/fa6";
import IngredientForm from "@/components/IngredientForm";
import generateRecipes from "./actions/generateRecipes";

const HomePage = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [recipe, setRecipe] = useState([]);

  const handleClick = async () => {
    const res = await generateRecipes(ingredientList);
    setRecipe((prev) => [res, ...prev]);
  };

  return (
    <section className="container">
      <h2>Add ingredients you already have, and get new recipes in seconds!</h2>
      <IngredientForm
        ingredientList={ingredientList}
        setIngredientList={setIngredientList}
      />

      <button
        className="btn generate-btn"
        disabled={ingredientList.length == 0 ? true : false}
        onClick={handleClick}
      >
        <FaBolt className="fa-bolt" />
        <span>Generate Recipes</span>
      </button>

      {recipe &&
        recipe.map((item, index) => (
          <div key={index}>
            <div>{item.recipeTitle}</div>
            <div>{item.cookTime}</div>
          </div>
        ))}
    </section>
  );
};

export default HomePage;
