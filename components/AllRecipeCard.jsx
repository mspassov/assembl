import React from "react";
import Image from "next/image";
import "@/assets/allRecipeCard.css";
import { FaRegClock } from "react-icons/fa6";

const AllRecipeCard = ({ recipe }) => {
  let difficultyColour = "#62cb62";
  if (recipe.difficulty == "Medium") {
    difficultyColour = "#f8fd76";
  } else if (recipe.difficulty == "Hard") {
    difficultyColour = "#e97c7c";
  }

  return (
    <div className="all-recipe-card">
      <Image
        src={recipe.imgURL}
        alt={recipe.recipeTitle}
        height={100}
        width={150}
        className="all-recipe-card-img"
      />
      <div className="all-recipe-card-content">
        <p className="title">
          <strong>{recipe.recipeTitle}</strong>
        </p>
        <div className="recipe-badges">
          <div className="time">
            <FaRegClock />
            <span>{recipe.cookTime} minutes</span>
          </div>
          <div
            className="difficulty"
            style={{ backgroundColor: difficultyColour }}
          >
            {recipe.difficulty}
          </div>
        </div>
        <p className="num-ingredients">
          Number of Ingredients: {recipe.allIngredients.length}
        </p>
        <p className="submission">
          <i>Author: </i>
          {recipe.author.username}
        </p>
      </div>
    </div>
  );
};

export default AllRecipeCard;
