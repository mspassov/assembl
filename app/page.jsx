"use client";
import React from "react";
import { useState } from "react";
import { FaBolt } from "react-icons/fa6";
import IngredientForm from "@/components/IngredientForm";
import RecipeCard from "@/components/RecipeCard";
import generateRecipes from "./actions/generateRecipes";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const { data: sessionData } = useSession();

  const [ingredientList, setIngredientList] = useState([]);
  const [recipeArr, setRecipeArr] = useState([]);

  const handleClick = async () => {
    const res = await generateRecipes(ingredientList, sessionData);
    localStorage.setItem(`${res.id}`, JSON.stringify(res));
    setRecipeArr((prev) => [res, ...prev]);
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

      {!sessionData && (
        <p className="login-toast">Log in to save your recipes!</p>
      )}

      <div className="recipe-container">
        {recipeArr &&
          recipeArr.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
      </div>
    </section>
  );
};

export default HomePage;
