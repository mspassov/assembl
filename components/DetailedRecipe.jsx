"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa6";
import Image from "next/image";
import "@/assets/detailedRecipe.css";

const DetailedRecipe = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(recipeId);
    setRecipe(JSON.parse(stored));
  }, [recipeId]);

  if (recipe == null) {
    return <p>Loading...</p>;
  }

  const {
    recipeTitle,
    description,
    cookTime,
    allIngredients,
    instructions,
    difficulty,
    imgURL,
    id,
  } = recipe;

  let difficultyColour = "#62cb62";
  if (difficulty == "Medium") {
    difficultyColour = "#f8fd76";
  } else if (difficulty == "Hard") {
    difficultyColour = "#e97c7c";
  }

  return (
    <section className="container detailed-recipe">
      <div className="recipe-image">
        <Image
          src={`${imgURL}`}
          alt={`${recipeTitle}`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <h2>{recipeTitle}</h2>
      <div className="attributes-container">
        <div className="cooktime">
          <FaRegClock /> <span>{cookTime} Minutes</span>
        </div>
        <div
          className="difficulty"
          style={{ backgroundColor: `${difficultyColour}` }}
        >
          {difficulty}
        </div>
      </div>
      <h3>Ingredients:</h3>
      <ul className="ingredient-list">
        {allIngredients.map((ing, index) => (
          <li className="ingredient" key={index}>
            <label className="ingredient-item">
              <input type="checkbox" />
              <span>{ing}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DetailedRecipe;
