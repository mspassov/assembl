import React from "react";
import DetailedRecipe from "@/components/DetailedRecipe";

export const metadata = {
  title: "assembl | Recipe Page",
  keywords: "AI, food, fridge, cooking, recipes",
  description:
    "Decide on your next meal by adding all of your ingredients in the fridge, and getting custom-made recipes",
};

const RecipePage = async ({ params }) => {
  const { id } = await params;

  return <DetailedRecipe recipeId={id} />;
};

export default RecipePage;
