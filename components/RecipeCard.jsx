import React, { useState } from "react";
import Image from "next/image";
import "@/assets/recipeCard.css";
import { FaRegClock } from "react-icons/fa6";

const RecipeCard = ({ recipe }) => {
  const {
    recipeTitle,
    description,
    cookTime,
    allIngredients,
    instructions,
    difficulty,
    imgURL,
  } = recipe;

  let difficultyColour = "#62cb62";
  if (difficulty == "Medium") {
    difficultyColour = "#f8fd76";
  } else if (difficulty == "Hard") {
    difficultyColour = "#e97c7c";
  }

  return (
    <div className="recipe-card">
      <div className="img-container">
        <Image
          alt={recipeTitle}
          src={imgURL}
          height={300}
          width={500}
          className="recipeImg"
        />
      </div>
      <div className="recipe-details">
        <h3>{recipeTitle}</h3>
        <div className="attributes-container">
          <div className="cooktime">
            <FaRegClock />
            <span>{cookTime} minutes</span>
          </div>
          <div
            className="difficulty"
            style={{ backgroundColor: difficultyColour }}
          >
            {difficulty}
          </div>
        </div>
        <p className="description">{description}</p>
        <p className="ingredients">
          <strong>Number of Ingredients:</strong> {allIngredients.length}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
