"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/assets/allRecipeCard.css";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

const AllRecipeCard = ({ recipe }) => {
  const [saved, setSaved] = useState(false);

  let difficultyColour = "#62cb62";
  if (recipe.difficulty == "Medium") {
    difficultyColour = "#f8fd76";
  } else if (recipe.difficulty == "Hard") {
    difficultyColour = "#e97c7c";
  }

  const handleClick = () => {
    setSaved((prev) => !prev);
  };

  return (
    <Link href={`/recipes/${recipe._id}`} className="recipe-link" target="_blank">
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
            <i>Author: {recipe.author.username}</i>
          </p>
          <button onClick={handleClick} className="btn save-btn">
            {!saved ? <FaRegHeart /> : <FaHeart className="saved-heart" />}
            <span>Save</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default AllRecipeCard;
