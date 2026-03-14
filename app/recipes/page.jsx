import React from "react";
import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";
import User from "@/models/User";
import AllRecipeCard from "@/components/AllRecipeCard";
import RecipeFilters from "@/components/RecipeFilters";
import Pagination from "@/components/Pagination";

export const metadata = {
  title: "assembl | Recipes",
};

//In the function, destructure the page count, so that it can be used as a default
const AllRecipesPage = async ({ searchParams }) => {
  await connectDB();

  const { page, difficulty, cuisine } = await searchParams;

  //Pagination Logic
  const pageNum = Number(page) || 1;
  const limit = 9; //This is the number of recipes per page
  const skip = (pageNum - 1) * limit;

  //Filtering logic
  let query = {};
  if (difficulty && difficulty != "All") {
    query.difficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  }

  if (cuisine && cuisine != "All") {
    query.cuisine = cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
  }

  const totalRecipes = await Recipe.countDocuments(query);
  const recipesRaw = await Recipe.find(query)
    .populate("author")
    .skip(skip)
    .limit(limit)
    .lean();

  //Need to serialize the object, before passing it as props
  const recipes = JSON.parse(
    JSON.stringify(
      recipesRaw.map((recipe) => ({
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
    <section className="container-md all-recipes">
      <RecipeFilters currDifficulty={difficulty} currCuisine={cuisine} />

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <AllRecipeCard recipe={recipe} key={recipe._id} />
        ))}
      </div>
      <Pagination page={pageNum} total={totalRecipes} limit={limit} />
    </section>
  );
};

export default AllRecipesPage;
