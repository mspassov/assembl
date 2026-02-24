import React from "react";
import DetailedRecipe from "@/components/DetailedRecipe";
import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";

export const metadata = {
  title: "assembl | Recipe Page",
  keywords: "AI, food, fridge, cooking, recipes",
  description:
    "Decide on your next meal by adding all of your ingredients in the fridge, and getting custom-made recipes",
};

const RecipePage = async ({ params }) => {
  await connectDB();
  let recipeRaw;
  let recipe;

  const { id } = await params;

  //The recipes in local storage are UUID4, and contain dashes, so you can check if the recipe needs to be fetched from local store or the database
  if (!id.includes("-")) {
    recipeRaw = await Recipe.findById(id).lean();

    //Need to serialize the object, before passing it as props
    recipe = JSON.parse(JSON.stringify(recipeRaw));
  } else {
    recipe = null;
  }

  return <DetailedRecipe recipeId={id} savedRecipe={recipe} />;
};

export default RecipePage;
