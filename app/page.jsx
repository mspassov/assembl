import React from "react";
import IngredientForm from "@/components/IngredientForm";

const HomePage = () => {
  return (
    <section className="container">
      <h2>Add ingredients you already have, and get new recipes in seconds!</h2>
      <IngredientForm />
    </section>
  );
};

export default HomePage;
