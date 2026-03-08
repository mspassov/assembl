"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FaBolt } from "react-icons/fa6";
import IngredientForm from "@/components/IngredientForm";
import RecipeCard from "@/components/RecipeCard";
import generateRecipes from "./actions/generateRecipes";
import { useSession } from "next-auth/react";

import { DotLoader } from "react-spinners";

const HomePage = () => {
  const { data: sessionData } = useSession();

  const [ingredientList, setIngredientList] = useState([]);
  const [recipeArr, setRecipeArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const res = await generateRecipes(ingredientList, sessionData);
    localStorage.setItem(`${res.id}`, JSON.stringify(res));
    setRecipeArr((prev) => [res, ...prev]);
    setIsLoading(false);
  };

  return (
    <section className="container hero">
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

      {isLoading ? (
        <DotLoader
          color="#22577A"
          cssOverride={{ margin: "75px auto", display: "block" }}
          size={80}
        />
      ) : (
        <div className="recipe-container">
          {recipeArr &&
            recipeArr.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
        </div>
      )}
    </section>
  );
};

export default HomePage;
