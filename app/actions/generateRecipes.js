"use server";

const generateRecipes = async (ingredients) =>{
    const ingredientsString = ingredients.join(", ");

    // const res = await fetch("https://api.groq.com/openai/v1/chat/completions",{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
    //     },
    //     body: JSON.stringify({
    //         messages: [
    //             {
    //                 role: "system",
    //                 content: "You are an expert chef, tasked with generating recipes"
    //             },
    //             {
    //                 role: "user",
    //                 content: `
    //                 I will give you a list of ingredients, generate a recipe and return it in JSON format. Only use the JSON structure, and don't return anything else.
    //                 Ingredients: ${ingredientsString}

    //                 Output structure: { allIngredients: [], recipeTitle: string, instructions:[], cookTime: integer }

    //                 The allIngredients should be all of the ingredients necessary for the recipe.

    //                 The recipeTitle should be the title of the recipe.

    //                 The instructions should be the steps necessary to complete the recipe, added to an array. Do not number the steps, simply add the step to the array.

    //                 The cookTime is how long the recipe should take, in minutes.

    //                 You may add additional ingredients, such as spices, and pantry staples, but ensure the listed ingredients are used.
    //                 `
    //             }
    //         ],
    //         model: "openai/gpt-oss-20b"
    //     })
    // });

    //const result = await res.json();
    //const recipeStr = result.choices[0].message.content;
    //const recipeObj = JSON.parse(recipeStr);
    const recipeObj = JSON.parse(`{"cookTime": 30, "allIngredients":["Chicken breast","Red bell pepper","Yellow bell pepper","Cherry tomatoes","Onion","Garlic cloves","Olive oil","Salt","Black pepper","Dried oregano","Fresh basil","Chicken broth"],"recipeTitle":"Chicken & Pepper Tomato Skillet","instructions":["Season the chicken breasts with salt, pepper and oregano.","Heat olive oil in a large skillet over medium-high heat and sear the chicken until golden brown on both sides, about 4 minutes per side.","Remove the chicken and set aside.","Add sliced onion and minced garlic to the skillet and sauté until fragrant, about 2 minutes.","Add sliced bell peppers and cook for another 3 minutes, stirring occasionally.","Stir in cherry tomatoes and pour in a splash of chicken broth to deglaze the pan.","Return the chicken to the skillet, cover and simmer until the chicken is cooked through and the vegetables are tender, about 8 minutes.","Remove the lid, stir in fresh basil, and adjust seasoning with salt and pepper if needed.","Serve hot over rice or pasta, or enjoy as a standalone dish."]}`)

    return recipeObj;
}

export default generateRecipes;