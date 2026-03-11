"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaRegClock } from "react-icons/fa6";
import { FaCarrot } from "react-icons/fa6";
import { FaCircleCheck, FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaFireFlameCurved } from "react-icons/fa6";
import Image from "next/image";
import { toast } from "react-toastify";
import bookmarkRecipe from "@/app/actions/bookmarkRecipe";
import "@/assets/detailedRecipe.css";

const DetailedRecipe = ({ recipeId, savedRecipe }) => {
  const [recipe, setRecipe] = useState(null);
  const [saved, setSaved] = useState(false);
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (!savedRecipe) {
      const stored = localStorage.getItem(recipeId);
      setRecipe(JSON.parse(stored));
    } else {
      setRecipe(savedRecipe);
    }
  }, [recipeId, savedRecipe]);

  if (recipe == null) {
    return (
      <div className="container-md">
        <p>Loading...</p>
      </div>
    );
  }

  const {
    recipeTitle,
    description,
    cookTime,
    allIngredients,
    instructions,
    difficulty,
    imgURL,
    calories,
    id,
  } = recipe;

  let difficultyColour = "#62cb62";
  if (difficulty == "Medium") {
    difficultyColour = "#f8fd76";
  } else if (difficulty == "Hard") {
    difficultyColour = "#e97c7c";
  }

  const handleSave = async () => {
    if (sessionData) {
      const res = await bookmarkRecipe(recipe._id, sessionData.user.id);
      setSaved((prev) => !prev);

      if (!saved) {
        toast.success("Recipe has been saved to your cookbook!", {
          autoClose: 4000,
          theme: "colored",
        });
      }

      if (saved) {
        toast.success("Recipe has been removed from your cookbook!", {
          autoClose: 4000,
          theme: "colored",
        });
      }
    } else {
      toast.error("Please login to save recipes!", {
        autoClose: 4000,
        theme: "colored",
      });
    }
  };

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
      <div className="recipe-content">
        <h2>
          {recipeTitle}{" "}
          <button onClick={handleSave} className="btn save-btn">
            {!saved ? <FaRegHeart /> : <FaHeart className="saved-heart" />}
            <span>Save</span>
          </button>
        </h2>
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
          <div className="calories">
            <FaFireFlameCurved className="flame" />
            <span>{recipe.calories ? recipe.calories : "N/A"} Calories</span>
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
      </div>
    </section>
  );
};

export default DetailedRecipe;
