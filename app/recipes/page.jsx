import React from "react";
import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";
import AllRecipeCard from "@/components/AllRecipeCard";

const AllRecipesPage = async () => {
  await connectDB();
  const recipes = await Recipe.find({}).populate("author").lean();

  return (
    <section className="container-md recipes-grid">
      {recipes.map((recipe) => (
        <AllRecipeCard recipe={recipe} key={recipe._id} />
      ))}
    </section>
  );
};

export default AllRecipesPage;
