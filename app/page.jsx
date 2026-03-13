"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FaBolt, FaBowlFood, FaSliders } from "react-icons/fa6";
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
  const [cuisine, setCuisine] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const handleClick = async () => {
    setIsLoading(true);
    const res = await generateRecipes(
      ingredientList,
      cuisine,
      difficulty,
      sessionData,
    );
    localStorage.setItem(`${res.id}`, JSON.stringify(res));
    setRecipeArr((prev) => [res, ...prev]);
    setIsLoading(false);
  };

  const handleCuisine = (e) => {
    setCuisine(e.target.value);
  };

  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <section className="container hero">
      <h2>Add ingredients you already have, and get new recipes in seconds!</h2>
      <IngredientForm
        ingredientList={ingredientList}
        setIngredientList={setIngredientList}
      />

      <div className="recipe-filter">
        <div className="filter">
          <label htmlFor="cuisine">
            <FaBowlFood />
            <span>Cuisine</span>
          </label>
          <select
            className="recipe-select"
            name="cuisine"
            id="cuisine"
            value={cuisine}
            onChange={handleCuisine}
          >
            <option value="All">All</option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="Indian">Indian</option>
            <option value="French">French</option>
            <option value="Italian">Italian</option>
            <option value="Mediterranean ">Mediterranean </option>
          </select>
        </div>

        <div className="filter">
          <label htmlFor="difficulty">
            <FaSliders />
            <span>Difficulty</span>
          </label>
          <select
            className="recipe-select"
            name="difficulty"
            id="difficulty"
            value={difficulty}
            onChange={handleDifficulty}
          >
            <option value="All">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

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
