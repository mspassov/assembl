import React from "react";
import "@/assets/myCookbook.css";
import { FaBookmark } from "react-icons/fa6";
import connectDB from "@/config/database";
import { getServerSession } from "next-auth";
import AllRecipeCard from "@/components/AllRecipeCard";
import authOptions from "@/utils/authOptions";
import User from "@/models/User";

const CookbookPage = async () => {
  const session = await getServerSession(authOptions);
  await connectDB();

  //fetch the user and their saved recipes
  const res = await User.findById(session.user.id)
    .populate("savedRecipes")
    .lean();
  const { savedRecipes } = res;

  //serialize
  const savedRecipesFinal = JSON.parse(
    JSON.stringify(
      savedRecipes.map((recipe) => ({
        ...recipe,
        _id: recipe._id.toString(),
        author: recipe.author
          ? {
              ...recipe.author,
              _id: recipe.author._id.toString(),
            }
          : null,
      })),
    ),
  );

  return (
    <section className="container-md cookbook-container">
      <h2>
        <FaBookmark className="bookmark-icon" /> <span>Saved Recipes</span>
      </h2>
      {savedRecipes.length > 0 ? (
        <>
          <p>Awesome cooking! You have saved {savedRecipes.length} recipes!</p>
          <div className="recipes-grid">
            {savedRecipesFinal.map((recipe, index) => (
              <AllRecipeCard recipe={recipe} key={index} />
            ))}
          </div>
        </>
      ) : (
        <div className="no-saved">
          <p>No saved recipes yet!</p>
          <p>Start generating new recipes, and save whatever looks tasty</p>
          <p>Happy Cooking!</p>
        </div>
      )}
    </section>
  );
};

export default CookbookPage;
