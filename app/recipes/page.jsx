import React from "react";
import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";
import AllRecipeCard from "@/components/AllRecipeCard";

const AllRecipesPage = async () => {
  await connectDB();
  const recipesRaw = await Recipe.find({}).populate("author").lean();

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
    <section className="container-md recipes-grid">
      {recipes.map((recipe) => (
        <AllRecipeCard recipe={recipe} key={recipe._id} />
      ))}
    </section>
  );
};

export default AllRecipesPage;
