"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import "@/assets/allRecipeCard.css";
import { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { toast } from "react-toastify";
import bookmarkRecipe from "@/app/actions/bookmarkRecipe.js";
import checkRecipeSaved from "@/app/actions/checkRecipeSaved";

const AllRecipeCard = ({ recipe }) => {
  const [saved, setSaved] = useState(false);
  const { data: sessionData } = useSession();

  useEffect(() => {
    const checkSaved = async () => {
      //If user is not logged in, then we cannot query the database
      if (!sessionData) {
        return;
      }
      const res = await checkRecipeSaved(recipe._id, sessionData.user.id);
      setSaved(res.isSaved);
    };

    checkSaved();
  }, [saved, recipe._id, checkRecipeSaved]);

  let difficultyColour = "#62cb62";
  if (recipe.difficulty == "Medium") {
    difficultyColour = "#f8fd76";
  } else if (recipe.difficulty == "Hard") {
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
    <div className="all-recipe-card">
      <Link
        href={`/recipes/${recipe._id}`}
        className="recipe-link"
        target="_blank"
      >
        <Image
          src={recipe.imgURL}
          alt={recipe.recipeTitle}
          height={100}
          width={150}
          className="all-recipe-card-img"
        />
      </Link>
      <div className="all-recipe-card-content">
        <Link
          href={`/recipes/${recipe._id}`}
          className="recipe-link"
          target="_blank"
        >
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
        </Link>
        <button onClick={handleSave} className="btn save-btn">
          {!saved ? <FaRegHeart /> : <FaHeart className="saved-heart" />}
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default AllRecipeCard;
