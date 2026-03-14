import React from "react";
import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";
import AllRecipeCard from "@/components/AllRecipeCard";
import Pagination from "@/components/Pagination";

export const metadata = {
  title: "assembl | Recipes",
};

//In the function, destructure the page count, so that it can be used as a default
const AllRecipesPage = async ({ searchParams }) => {
  //Pagination Logic
  const { page } = await searchParams;
  const pageNum = Number(page) || 1;
  const limit = 9; //This is the number of recipes per page
  const skip = (pageNum - 1) * limit;

  await connectDB();
  const totalRecipes = await Recipe.countDocuments({});
  const recipesRaw = await Recipe.find({})
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
    <section className="container-md">
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
