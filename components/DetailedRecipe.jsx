"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa6";
import { FaCarrot } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
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
    <section className="container-md detailed-recipe">
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
      <p className="description">{description}</p>

      <h3>
        <FaCarrot className="header-icon" /> <span>Ingredients:</span>
      </h3>

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

      <h3>
        <FaCircleCheck className="header-icon" />{" "}
        <span>Step by Step Instructions:</span>
      </h3>

      <ul className="instructions-list">
        {instructions.map((step, index) => (
          <li key={index} className="step">
            <strong>{index + 1}.</strong> {step}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DetailedRecipe;
