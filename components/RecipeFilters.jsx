"use client";
import React from "react";
import { FaBowlFood, FaSliders } from "react-icons/fa6";
import { useState } from "react";
import "@/assets/recipeFilters.css";
import { useRouter, useSearchParams } from "next/navigation";

const RecipeFilters = ({ currDifficulty, currCuisine }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleCuisine = (e) => {
    const cuisine = e.target.value;

    params.set("cuisine", cuisine);
    router.push(`/recipes?${params.toString()}`);
  };

  const handleDifficulty = (e) => {
    const difficulty = e.target.value;

    params.set("difficulty", difficulty);

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="all-recipe-filter">
      <div className="filter">
        <label htmlFor="cuisine">
          <FaBowlFood />
          <span>Cuisine</span>
        </label>
        <select
          className="recipe-select"
          name="cuisine"
          id="cuisine"
          value={currCuisine}
          onChange={handleCuisine}
        >
          <option value="All">All</option>
          <option value="American">American</option>
          <option value="Asian">Asian</option>
          <option value="Indian">Indian</option>
          <option value="French">French</option>
          <option value="Italian">Italian</option>
          <option value="Mediterranean">Mediterranean </option>
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
          value={currDifficulty}
          onChange={handleDifficulty}
        >
          <option value="All">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default RecipeFilters;
